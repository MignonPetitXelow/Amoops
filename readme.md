![header](.github/assets/1.png)
⚠️ Note: All the images used to showcase Amoops are not from the developer. Please refer to [sources.txt](.github/sources.txt) for image sources.
<br>
<br>
<br>
# 🍵 A quick presentation
![presentation](.github/assets/2.png)
## ❓ What is Amoops?
Amoops is a personal image collection server that functions like Gelbooru. With Amoops, you can curate and organize your own collection of images of various kinds, and you have the flexibility to add tags to each image. Please note that it is currently in a pre-alpha stage, so expect potential issues and limitations. Nevertheless, it works seamlessly offline and is entirely free to use.
<br>

### 🤖 What langages Amoops use?

- Golang: Amoops utilizes Golang, along with the Echo web framework, for server-side development. Golang is a robust and efficient programming language, and the Echo framework ensures the server's performance and reliability.

- JavaScript (JS): JavaScript is employed for client-side scripting, enhancing the user experience by enabling dynamic and interactive features.

- HTML: HTML (Hypertext Markup Language) is used to structure the content of web pages, ensuring a well-organized and accessible user interface.

- CSS: Cascading Style Sheets (CSS) are responsible for the visual design and layout of the website, making it visually appealing and user-friendly.
<br>
### ❓Questions and Answer:

- Q: Can we use it has a porn image collection?
    - A: Yes.

- Q: Is there a app to access to the server?
    - A: No, however, you can use WebClip instead; it works perfectly fine.

- Q: Can I add new tag names directly in the app?
    - A: As of October 25, 2023, you can't add new tags directly in the app, but you can modify the tags.json file instead.
<br>
<br>
<br>

![installation](.github/assets/3.png)
## 💾 Installation

### ⚠️ Before proceeding, make sure you have the "Go" package installed on your distribution if you are on Linux. You can download and install Go from the [official website](https://golang.org/dl/) or use your distribution's package manager to install it.

#### 📦 Clone the repository

```bash
$ git clone https://github.com/MignonPetitXelow/Amoops.git ; cd Amoops
```

#### ⛓️ Install dependencies and build
```go
$ go mod tidy
$ make
```
#### 🍡 Run the server

```
$ ./amoops
```
notes: ⚠️ By default, the program runs on port 1024. To access the website, open a web browser and navigate to `localhost:1024`.