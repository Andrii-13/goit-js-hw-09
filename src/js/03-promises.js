import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');

formEl.addEventListener('click', handlerForm);

let firstDelay;
let delayStep;
let amountEl;

function handlerForm(e) {
  e.preventDefault();
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }
  const { delay, step, amount } = e.currentTarget.elements;
  firstDelay = Number(delay.value);
  delayStep = Number(step.value);
  amountEl = Number(amount.value);
  for (let i = 1; i <= amountEl; i += 1) {
    createPromise(i, firstDelay + delayStep * (i - 1))
      .then(value => Notiflix.Notify.success(value))
      .catch(value => Notiflix.Notify.failure(value));
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}
