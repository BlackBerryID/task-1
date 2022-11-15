const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');
let timer;

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {

  const displayTimeLeft = (seconds) => {    
    const hours = Math.floor(seconds / 3600);
    seconds = seconds % 3600;
    const minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;

    const timeToDisplay = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : '' }${seconds}`;
    timerEl.textContent = timeToDisplay;
  }

  return (seconds) => {
    clearInterval(timer);

    const now = Date.now();
    const futureTime = now + seconds * 1000;
    displayTimeLeft(seconds);
    
    timer = setInterval(() => {
      const secondsLeft = Math.round((futureTime - Date.now()) / 1000);

      if(secondsLeft < 0) {
        clearInterval(timer);
        return;
      }

      displayTimeLeft(secondsLeft);
    }, 1000)
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', (e) => {
  // Очистите input так, чтобы в значении
  // оставались только числа
  const matches = e.target.value.match(/\d+/g);
  e.target.value = matches ? e.target.value.match(/\d+/g).join('') : '';
});

buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value);

  animateTimer(seconds);

  inputEl.value = '';
});
