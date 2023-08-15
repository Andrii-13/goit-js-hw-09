const body = document.querySelector('body');
let bgc;
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

body.addEventListener('click', handlerOnBtn);

function handlerOnBtn(e) {
  const currentDisabledBtn = document.querySelector('[disabled]');

  if (currentDisabledBtn) {
    currentDisabledBtn.removeAttribute('disabled');
  }
  e.target.setAttribute('disabled', 'disabled');
  if (e.target.hasAttribute('data-start')) {
    bgc = setInterval(() => {
      body.style.backgroundColor = `${getRandomHexColor()}`;
    }, 1000);
  }
  if (e.target.hasAttribute('data-stop')) {
    clearInterval(bgc);
  }
}
