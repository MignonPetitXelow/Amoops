async function showTagAdderMenu() {
    const response = await fetch(`/tags`);
    const data = await response.json();

    const response2 = await fetch(`/image/${localStorage.getItem("lastImage")}&json`);
    const data_image = await response2.json();
  
    const tags = document.createElement('div');
    tags.style.cssText = 'z-index: 5; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; display: grid; justify-content: center; align-items: end;';
  
    const innerDiv = document.createElement('div');
    innerDiv.style.cssText = 'color: white; padding: 1vh; border-radius: 25px; display: flex; flex-wrap: wrap; gap: .7vh; scrollbar-color: rgba(0,0,0,0); overflow: hidden scroll; margin: 0vh 1.6vw 2vh; height: 39.5vh; align-content: flex-start;';
    
    const tagAdderContainer = document.createElement('div');
    tagAdderContainer.style.cssText = 'color: white; padding: 0.8vh; width: 91.5vw; height: 60vh; background-color: rgb(22,22,24); border-radius: 10vw; display: grid; margin-bottom: 3.5vh; align-content: center;'

    data.tags.forEach(tag => {
        const div = document.createElement('div');
        div.className = 'info_panel_tag';
        div.style.fontSize = '2vh';
        div.style.transition = 'all 0.5s ease 0s;'
        div.style.fontFamily = 'SF Pro Display Thin'
        if (data_image.tags.includes(tag) || localStorage.getItem("tags")?.split('&').includes(tag) ) {
            div.style.backgroundColor = '#4a3d86';
        }
        div.textContent = tag.replace("_", " ");;
        div.onclick = function () {
            const currentTags = localStorage.getItem("tags") || '';
            const tagArray = currentTags.split('&');
            const tagIndex = tagArray.indexOf(tag);

            if (tagIndex !== -1) {
                tagArray.splice(tagIndex, 1);
                div.style.backgroundColor = 'rgb(33,33,36)';
            } else {
                tagArray.push(tag);
                div.style.backgroundColor = '#4a3d86';
            }

            const updatedTags = tagArray.join('&');
            localStorage.setItem("tags", updatedTags);
        };
        innerDiv.appendChild(div);
    });

    const button = document.createElement('div');
    button.className = 'info_panel_close_button';
    button.textContent = 'Add tags',
    button.style.cssText = `left: 2.5vw; position: relative; width: 95%; border-radius: 5vh;`
    button.onclick = async function () {
        const formData = new FormData();
        formData.append("itemID", localStorage.getItem("lastImage"));
        formData.append("tags", localStorage.getItem("tags"));

        fetch("/addtag", {
            method: "POST",
            body: formData,
        })
        .then((response) => {
            if (!response.ok) {
            throw new Error("POST request failed");
            }
            return response.text();
        })
        .then((data) => {
            console.log("Got response of the server :", data);
            localStorage.setItem("tags", "");
            show_Datas();
            tags.innerHTML = "";
            tags.hidden = true;
            document.getElementById("body").removeChild(tags);
        })
        .catch((error) => {
            console.error("Error when trying to POST :", error);
        });
    }

    tags.appendChild(tagAdderContainer);
    
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search tags';
    searchInput.style.fontFamily = 'SF Pro Display Regular'
    searchInput.style.cssText = `text-decoration: none; background-color: rgb(33,33,36); color: white; border: none; border-radius: 90px; height: 5vh; font-size: 2vh; padding-left: 5vw; width: auto; align-self: center; margin: 0.5vh 1.5vh 1vh; top: .5vh; position: relative;`
    tagAdderContainer.appendChild(searchInput);

    function updateTagsList(searchText) {
        innerDiv.innerHTML = ''; 

        data.tags.forEach(tag => {
            if (tag.toLowerCase().includes(searchText.toLowerCase())) {
                const div = document.createElement('div');
                div.className = 'info_panel_tag';
                div.style.fontSize = '1.8vh';
                div.style.transition = 'all 0.5s ease 0s;';
                div.style.fontFamily = 'SF Pro Display Regular';

                if (data_image.tags.includes(tag) || localStorage.getItem("tags").split('&').includes(tag) ) {
                    div.style.backgroundColor = '#4a3d86';
                }

                div.textContent = tag.replace("_", " ");

                div.onclick = function () {
                    const currentTags = localStorage.getItem("tags") || '';
                    const tagArray = currentTags.split('&');
                    const tagIndex = tagArray.indexOf(tag);

                    if (tagIndex !== -1) {
                        tagArray.splice(tagIndex, 1);
                        div.style.backgroundColor = 'rgb(33,33,36)';
                    } else {
                        tagArray.push(tag);
                        div.style.backgroundColor = '#4a3d86';
                    }

                    const updatedTags = tagArray.join('&');
                    localStorage.setItem("tags", updatedTags);
                };

                innerDiv.appendChild(div);
            }
        });
    }

    searchInput.addEventListener('input', function () {
        updateTagsList(this.value);
    });

    
    tagAdderContainer.appendChild(innerDiv);
    tagAdderContainer.appendChild(button);
    document.getElementById("body").appendChild(tags);
}