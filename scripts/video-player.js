//============================
//    Variables & Selectors
//============================
const player = document.querySelector(".video-player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress-filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const sliders = player.querySelectorAll(".player-slider");

const phone = document.querySelector(".three-d");
const controls = document.querySelector(".player-controls");
const videoPlayer = document.querySelector(".video-player");
const rotate = document.querySelector(".rotate");
const resize = document.querySelector(".resize");
const resizeIcon = document.querySelector(".resize i");
const screenstateController = document.querySelector(".screenstate-buttons");

//========================
//      Listeners
//========================
toggle.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);

skipButtons.forEach(button => button.addEventListener("click", skip));
sliders.forEach(slider => slider.addEventListener("change", slide));
sliders.forEach(slider => slider.addEventListener("mousemove", slide));

let mousedown = false;
video.addEventListener("timeupdate", updateProgress);
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", e => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mousedown", () => (mousedown = false));

let rotated = false;
rotate.addEventListener("click", rotationSate);
let scaled = false;
resize.addEventListener("click", scaleState);

screen.addEventListener("mouseover", () => {
  controls.style.opacity = "1";
  screenstateController.style.opacity = "1";
});

screen.addEventListener("mouseout", () => {
  controls.style.opacity = "";
  screenstateController.style.opacity = "";
});

//=====================
//      Callbacks
//=====================
function togglePlay() {
  video.paused ? video.play() : video.pause();
}

function updateButton() {
  toggle.innerText = this.paused ? "►" : "▌▌";
}

function skip() {
  video.currentTime += parseInt(this.dataset.skip);
}

function slide() {
  video[this.name] = this.value;
}

function updateProgress() {
  const percent = (video.currentTime / video.duration) * 100 + "%";
  progressBar.style.flexBasis = percent;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function rotationSate() {
  if (rotated === false) {
    rotateBig();
    rotated = true;
  } else {
    rotateSmall();
    rotated = false;
  }
}

function rotateBig() {
  phone.style.transform = "rotate(-90deg)";
  controls.style.transform = "rotate(90deg)";
  controls.style.top = "44%";
  controls.style.right = "37%";
  videoPlayer.style.position = "static";
  video.style.transform = "rotate(90deg)";
  video.style.width = "180%";
  screenstateController.style.transform = "rotate(90deg)";
  screenstateController.style.top = "77%";
}

function rotateSmall() {
  phone.style.transform = "";
  controls.style.transform = "";
  controls.style.top = "";
  controls.style.right = "";
  videoPlayer.style.position = "";
  video.style.transform = "";
  video.style.width = "";
  screenstateController.style.transform = "";
  screenstateController.style.top = "";
}

function scaleState() {
  if (scaled === false) {
    scaleUp();
  } else {
    scaleDown();
  }
}

function scaleUp() {
  rotateBig();
  phone.style.transform = "rotate(-90deg) scale(2.5)";
  resizeIcon.classList.remove("fa-arrows-alt");
  resizeIcon.classList.add("fa-compress-arrows-alt");
  rotated = true;
  scaled = true;
}

function scaleDown() {
  phone.style.transform = "rotate(-90deg)";
  resizeIcon.classList.add("fa-arrows-alt");
  resizeIcon.classList.remove("fa-compress-arrows-alt");
  scaled = false;
}
