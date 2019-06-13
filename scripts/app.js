//Selector Section
let timeP = document.querySelector(".screen .dtCont p:nth-of-type(1)");
let dateP = document.querySelector(".screen .dtCont p:nth-of-type(2)");
let display = document.querySelector(".screen .displayscreen");
let home = document.querySelector(".screen .homescreen");
let button = document.querySelector(".buttonin");
let audio = document.querySelector("audio");

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
  home.classList.toggle("onDisplay");
  display.classList.toggle("onDisplay");
  audio.play();
}