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
let name = document.querySelector("#name");
const email = document.querySelector("#email");
const message = document.querySelector("#message");
const form = document.querySelector("#form");
const nameErrMsg = document.querySelector(".name-err");
const messageErrMsg = document.querySelector(".msg-err");

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
	let title = document.querySelector(`.project-${projects.currentNumber} h3`)
		.innerHTML;
	let description = document.querySelector(
		`.project-${projects.currentNumber} p`
	).innerText;
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

//form validation
let errors = {
	name: "",
	message: "",
	email: ""
};

name.addEventListener("keyup", () => {
	if (
		name.value.length < 0 ||
    name.value.length > 30 ||
    name.value.length < 3
	) {
		errors.name = "name must be between 3 and 30 characters long";
		name.classList.add("error");
		nameErrMsg.innerText = errors.name;
	} else {
		name.classList.remove("error");
		errors.name = "";
		nameErrMsg.innerText = errors.name;
	}
});

message.addEventListener("keyup", () => {
	if (
		message.value.length < 0 ||
    message.value.length > 1000 ||
    message.value.length < 3
	) {
		errors.message = "message must be between 3 and 1000 characters long";
		message.classList.add("error");
		messageErrMsg.innerText = errors.message;
	} else {
		message.classList.remove("error");
		errors.message = "";
		messageErrMsg.innerText = errors.message;
	}
});

name.addEventListener("blur", () => {
	if (name.value === "") {
		name.classList.remove("error");
		nameErrMsg.innerText = "";
	}
});

message.addEventListener("blur", () => {
	if (message.value === "") {
		message.classList.remove("error");
		messageErrMsg.innerText = "";
	}
});

function formValid(x) {
	let valid = true;

	Object.values(x).forEach(val => {
		val.length > 0 && (valid = false);
	});

	return valid;
}

form.addEventListener("submit", e => {
	e.preventDefault();

	if (formValid(errors)) {
		console.log(`
	--SUBMITING--
	name: ${name.value}
	email: ${email.value}
	msg: ${message.value}
	`);
		console.log(errors);
	} else {
		console.log(errors);
		console.error("ABORT THE MISSION!!!!!");
	}
});

//TODO add download link to cv
//TODO add separate link to code/live ver.
