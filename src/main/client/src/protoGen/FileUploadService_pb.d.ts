import * as jspb from 'google-protobuf'



export class UploadFileRequest extends jspb.Message {
  getInfo(): FileInfo | undefined;
  setInfo(value?: FileInfo): UploadFileRequest;
  hasInfo(): boolean;
  clearInfo(): UploadFileRequest;

  getChunkData(): Uint8Array | string;
  getChunkData_asU8(): Uint8Array;
  getChunkData_asB64(): string;
  setChunkData(value: Uint8Array | string): UploadFileRequest;

  getDataCase(): UploadFileRequest.DataCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UploadFileRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UploadFileRequest): UploadFileRequest.AsObject;
  static serializeBinaryToWriter(message: UploadFileRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UploadFileRequest;
  static deserializeBinaryFromReader(message: UploadFileRequest, reader: jspb.BinaryReader): UploadFileRequest;
}

export namespace UploadFileRequest {
  export type AsObject = {
    info?: FileInfo.AsObject,
    chunkData: Uint8Array | string,
  }

  export enum DataCase { 
    DATA_NOT_SET = 0,
    INFO = 1,
    CHUNK_DATA = 2,
  }
}

export class Empty extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Empty.AsObject;
  static toObject(includeInstance: boolean, msg: Empty): Empty.AsObject;
  static serializeBinaryToWriter(message: Empty, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Empty;
  static deserializeBinaryFromReader(message: Empty, reader: jspb.BinaryReader): Empty;
}

export namespace Empty {
  export type AsObject = {
  }
}

export class FileInfo extends jspb.Message {
  getName(): string;
  setName(value: string): FileInfo;

  getSize(): number;
  setSize(value: number): FileInfo;

  getType(): string;
  setType(value: string): FileInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FileInfo.AsObject;
  static toObject(includeInstance: boolean, msg: FileInfo): FileInfo.AsObject;
  static serializeBinaryToWriter(message: FileInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FileInfo;
  static deserializeBinaryFromReader(message: FileInfo, reader: jspb.BinaryReader): FileInfo;
}

export namespace FileInfo {
  export type AsObject = {
    name: string,
    size: number,
    type: string,
  }
}

export class UploadFileResponse extends jspb.Message {
  getUrl(): string;
  setUrl(value: string): UploadFileResponse;

  getId(): string;
  setId(value: string): UploadFileResponse;

  getSize(): number;
  setSize(value: number): UploadFileResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UploadFileResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UploadFileResponse): UploadFileResponse.AsObject;
  static serializeBinaryToWriter(message: UploadFileResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UploadFileResponse;
  static deserializeBinaryFromReader(message: UploadFileResponse, reader: jspb.BinaryReader): UploadFileResponse;
}

export namespace UploadFileResponse {
  export type AsObject = {
    url: string,
    id: string,
    size: number,
  }
}

export class FileUploadChunkRequest extends jspb.Message {
  getUuid(): string;
  setUuid(value: string): FileUploadChunkRequest;

  getChunk(): Uint8Array | string;
  getChunk_asU8(): Uint8Array;
  getChunk_asB64(): string;
  setChunk(value: Uint8Array | string): FileUploadChunkRequest;

  getOffset(): number;
  setOffset(value: number): FileUploadChunkRequest;

  getSize(): number;
  setSize(value: number): FileUploadChunkRequest;

  getName(): string;
  setName(value: string): FileUploadChunkRequest;

  getType(): string;
  setType(value: string): FileUploadChunkRequest;

  getFinished(): boolean;
  setFinished(value: boolean): FileUploadChunkRequest;

  getChunknumber(): number;
  setChunknumber(value: number): FileUploadChunkRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FileUploadChunkRequest.AsObject;
  static toObject(includeInstance: boolean, msg: FileUploadChunkRequest): FileUploadChunkRequest.AsObject;
  static serializeBinaryToWriter(message: FileUploadChunkRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FileUploadChunkRequest;
  static deserializeBinaryFromReader(message: FileUploadChunkRequest, reader: jspb.BinaryReader): FileUploadChunkRequest;
}

export namespace FileUploadChunkRequest {
  export type AsObject = {
    uuid: string,
    chunk: Uint8Array | string,
    offset: number,
    size: number,
    name: string,
    type: string,
    finished: boolean,
    chunknumber: number,
  }
}

export class FileUploadChunkResponse extends jspb.Message {
  getInfo(): UploadFileResponse | undefined;
  setInfo(value?: UploadFileResponse): FileUploadChunkResponse;
  hasInfo(): boolean;
  clearInfo(): FileUploadChunkResponse;

  getEmpty(): Empty | undefined;
  setEmpty(value?: Empty): FileUploadChunkResponse;
  hasEmpty(): boolean;
  clearEmpty(): FileUploadChunkResponse;

  getDataCase(): FileUploadChunkResponse.DataCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FileUploadChunkResponse.AsObject;
  static toObject(includeInstance: boolean, msg: FileUploadChunkResponse): FileUploadChunkResponse.AsObject;
  static serializeBinaryToWriter(message: FileUploadChunkResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FileUploadChunkResponse;
  static deserializeBinaryFromReader(message: FileUploadChunkResponse, reader: jspb.BinaryReader): FileUploadChunkResponse;
}

export namespace FileUploadChunkResponse {
  export type AsObject = {
    info?: UploadFileResponse.AsObject,
    empty?: Empty.AsObject,
  }

  export enum DataCase { 
    DATA_NOT_SET = 0,
    INFO = 1,
    EMPTY = 2,
  }
}

