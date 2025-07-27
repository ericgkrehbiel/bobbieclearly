const slides = [
  'First line of text', 'Second line of text', 'Third line of text',
  'Fourth line of text', 'Fifth line of text', 'Sixth line of text',
  'Seventh line of text'
];
const scene = document.querySelector('.scene');
const textEl = document.querySelector('.text-fixed');
const total = slides.length;

// set scene height
scene.style.height = `${total * window.innerHeight}px`;
console.log('Scene height:', scene.style.height);

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  const h = window.innerHeight;
  const idx = Math.floor(y / h);
  const prog = (y % h) / h;
  console.log('scrollY', y, 'idx', idx, 'prog', prog.toFixed(2));

  if(idx >= 0 && idx < total) {
    textEl.textContent = slides[idx];
    // scale 0.5 → 1.2
    const scale = 0.5 + (1.2 - 0.5) * prog;
    // fade in/out over 20%
    let opacity = 1;
    if(prog < 0.2) opacity = prog / 0.2;
    else if(prog > 0.8) opacity = (1 - prog) / 0.2;

    textEl.style.transform = `translate(-50%,-50%) scale(${scale.toFixed(2)})`;
    textEl.style.opacity = opacity.toFixed(2);
  } else {
    textEl.style.opacity = 0;
  }
});

// initial call
window.dispatchEvent(new Event('scroll'));

window.addEventListener('scroll', onScroll);
onScroll();
