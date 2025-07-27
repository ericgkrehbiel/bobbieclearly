// Observe when each slide reaches the center of the viewport
const slides = document.querySelectorAll('.text-slide');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    entry.target.classList.toggle('active', entry.isIntersecting);
  });
}, {
  threshold: 0.5
});

slides.forEach(slide => observer.observe(slide));
