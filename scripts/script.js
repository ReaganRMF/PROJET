const button = document.querySelector(".button");
const menu = document.querySelector(".menu");

button.onclick = function () {
    button.classList.toggle("active");
    menu.classList.toggle("active");
};
