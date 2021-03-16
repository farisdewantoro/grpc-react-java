import logo from './logo.svg';
import './App.css';
import {HelloRequest} from './GrpcGen/HelloService_pb';
import {HelloServiceClient} from './GrpcGen/HelloService_grpc_web_pb';
import React, { useState, useEffect } from 'react';

var client = new HelloServiceClient('http://localhost:8000')
function App() {
  const [firstName,setFirstName] = useState("FirstName");
  const [lastName,setLastName] = useState("LastName");

  const onClickSubmit = ()=>{
    alert("masuk");

    var helloRequest = new HelloRequest();
        console.log(client);
    helloRequest.setFirstname(firstName);
    helloRequest.setLastname(lastName);
    client.hello(helloRequest,{},function(err,res){
        console.log(res);
        console.log(res.toObject());
    });
  }



  return (
    <div className="App">
      <header className="App-header">

       <label for="fname">First name:</label>
       <input type="text" id="fname" name="firstName" value={firstName} onChange={e=>setFirstName(e.target.value)}/><br/><br/>
       <label for="lname">Last name:</label>
       <input type="text" id="lname" name="lastName" value={lastName} onChange={e=>setLastName(e.target.value)}/><br/><br/>
       <button type="submit" onClick={onClickSubmit}>Submit</button>
      </header>
    </div>
  );
}

export default App;
