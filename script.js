console.log('script.js loaded, initializing observer');

const slides = document.querySelectorAll('.text-slide');
if (!slides.length) console.error('No slides found! Check your HTML.');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    entry.target.classList.toggle('active', entry.isIntersecting);
    console.log(`Slide "${entry.target.textContent}" intersecting:`, entry.isIntersecting);
  });
}, {
  threshold: 0.5
});

slides.forEach(slide => {
  observer.observe(slide);
  console.log('Observing slide:', slide.textContent);
});
