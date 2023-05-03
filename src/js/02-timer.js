import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      refs.btnStart.disabled = true;
    } else {
     refs. btnStart.disabled = false;
    }
  },
};

const refs = {
  groupEl:document.querySelectorAll('.field'),
  timeContainer :document.querySelector('.timer'),
  text: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]')
}
refs.btnStart.disabled = true

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
flatpickr(refs.text, options)
refs.btnStart.addEventListener('click', () => {
    let timer = setInterval(() => {
    let countdown = new Date(refs.text.value) - new Date();
    refs.btnStart.disabled = true;
    if (countdown >= 0) {
      let timeObject = convertMs(countdown);
      refs.days.textContent = addLeadingZero(timeObject.days);
      refs.hours.textContent = addLeadingZero(timeObject.hours);
      refs.minutes.textContent = addLeadingZero(timeObject.minutes);
      refs.seconds.textContent = addLeadingZero(timeObject.seconds);
      if (countdown <= 10000) {
        refs.timeContainer.style.color = 'red';
      }
    } else {
      Notiflix.Notify.success('Countdown finished');
      refs.timeContainer.style.color = 'black';
      clearInterval(timer);
    }
  }, 1000);
});
refs.timeContainer.style.display = "flex";
refs.timeContainer.style.gap = 24 + "px ";
refs.groupEl.forEach((el) => {
  el.style.display = 'flex';
  el.style.flexDirection = 'column';
})

