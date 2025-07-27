gsap.registerPlugin(ScrollTrigger);

const lines = gsap.utils.toArray('.line');
const duration = 1;            // seconds for each in/out
const spacing = 100;           // pixels per second to map scrubbing
const totalScroll = (duration * 2) * lines.length * spacing;

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: `+=${totalScroll}`,
    pin: true,
    scrub: true,
  }
});

lines.forEach((el) => {
  tl.fromTo(el,
    { opacity: 0, scale: 1 },
    { opacity: 1, scale: 1.5, duration, ease: 'power1.inOut' }
  )
  .to(el,
    { opacity: 0, scale: 2, duration, ease: 'power1.inOut' },
    `+=0`
  );
});
