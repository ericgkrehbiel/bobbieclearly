// script.js

gsap.registerPlugin(ScrollTrigger);

window.addEventListener('load', () => {
  const heroDuration = 1;     // seconds per in/out
  const heroSpacing  = 900;   // px per second of scrub

  /**
   * Helper: set up scroll-driven fade/zoom on each line in the hero.
   * @param {string} selector - CSS selector for the hero section.
   * @param {{scaleIn: number, scaleOut: number}} opts - Zoom levels.
   */
  function setupHero(selector, { scaleIn = 1.5, scaleOut = 2 } = {}) {
    const lines    = gsap.utils.toArray(`${selector} .line`);
    const segments = 1 + (lines.length - 1) * 2;
    const totalScroll = segments * heroDuration * heroSpacing;

    // initial state: first line visible at 'in' scale
    gsap.set(lines[0], { opacity: 1, scale: scaleIn });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: selector,
        start: 'top top',
        end: () => `+=${totalScroll}`,
        pin: true,
        scrub: true,
        invalidateOnRefresh: true,
        markers: false
      }
    });

    lines.forEach((el, i) => {
      const fadeIn  = { opacity: 1,  scale: scaleIn,  duration: heroDuration, ease: 'power1.inOut' };
      const fadeOut = { opacity: 0,  scale: scaleOut, duration: heroDuration, ease: 'power1.inOut' };

      if (selector === '.hero3') {
        // hero3: a single-line block fades in & out
        tl.fromTo(el, { opacity: 0, scale: 1 }, fadeIn);
        tl.to(el, fadeOut);
      } else if (i === 0) {
        // first line: only fade/zoom out
        tl.to(el, fadeOut);
      } else {
        // subsequent lines: fade/zoom in then out
        tl.fromTo(el, { opacity: 0, scale: 1 }, fadeIn);
        tl.to(el, fadeOut);
      }
    });
  }

  // Use GSAP matchMedia to vary behavior by viewport size
  const mm = gsap.matchMedia();
  mm.add({
    isMobile: '(max-width: 600px)',
    isDesktop: '(min-width: 601px)'
  }, context => {
    const { isMobile } = context.conditions;

    // On mobile, allow each <p.line> block to wrap internally
    if (isMobile) {
      gsap.utils.toArray('.hero .line').forEach(el => {
        el.style.whiteSpace     = 'normal';
        el.style.hyphens        = 'auto';
        el.style.overflowWrap   = 'break-word';
        el.style.wordBreak      = 'break-word';
      });
    }

    // Define zoom levels:
    const mobileScaleIn   = 1.2;
    const mobileScaleOut  = 1.6;
    const desktopScaleIn  = 1.5;
    const desktopScaleOut = 2;
    const scaleIn  = isMobile ? mobileScaleIn  : desktopScaleIn;
    const scaleOut = isMobile ? mobileScaleOut : desktopScaleOut;

    // Wire up heroes with these scales
    setupHero('.hero1', { scaleIn, scaleOut });
    setupHero('.hero3', { scaleIn, scaleOut });
    setupHero('.hero2', { scaleIn, scaleOut });

    // Refresh ScrollTrigger to pick up style changes
    ScrollTrigger.refresh();
  });

  // Email signup form handler (unchanged)
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
    else                alert('Oops: ' + json.error);
  });
});
