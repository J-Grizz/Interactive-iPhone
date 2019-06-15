//Selector Section
let timeP = document.querySelector(".screen .dt-cont p:nth-of-type(1)");
let dateP = document.querySelector(".screen .dt-cont p:nth-of-type(2)");
let display = document.querySelector(".screen .display-screen");
let home = document.querySelector(".screen .home-screen");
let button = document.querySelector(".button-in");
let audio = document.querySelector("audio");
let lock;
let unlockTime;
let lockTimeChecker = false;

//setting date and time on load
time();
day();

//updating time per 30 secs
setInterval(time, 30000);

//toggle display
button.addEventListener("click", whoIsOnDisplay);

// callback functions:
// time function
function time() {
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

//day function
function day() {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const date = new Date();
  dateP.innerHTML = days[date.getDay()] + ", " + date.getDate() + " " + months[date.getMonth()];
}

//whoIsOnDisplay callback
function whoIsOnDisplay() {
  home.classList.toggle("on-display");
  display.classList.toggle("on-display");
  audio.play();
  if (!lockTimeChecker) {
    lock = document.querySelector(".screen .screen-top div:nth-of-type(2) i");
    lock.outerHTML = timeP.outerHTML;
    lockTimeChecker = true;
  } else {
    unlockTime = document.querySelector(".screen .screen-top div:nth-of-type(2) p");
    unlockTime.outerHTML = lock.outerHTML;
    lockTimeChecker = false;
  }
}