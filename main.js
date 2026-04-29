// Sugar Bar : site JS (vanilla ES module, no dependencies)

// 1. Loader fade-out
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(() => loader.classList.add('hidden'), 800);
  }
});

// 2. Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  // close mobile nav after a link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

// 3. Scroll reveal via IntersectionObserver
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => io.observe(el));
} else {
  // Fallback for ancient browsers
  reveals.forEach(el => el.classList.add('in'));
}

// 4. Hero entrance: hero fades in, sign panel slides up, then subhead and CTAs fade in
window.addEventListener('load', () => {
  const hero = document.getElementById('hero');
  const signPanel = document.querySelector('#hero .sign-panel');
  const subhead = document.querySelector('#hero .hero-subhead');
  const ctas = document.querySelector('#hero .hero-ctas');

  if (!hero) return;

  // Start state: hero hidden
  hero.style.opacity = '0';
  hero.style.transition = 'opacity 400ms ease';

  if (signPanel) {
    signPanel.style.opacity = '0';
    signPanel.style.transform = 'translateY(18px)';
    signPanel.style.transition = 'opacity 500ms ease-out, transform 500ms ease-out';
  }
  if (subhead) {
    subhead.style.opacity = '0';
    subhead.style.transition = 'opacity 500ms ease-out';
  }
  if (ctas) {
    ctas.style.opacity = '0';
    ctas.style.transition = 'opacity 500ms ease-out';
  }

  // After loader exits (~800ms + buffer), begin entrance
  setTimeout(() => {
    hero.style.opacity = '1';

    setTimeout(() => {
      if (signPanel) {
        signPanel.style.opacity = '1';
        signPanel.style.transform = 'translateY(0)';
      }
    }, 100);

    setTimeout(() => {
      if (subhead) subhead.style.opacity = '1';
      if (ctas) ctas.style.opacity = '1';
    }, 300);
  }, 1000);
});
