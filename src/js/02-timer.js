import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
// import'notiflix/dist/notiflix-3.2.6.min.css';

import Notiflix from 'notiflix';

const refs = {
  inputEl: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let timeInNumberDifference;
if (!timeInNumberDifference) {
  refs.btnStart.setAttribute('disabled', 'disabled');
}

const options = {
  enableTime: true, // показуе час в інпуті
  time_24hr: true, // 24 годинний
  defaultDate: new Date(), // встановлюється поточна дата
  minuteIncrement: 1,

  onClose(selectedDates) {      // onClose запускається, коли календар закрито
    const choisedDate = Date.parse(flatpickrEl.selectedDates[0]);
    const currentDate = Date.parse(options.defaultDate);

    timeInNumberDifference = choisedDate - currentDate; // різниця дат в мілісекундах

    if (timeInNumberDifference < 0) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      refs.btnStart.removeAttribute('disabled');
    }

    refs.btnStart.addEventListener('click', handlerOnBtn);
  },
};

const flatpickrEl = flatpickr(refs.inputEl, options);

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
}

function watch(time) {
  writeDate(time);
  const timer = setInterval(() => {
    time -= 1000;
    writeDate(time);
    if (time === 0) {
      clearInterval(timer);
      Notiflix.Notify.success('Time is up');
    }
  }, 1000);
}

function handlerOnBtn(e) {
  e.target.setAttribute('disabled', 'disabled');
  refs.inputEl.setAttribute('disabled', 'disabled');

  watch(timeInNumberDifference);
}

function writeDate (time){
  const { days, hours, minutes, seconds } = convertMs(time);
    refs.days.innerHTML = addLeadingZero(days);
    refs.hours.innerHTML =  addLeadingZero(hours);
    refs.minutes.innerHTML =  addLeadingZero(minutes);
    refs.seconds.innerHTML =  addLeadingZero(seconds);
}

function addLeadingZero(value){
 return  `${value}`.padStart(2, '0');
}