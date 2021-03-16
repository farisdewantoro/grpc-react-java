package service;

import io.grpc.stub.StreamObserver;
import org.example.grpc.HelloRequest;
import org.example.grpc.HelloResponse;
import org.example.grpc.HelloServiceGrpc;

public class HelloService extends HelloServiceGrpc.HelloServiceImplBase {

    @Override
    public void hello(
            HelloRequest request, StreamObserver<HelloResponse> responseObserver) {

        StringBuilder greeting = new StringBuilder()
                .append("Hello, ")
                .append(request.getFirstName())
                .append(" ")
                .append(request.getLastName())
                .append(" ")
                .append(request.getEmail());

        HelloResponse response = HelloResponse.newBuilder()
                .setGreeting(greeting.toString())
                .setEmail(request.getEmail())
                .build();

        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }
}