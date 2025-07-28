// script.js

// register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// wait until everything is loaded
window.addEventListener('load', () => {
  const heroDuration = 1;     // seconds per in/out
  const heroSpacing  = 900;   // px per second of scrub

  // helper to wire up a "hero" section with configurable scales
  function setupHero(selector, { scaleIn = 1.5, scaleOut = 2 } = {}) {
    const lines    = gsap.utils.toArray(`${selector} .line`);
    const segments = 1 + (lines.length - 1) * 2;
    const totalScroll = segments * heroDuration * heroSpacing;

    // make the first line visible & scaled on load
    gsap.set(lines[0], { opacity: 1, scale: scaleIn });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: selector,
        start:   'top top',
        end:     () => `+=${totalScroll}`,
        pin:     true,
        scrub:   true,
        invalidateOnRefresh: true,
        markers: false
      }
    });

    lines.forEach((el, i) => {
      // common params for ease
      const fadeIn = { opacity: 1, scale: scaleIn, duration: heroDuration, ease: 'power1.inOut' };
      const fadeOut = { opacity: 0, scale: scaleOut, duration: heroDuration, ease: 'power1.inOut' };

      if (selector === '.hero3') {
        // single-line hero3: fade-in + zoom-in, then fade-out + zoom-out
        tl.fromTo(el, { opacity: 0, scale: 1 }, fadeIn);
        tl.to(el, fadeOut);
      } else if (i === 0) {
        // only fade-out & zoom-out for first line of hero1/hero2
        tl.to(el, fadeOut);
      } else {
        // fade-in + zoom-in
        tl.fromTo(el, { opacity: 0, scale: 1 }, fadeIn);
        // then fade-out + zoom-out
        tl.to(el, fadeOut);
      }
    });
  }

  // use GSAP's matchMedia to adapt scales by viewport
  const mm = gsap.matchMedia();
  mm.add({
    isMobile: "(max-width: 600px)",
    isDesktop: "(min-width: 601px)"
  }, (context) => {
    const { isMobile } = context.conditions;

    // choose smaller zooms for mobile so text stays within viewport
    const mobileScaleIn  = 1.2;
    const mobileScaleOut = 1.6;
    const desktopScaleIn  = 1.5;
    const desktopScaleOut = 2;

    const scaleIn  = isMobile ? mobileScaleIn  : desktopScaleIn;
    const scaleOut = isMobile ? mobileScaleOut : desktopScaleOut;

    // wire up each hero with the appropriate scales
    setupHero('.hero1', { scaleIn, scaleOut });
    setupHero('.hero3', { scaleIn, scaleOut });
    setupHero('.hero2', { scaleIn, scaleOut });

    // refresh triggers after matchMedia runs
    ScrollTrigger.refresh();
  });

  // email form submission remains unchanged
  const form = document.querySelector('#emailCapture');
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const data = new FormData(form);
    const res = await fetch(
      'https://script.google.com/macros/s/AKfycbzN8nre4kwRasksLo_2mh5lu-z2xejyg3twYdZ2QH8KUlvGLwwbF5Li7auwiWNLVDZehA/exec',
      { method: 'POST', body: data }
    );
    const json = await res.json();
    if (json.success) alert('Thanks, you\'re signed up!');
    else alert('Oops: ' + json.error);
  });
});
