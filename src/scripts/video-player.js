//============================
//    Variables & Selectors
//============================
import "../stylesheets/video-player.css";

const player = document.querySelector(".video-player");
const video = player.querySelector(".video-player .viewer");
const progress = player.querySelector(".video-player .progress");
const progressBar = player.querySelector(".video-player .progress-filled");
const toggle = player.querySelector(".video-player .toggle");
const skipButtons = player.querySelectorAll(".video-player [data-skip]");
const volumeSlider = player.querySelector(".video-player .player-slider");
const phone = document.querySelector(".three-d");
const controls = document.querySelector(".video-player .player-controls");
const rotate = document.querySelector(".video-player .rotate");
const resize = document.querySelector(".video-player .resize");
const resizeIcon = document.querySelector(".video-player .resize i");
const screenstateController = document.querySelector(
  ".video-player .screenstate-buttons"
);
const screen = document.querySelector(".screen");

//========================
//      Listeners
//========================

//Controls the play state of the video
toggle.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);

// Controls skip buttons
skipButtons.forEach(button => button.addEventListener("click", skip));

// Controls volume slider
volumeSlider.addEventListener("change", slide);
volumeSlider.addEventListener("mousemove", slide);

// Controls video progress bar
let mousedown = false;
video.addEventListener("timeupdate", updateProgress);
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", e => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mousedown", () => (mousedown = false));

// Controls rotation state and button
let rotated = false;
rotate.addEventListener("click", changeRotationState);

// Controls scale state and button
let scaled = false;
resize.addEventListener("click", changeScaleState);

// Controls fade-in
screen.addEventListener("mouseover", () => {
  controls.style.opacity = "1";
  screenstateController.style.opacity = "1";
});

// controls fade-out
screen.addEventListener("mouseout", () => {
  controls.style.opacity = "";
  screenstateController.style.opacity = "";
});

//=====================
//      Callbacks
//=====================

// video controllers logic
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

// Rotation Logic
function changeRotationState() {
  !rotated ? rotateLandscape() : rotatePortrait();
}

function rotateLandscape() {
  phone.style.transform = "rotate(90deg)";
  controls.style.transform = "rotate(-90deg)";
  controls.style.top = "44%";
  controls.style.right = "-27%";
  player.style.position = "static";
  video.style.transform = "rotate(-90deg)";
  video.style.width = "180%";
  video.classList.add("video__on-to-landscape");
  video.classList.remove("video__on-to-portrait");
  screenstateController.style.transform = "rotate(-90deg)";
  screenstateController.style.top = "15%";
  screenstateController.style.right = "75%";
  rotated = true;
}

function rotatePortrait() {
  phone.style.transform = "";
  controls.style.transform = "";
  controls.style.top = "";
  controls.style.right = "";
  player.style.position = "";
  video.style.transform = "";
  video.style.width = "";
  video.classList.remove("video__on-to-landscape");
  video.classList.add("video__on-to-portrait");
  screenstateController.style.transform = "";
  screenstateController.style.top = "";
  screenstateController.style.right = "";
  rotated = false;
}

// Scale up/down Logic
function changeScaleState() {
  !scaled ? scaleUp() : scaleDown();
}

function scaleUp() {
  rotateLandscape();
  phone.style.transform = "rotate(90deg) scale(2.5)";
  resizeIcon.classList.remove("fa-arrows-alt");
  resizeIcon.classList.add("fa-compress-arrows-alt");
  rotated = true;
  scaled = true;
}

function scaleDown() {
  phone.style.transform = "rotate(90deg)";
  resizeIcon.classList.add("fa-arrows-alt");
  resizeIcon.classList.remove("fa-compress-arrows-alt");
  scaled = false;
}

export { player, video, rotatePortrait };
