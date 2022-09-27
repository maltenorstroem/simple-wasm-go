package main

import (
	"crypto/md5"
	"encoding/hex"
	"fmt"
	"google.golang.org/protobuf/encoding/protojson"
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

func jsonToProto(this js.Value, p []js.Value) interface{} {
	m := &common.Code{}
	/*MessageData := `{
		"id": {
		"id": {
			"identifier": "-41001"
		},
		"display_name": "In Bearbeitung"
	},
		"internal_name": "Running",
		"short_form": "ActRun"
	}`*/
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

	return js.ValueOf(string(wire))
}

func main() {
	fmt.Println("Hello, WASM World!")

	c := make(chan struct{}, 0)

	js.Global().Set("sum", js.FuncOf(add))
	js.Global().Set("getTmpl", js.FuncOf(getTemplate))
	js.Global().Set("getMD5", js.FuncOf(getMD5))
	js.Global().Set("jsonToProto", js.FuncOf(jsonToProto))

	<-c

}
