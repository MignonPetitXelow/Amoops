package main

import (
    //"net/http"
    "github.com/labstack/echo/v4"
)

func main() {
    e := echo.New();

	
	var images []Image;
	var tags TagsData;
	images = loadDB(images);
	images = addImagesFromDirectory("private/storage", images);
	saveDB(images);
	tags = loadTags(tags);
	
	loadRoutes(e, images, tags);
    e.Start(":1024");
}