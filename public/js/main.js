function toggleMenu() {
    var menu = document.getElementById('menu');
    menu.classList.toggle('close');
}

document.querySelector('.menu').addEventListener('click', toggleMenu);
