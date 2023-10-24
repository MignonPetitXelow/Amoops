package main

import (
    "github.com/labstack/echo/v4"
    "math/rand"
    "net/http"
    "strconv"
    "strings"
    "time"
    "fmt"
)

func loadRoutes(e *echo.Echo, objects []Image, tags TagsData) {
    e.Static("public/", "static")
    e.File("/", "public/view.html")

    e.GET("image/:id", func(c echo.Context) error { return _Image(c, objects); });
	e.GET("tags", func(c echo.Context) error { return c.JSON(http.StatusOK, tags); });
	e.POST("addtag", func(c echo.Context) error { return _AddTagToImg(c, objects); });
}


func _Image(c echo.Context, objects []Image) error {
    params := c.Param("id");
    paramArray := strings.Split(params, "&");
    id := -1;

    if paramArray[0] == "random" {
		prng := rand.New(rand.NewSource(time.Now().UnixNano()));
        id = prng.Intn(len(objects) - 1)
    } else {
        var err error
        id, err = strconv.Atoi(paramArray[0])
        if err != nil {
            fmt.Println("Failed to convert:", err)
            return err
        }
    }

    if len(paramArray) > 1 && paramArray[1] == "json" {
        return c.JSON(http.StatusOK, objects[id])
    } else {
        c.Response().Header().Set("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        c.Response().Header().Set("Pragma", "no-cache")
        c.Response().Header().Set("Expires", "0")

        return c.File("private/storage/" + objects[id].URL)
    }
}

func _AddTagToImg(c echo.Context, objects []Image) error {
	itemID := c.FormValue("itemID");

	itemIDInt, err := strconv.Atoi(itemID)
	if err != nil {
		return c.String(http.StatusBadRequest, "Parameter 'itemID' need to be a valid integer");
	}

	// Récupérer le paramètre "tags" depuis la requête
	tags := c.FormValue("tags");

	// Exemple : Divisez les tags par une virgule pour obtenir un slice
	tagsSlice := strings.Split(tags, "&");

	// Vérifiez si l'indice est valide
	if itemIDInt >= 0 && itemIDInt < len(objects) {
		// Récupérez l'objet correspondant
		obj := objects[itemIDInt];
		tagsNotNull := false;

		// Vérifiez si les tags ne sont pas nuls et n'existent pas déjà
		for _, newTag := range tagsSlice {
			tagExists := false;
			for _, existingTag := range obj.TAGS {
				if newTag == existingTag {
					tagExists = true;
					break;
				}
			}
			if !tagExists && newTag != "" && newTag != "null" {
				obj.TAGS = append(obj.TAGS, newTag);
				tagsNotNull = true;
			}
		}
		
		if tagsNotNull {
			objects[itemIDInt] = obj;
			saveDB(objects);
		}

		return c.String(http.StatusOK, fmt.Sprintf("Tags added to the id: %d", itemIDInt));
	}

	return c.String(http.StatusBadRequest,"invalide id");
}