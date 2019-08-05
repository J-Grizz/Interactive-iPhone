const tempInput = document.querySelector('.temp-converter input[type=number]');
const tempFrom = document.querySelectorAll('.temp-converter input[name=from]');
const tempTo = document.querySelectorAll('.temp-converter input[name=to]');

if (tempFrom[0].checked) {
  if (tempTo[1].checked) {
    console.log("F to C");
  } else if (tempTo[2].checked) {
    console.log("F to K");
  } else {
    console.log("error");
  }
}

if (tempFrom[1].checked) {
  if (tempTo[0].checked) {
    console.log("C to F");
  } else if (tempTo[2].checked) {
    console.log("C to K");
  } else {
    console.log("error");
  }
}

if (tempFrom[2].checked) {
  if (tempTo[0].checked) {
    console.log("K to F");
  } else if (tempTo[1].checked) {
    console.log("K to C");
  } else {
    console.log("error");
  }
}