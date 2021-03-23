import * as jspb from 'google-protobuf'



export class HelloRequest extends jspb.Message {
  getFirstname(): string;
  setFirstname(value: string): HelloRequest;

  getLastname(): string;
  setLastname(value: string): HelloRequest;

  getEmail(): string;
  setEmail(value: string): HelloRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): HelloRequest.AsObject;
  static toObject(includeInstance: boolean, msg: HelloRequest): HelloRequest.AsObject;
  static serializeBinaryToWriter(message: HelloRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): HelloRequest;
  static deserializeBinaryFromReader(message: HelloRequest, reader: jspb.BinaryReader): HelloRequest;
}

export namespace HelloRequest {
  export type AsObject = {
    firstname: string,
    lastname: string,
    email: string,
  }
}

export class HelloResponse extends jspb.Message {
  getGreeting(): string;
  setGreeting(value: string): HelloResponse;

  getEmail(): string;
  setEmail(value: string): HelloResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): HelloResponse.AsObject;
  static toObject(includeInstance: boolean, msg: HelloResponse): HelloResponse.AsObject;
  static serializeBinaryToWriter(message: HelloResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): HelloResponse;
  static deserializeBinaryFromReader(message: HelloResponse, reader: jspb.BinaryReader): HelloResponse;
}

export namespace HelloResponse {
  export type AsObject = {
    greeting: string,
    email: string,
  }
}
