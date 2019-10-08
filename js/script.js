const footer = document.querySelector("#footer");
const main = document.querySelector("#main");
const header = document.querySelector(".header__container-outer");
const modal = document.querySelector(".modal-bg");
const close = document.querySelector(".modal--close");
const thumbnails = document.querySelectorAll(".thumbnail");
const modalImage = document.querySelector(".modal-content__img");
const modalText = document.querySelector(".modal-text");
const modalHeader = document.querySelector(".modal-header");
const modalLinks = document.querySelector(".modal-links");
let project = {};
const name = document.querySelector("#name");
const email = document.querySelector("#email");
const message = document.querySelector("#message");
const form = document.querySelector("#form");
const nameErrMsg = document.querySelector(".name-err");
const messageErrMsg = document.querySelector(".msg-err");
let timeStamp = new Date().toDateString();
const notification = document.querySelector(".notification");
const toggleButton = document.querySelector("#toggle");
const bio = document.querySelector("blockquote");

toggleButton.addEventListener("click", () => {
  toggleBio();
  toggleBtnName();
});

function toggleBio() {
  bio.style.display === "flex"
    ? (bio.style.display = "none")
    : (bio.style.display = "flex");
}

function toggleBtnName() {
  bio.style.display === "none"
    ? (toggleButton.innerText = "Read more")
    : (toggleButton.innerText = "Read less");
}

window.addEventListener("resize", getWidth);

function getWidth() {
  let currentWidth = window.innerWidth;
  moveFooter(currentWidth);
}

function moveFooter(screenWidth) {
  if (screenWidth >= 1024) {
    header.appendChild(footer);
  } else {
    main.insertAdjacentElement("afterend", footer);
  }
}

moveFooter(window.innerWidth);

function getProjectNumber() {
  let projectName = event.target.parentElement.className;
  let projectNumber = projectName.charAt(projectName.length - 1);
  project.currentNumber = projectNumber;
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
  modalImage.classList.add(`thumbnail--image-${project.currentNumber}`);
}

function copyText() {
  let title = document.querySelector(`.project-${project.currentNumber} h3`)
    .innerHTML;

  let links = document.querySelector(
    `.project-${project.currentNumber} .link-container`
  ).innerHTML;

  let description = document.querySelector(
    `.project-${project.currentNumber} p`
  ).innerText;
  modalHeader.innerHTML = title;
  modalLinks.innerHTML = links;
  modalText.innerText = description;
}

function openModal() {
  modal.style.display = "flex";
}

modal.addEventListener("click", () => {
  closeModal();
  removeClass();
});

close.addEventListener("click", () => {
  closeModal();
  removeClass();
});

function closeModal() {
  modal.style.display = "none";
}

function removeClass() {
  modalImage.classList.remove(`thumbnail--image-${project.currentNumber}`);
}

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

function displayNotification() {
  notification.style.display = "flex";
  setTimeout(hideNotification, 2000);
}

function hideNotification() {
  notification.style.display = "none";
}

function resetForm() {
  name.value = "";
  email.value = "";
  message.value = "";
}

form.addEventListener("submit", e => {
  e.preventDefault();

  if (formValid(errors)) {
    firebasePush();
    displayNotification();
    resetForm();
  }
});

//Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrGwnqYEHOVqzo-yz2MPc17DbzVZa6ZoM",
  authDomain: "message-logger-3ddf5.firebaseapp.com",
  databaseURL: "https://message-logger-3ddf5.firebaseio.com",
  projectId: "message-logger-3ddf5",
  storageBucket: "",
  messagingSenderId: "64933848454",
  appId: "1:64933848454:web:997161210424911336f807"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function firebasePush() {
  firebase
    .database()
    .ref("messages")
    .push()
    .set({
      name: name.value,
      mail: email.value,
      message: message.value,
      date: timeStamp
    });
}
