//=================
//    Selectors
//=================
let screen = document.querySelector(".screen");
let timeP = document.querySelector(".dt-cont p:nth-of-type(1)");
let dateP = document.querySelector(".dt-cont p:nth-of-type(2)");
let display = document.querySelector(".display-screen");
let home = document.querySelector(".home-screen");
let button = document.querySelector(".button-in");
let audio = document.querySelector("audio");
let lock = document.querySelector(".screen-top div:nth-of-type(2) i");
let unlockTime;
let screenState = "home-screen";
let fadeInP = document.querySelector(".home-screen .bot-cont p");
let calcApp = document.querySelector(".display-screen img");
let calculator = document.querySelector(".calculator");

//====================
//      On Load
//====================
// Set date and time
setDate();
setTime();
//update time per 30 secs
setInterval(setTime, 30000);

//========================
//      Listeners
//========================

button.addEventListener("click", loadDisplay);
calcApp.addEventListener("click", openCalc);

//=====================
//      Callbacks
//=====================
//  Set time
function setTime() {
  const date = new Date();
  let hrs = date.getHours().toString();
  let mins = date.getMinutes().toString();
  if (hrs.length < 2) {
    hrs = "0" + hrs;
  }
  if (mins.length < 2) {
    mins = "0" + mins;
  }
  timeP.innerHTML = hrs + ":" + mins;
}

//  Set date
function setDate() {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const date = new Date();
  dateP.innerHTML = days[date.getDay()] + ", " + date.getDate() + " " + months[date.getMonth()];
}

//  Load display
function loadDisplay() {
  if (screenState === "home-screen") {
    unlockPhone();
    fadeInP.classList.toggle("animate-text");
  } else if (screenState === "display-screen") {
    lockPhone();
    fadeInP.classList.toggle("animate-text");
  } else if (screenState === "calc-screen") {
    closeApp();
  }
}

//  Unlock Phone - change display to display screen
function unlockPhone() {
  timeP.classList.add("animate-time"); //start/add time animation
  setTimeout(() => { //wait for animation to end
    lock.classList.toggle("fa-lock");
    lock.innerText = timeP.innerText;
    home.classList.toggle("on-display"); //disable homescreen
    display.classList.toggle("on-display"); //enable display screen
    timeP.style.animationPlayState = "paused"; //pauses time when small
  }, 195);
  screenState = "display-screen"; //tell js phone is unlocked
}

// Lock Phone - change display to home screen (only from display screen)
function lockPhone() {
  home.classList.toggle("on-display"); //disable display screen
  display.classList.toggle("on-display"); //enable homescreen
  audio.play(); //play lock sound
  timeP.style.animationPlayState = "running"; //resume animimation
  lock.classList.toggle("fa-lock");
  lock.innerText = "";
  setTimeout(() => { //wait till animation is complaete
    timeP.classList.remove("animate-time"); //finishes/removes animation
  }, 195)
  screenState = "home-screen"; //tells js phone is locked again
}






function openCalc() {
  calculator.classList.toggle("on-display");
  display.classList.toggle("on-display");
  screen.style.backgroundImage = "none";
  screenState = "calc-screen";
}

function closeApp() {
  calculator.classList.toggle("on-display");
  display.classList.toggle("on-display");
  screen.style.backgroundImage = "url(/media/cat_cute_ball_127642_1350x2400.jpg)";
  screenState = "display-screen"
}