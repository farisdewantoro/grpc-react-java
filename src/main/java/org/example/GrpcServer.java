package org.example;

import io.grpc.Server;
import io.grpc.ServerBuilder;
import service.HelloService;
import service.FileUploadService;

import java.io.IOException;

public class GrpcServer {
        public static void main(String[] args) throws IOException, InterruptedException {
        Server server = ServerBuilder
                .forPort(8080)
                .addService(new HelloService())
				.addService(new FileUploadService())
                .build();
            System.out.println("SERVER STARTED !!");
        server.start();
        server.awaitTermination();
    }
}
