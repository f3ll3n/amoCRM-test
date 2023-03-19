const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');
const errorMessage = document.querySelector('p');
const timeOutEl = document.getElementById('timeOut')
// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
let firstStep = 0;
let timeoutValue = 0;

//Рекурсивная функция с проверкой на соответствие с input value
const createTimerAnimator = (sec, currValue) => {
  //Здесь можно поменять шаг таймера
  if(currValue < sec){
    setTimeout(() => {
      currValue++;
      timerEl.innerHTML = timeFormatter(currValue);
      createTimerAnimator(sec, currValue);
    }, 1000)
  }
  else{
    console.log('ready');
    buttonEl.disabled = false;
    timerEl.style.color = '#00D678'
  }
};

//Функция, форматирующая значение часов, секунд и минут для вывода значения в document
const timeFormatter = (value) => {
  let seconds = value;
  let minutes = Math.floor(value / 60);
  let hours = Math.floor(minutes / 60);
  seconds >= 60 ? seconds = seconds - (minutes * 60) : seconds = seconds;
  minutes >= 60 ? minutes = minutes - (hours * 60) : minutes = minutes;
  seconds < 10 ? seconds = '0' + seconds : seconds = seconds; 
  minutes < 10 ? minutes = '0' + minutes : minutes = minutes; 
  hours < 10 ? hours = '0' + hours : hours = hours; 
  return [hours, minutes, seconds].join(':');
}

//Функция вызывающая createTimerAnimator с исходным значением
const animateTimer = (sec) => {
  timerEl.innerHTML = '00:00:00';
  createTimerAnimator(sec, firstStep)
};

//Слушатель событий, вызывающий функцию, проверающую на корректность input, в противном случае выводящая ошибку
inputEl.addEventListener('input', () => {
  if(inputEl.value !== inputEl.value.replace(/\D/g,'')){
    errorMessage.innerHTML = 'Invalid value';
    timeoutValue = false;
  }
  else{
    errorMessage.innerHTML = ''
    timeoutValue = inputEl.value;
  }
});
//Слушатель событий, вызывающий функцию, которая забирает значение input, запускает таймер, выводит ошибки.
buttonEl.addEventListener('click', () => { 
  buttonEl.disabled = true;
  if(timeoutValue > 0){
    timerEl.style.color = '#000'
    const seconds = timeoutValue;
    timeOutEl.innerHTML = timeFormatter(seconds);
    animateTimer(seconds);
    inputEl.value = '';
  }
  else if(timeoutValue == 0){
    errorMessage.innerHTML = 'Value must be greater than 0';
  }
  else{
    errorMessage.innerHTML = 'Enter correct value, Example: 50';
  }
});
