const button = document.querySelector(".button");
const menu = document.querySelector(".menu");
const lien1 = document.querySelector('#lien1');
const lien2 = document.querySelector('#lien2');
const lien3 = document.querySelector('#lien3');

button.onclick = function () {
    button.classList.toggle("active");
    menu.classList.toggle("active");
};

lien1.onclick = function () {
    button.classList.toggle("active");
    menu.classList.toggle("active");
};
lien2.onclick = function () {
    button.classList.toggle("active");
    menu.classList.toggle("active");
};
lien3.onclick = function () {
    button.classList.toggle("active");
    menu.classList.toggle("active");
};