// script.js

gsap.registerPlugin(ScrollTrigger);

const lines = gsap.utils.toArray('.line');
const duration = 1;        // seconds per animation segment
const spacing = 700;       // pixels-per-second scaling for scrub (↑ increase to slow further)

// Calculate how many segments in the timeline:
//  - the first line only has a fade‑out (1 segment)
//  - each of the other lines has fade‑in + fade‑out (2 segments each)
const totalSegments = 1 + (lines.length - 1) * 2;
const totalScroll = totalSegments * duration * spacing;

// 1) Set the first line visible & zoomed in on load:
gsap.set(lines[0], {
  opacity: 1,
  scale: 1.5
});

// 2) Build the timeline driven by scroll:
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: `+=${totalScroll}`,
    pin: true,
    scrub: true,
  }
});

// 3) Add tweens:
//   - First line: only fade‑out & zoom‑out
//   - Others: fade‑in/zoom‑in then fade‑out/zoom‑out
lines.forEach((el, i) => {
  if (i === 0) {
    // Fade out from scale 1.5 → 2
    tl.to(el, {
      opacity: 0,
      scale: 2,
      duration,
      ease: 'power1.inOut'
    });
  } else {
    // Fade in from scale 1 → 1.5
    tl.fromTo(el,
      { opacity: 0, scale: 1 },
      { opacity: 1, scale: 1.5, duration, ease: 'power1.inOut' }
    )
    // Then fade out from scale 1.5 → 2
    .to(el,
      { opacity: 0, scale: 2, duration, ease: 'power1.inOut' },
      '+=0'
    );
  }
});
