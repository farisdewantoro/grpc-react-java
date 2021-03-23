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

const proto = require('./HelloService_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.HelloServiceClient =
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
proto.HelloServicePromiseClient =
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
 *   !proto.HelloRequest,
 *   !proto.HelloResponse>}
 */
const methodDescriptor_HelloService_hello = new grpc.web.MethodDescriptor(
  '/HelloService/hello',
  grpc.web.MethodType.UNARY,
  proto.HelloRequest,
  proto.HelloResponse,
  /**
   * @param {!proto.HelloRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.HelloResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.HelloRequest,
 *   !proto.HelloResponse>}
 */
const methodInfo_HelloService_hello = new grpc.web.AbstractClientBase.MethodInfo(
  proto.HelloResponse,
  /**
   * @param {!proto.HelloRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.HelloResponse.deserializeBinary
);


/**
 * @param {!proto.HelloRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.HelloResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.HelloResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.HelloServiceClient.prototype.hello =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/HelloService/hello',
      request,
      metadata || {},
      methodDescriptor_HelloService_hello,
      callback);
};


/**
 * @param {!proto.HelloRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.HelloResponse>}
 *     Promise that resolves to the response
 */
proto.HelloServicePromiseClient.prototype.hello =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/HelloService/hello',
      request,
      metadata || {},
      methodDescriptor_HelloService_hello);
};


module.exports = proto;

