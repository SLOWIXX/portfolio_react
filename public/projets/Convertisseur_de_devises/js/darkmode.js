const darkmodeBtn = document.getElementById("darkmode");
const iconImg = document.getElementById("icon-img");
const body = document.body;
const panel = document.querySelector(".panel");
const main = document.querySelector(".content");
const sidebar = document.querySelector(".sidebar")
const texte = document.querySelectorAll(".texte")
const history = document.querySelectorAll(".history-list")
const titre = document.querySelector(".menu-item")

function setIcon() {
    if (body.classList.contains("lightmode")) {
        iconImg.src = "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/2600.svg"; 
        iconImg.alt = "Soleil";
    } else {
        iconImg.src = "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f319.svg"; 
        iconImg.alt = "Lune";
    }
}

if (localStorage.getItem("mode") === "light") {
    body.classList.add("lightmode");
}
setIcon();

darkmodeBtn.addEventListener("click", function () {
    body.classList.toggle("lightmode");
    localStorage.setItem("mode", body.classList.contains("lightmode") ? "light" : "dark");
    setIcon();
});

function darkmode () {
    panel.classList.toggle("panel_dark");
    main.classList.toggle("content_dark");
    sidebar.classList.toggle("sidebar_dark");
    texte.forEach(el => el.classList.toggle("text_dark"));
    history.forEach(el => el.classList.toggle("history-list_dark"));
    history.forEach(el => el.classList.toggle("history-list"));
    titre.classList.toggle("active")
}