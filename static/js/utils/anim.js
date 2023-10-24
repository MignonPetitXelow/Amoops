async function fadeIn(element, duration = 250) {
    element.style.opacity = '0%';
    element.style.transition = `all ${duration}ms ease 0s;`;
    element.style.opacity = '100%';
    await delay(duration);
}

async function fadeOut(element, duration = 250) {
    element.style.opacity = '100%';
    element.style.transition = `all ${duration}ms ease 0s;`;
    element.style.opacity = '0%';
    await delay(duration);
}