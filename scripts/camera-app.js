const camApp = document.querySelector('.camera-app');
const camVideo = document.querySelector(".camera-app .cam-video");
const camCanvas = document.querySelector(".camera-app .cam-canvas");
const ctx = camCanvas.getContext("2d");
const camPhotos = document.querySelector(".cam-photos");
const snap = document.querySelector(".snap");
const cameraApp = document.querySelector(".camera-app");
const cameraPics = document.querySelectorAll(".camera-app ");

function getCamVideo() {
  navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: false
    })
    .then(localMediaStream => {
      console.log(localMediaStream);
      camVideo.srcObject = localMediaStream;
      camVideo.play();
    })
    .catch(err => {
      camApp.classList.remove("on-display");
      display.classList.toggle("on-display");
      screen.style.backgroundImage = "url(/media/cute-cat-background.jpg)";
      screenState = "display-screen";
    });
}

function stopStreamedVideo(videoElem) {
  let stream = videoElem.srcObject;
  let tracks = stream.getTracks();

  tracks.forEach(function (track) {
    track.stop();
  });

  videoElem.srcObject = null;
}

function paintToCanvas() {
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

function takePhoto() {
  snap.currentTime = 0;
  snap.play();

  const data = camCanvas.toDataURL("image/jpeg");
  const link = document.createElement("a");
  link.href = data;
  link.setAttribute("download", "selfie");
  link.innerHTML = `<img src="${data}" alt="selfie" />`;
  camPhotos.insertBefore(link, camPhotos.firstChild);
}

// function redEffect(pixels) {
//   for (let i = 0; i < pixels.data.length; i += 4) {
//     pixels.data[i + 0] = pixels.data[i + 0] * 0.5; // RED
//     pixels.data[i + 1] = pixels.data[i + 1] - 20; // GREEN
//     pixels.data[i + 2] = pixels.data[i + 2] + 70; // Blue
//   }
//   return pixels;
// }

camVideo.addEventListener("canplay", paintToCanvas);