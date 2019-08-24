const tempInput = document.querySelector('.temp-converter input[type=number]');
const tempFrom = document.querySelectorAll('.temp-converter input[name=from]');
const tempTo = document.querySelectorAll('.temp-converter input[name=to]');
const tempResult = document.querySelector('.temp-converter .temp-result');


tempInput.value = 0;

function convertTemp() {
  let tempConvertFC = Math.round(((tempInput.value - 32) * (5 / 9)) * 100) / 100;
  let tempConvertFK = Math.round((((tempInput.value - 32) * (5 / 9)) + 273.15) * 100) / 100;
  let tempConvertCF = Math.round(((tempInput.value * 1.8) + 32) * 100) / 100;
  let tempConvertCK = Math.round(((tempInput.value * 1) + 273.15) * 100) / 100;
  let tempConvertKF = Math.round((((tempInput.value - 273.15) * 1.8) + 32) * 100) / 100;
  let tempConvertKC = Math.round((tempInput.value - 273.15) * 100) / 100;
  const isCheckedFrom = [...tempFrom].every(button => !button.checked);
  const isCheckedTo = [...tempTo].every(button => !button.checked);
  let result;

  if (isCheckedFrom) result = "Please choose unit to convert from";
  else if (isCheckedTo) result = "Please choose unit to convert to";
  else {
    if (tempFrom[0].checked) {
      if (tempTo[1].checked) {
        result = `${tempInput.value}°F = ${tempConvertFC}°C`;
      } else if (tempTo[2].checked) {
        result = `${tempInput.value}°F = ${tempConvertFK}K`;
      } else {
        result = "Don't be silly, choose a different unit!";
      }
    }

    if (tempFrom[1].checked) {
      if (tempTo[0].checked) {
        result = `${tempInput.value}°C = ${tempConvertCF}°F`;
      } else if (tempTo[2].checked) {
        result = `${tempInput.value}°C = ${tempConvertCK}K`;
      } else {
        result = "Don't be silly, choose a different unit!";
      }
    }

    if (tempFrom[2].checked) {
      if (tempTo[0].checked) {
        result = `${tempInput.value}K = ${tempConvertKF}°F`;
      } else if (tempTo[1].checked) {
        result = `${tempInput.value}K = ${tempConvertKC}°C`;
      } else {
        result = "Don't be silly, choose a different unit!";
      }
    }
  }
  tempResult.innerHTML = result;
}