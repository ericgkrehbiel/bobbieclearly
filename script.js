gsap.registerPlugin(ScrollTrigger);

window.addEventListener('load', () => {
  const heroDuration   = 1;    // seconds per fade/zoom
  const desktopSpacing = 900;  // px per second scrub on desktop
  const mobileSpacing  = 600;  // px per second scrub on mobile

  /**
   * Helper: set up scroll-driven fade/zoom on each line in the hero.
   * @param {string} selector - CSS selector for the hero section.
   * @param {{scaleIn: number, scaleOut: number}} opts - Zoom levels.
   * @param {number} spacing - px per second of scrub distance.
   */
  function setupHero(selector, { scaleIn = 1.5, scaleOut = 2 } = {}, spacing) {
    const lines    = gsap.utils.toArray(`${selector} .line`);
    const segments = 1 + (lines.length - 1) * 2;
    const totalScroll = segments * heroDuration * spacing;

    // center and reset all lines
    gsap.set(lines, { opacity: 0, scale: 1 });
    // show first line
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

    const fadeIn  = { opacity: 1, scale: scaleIn,  duration: heroDuration, ease: 'power1.inOut' };
    const fadeOut = { opacity: 0, scale: scaleOut, duration: heroDuration, ease: 'power1.inOut' };

    lines.forEach((el, i) => {
      if (selector === '.hero3') {
        tl.fromTo(el, { opacity: 0, scale: 1 }, fadeIn);
        tl.to(el, fadeOut);
      } else if (i === 0) {
        tl.to(el, fadeOut);
      } else {
        tl.fromTo(el, { opacity: 0, scale: 1 }, fadeIn);
        tl.to(el, fadeOut);
      }
    });
  }

  // Use GSAP matchMedia to vary behavior by viewport size and spacing
  const mm = gsap.matchMedia();
  mm.add({
    isMobile:  '(max-width: 600px)',
    isDesktop: '(min-width: 601px)'
  }, context => {
    const { isMobile } = context.conditions;

    if (isMobile) {
      // allow text to wrap on mobile
      gsap.utils.toArray('.hero .line').forEach(el => {
        el.style.whiteSpace   = 'normal';
        el.style.hyphens      = 'none';
        el.style.overflowWrap = 'normal';
        el.style.wordBreak    = 'normal';
      });
    }

    // determine zoom and scroll spacing
    const scaleIn     = isMobile ? 1.2 : 1.5;
    const scaleOut    = isMobile ? 1.6 : 2;
    const heroSpacing = isMobile ? mobileSpacing : desktopSpacing;

    // initialize each hero with dynamic spacing
    setupHero('.hero1', { scaleIn, scaleOut }, heroSpacing);
    setupHero('.hero3', { scaleIn, scaleOut }, heroSpacing);
    setupHero('.hero2', { scaleIn, scaleOut }, heroSpacing);

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
    else               alert('Oops: ' + json.error);
  });
});
