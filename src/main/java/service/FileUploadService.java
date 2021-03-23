package service;

import com.google.protobuf.ByteString;
import io.grpc.Status;
import io.grpc.stub.StreamObserver;
import org.example.grpc.*;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

public class FileUploadService extends FileUploadServiceGrpc.FileUploadServiceImplBase {
    private ByteArrayOutputStream fileData;

    private final String ROOT = "./file_store";
    private int counter = 0;
    @Override
    public void uploadFileChunk(FileUploadChunkRequest request, StreamObserver<FileUploadChunkResponse> responseObserver){
        Path chunkDestinationPath = Paths.get(ROOT,request.getUuid().toString());
        try{

            if(!Files.exists(chunkDestinationPath) && request.getChunkNumber() == 0){
                Files.createDirectories(chunkDestinationPath);
                fileData =  new ByteArrayOutputStream();
                System.out.println("CREATE DIRECTORY");

            }
            if (fileData == null) {
                System.out.println("ERRORR");
                responseObserver.onError(
                        Status.INVALID_ARGUMENT
                                .withDescription("image info wasn't sent before")
                                .asRuntimeException()
                );
                return;
            }

            Path path = Paths.get(ROOT,request.getUuid().toString(),request.getName());
//        RandomAccessFile raf = new RandomAccessFile(path.toString(), "rw");
//        //Seek to position
//            ByteArrayOutputStream byteData = new ByteArrayOutputStream();
//            request.getChunk().writeTo(byteData);

        request.getChunk().writeTo(fileData);

            System.out.println("chunk number"+request.getChunkNumber()+" "+request.getOffset() + " - "+request.getSize());
            System.out.println(request.getFinished() + " isfiniesd ");
            FileOutputStream f = new FileOutputStream(path.toString());

            f.write(fileData.toByteArray());
            f.close();

        if(request.getFinished()){
//            File file = new File(path.toString());
//            String new_path = file.getAbsolutePath().substring(0, file.getAbsolutePath().length() - ".temp".length());
//            file.renameTo(new File(new_path));
            System.out.println(request.getFinished() + " FINISHED ");
            FileUploadChunkResponse response = FileUploadChunkResponse.newBuilder()
                    .setInfo(UploadFileResponse.newBuilder().setUrl(path.toString()).build())
                    .build();

            responseObserver.onNext(response);
            responseObserver.onCompleted();
        }else{
            Empty empty = Empty.newBuilder().build();
            FileUploadChunkResponse response = FileUploadChunkResponse.newBuilder()
                    .setEmpty(empty)
                    .build();

            responseObserver.onNext(response);
            responseObserver.onCompleted();
        }

        } catch (IOException e) {
            e.printStackTrace();
        }

//        File dir = new File("/file_upload");
//        dir.exists();
//        if(!request.getFinished()){
//            ByteString chunkData = request.getChunk();
//            System.out.println(fileData.size());
//            int size = fileData.size() + chunkData.size();
//            try{
//                chunkData.writeTo(fileData);
//            } catch (IOException e) {
//                e.printStackTrace();
//            }
//
//        }else{
//            System.out.println("FINISHED");
//            System.out.println(request.getName());
//            try(FileOutputStream outputStream = new FileOutputStream(uuid+request.getName())) {
//
//                fileData.writeTo(outputStream);
//
//            } catch (FileNotFoundException e) {
//                e.printStackTrace();
//            } catch (IOException e) {
//                e.printStackTrace();
//            }
//        }


    }


    @Override
    public StreamObserver<UploadFileRequest> uploadFile(StreamObserver<UploadFileResponse> responseObserver) {
        return super.uploadFile(responseObserver);
    }
}
