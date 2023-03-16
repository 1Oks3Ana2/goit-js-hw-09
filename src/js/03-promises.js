import Notiflix from 'notiflix';

const formRef = document.querySelector('.form');

formRef.addEventListener('submit', e => {
  e.preventDefault();

  const delay = Number(formRef.elements.delay.value);
  const step = Number(formRef.elements.step.value);
  const amount = Number(formRef.elements.amount.value);

  let position = 0;
  let promiseDelay = delay;

  for (let i = 1; i <= amount; i += 1) {
    position += 1;

    if (position === 1) {
      promiseDelay = delay;
    }
    promiseDelay += step;

    createPromise(position, promiseDelay)
      .then(result => result)
      .catch(error => error);
  }
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        return resolve(
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          )
        );
      }
      return reject(
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
      );
    }, delay);
  });
}
