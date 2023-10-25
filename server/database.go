package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"path/filepath"
	"strings"
	"time"
)

type Image struct {
	ID               int      `json:"id"`
	URL              string   `json:"url"`
	TAGS             []string `json:"tags"`
	SOURCE           string   `json:"sources"`
	LASTMODIFICATION string   `json:"lastmodification"`
	DATE             string   `json:"date"`
}

type TagsData struct {
	Tags []string `json:"tags"`
}

func loadDB() []Image {
	fmt.Println("Loading database images.json")
	data, err := ioutil.ReadFile("private/database/images.json")
	if err != nil {
		fmt.Println("Error reading JSON file:", err)
		return images
	}

	if err := json.Unmarshal(data, &images); err != nil {
		fmt.Println("Error unmarshaling JSON:", err)
		return images
	}

	return images
}

func saveDB() {
	fmt.Println("Saving database images.json")
	data, err := json.Marshal(images)
	if err != nil {
		fmt.Println("Error marshaling JSON:", err)
		return
	}

	err = ioutil.WriteFile("private/database/images.json", data, 0644)
	if err != nil {
		fmt.Println("Error writing JSON file:", err)
	}
	fmt.Println("Saved", len(images), "elements into images.json")
}

func addImagesFromDirectory(directoryPath string) []Image {
	files, err := ioutil.ReadDir(directoryPath)
	if err != nil {
		fmt.Println("Error reading directory:", err)
		return images
	}

	for _, file := range files {
		if !file.IsDir() {
			extension := strings.ToLower(filepath.Ext(file.Name()))
			if extension == ".jpg" || extension == ".jpeg" || extension == ".png" || extension == ".webp" || extension == ".gif" {
				found := false
				for _, image := range images {
					if image.URL == file.Name() {
						found = true
						break
					}
				}

				if !found {
					currentTime := time.Now().UTC()
					layout := "01/02/2006 15:04"
					formattedTime := currentTime.Format(layout)

					newImage := Image{
						ID:               len(images),
						URL:              file.Name(),
						TAGS:             []string{"Image"},
						SOURCE:           "unknown",
						LASTMODIFICATION: formattedTime,
						DATE:             formattedTime,
					}
					images = append(images, newImage)
				}
			}
		}
	}

	return images
}

func loadTags() {
	fmt.Println("Loading tags.json")
	data, err := ioutil.ReadFile("private/database/tags.json")
	if err != nil {
		fmt.Println("Error reading JSON file:", err)
		return
	}

	if err := json.Unmarshal(data, &tags); err != nil {
		fmt.Println("Error unmarshaling JSON:", err)
		return
	}
}
