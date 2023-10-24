async function nextButtonActive()
{
    const button = document.getElementById('nextButton');

    button.style.transform = 'translateX(2vw)';
    await delay(250);
    button.style.transform = 'translateX(0vw)';
}

async function infoButtonActive()
{
    const button = document.getElementById('infoButton');

    button.style.transform = 'translateY(-2.5vw)';
    await delay(250);
    button.style.transform = 'translateY(0vw)';
}

async function likeButtonActive()
{
    const button = document.getElementById('likeButton');

    button.style.fontSize = '6.5vh';
    button.style.color = '#FC2121';
    button.style.textShadow = '0px 0px 30px rgb(252, 33, 33)'
    await delay(250);
    button.style.fontSize = '5.5vh';
    button.style.color = '#FD8A8A';
    button.style.textShadow = 'none';
}