const footer = document.querySelector('#footer');
const header = document.querySelector('#header');
const main = document.querySelector('#main');
const fix = document.querySelector('#fix');
const modal = document.querySelector('.modal-bg');
const thumbnail1 = document.querySelector('#thumbnail-1');
const close = document.querySelector('.modal--close');



window.addEventListener('resize', getWidth)

function getWidth() {
    let currentWidth = window.innerWidth
    moveFooter(currentWidth);
}

function moveFooter(screenWidth) {
    if (screenWidth > 700) {
        fix.appendChild(footer)
    } else { main.insertAdjacentElement('afterend', footer)}
}

moveFooter(window.innerWidth);


window.addEventListener('scroll', moveBackground);

function moveBackground() {
    let scrollValue = window.pageYOffset;
    
    modal.style.transform = 'translate3d(0px, '+scrollValue+'px, 0px)';
}

thumbnail1.addEventListener('click', openModal);

function openModal() {
    modal.style.display = 'flex';

}

close.addEventListener('click', closeModal)

function closeModal() {
    modal.style.display = 'none'
}