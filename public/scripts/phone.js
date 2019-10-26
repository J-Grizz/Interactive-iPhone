//============================
//    Variables & Selectors
//============================
import { cameraApp, stopStreamedVideo, camVideo } from "./camera-app";
import { player, video, rotatePortrait } from "./video-player";
const lock = document.querySelector(".screen-top div:nth-of-type(2) i");
const fadeInP = document.querySelector(".lock-screen .bot-cont p");
const timeP = document.querySelector(".dt-cont p:nth-of-type(1)");
const dateP = document.querySelector(".dt-cont p:nth-of-type(2)");
const appIcons = document.querySelectorAll(".home-screen img");
const display = document.querySelector(".home-screen");
const home = document.querySelector(".lock-screen");
const button = document.querySelector(".button-in");
const screen = document.querySelector(".screen");
const apps = document.querySelectorAll(".app");
const audio = document.querySelector(".click");
let screenState = "lock-screen";
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

// Set date
function setDate(days, months) {
  const date = new Date();
  dateP.innerHTML = `${days[date.getDay()]}, ${date.getDate()} ${
    months[date.getMonth()]
    }`;
}

// Display controller
//this function works out which screen is currently being displayed and what screen to put on display if the home button is clicked. 
function loadDisplay() {
  if (screenState === "lock-screen") {
    unlockPhone();
    fadeInP.classList.toggle("animate-text");
  } else if (screenState === "home-screen") {
    lockPhone();
    fadeInP.classList.toggle("animate-text");
  } else if (screenState === "open-app") {
    closeApp();
  }
}

// Unlock Phone
//Controls switching the phone screen from the lock screen to the home screen plus all the animations in between.
function unlockPhone() {
  timeP.classList.add("animate-time");
  setTimeout(() => {
    lock.classList.toggle("fa-lock");
    lock.innerText = timeP.innerText;
    home.classList.toggle("on-display");
    display.classList.toggle("on-display");
    timeP.style.animationPlayState = "paused";
  }, 195);
  screenState = "home-screen";
}

// Lock Phone
//Controls switching the phone screen from the home screen to the lock screen.
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
  screenState = "lock-screen";
}

//  Open App
//Logic to open any application.
function openApp() {
  const app = document.querySelector("." + this.dataset.name);
  app.classList.toggle("on-display");
  display.classList.toggle("on-display");
  screen.style.backgroundImage = "none";
  screenState = "open-app";
}

//  Close App
//Logic to closes any application and includes a few special cases where functions have to be stopped before closing.
function closeApp() {

  if ([...cameraApp.classList].includes("on-display")) {
    stopStreamedVideo(camVideo); //defined in camera-app.js
  }

  if ([...player.classList].includes("on-display")) {
    video.pause(); //defined in video-player.js
    rotatePortrait(); //defined in video-player.js
  }

  apps.forEach(app => app.classList.remove("on-display"));
  display.classList.toggle("on-display");
  screen.style.backgroundImage = "url(/public/media/cute-cat-background.jpg)";
  screenState = "home-screen";
}

export { display, screen, screenState };