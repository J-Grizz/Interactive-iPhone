// Get Elements
const player = document.querySelector(".video-player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const sliders = player.querySelectorAll(".player__slider");

// Build FUnctions

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

//hook up event listeners
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