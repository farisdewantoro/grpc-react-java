import * as grpcWeb from 'grpc-web';

import * as HelloService_pb from './HelloService_pb';


export class HelloServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  hello(
    request: HelloService_pb.HelloRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: HelloService_pb.HelloResponse) => void
  ): grpcWeb.ClientReadableStream<HelloService_pb.HelloResponse>;

}

export class HelloServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  hello(
    request: HelloService_pb.HelloRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<HelloService_pb.HelloResponse>;

}

