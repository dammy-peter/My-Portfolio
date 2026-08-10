// ===================== FOOTER YEAR =====================
document.getElementById('year').textContent = new Date().getFullYear();

// ===================== MOBILE MENU TOGGLE =====================
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navClose = document.querySelector('.nav-close');
const navOverlay = document.querySelector('.nav-overlay');

function openMenu() {
  navLinks.classList.add('open');
  navOverlay.classList.add('open');
}

function closeMenu() {
  navLinks.classList.remove('open');
  navOverlay.classList.remove('open');
}

menuToggle.addEventListener('click', openMenu);
navClose.addEventListener('click', closeMenu);
navOverlay.addEventListener('click', closeMenu);

// Close mobile menu after clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// ===================== ACTIVE NAV LINK ON SCROLL =====================
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

function setActiveLink() {
  let current = '';
  const scrollPos = window.scrollY + 120;

  sections.forEach(section => {
    if (scrollPos >= section.offsetTop) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', setActiveLink);

// ===================== SCROLL REVEAL ANIMATION =====================
const revealTargets = document.querySelectorAll(
  '.service-card, .skill-card, .approach-card, .project-card, .stat'
);

revealTargets.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
        // clear the reveal delay so it doesn't linger and affect hover
        setTimeout(() => {
          entry.target.style.transitionDelay = '';
        }, 700);
      }
    });
  },
  { threshold: 0.15 }
);

revealTargets.forEach(el => observer.observe(el));

// ===================== SMOOTH SCROLL FOR NAV LINKS =====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===================== HERO TEXT REVEAL (line-by-line + typewriter) =====================
document.addEventListener('DOMContentLoaded', () => {
  const heroTitle = document.querySelector('.hero__text h1');
  const heroDesc = document.querySelector('.hero__desc');

  // Hide description immediately so it never shows before heading finishes
  if (heroDesc) {
    heroDesc.style.visibility = 'hidden';
  }

  if (heroTitle) {
    // Split heading into lines using its existing <br> tags
    const originalHTML = heroTitle.innerHTML;
    const lines = originalHTML.split(/<br\s*\/?>/i);

    heroTitle.innerHTML = '';

    lines.forEach((lineHTML, i) => {
      const lineWrapper = document.createElement('span');
      lineWrapper.className = 'hero-line';
      lineWrapper.innerHTML = lineHTML.trim();
      heroTitle.appendChild(lineWrapper);
      if (i < lines.length - 1) {
        heroTitle.appendChild(document.createElement('br'));
      }
    });

    const lineEls = heroTitle.querySelectorAll('.hero-line');

    lineEls.forEach((el, i) => {
      setTimeout(() => {
        el.classList.add('is-visible');

        // After the last line appears, start reading the description
        if (i === lineEls.length - 1 && heroDesc) {
          setTimeout(() => {
            const descHTML = heroDesc.innerHTML;
            heroDesc.innerHTML = '';
            heroDesc.style.visibility = 'visible';
            heroDesc.classList.add('typing-cursor');
            typeHTML(heroDesc, descHTML, 18, () => {
              heroDesc.classList.remove('typing-cursor');
            });
          }, 400);
        }
      }, i * 450);
    });
  }
});

function typeHTML(element, html, speed = 40, onDone) {
  let index = 0;
  let output = '';
  const tagStack = [];

  function closingTags() {
    return tagStack.slice().reverse().map(t => `</${t}>`).join('');
  }

  function step() {
    if (index >= html.length) {
      element.innerHTML = html;
      if (onDone) onDone();
      return;
    }

    if (html[index] === '<') {
      let tag = '';
      while (index < html.length && html[index] !== '>') {
        tag += html[index];
        index++;
      }
      tag += '>';
      index++;

      output += tag;

      const isClosing = tag.startsWith('</');
      const isSelfClosing = /\/>$/.test(tag) || /^<(br|img|hr|input)/i.test(tag);

      if (isClosing) {
        tagStack.pop();
      } else if (!isSelfClosing) {
        const tagName = tag.match(/^<([a-zA-Z0-9]+)/);
        if (tagName) tagStack.push(tagName[1]);
      }

      element.innerHTML = output + closingTags();
      step();
    } else {
      output += html[index];
      index++;
      element.innerHTML = output + closingTags();
      setTimeout(step, speed);
    }
  }

  step();
}

// ===================== STATS COUNT-UP ANIMATION =====================
const statNumbers = document.querySelectorAll('.stats-bar__item h4');

function animateCount(el) {
  const text = el.textContent.trim();
  const match = text.match(/(\d+)/);
  if (!match) return;

  const target = parseInt(match[1], 10);
  const suffix = text.replace(match[1], '');
  const duration = 1200;
  const startTime = performance.now();

  function tick(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * target);
    el.textContent = current + suffix;

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      el.textContent = target + suffix;
    }
  }

  requestAnimationFrame(tick);
}

if (statNumbers.length) {
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          statsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach(el => statsObserver.observe(el));
}