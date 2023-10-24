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
	ID   int      `json:"id"`
	URL  string   `json:"url"`
	TAGS []string `json:"tags"`
	DATE string   `json:"date"`
}

type TagsData struct {
	Tags []string `json:"tags"`
}

func loadDB(objects []Image) []Image {
	fmt.Println("Loading database images.json");
	data, err := ioutil.ReadFile("private/database/images.json");
	if err != nil {
		fmt.Println("Error reading JSON file:", err);
		return objects;
	}

	if err := json.Unmarshal(data, &objects); err != nil {
		fmt.Println("Error unmarshaling JSON:", err);
		return objects;
	}

	return objects;
}

func saveDB(objects []Image) {
	fmt.Println("Saving database images.json");
    data, err := json.Marshal(objects);
    if err != nil {
        fmt.Println("Error marshaling JSON:", err);
        return;
    }

    err = ioutil.WriteFile("private/database/images.json", data, 0644);
    if err != nil {
        fmt.Println("Error writing JSON file:", err);
    }
	fmt.Println("Saved",len(objects),"elements into images.json");
}

func addImagesFromDirectory(directoryPath string, images []Image) []Image {
    files, err := ioutil.ReadDir(directoryPath);
    if err != nil {
        fmt.Println("Error reading directory:", err);
        return images;
    }

    for _, file := range files {
        if !file.IsDir() {
            extension := strings.ToLower(filepath.Ext(file.Name()));
            if extension == ".jpg" || extension == ".jpeg" || extension == ".png" || extension == ".webp" {
                found := false
                for _, image := range images {
                    if image.URL == file.Name() {
                        found = true;
                        break;
                    }
                }

                if !found {
					currentTime := time.Now().UTC();
					layout := "01/02/2006 15:04";
					formattedTime := currentTime.Format(layout);

                    newImage := Image{
                        ID:   len(images),
                        URL:  file.Name(),
                        TAGS: []string{"Image"},
                        DATE: formattedTime,
                    }
                    images = append(images, newImage);
                }
            }
        }
    }

    return images
}

func loadTags(objects TagsData) TagsData {
	fmt.Println("Loading tags.json");
	data, err := ioutil.ReadFile("private/database/tags.json");
	if err != nil {
		fmt.Println("Error reading JSON file:", err);
		return objects;
	}

	if err := json.Unmarshal(data, &objects); err != nil {
		fmt.Println("Error unmarshaling JSON:", err);
		return objects;
	}

	return objects;
}