package org.example;

import io.grpc.Server;
import io.grpc.ServerBuilder;
import service.HelloService;

import java.io.IOException;

public class GrpcServer {
        public static void main(String[] args) throws IOException, InterruptedException {
        Server server = ServerBuilder
                .forPort(8080)
                .addService(new HelloService())
                .build();

        server.start();
        server.awaitTermination();
    }
}
