import React, { useState, useEffect, ChangeEvent,useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import {HelloRequest, HelloResponse} from './protoGen/HelloService_pb';
import {HelloServiceClient} from './protoGen/HelloService_grpc_web_pb';
import {FileUploadChunkRequest, FileUploadChunkResponse} from './protoGen/FileUploadService_pb';
import {FileUploadServiceClient,FileUploadServicePromiseClient} from './protoGen/FileUploadService_grpc_web_pb';
import {v4 as uuidv4} from 'uuid';
type FileDataChunk = {
  // storing the waiting time after all chunk uploads done
  waitCounter:number;
  // the timeout after all chunks are read until all data is uploaded
  maxWait: number;
  // just to show in the front end about the current upload progress: 0-100 (%)
  uploadProgress:number;
  // used to avoid multiple output of chunk upload errors
  chunkUploadError: boolean;
  // store the filesize globally for this component
  fileSize: number;
  // define the chunk size
  chunkSize :number;
  // an array of all junks, defined their upload status either as active (true), or done (false)
  currentUploads: Array<boolean>,
  file:File|null
}

interface FileUploadOptions{
  binary:boolean,
  chunkSize:number,
  chunkReadCallback:ChunkReadCallback, 
  chunkErrorCallback:Function, 
  successCallback:Function
}
interface ChunkReadCallback {
  (chunk:ArrayBuffer, os:number, ctn:number): Promise<Boolean>;
}
var client = new HelloServiceClient('http://localhost:8000');
var grpcFileUploadClient = new FileUploadServicePromiseClient('http://localhost:8000');
function App() {
  const [firstName,setFirstName] = useState("FirstName");
  const [lastName,setLastName] = useState("LastName");
  const initValue:FileDataChunk={
        chunkSize:1024 * 100,
        chunkUploadError:false,
        currentUploads:[],
        fileSize:0,
        maxWait:0,
        uploadProgress:0,
        waitCounter:0,
        file:null
  }

  const [fileDataChunk,setFileUploadData] = useState( initValue as FileDataChunk);
  const fileDataChunkRef = useRef<FileDataChunk>();
  fileDataChunkRef.current = fileDataChunk;


  const onFileChange = (e:ChangeEvent<HTMLInputElement>)=>{
    let file:File|undefined = e.target.files?.[0];
    if(file == undefined){
      alert("NO FILE");
      return;
    }
    setFileUploadData((prev:FileDataChunk)=>({
        ...prev,
        chunkSize:1024*1000,
        file:file ?? null,
        fileSize:file?.size ?? 0,
    }));

  }
  const onFileUpload = ()=>{
  //           const uuid = uuidv4();
  //       if(fileDataChunkRef.current?.file){
  //         upload(0,fileDataChunkRef.current?.file,uuid);
  //
  //       }

      let chunkFile = new FileUploadChunkRequest();
      if(!fileDataChunkRef.current){
        return;
      }
      let amountChunks = Math.ceil(fileDataChunkRef.current.fileSize/fileDataChunkRef.current.chunkSize);

     
      chunkFile.setName(fileDataChunkRef.current?.file?.name ?? "");
      chunkFile.setSize(fileDataChunkRef.current?.fileSize ?? 0);
      chunkFile.setType(fileDataChunkRef.current?.file?.type ?? "");
      chunkFile.setUuid(uuidv4());
      chunkFile.setFinished(false);

      setFileUploadData((prev:FileDataChunk)=>({
        ...prev,
        currentUploads:[...new Array(amountChunks)].map(x=>true)
      }));

      let options:FileUploadOptions = fileUploadOptions(amountChunks,chunkFile);

      readFileInChunks(fileDataChunk.file,chunkFile,options);
      
  }


  const fileUploadOptions = (amountChunks:number,chunkFile:FileUploadChunkRequest)=>{
    // wait after file reader is finished: amountChunks * 100ms, depends abit on the upload speed
  
    setFileUploadData(prev=>({
      ...prev,
      maxWait:amountChunks,
      waitCounter:0,
      chunkUploadError:false
    }));
    
    // define the options for the file reader, 
    let options:FileUploadOptions = {
        binary: true,
        chunkSize: fileDataChunkRef.current?.chunkSize ?? 1024*100,
        chunkErrorCallback: () => {
          fileUploadFailed("file reader error")
        },
        chunkReadCallback:async (chunk:ArrayBuffer, os:number, ctn:number):Promise<Boolean>=> {
            // once a chunk is read
            if (typeof chunk === "string") {
              chunkFile.setChunk(btoa(chunk))
            } else {
              chunkFile.setChunk(new Uint8Array(chunk))
            }
            chunkFile.setOffset(os);
            chunkFile.setChunknumber(ctn);
            console.log("CHUNK FILE;",chunkFile.getOffset(),chunkFile.getChunknumber());
            try {
              await grpcFileUploadClient.uploadFileChunk(chunkFile);
              setFileUploadData(prev=>({
                ...prev,
                currentUploads:prev.currentUploads.map((x,j)=>{
  
                  if(j == ctn){
                    x = false;
                  }
                  return x;
                })
              }));
              calculateUploadStatus();
              return Promise.resolve(true);
            } catch (error) {
              setFileUploadData(prev=>({
                ...prev,
                chunkUploadError:true
              }));
              console.log(error.message, "chunk :",chunkFile.getOffset(),chunkFile.getChunknumber());
              return Promise.resolve(false);
            }
      
        
       
        },
        successCallback: (c:any) => {
            // success callback doesnt mean that all files already uploaded, just read by filereader
            //tell the backend to merge the chunks together..
            chunkFile.setFinished(true);
            console.log("SUCCESS",chunkFile.getSize(),chunkFile.getOffset());
       
            // but first wait for all upload chunks callbacks
            waitFor(() => allUploadsDone(),async () => {
              try {
                const result = await grpcFileUploadClient.uploadFileChunk(chunkFile);
                let url = result?.getInfo()?.toObject().url;
                console.log(url)
              } catch (error) {
                fileUploadFailed("error final upload piece" + error);
                return;
              }
         
            });
        }
    };
    return options;
  }
  const fileUploadFailed = (error:string) =>{
    // handle errors
    console.log("error in upload:", error);
    setFileUploadData(prev=>({
      ...prev,
      uploadProgress:0,
      currentUploads:[]
    }));
  };
  // check if somewhere in the array a chunk is still active during uploading
  const allUploadsDone =()=> {
    if(!fileDataChunkRef.current){
      return true;
    }
    for (let i = 0; i < fileDataChunkRef.current.currentUploads.length; i++) {
        if (fileDataChunkRef.current.currentUploads[i]) {
            return false
        }
    }
    return true
  }

  const waitFor = (condition:Function, callback:Function) =>{
    // max wait 5*100 ms,
    if (fileDataChunkRef.current && fileDataChunkRef.current.waitCounter > fileDataChunkRef.current.maxWait) {
        fileUploadFailed("timeout waiting for upload completion");
        return
    }
    if (!condition()) {
      console.log("!condition");
      setFileUploadData(prev=>{
        return {...prev,waitCounter:prev.waitCounter+1}
      })
        // wait 100sec
        window.setTimeout(waitFor.bind(null, condition, callback), 500);
    } else {
        console.log("CALLBACK");
        callback();
    }
  };
    // took from https://gist.github.com/alediaferia/cfb3a7503039f9278381#file-tiny_uploader-js-L29
  const readFileInChunks = (file:File|null, ch:FileUploadChunkRequest, options = {} as FileUploadOptions) =>{
      if(file == null){
        return;
      }
      let counter = 0;
      const defaults = {
          chunkSize: 1024* 100, // bytes
          binary: true,
          chunkReadCallback: () => {
          },
          chunkErrorCallback: () => {
          },
          successCallback: () => {
          }
      };

      options = {
          ...options
      };

      const {binary, chunkSize, chunkReadCallback, chunkErrorCallback, successCallback} = options;
      const fileSize = file.size;
      let offset = 0;

      const onLoadHandler = async (evt:any) => {
          if (evt?.target?.error == null) {
            console.log(evt.target.result.byteLength, evt.target.result.length,evt.target.result);
              offset += binary ? evt.target?.result?.byteLength : evt.target.result.length;
       
              let result = await chunkReadCallback(evt.target.result, offset, counter);
              if(!result){
                  let maxRetry = 5;
                  while(!result || maxRetry == 0){
                    result = await chunkReadCallback(evt.target.result,offset,counter);
                    maxRetry--;
                    console.log("RETRY: ",maxRetry);
                  }
              }else{
                counter++
              }
              
          } else {
              return chunkErrorCallback(evt.target.error);
          }

          if (offset >= fileSize) {
              console.log(offset,fileSize);
              return successCallback(ch);
          }

          readBlock(offset, chunkSize, file);
      };

      const readBlock = async (_offset:number, length:number, _file:File) => {
          const reader = new FileReader();
  
          const blob = _file.slice(_offset, length+_offset);

          reader.onload = onLoadHandler;
          // perhaps Blob.arrayBuffer() should be used: https://developer.mozilla.org/en-US/docs/Web/API/Blob/arrayBuffer
          if (binary) {
              reader.readAsArrayBuffer(blob);
          } else {
              reader.readAsText(blob);
          }
      };

      readBlock(offset, chunkSize, file);
  };
    // returns the uploadProgress 0-100 in %
  const calculateUploadStatus = ()=> {
    let sum = 0;
    if(!fileDataChunkRef.current)return;
    for (let i = 0; i < fileDataChunkRef.current.currentUploads.length; i++) {
        if (!fileDataChunkRef.current.currentUploads[i]) {
            sum++
        }
    }
    
    setFileUploadData(prev=>({
      ...prev,
      uploadProgress: Math.floor(sum/prev.currentUploads.length * 100)
    }));
  };

  const onClickSubmit = ()=>{

    var helloRequest = new HelloRequest();

    
    helloRequest.setFirstname(firstName);
    helloRequest.setLastname(lastName);

    // client.hello(helloRequest,function(err:ServiceError|null,res:HelloResponse|null){

    //     if(res != null){
    //       console.log(res.toObject());
    //     }
    // });
    // client.hello(helloRequest,{headersMap},function(err,res){
    //     console.log(res);
    //     if(res != null){
    //       console.log(res.toObject());
    //     }
        
    // });
  }

  
  return (
    <div className="App">
    <header className="App-header">
  <p>{fileDataChunk.uploadProgress}</p>
     <label htmlFor="fname">First name:</label>
     <input type="text" id="fname" name="firstName" value={firstName} onChange={e=>setFirstName(e.target.value)}/><br/><br/>
     <label htmlFor="lname">Last name:</label>
     <input type="text" id="lname" name="lastName" value={lastName} onChange={e=>setLastName(e.target.value)}/><br/><br/>
     <br></br>
     <input type="file" name="file" id="file" onChange={e=>onFileChange(e)}/>
     <button type="submit" onClick={onFileUpload}>Submit</button>
    </header>
  </div>
  );
}

export default App;
