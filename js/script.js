const footer = document.querySelector('#footer');
const header = document.querySelector('#header');
const main = document.querySelector('#main');



window.addEventListener('resize', getWidth)

function getWidth() {
    let currentWidth = window.innerWidth
    moveFooter(currentWidth);
}

function moveFooter(screenWidth) {
    if (screenWidth > 700) {
        header.appendChild(footer)
    } else { main.insertAdjacentElement('afterend', footer)}
}

moveFooter(window.innerWidth);