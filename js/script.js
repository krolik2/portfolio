const footer = document.querySelector("#footer");
const main = document.querySelector("#main");
const fix = document.querySelector("#fix");
const modal = document.querySelector(".modal-bg");
const close = document.querySelector(".modal--close");
const thumbnails = document.querySelectorAll(".thumbnail");
const modalImage = document.querySelector(".modal-content__img");
const modalText = document.querySelector(".modal-text");
const modalHeader = document.querySelector(".modal-header");
let projects = {};

// footer placement
window.addEventListener("resize", getWidth);

function getWidth() {
	let currentWidth = window.innerWidth;
	moveFooter(currentWidth);
}

function moveFooter(screenWidth) {
	if (screenWidth > 700) {
		fix.appendChild(footer);
	} else {
		main.insertAdjacentElement("afterend", footer);
	}
}

moveFooter(window.innerWidth);

// modal scroll
window.addEventListener("scroll", moveBackground);

function moveBackground() {
	let scrollValue = window.pageYOffset;

	modal.style.transform = "translate3d(0px, " + scrollValue + "px, 0px)";
}
// modal copy elements from article
function getProjectNumber() {
	let projectName = event.target.parentElement.className;
	let projectNumber = projectName.charAt(projectName.length - 1);
	projects.currentNumber = projectNumber;
}

thumbnails.forEach(element =>
	element.addEventListener("click", () => {
		getProjectNumber();
		assignImgToModal();
		copyText();
		openModal();
	})
);

function assignImgToModal() {
	modalImage.classList.add(`thumbnail--image-${projects.currentNumber}`);
}

function copyText() {
	let title = document.querySelector(`.project-${projects.currentNumber} h3`).innerHTML;
	let description = document.querySelector(`.project-${projects.currentNumber} p`).innerText;
	modalHeader.innerHTML = title;
	modalText.innerText = description;
}

function openModal() {
	modal.style.display = "flex";
}

close.addEventListener("click", () => {
	closeModal();
	removeClass();
});

function closeModal() {
	modal.style.display = "none";
}

function removeClass() {
	modalImage.classList.remove(`thumbnail--image-${projects.currentNumber}`);
}