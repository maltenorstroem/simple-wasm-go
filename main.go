package main

import (
	"crypto/md5"
	"encoding/hex"
	"fmt"
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

func main() {
	fmt.Println("Hello, WASM World!")

	c := make(chan struct{}, 0)

	js.Global().Set("sum", js.FuncOf(add))
	js.Global().Set("getTmpl", js.FuncOf(getTemplate))
	js.Global().Set("getMD5", js.FuncOf(getMD5))

	<-c

}
