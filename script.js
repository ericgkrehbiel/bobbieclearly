// script.js
gsap.registerPlugin(ScrollTrigger);

// ─── SECTION 1 HERO ──────────────────────────────────────────────────────────
const hero1Lines = gsap.utils.toArray('.hero1 .line');
const heroDuration = 1;
const heroSpacing  = 400;
const hero1Segments = 1 + (hero1Lines.length - 1) * 2;
const hero1Scroll   = hero1Segments * heroDuration * heroSpacing;

// make first line visible at load
gsap.set(hero1Lines[0], { opacity: 1, scale: 1.5 });

gsap.timeline({
  scrollTrigger: {
    trigger: '.hero1',
    start:   'top top',
    end:     () => `+=${hero1Scroll}`,
    pin:     true,
    scrub:   true,
    invalidateOnRefresh: true,
    //markers: true,
  }
})
  .addLabel('hero1Start')
  .add(hero1Lines.map((el,i) => {
    if (i===0) {
      return gsap.to(el, { opacity: 0, scale: 2, duration: heroDuration, ease: 'power1.inOut' });
    } else {
      return gsap.timeline()
        .fromTo(el, { opacity:0, scale:1 }, { opacity:1, scale:1.5, duration:heroDuration, ease:'power1.inOut' })
        .to(   el, { opacity:0, scale:2, duration:heroDuration, ease:'power1.inOut' }, '+=0');
    }
  }), 'hero1Start');

// ─── SECTION 2 NORMAL TEXT ───────────────────────────────────────────────────
gsap.to('.section-text', {
  scrollTrigger: {
    trigger: '.text-block',
    start:  'top 80%',     // when top of block hits 80% down viewport
    end:    'bottom 20%',  // until bottom hits 20% up
    scrub:  true,
  },
  scale: 1.1,             // zoom up 10%
  ease:  'none'
});

// ─── SECTION 3 HERO ──────────────────────────────────────────────────────────
const hero2Lines = gsap.utils.toArray('.hero2 .line');
const hero2Segments = 1 + (hero2Lines.length - 1) * 2;
const hero2Scroll   = hero2Segments * heroDuration * heroSpacing;

gsap.set(hero2Lines[0], { opacity: 1, scale: 1.5 });

gsap.timeline({
  scrollTrigger: {
    trigger: '.hero2',
    start:   'top top',
    end:     () => `+=${hero2Scroll}`,
    pin:     true,
    scrub:   true,
    invalidateOnRefresh: true,
    //markers: true,
  }
})
  .addLabel('hero2Start')
  .add(hero2Lines.map((el,i) => {
    if (i===0) {
      return gsap.to(el, { opacity: 0, scale: 2, duration: heroDuration, ease: 'power1.inOut' });
    } else {
      return gsap.timeline()
        .fromTo(el, { opacity:0, scale:1 }, { opacity:1, scale:1.5, duration:heroDuration, ease:'power1.inOut' })
        .to(   el, { opacity:0, scale:2, duration:heroDuration, ease:'power1.inOut' }, '+=0');
    }
  }), 'hero2Start');
