const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

let intervalId = null;

refs.startBtn.addEventListener('click', () => {
  switchToStopBtn();
  intervalId = setInterval(setBodyColor, 1000);
});

refs.stopBtn.addEventListener('click', () => {
  switchToStartBtn();
  clearInterval(intervalId);
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function setBodyColor() {
  refs.body.style.backgroundColor = getRandomHexColor();
}

function switchToStopBtn() {
  refs.startBtn.setAttribute('disabled', 'true');
  refs.stopBtn.removeAttribute('disabled');
}

function switchToStartBtn() {
  refs.startBtn.removeAttribute('disabled');
  refs.stopBtn.setAttribute('disabled', 'true');
}
