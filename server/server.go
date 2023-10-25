package main

import (
	//"net/http"
	"github.com/labstack/echo/v4"
)

var images []Image
var tags TagsData

func main() {
	e := echo.New()

	loadDB()
	addImagesFromDirectory("private/storage")
	saveDB()
	loadTags()

	loadRoutes(e, images, tags)
	e.Start(":1024")
}
