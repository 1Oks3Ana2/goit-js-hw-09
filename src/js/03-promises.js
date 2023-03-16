import Notiflix from 'notiflix';

// const refs = {
//   form: document.querySelector('.form'),
//   submitBtn: document.querySelector('[type="submit"]'),
//   firstDelayInput: document.querySelector('[name="delay"]'),
//   stepInput: document.querySelector('[name="step"]'),
//   amountInput: document.querySelector('[name="amount"]'),
// };

const formRef = document.querySelector('.form');

formRef.addEventListener('submit', e => {
  e.preventDefault();

  // console.log(formRef.elements);

  const delay = Number(formRef.elements.delay.value);
  const step = Number(formRef.elements.step.value);
  const amount = Number(formRef.elements.amount.value);

  let position = 0;
  let promiseDelay = delay;

  for (let i = 1; i <= amount; i += 1) {
    position += i;

    promiseDelay += step;

    createPromise(position, promiseDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
        // Notiflix.Notify.success(
        //   `✅ Fulfilled promise ${position} in ${delay}ms`
        // )
        // const promiseData = {};
      }
      reject({ position, delay });
      // Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
    }, delay);
  });
}
