const slides = [
  'First line of text',
  'Second line of text',
  'Third line of text',
  'Fourth line of text',
  'Fifth line of text',
  'Sixth line of text',
  'Seventh line of text'
];

const scene = document.querySelector('.scene');
const textEl = document.querySelector('.text-fixed');
const total = slides.length;

// make the scene tall enough so each slide occupies one viewport height
scene.style.height = `${total * window.innerHeight}px`;

function onScroll() {
  const y = window.scrollY;
  const h = window.innerHeight;

  const idx = Math.floor(y / h);
  const prog = (y % h) / h;

  if (idx >= 0 && idx < total) {
    textEl.textContent = slides[idx];

    const scale = 0.5 + (1.2 - 0.5) * prog;

    let opacity = 1;
    if (prog < 0.2) opacity = prog / 0.2;
    else if (prog > 0.8) opacity = (1 - prog) / 0.2;

    textEl.style.transform = `translate(-50%, -50%) scale(${scale.toFixed(2)})`;
    textEl.style.opacity = opacity.toFixed(2);
  } else {
    textEl.style.opacity = 0;
  }
}

window.addEventListener('scroll', onScroll);
window.dispatchEvent(new Event('scroll'));
