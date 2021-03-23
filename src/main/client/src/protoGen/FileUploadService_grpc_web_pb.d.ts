import * as grpcWeb from 'grpc-web';

import * as FileUploadService_pb from './FileUploadService_pb';


export class FileUploadServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  uploadFileChunk(
    request: FileUploadService_pb.FileUploadChunkRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: FileUploadService_pb.FileUploadChunkResponse) => void
  ): grpcWeb.ClientReadableStream<FileUploadService_pb.FileUploadChunkResponse>;

}

export class FileUploadServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  uploadFileChunk(
    request: FileUploadService_pb.FileUploadChunkRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<FileUploadService_pb.FileUploadChunkResponse>;

}

