//===========================
//       DOM Variables
//===========================
import "../stylesheets/temp-converter.css";

const tempInput = document.querySelector('.temp-converter input[type=number]');
const tempFrom = document.querySelectorAll('.temp-converter input[name=from]');
const tempTo = document.querySelectorAll('.temp-converter input[name=to]');
const tempResult = document.querySelector('.temp-converter .temp-result p');
const allInputs = document.querySelectorAll('.temp-converter input')

//===========================
//      On Input Change
//===========================
allInputs.forEach(input => input.addEventListener('input', convertTemp));


//================================
//      Conversion Function 
//================================
function convertTemp() {

  // Conversion equations
  const tempConvertFC = Math.round(((tempInput.value - 32) * (5 / 9)) * 100) / 100;
  const tempConvertFK = Math.round((((tempInput.value - 32) * (5 / 9)) + 273.15) * 100) / 100;
  const tempConvertCF = Math.round(((tempInput.value * 1.8) + 32) * 100) / 100;
  const tempConvertCK = Math.round(((tempInput.value * 1) + 273.15) * 100) / 100;
  const tempConvertKF = Math.round((((tempInput.value - 273.15) * 1.8) + 32) * 100) / 100;
  const tempConvertKC = Math.round((tempInput.value - 273.15) * 100) / 100;

  // Checked units
  const isCheckedFrom = [...tempFrom].filter(button => button.checked);
  const isCheckedTo = [...tempTo].filter(button => button.checked);

  let result;

  // Logic to determine which buttons are checked and what display accordingly
  if (isCheckedFrom.length === 0) result = "Choose unit to convert from.";
  else if (isCheckedTo.length === 0) result = "Choose unit to convert to.";
  else if (isCheckedTo[0].dataset.unit === isCheckedFrom[0].dataset.unit) result = "Choose different units.";
  else {

    // if °F is checked 
    if (tempFrom[0].checked) {

      // Fahrenheit to Celsius 
      if (tempTo[1].checked) {
        result = `${tempInput.value}°F = ${tempConvertFC}°C`;


        // Fahrenheit to Kelvin  
      } else if (tempTo[2].checked) {
        result = `${tempInput.value}°F = ${tempConvertFK}K`;
      }
    }

    // if °C is checked 
    if (tempFrom[1].checked) {

      // Celsius to Fahrenheit 
      if (tempTo[0].checked) {
        result = `${tempInput.value}°C = ${tempConvertCF}°F`;

        // Celsius to Kelvin  
      } else if (tempTo[2].checked) {
        result = `${tempInput.value}°C = ${tempConvertCK}K`;
      }
    }

    // if °K is checked 
    if (tempFrom[2].checked) {

      // Kelvin to Fahrenheit  
      if (tempTo[0].checked) {
        result = `${tempInput.value}K = ${tempConvertKF}°F`;

        // Kelvin to Celsius 
      } else if (tempTo[1].checked) {
        result = `${tempInput.value}K = ${tempConvertKC}°C`;
      }
    }
  }
  tempResult.innerHTML = result;
}