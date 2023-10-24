const elements = {
    background: document.getElementById('infopanelbackground'),
    panelcontainer: document.getElementById('infopanel'),
    panelbox: document.getElementById('infopanelbox'),
    imagepreview: document.getElementById('infopanelpreview'),
    tags: document.getElementById('infopaneltagscontainer'),
    date: document.getElementById('infopaneldate')
};

async function showInfos() {
    await show_Datas();
    anim_ShowPanels();
}

async function closeInfos() {
    await anim_ClosePanels();
}

async function anim_ShowPanels() {
    const { background, panelcontainer, panelbox, imagepreview } = elements;
    await delay(200);
    background.hidden = false;
    panelcontainer.hidden = false;
    fadeIn(background, 200);
    panelcontainer.style.top = '0vh';
    fadeIn(panelcontainer, 50);
    await fadeIn(panelbox);
    await fadeIn(imagepreview);
}

async function anim_ClosePanels() {
    const { background, panelcontainer, panelbox, imagepreview } = elements;
    panelcontainer.style.top = '100vh';
    await fadeOut(background);
    await fadeOut(imagepreview, 50);
    await fadeOut(panelcontainer);
    await fadeOut(panelbox);

    background.hidden = true;
    panelcontainer.hidden = true;
}

async function show_Datas() {
    const { tags, date } = elements;
    tags.innerHTML = "";
    date.innerHTML = "";
    const response = await fetch(`/image/${localStorage.getItem("lastImage")}&json`);
    const data = await response.json();

    data.tags.forEach((tag) => {
        const div = document.createElement('div');
        div.className = 'info_panel_tag';
        div.textContent = tag;
        tags.appendChild(div);
    });

    const dateSub = document.createElement('span');
    dateSub.textContent = data.date;
    dateSub.style = "font-family: 'SF Pro Display Regular'; text-align: center; width: 100%;";
    date.appendChild(dateSub);
}