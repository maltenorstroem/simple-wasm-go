package main

import (
	"crypto/md5"
	"encoding/hex"
	"fmt"
	"google.golang.org/protobuf/encoding/protojson"
	"google.golang.org/protobuf/proto"
	"log"
	common "main/proto/pb"
	"syscall/js"
)

func add(this js.Value, p []js.Value) interface{} {
	sum := p[0].Int() + p[1].Int()
	return js.ValueOf(sum)
}

func getTemplate(this js.Value, p []js.Value) interface{} {
	tmpl := "# Mockdata Structure \n We use simple **json files** in a directory structure corresponding to the api hierarchy.\n ## Next Steps"

	return js.ValueOf(tmpl)
}

func getMD5(this js.Value, p []js.Value) interface{} {
	inp := p[0].String()
	hash := md5.Sum([]byte(inp))
	return js.ValueOf(hex.EncodeToString(hash[:]))

}

// Reads the given []byte json string literal into the given proto.Message
func jsonToProto(this js.Value, p []js.Value) interface{} {
	m := &common.Code{}
	inp := p[0].String()

	error := protojson.Unmarshal([]byte(inp), m)
	if error != nil {
		log.Panic(error)
	}

	wire, err := protojson.Marshal(m)
	if err != nil {
		log.Panic(err)
	}
	log.Print(wire)
	wireFormatString := hex.EncodeToString(wire)
	return js.ValueOf(wireFormatString)
}

// Writes the given wire-format proto.Message in JSON format
func protoToJson(this js.Value, p []js.Value) interface{} {
	m := &common.Code{}
	sInp, err := hex.DecodeString(p[0].String())
	if err != nil {
		log.Panic(err)
	}
	if err := proto.Unmarshal([]byte(sInp), m); err != nil {
		log.Panic(err)
	}

	return js.ValueOf(protojson.Format(m))
}

func main() {
	fmt.Println("Hello, WASM World!")

	c := make(chan struct{}, 0)

	js.Global().Set("sum", js.FuncOf(add))
	js.Global().Set("getTmpl", js.FuncOf(getTemplate))
	js.Global().Set("getMD5", js.FuncOf(getMD5))
	js.Global().Set("jsonToProto", js.FuncOf(jsonToProto))
	js.Global().Set("protoToJson", js.FuncOf(protoToJson))

	<-c

}
