// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
// all modules
import Notiflix from 'notiflix';


const buttonTime = document.querySelector('button[data-start]');
const inputTime = document.querySelector('input#datetime-picker');
const daysT = document.querySelector('[data-days]');
const hoursT = document.querySelector('[data-hours]');
const minT = document.querySelector('[data-minutes]');
const secT = document.querySelector('[data-seconds]');

let timerCountdown = 0;
let timerId = null;
let timerMs = null;
buttonTime.disabled = true;


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose([selectedDates]) {
       if (selectedDates <= new Date()) {
         Notiflix.Notify.failure('Please choose a date in the future');
    }
    else {
       buttonTime.disabled = false; 
    } 
  },
};

const dataStart = flatpickr(inputTime, options);

buttonTime.addEventListener('click', setTimer);
 
//////////////////////////////////////
function setTimer() { 
  timerId = setInterval(() =>{
    timerCountdown = dataStart.selectedDates[0];   
    timerMs = timerCountdown - Date.now();

    if (timerMs < 0) {
    clearInterval(timerId);
    return;
    };

    const { days, hours, minutes, seconds } = convertMs(timerMs);   
    changingTime(days,hours,minutes,seconds)   
  },1000 
  );
  buttonTime.disabled = true;
};



////////////////////////////////////////////////////
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};
/////////////////////////////////////

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

//////////////////////////////////////////////////
function changingTime(days,hours,minutes,seconds) {
  daysT.textContent = addLeadingZero(days) ;
  hoursT.textContent = addLeadingZero(hours);
  minT.textContent = addLeadingZero(minutes);
  secT.textContent = addLeadingZero(seconds);
};


