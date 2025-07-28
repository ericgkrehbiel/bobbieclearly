// script.js

gsap.registerPlugin(ScrollTrigger);

window.addEventListener('load', () => {
  const heroDuration = 1;    // seconds per in/out
  const heroSpacing  = 900;  // px per second of scrub

  /**
   * Helper: set up scroll-driven fade/zoom on each line in the hero.
   * @param {string} selector - CSS selector for the hero section.
   * @param {{scaleIn: number, scaleOut: number}} opts - Zoom levels.
   */
  function setupHero(selector, { scaleIn = 1.5, scaleOut = 2 } = {}) {
    const lines    = gsap.utils.toArray(`${selector} .line`);
    const segments = 1 + (lines.length - 1) * 2;
    const totalScroll = segments * heroDuration * heroSpacing;

    // center and reset all lines: position left 50% + shift back by 50% width
    gsap.set(lines, {
      opacity: 0,
      scale: 1
    });

    // make the first line visible at in-scale
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

    // define fade/zoom tweens (only opacity & scale, so xPercent stays intact)
    const fadeIn  = { opacity: 1, scale: scaleIn, duration: heroDuration, ease: 'power1.inOut' };
    const fadeOut = { opacity: 0, scale: scaleOut, duration: heroDuration, ease: 'power1.inOut' };

    lines.forEach((el, i) => {
      if (selector === '.hero3') {
        // hero3: single-line fade in & out
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

    if (isMobile) {
      // allow text to wrap & hyphenate on mobile
      gsap.utils.toArray('.hero .line').forEach(el => {
        el.style.whiteSpace   = 'normal';
        el.style.hyphens      = 'none';
        el.style.overflowWrap = 'normal';
        el.style.wordBreak    = 'normal';
      });
    }

    // choose zoom levels
    const mobileScaleIn   = 1.2;
    const mobileScaleOut  = 1.6;
    const desktopScaleIn  = 1.5;
    const desktopScaleOut = 2;
    const scaleIn  = isMobile ? mobileScaleIn  : desktopScaleIn;
    const scaleOut = isMobile ? mobileScaleOut : desktopScaleOut;

    // initialize each hero
    setupHero('.hero1', { scaleIn, scaleOut });
    setupHero('.hero3', { scaleIn, scaleOut });
    setupHero('.hero2', { scaleIn, scaleOut });

    // refresh triggers after style changes
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
