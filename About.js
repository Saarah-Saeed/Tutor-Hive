

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. Animated stat counter ──────────────────────────────────
  const statCards = document.querySelectorAll('.stat-card h2');

  function animateCount(el) {
    const raw = el.textContent.trim();               
    const suffix = raw.replace(/[\d.]/g, '');       
    const numStr  = raw.replace(/[^\d.]/g, '');      
    const target  = parseFloat(numStr);

    let start = 0;
    const duration = 1800;
    const step = 16;
    const steps = duration / step;
    const increment = target / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        start = target;
        clearInterval(timer);
      }
      const display = Number.isInteger(target) ? Math.floor(start) : start.toFixed(1);
      el.textContent = display + suffix;
    }, step);
  }

  // Use IntersectionObserver so counters fire when visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statCards.forEach(el => observer.observe(el));


  // ── 2. Scroll-reveal for cards ────────────────────────────────
  const revealEls = document.querySelectorAll(
    '.mission-card, .team-card, .stat-card, .story-text, .story-stats'
  );

  revealEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger each card slightly
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, 100 * (Array.from(revealEls).indexOf(entry.target) % 4));
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => revealObserver.observe(el));


  // ── 3. Active nav link highlight ─────────────────────────────
  const navLinks = document.querySelectorAll('nav ul li a');
  navLinks.forEach(link => {
    if (link.href === window.location.href) {
      link.classList.add('active');
    }
  });


  // ── 4. Smooth section tag fade-in on load ─────────────────────
  const tags = document.querySelectorAll('.section-tag, .hero-tag');
  tags.forEach((tag, i) => {
    tag.style.opacity = '0';
    tag.style.animation = `none`;
    setTimeout(() => {
      tag.style.transition = 'opacity 1s ease';
      tag.style.opacity = '1';
    }, 300 + i * 200);
  });

});