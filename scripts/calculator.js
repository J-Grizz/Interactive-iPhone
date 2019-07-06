let calculation = document.querySelector('.calc-display p');
const buttons = document.querySelectorAll('.buttons');

buttons.forEach(button => {
  button.addEventListener("click", () => {
    if (calculation.innerText === "0") calculation.innerText = "";
    if (button.innerText === "AC") {
      calculation.innerText = "0";
    } else if (button.innerText === "=") {
      calculation.innerText = eval(calculation.innerText);
    } else {
      calculation.innerText += button.innerText;
    }
  });
});;