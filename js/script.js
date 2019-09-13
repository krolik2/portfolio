const footer = document.querySelector('#footer');
const header = document.querySelector('#header');
const main = document.querySelector('#main');
const fix = document.querySelector('#fix')



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


// window.addEventListener('scroll', moveBackground)

// function moveBackground() {
//     let scrollValue = window.pageYOffset;
//     let rate = scrollValue * (-0.1);

    
//     header.style.backgroundPosition = '0px ' + rate + 'px';
// }