import Notiflix from 'notiflix';


const form = document.querySelector('.form');
const formElem = form.elements;

form.addEventListener('submit', promiseSubmit);




function promiseSubmit(evt) {
  evt.preventDefault();

  const amount = +formElem.amount.value;
const step = +formElem.step.value;
let delay = +formElem.delay.value;

  for (let i = 1; i <= amount; i++) {
    if (i > 1) {
      delay += step;
    }
  createPromise(i, delay)
  .then(({ position, delay }) => {
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
  }
}


function createPromise(position, delay) {
   const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {  
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}