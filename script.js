// your 7 lines here (replace with your actual text)
const slides = [
  'First line of text',
  'Second line of text',
  'Third line of text',
  'Fourth line of text',
  'Fifth line of text',
  'Sixth line of text',
  'Seventh line of text',
];

const scene = document.querySelector('.scene');
const textEl = document.querySelector('.text-fixed');
const total = slides.length;

// give the page enough scroll space: N slides × 100vh
function resizeScene() {
  scene.style.height = `${total * window.innerHeight}px`;
}
window.addEventListener('resize', resizeScene);
resizeScene();

function onScroll() {
  const y = window.scrollY;
  const h = window.innerHeight;
  const idx = Math.floor(y / h);
  const prog = ((y % h) / h);

  if (idx >= 0 && idx < total) {
    // swap in the correct line
    textEl.textContent = slides[idx];

    // scale from 0.5 → 1.2
    const scale = 0.5 + (1.2 - 0.5) * prog;

    // opacity: fade in over first 20%, fade out last 20%
    let opacity = 1;
    if (prog < 0.2)       opacity = prog / 0.2;
    else if (prog > 0.8)  opacity = (1 - prog) / 0.2;

    textEl.style.transform = 
      `translate(-50%, -50%) translateZ(${-200 + 200 * prog}px) scale(${scale})`;
    textEl.style.opacity = opacity;
  } else {
    // off‑bounds: hide
    textEl.style.opacity = 0;
  }
}

window.addEventListener('scroll', onScroll);
onScroll();
