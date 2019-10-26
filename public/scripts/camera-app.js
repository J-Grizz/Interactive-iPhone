//============================
//    Variables & Selectors
//============================
import { display, screen, screenState } from "./phone";
const camApp = document.querySelector('.camera-app');
const camVideo = document.querySelector(".camera-app .cam-video");
const camCanvas = document.querySelector(".camera-app .cam-canvas");
const ctx = camCanvas.getContext("2d");
const camPhotos = document.querySelector(".cam-photos");
const snap = document.querySelector(".snap");
const cameraApp = document.querySelector(".camera-app");
const camIcon = document.querySelector("#camera-icon")
const photoButton = document.querySelector(".camera-app .photo-button")

//========================
//      Listeners
//========================

camIcon.addEventListener("click", getCamVideo);
//Checks if media has been successfully been acquired and prints to canvas
camVideo.addEventListener("canplay", paintToCanvas);

photoButton.addEventListener("click", takePhoto);

//=====================
//      Callbacks
//=====================
// Handles accessing the webcam and what to do if webcam cannot be accessed 
function getCamVideo() {
  //Attempt to get access
  navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: false
    })
    // If success then start recording 
    .then(localMediaStream => {
      console.log(localMediaStream);
      camVideo.srcObject = localMediaStream;
      camVideo.play();
    })
    // If fail, alert and close the app
    .catch(err => {
      alert("Please turn on and allow WebCam before trying to use camera app")
      camApp.classList.remove("on-display");
      display.classList.toggle("on-display");
      screen.style.backgroundImage = "url(/public/media/cute-cat-background.jpg)";
      screenState = "home-screen";
    });
}

// Handles stopping the video stream (Used in phone.js)
function stopStreamedVideo(videoElem) {
  let stream = videoElem.srcObject;
  let tracks = stream.getTracks();

  tracks.forEach(function (track) {
    track.stop();
  });
  videoElem.srcObject = null;
}

// Handles painting the video to the canvas
function paintToCanvas() {
  // sets dimensions of canvas based off dimensions of video
  const width = camVideo.videoWidth;
  const height = camVideo.videoHeight;
  camCanvas.width = width;
  camCanvas.height = height;
  setInterval(() => {
    //draw camVideo to camCanvas
    ctx.drawImage(camVideo, 0, 0, width, height);
    //get pixels from camCanvas (left, top, right, bottom)
    let pixels = ctx.getImageData(0, 0, width, height);
    //add effect to pixels
    // pixels = redEffect(pixels);
    //put pixels back into camCanvas
    ctx.putImageData(pixels, 0, 0);
  }, 50);
}

// Handles taking photo and creating link to download photo
function takePhoto() {
  snap.currentTime = 0;
  snap.play();

  const data = camCanvas.toDataURL("image/jpeg");
  const link = document.createElement("a");
  link.href = data;
  link.className = "cam-image";
  link.setAttribute("download", "selfie");
  link.innerHTML = `<img src="${data}" alt="selfie" />`;
  camPhotos.insertBefore(link, camPhotos.firstChild);
}

//Effects and filters coming soon!

// function redEffect(pixels) {
//   for (let i = 0; i < pixels.data.length; i += 4) {
//     pixels.data[i + 0] = pixels.data[i + 0] * 0.5; // RED
//     pixels.data[i + 1] = pixels.data[i + 1] - 20; // GREEN
//     pixels.data[i + 2] = pixels.data[i + 2] + 70; // Blue
//   }
//   return pixels;
// }

export { cameraApp, stopStreamedVideo, camVideo };