/**
 * @fileoverview gRPC-Web generated client stub for 
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = require('./FileUploadService_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.FileUploadServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'binary';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.FileUploadServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'binary';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.FileUploadChunkRequest,
 *   !proto.FileUploadChunkResponse>}
 */
const methodDescriptor_FileUploadService_UploadFileChunk = new grpc.web.MethodDescriptor(
  '/FileUploadService/UploadFileChunk',
  grpc.web.MethodType.UNARY,
  proto.FileUploadChunkRequest,
  proto.FileUploadChunkResponse,
  /**
   * @param {!proto.FileUploadChunkRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.FileUploadChunkResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.FileUploadChunkRequest,
 *   !proto.FileUploadChunkResponse>}
 */
const methodInfo_FileUploadService_UploadFileChunk = new grpc.web.AbstractClientBase.MethodInfo(
  proto.FileUploadChunkResponse,
  /**
   * @param {!proto.FileUploadChunkRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.FileUploadChunkResponse.deserializeBinary
);


/**
 * @param {!proto.FileUploadChunkRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.FileUploadChunkResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.FileUploadChunkResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.FileUploadServiceClient.prototype.uploadFileChunk =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/FileUploadService/UploadFileChunk',
      request,
      metadata || {},
      methodDescriptor_FileUploadService_UploadFileChunk,
      callback);
};


/**
 * @param {!proto.FileUploadChunkRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.FileUploadChunkResponse>}
 *     Promise that resolves to the response
 */
proto.FileUploadServicePromiseClient.prototype.uploadFileChunk =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/FileUploadService/UploadFileChunk',
      request,
      metadata || {},
      methodDescriptor_FileUploadService_UploadFileChunk);
};


module.exports = proto;

