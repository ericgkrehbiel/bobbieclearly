// script.js
gsap.registerPlugin(ScrollTrigger);

window.addEventListener('load', () => {
  const heroDuration = 1;     // seconds per in/out
  const heroSpacing  = 400;   // px per second of scrub

  // helper to wire up a "hero" section
  function setupHero(selector) {
    const lines    = gsap.utils.toArray(`${selector} .line`);
    const segments = 1 + (lines.length - 1) * 2;      // first line only has fade‑out, others have in+out
    const totalScroll = segments * heroDuration * heroSpacing;

    // make the first line visible & scaled on load
    gsap.set(lines[0], { opacity: 1, scale: 1.5 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: selector,
        start:   'top top',
        end:     () => `+=${totalScroll}`,
        pin:     true,
        scrub:   true,
        invalidateOnRefresh: true,
        markers: false   // turn on for debugging if you like
      }
    });

    lines.forEach((el, i) => {
      if (i === 0) {
        // only fade‑out & zoom‑out
        tl.to(el, {
          opacity: 0,
          scale:   2,
          duration: heroDuration,
          ease:    'power1.inOut'
        });
      } else {
        // fade‑in + zoom‑in
        tl.fromTo(el,
          { opacity: 0, scale: 1 },
          { opacity: 1, scale: 1.5, duration: heroDuration, ease: 'power1.inOut' }
        );
        // then fade‑out + zoom‑out
        tl.to(el, {
          opacity: 0,
          scale:   2,
          duration: heroDuration,
          ease:    'power1.inOut'
        });
      }
    });
  }

  // wire up both hero sections
  setupHero('.hero1');
  setupHero('.hero2');

  // section 2 “normal text” stays the same
  gsap.to('.section-text', {
    scrollTrigger: {
      trigger: '.text-block',
      start:  'top 80%',
      end:    'bottom 20%',
      scrub:  true
    },
    scale: 1.1,
    ease:  'none'
  });

  // ensure ScrollTrigger recalcs after everything’s loaded
  ScrollTrigger.refresh();
});
