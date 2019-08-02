//============================
//    Variables & Selectors
//============================
let lock = document.querySelector(".screen-top div:nth-of-type(2) i");
let fadeInP = document.querySelector(".home-screen .bot-cont p");
let timeP = document.querySelector(".dt-cont p:nth-of-type(1)");
let dateP = document.querySelector(".dt-cont p:nth-of-type(2)");
let appIcons = document.querySelectorAll(".display-screen img");
let display = document.querySelector(".display-screen");
let home = document.querySelector(".home-screen");
let button = document.querySelector(".button-in");
let screen = document.querySelector(".screen");
let apps = document.querySelectorAll(".app");
let audio = document.querySelector("audio");
let screenState = "home-screen";
let unlockTime;
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

//====================
//      On Load
//====================
// Set date and time
setDate(days, months);
setTime();
//update time every 30 secs
setInterval(setTime, 30000);

//========================
//      Listeners
//========================
button.addEventListener("click", loadDisplay);
appIcons.forEach(app => app.addEventListener("click", openApp));

//=====================
//      Callbacks
//=====================
//  Set time
function setTime() {
  const date = new Date();
  let hrs = date.getHours().toString();
  let mins = date.getMinutes().toString();
  if (hrs.length < 2) {
    hrs = `0${hrs}`;
  }
  if (mins.length < 2) {
    mins = `0${mins}`;
  }
  timeP.innerHTML = `${hrs}:${mins}`;
}

//  Set datec
function setDate(days, months) {
  const date = new Date();
  dateP.innerHTML =
    `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}`;
}

//  Display Controler
function loadDisplay() {
  if (screenState === "home-screen") {
    unlockPhone();
    fadeInP.classList.toggle("animate-text");
  } else if (screenState === "display-screen") {
    lockPhone();
    fadeInP.classList.toggle("animate-text");
  } else if (screenState === "open-app") {
    closeApp();
  }
}

//  Unlock Phone
function unlockPhone() {
  timeP.classList.add("animate-time");
  setTimeout(() => {
    lock.classList.toggle("fa-lock");
    lock.innerText = timeP.innerText;
    home.classList.toggle("on-display");
    display.classList.toggle("on-display");
    timeP.style.animationPlayState = "paused";
  }, 195);
  screenState = "display-screen";
}

// Lock Phone
function lockPhone() {
  home.classList.toggle("on-display");
  display.classList.toggle("on-display");
  audio.play();
  timeP.style.animationPlayState = "running";
  lock.classList.toggle("fa-lock");
  lock.innerText = "";
  setTimeout(() => {
    timeP.classList.remove("animate-time");
  }, 195);
  screenState = "home-screen";
}

//  Open App
function openApp() {
  const app = document.querySelector("." + this.dataset.name);
  app.classList.toggle("on-display");
  display.classList.toggle("on-display");
  screen.style.backgroundImage = "none";
  screenState = "open-app";
}

//  Close App
function closeApp() {
  apps.forEach(app => app.classList.remove("on-display"));
  display.classList.toggle("on-display");
  screen.style.backgroundImage =
    "url(/media/cute-cat-background.jpg)";
  screenState = "display-screen";
}