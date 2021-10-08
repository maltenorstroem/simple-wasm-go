package main

import (
	"fmt"
	"syscall/js"
)

func add(this js.Value, p []js.Value) interface{} {
	sum := p[0].Int() + p[1].Int()
	return js.ValueOf(sum)
}

func getTemplate(this js.Value, p []js.Value) interface{} {
	tmpl := "button"
	return js.ValueOf(tmpl)
}

func main() {
	fmt.Println("Hello, WASM World!")

	c := make(chan struct{}, 0)

	js.Global().Set("sum", js.FuncOf(add))
	js.Global().Set("getTmpl", js.FuncOf(getTemplate))

	<-c

}
