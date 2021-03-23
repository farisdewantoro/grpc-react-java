echo "LIST OF PROTO FILES :"
FILES=../../../proto/*
CLIENT_PATH=./../client/src/protoGen
PROTOC_GEN_TS_PATH=E:/Java/grpc-react-java/src/main/client/node_modules/.bin/protoc-gen-ts.cmd
for file in $FILES
do
	protoFile=$(basename $file)
    cd ../../../proto
    echo "GENERATE : $protoFile"
    # command="protoc $protoFile --js_out=import_style=commonjs,binary:$CLIENT_PATH --grpc-web_out=import_style=commonjs,mode=grpcwebtext:$CLIENT_PATH"
    echo $(eval pwd)
    #command="protoc $protoFile --plugin=protoc-gen-ts=$PROTOC_GEN_TS_PATH --js_out=import_style=commonjs+dts,binary:$CLIENT_PATH --ts_out=service=grpc-web:$CLIENT_PATH --grpc-web_out=import_style=commonjs+dts,mode=grpcweb:$CLIENT_PATH"
    command="protoc $protoFile --plugin=protoc-gen-ts=$PROTOC_GEN_TS_PATH --js_out=import_style=commonjs,binary:$CLIENT_PATH --grpc-web_out=import_style=commonjs+dts,mode=grpcweb:$CLIENT_PATH"

    output=$(eval $command)
    cd $CLIENT_PATH
done

echo "DONE"
