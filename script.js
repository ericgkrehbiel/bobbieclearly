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

// set scene height
function resizeScene(){
  scene.style.height = `${total * window.innerHeight}px`;
  console.log('Scene height set to', scene.style.height);
}
window.addEventListener('resize', resizeScene);
resizeScene();

function onScroll(){
  const y = window.scrollY;
  const h = window.innerHeight;
  const idx = Math.floor(y / h);
  const prog = ((y % h) / h);

  console.log(`scrollY=${y.toFixed(0)} idx=${idx} prog=${prog.toFixed(2)}`);

  if(idx >= 0 && idx < total){
    textEl.textContent = slides[idx];

    // scale 0.5 → 1.2
    const scale = 0.5 + (1.2 - 0.5) * prog;
    // translateZ −200 → 0
    const tz = -200 + 200 * prog;

    // fade thresholds
    const fadeInEnd = 0.1;
    const fadeOutStart = 0.9;
    let opacity;
    if(prog < fadeInEnd)       opacity = prog / fadeInEnd;
    else if(prog > fadeOutStart) opacity = (1 - prog) / (1 - fadeOutStart);
    else                        opacity = 1;

    textEl.style.transform =
      `translate(-50%,-50%) translateZ(${tz}px) scale(${scale})`;
    textEl.style.opacity = opacity.toFixed(3);
  } else {
    textEl.style.opacity = 0;
  }
}

window.addEventListener('scroll', onScroll);
onScroll();

window.addEventListener('scroll', onScroll);
onScroll();
