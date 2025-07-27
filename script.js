// manual per‑section scroll
const texts = document.querySelectorAll('.text');

function onScroll() {
  const scrollY = window.scrollY;
  const vh = window.innerHeight;

  texts.forEach((el, i) => {
    const start = vh * i;
    const end   = start + vh;

    if (scrollY >= start && scrollY < end) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', onScroll);
// trigger initially
onScroll();
