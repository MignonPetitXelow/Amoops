const delay = (ms) => new Promise((res) => setTimeout(res, ms));

async function loadImage() {
    try {
        const response = await fetch("/image/random&json");
        const data = await response.json();
        const imageURL = `/image/${data.id}`;

        localStorage.setItem("lastImage", data.id);

        const newImage = new Image();
        newImage.src = `/image/${data.id}`;
        await newImage.decode();

        const image = document.getElementById("image");
        const background = document.getElementById("background");
        const infoPanelBackground = document.getElementById("infopanelbackground");
        const infoPanelPreview = document.getElementById("infopanelpreview");

        image.style.opacity = "0%";
        image.style.transform = "translateX(-20vw) translateY(2vh) rotate(-5deg)";
        await delay(500);
        image.style.transform = "translateX(0) rotate(0deg)";
        image.style.opacity = "100%";

        image.src = imageURL;
        background.style.backgroundImage = `url(${imageURL})`;
        infoPanelBackground.style.backgroundImage = `url(${imageURL})`;
        infoPanelPreview.src = imageURL;
    } catch (error) {
        console.error("Erreur lors du chargement de l'image:", error);
    }
}

function compatibleOrNot() {
    const imageStyle = document.getElementById("image").style;

    imageStyle.minHeight = imageStyle.minHeight === "10vh" ? "70vh" : "10vh";
}
