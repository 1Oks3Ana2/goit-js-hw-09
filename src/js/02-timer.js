import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  dateInput: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  daysInp: document.querySelector('[data-days]'),
  hoursInp: document.querySelector('[data-hours]'),
  minsInp: document.querySelector('[data-minutes]'),
  secsInp: document.querySelector('[data-seconds]'),
};

const styleRefs = {
  timerContainer: document.querySelector('.timer'),
  fieldContainer: document.querySelectorAll('.field'),
  valueNumber: document.querySelectorAll('.value'),
  valueLabel: document.querySelectorAll('.label'),
};

refs.startBtn.disabled = true;

let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    const currentDate = new Date();
    const chosenDate = selectedDates[0];

    if (chosenDate.getTime() < currentDate.getTime()) {
      refs.startBtn.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');

      return;
    }

    refs.startBtn.disabled = false;
    refs.startBtn.addEventListener('click', () => {
      displayTimerValue(selectedDates[0]);
    });
  },
};

flatpickr(refs.dateInput, options);

function displayTimerValue(selectedTime) {
  const timer = {
    start() {
      refs.startBtn.disabled = true;
      refs.dateInput.disabled = true;

      const chosenDate = selectedTime;
      timerId = this.setTimer(chosenDate);
    },
    setTimer(date) {
      setInterval(() => {
        const currentDate = new Date();

        let deltaTime = date.getTime() - currentDate.getTime();

        this.setCountdownRange(deltaTime);
      }, 1000);
    },
    setCountdownRange(timeRange) {
      if (timeRange >= 0) {
        const { days, hours, minutes, seconds } = this.convertMs(timeRange);

        refs.daysInp.textContent = days;
        refs.hoursInp.textContent = hours;
        refs.minsInp.textContent = minutes;
        refs.secsInp.textContent = seconds;
      } else {
        clearInterval(timerId);
        refs.dateInput.disabled = false;
      }
    },
    convertMs(ms) {
      // Number of milliseconds per unit of time
      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;

      // Remaining days
      const days = this.addLeadingZero(Math.floor(ms / day));
      // Remaining hours
      const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
      // Remaining minutes
      const minutes = this.addLeadingZero(
        Math.floor(((ms % day) % hour) / minute)
      );
      // Remaining seconds
      const seconds = this.addLeadingZero(
        Math.floor((((ms % day) % hour) % minute) / second)
      );

      return { days, hours, minutes, seconds };
      //   console.log({ days, hours, minutes, seconds });
    },
    addLeadingZero(value) {
      return String(value).padStart(2, '0');
    },
  };

  timer.start();
}

styleRefs.timerContainer.style.display = 'flex';
styleRefs.timerContainer.style.gap = '40px';
styleRefs.timerContainer.style.marginTop = '20px';
styleRefs.timerContainer.style.width = '300px';

[...styleRefs.fieldContainer].map(item => {
  item.style.display = 'flex';
  item.style.flexWrap = 'wrap';
  item.style.justifyContent = 'space-around';
  item.style.fontSize = '14px';
  item.style.textTransform = 'uppercase';
});

[...styleRefs.valueNumber].map(num => {
  num.style.fontSize = '30px';
});

refs.dateInput.style.paddingLeft = '7px';
refs.dateInput.style.width = '250px';
refs.dateInput.style.height = '30px';
refs.dateInput.style.fontSize = '16px';

refs.startBtn.style.marginLeft = '5px';
refs.startBtn.style.width = '70px';
refs.startBtn.style.height = '30px';
refs.startBtn.style.fontSize = '16px';
