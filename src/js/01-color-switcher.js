function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};
///////////////////////////////////////////////////
const bodyChange = document.querySelector('body');
const buttonStart = document.querySelector("button[data-start]");
const buttonStop = document.querySelector("button[data-stop]");
let timerId = null;
buttonStop.disabled = true;



buttonStart.addEventListener("click", colorChange);
buttonStop.addEventListener("click", colorChangeStop);

function colorChange() {
    timerId = setInterval(() => {
        bodyChange.style.backgroundColor = getRandomHexColor();
    }, 1000);
    changeButton(true);
};

function colorChangeStop() { 
    clearInterval(timerId);
    changeButton(false);
};

function changeButton(status) {
    buttonStart.disabled = status;
    buttonStop.disabled = !status;
};
