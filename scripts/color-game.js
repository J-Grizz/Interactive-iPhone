//getting all DOM
let squares = document.querySelectorAll(".color-game .square");
let newColors = document.querySelector(".color-game #refresh");
let background = document.querySelector(".color-game header");
let message = document.querySelector(".color-game #message");
let guess = document.querySelector(".color-game header h1");
let modes = document.querySelectorAll(".color-game .mode");
//defining other variables
const backgroundGradient = "linear-gradient(137.9deg, rgba(78, 156, 226, 1) 7.8%, rgba(62, 146, 69, 1) 16%, rgba(251, 220, 23, 1) 32.7%, rgba(242, 160, 35, 1) 50.4%, rgba(253, 12, 12, 1) 71.5%, rgba(192, 26, 129, 1) 83.1%)";
let numSqures = 6;
let colors = [];
let toGuess;

//setting the color to guess
guess.textContent = toGuess;

//reset listener:
newColors.addEventListener("click", reset);

init();

function init() {
  //mode listeners
  modes.forEach(mode => mode.addEventListener("click", modeSetUp));
  squares.forEach(square => square.addEventListener("click", playGame));
  reset();
}

function modeSetUp() {
  modes.forEach(mode => mode.classList.remove("selected"));
  this.classList.add("selected");
  numSqures = this.dataset.squares;
  reset();
}

//game engine
function playGame() {
  var guessed = this.style.backgroundColor;
  if (guessed === toGuess) {
    squares.forEach(square => square.style.backgroundColor = toGuess);
    background.style.background = toGuess;
    newColors.textContent = "Play Again?"
    message.textContent = "Correct!";
  } else {
    this.style.backgroundColor = "#111111";
    message.textContent = "Try Again";
  }
}

//generates a random number
function pickColor() {
  var random = Math.floor(Math.random() * colors.length);
  return (random);
};

//random RGB color function
function randomColor() {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  return ("rgb(" + r + ", " + g + ", " + b + ")");
};

//generate an array of random colors
function generateRandomColors(num) {
  var arr = [];
  for (var x = 0; x < num; x++) {
    arr.push(randomColor());
  };
  return (arr);
};

//reset function
function reset() {
  colors = generateRandomColors(numSqures);
  toGuess = colors[pickColor()];
  guess.textContent = toGuess;
  newColors.textContent = "New Colors";
  message.textContent = "";
  background.style.background = backgroundGradient;
  for (var x = 0; x < squares.length; x++) {
    if (colors[x]) {
      squares[x].style.display = "block";
      squares[x].style.backgroundColor = colors[x];
    } else {
      squares[x].style.display = "none"
    };
  };
};