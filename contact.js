// =====================
// CONTACT PAGE — JavaScript
// =====================

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. Form Submission Handler ────────────────────────────────
  const btn       = document.getElementById('submitBtn');
  const btnText   = document.getElementById('btnText');
  const successMsg = document.getElementById('successMsg');

  const fields = {
    name:    document.getElementById('name'),
    email:   document.getElementById('email'),
    role:    document.getElementById('role'),
    subject: document.getElementById('subject'),
    message: document.getElementById('message'),
  };

  btn.addEventListener('click', () => {
    // Clear previous errors
    Object.values(fields).forEach(f => f.style.borderColor = '');

    // Basic validation
    let valid = true;

    if (!fields.name.value.trim()) {
      fields.name.style.borderColor = '#e74c3c';
      valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(fields.email.value.trim())) {
      fields.email.style.borderColor = '#e74c3c';
      valid = false;
    }

    if (!fields.role.value) {
      fields.role.style.borderColor = '#e74c3c';
      valid = false;
    }

    if (!fields.subject.value.trim()) {
      fields.subject.style.borderColor = '#e74c3c';
      valid = false;
    }

    if (!fields.message.value.trim()) {
      fields.message.style.borderColor = '#e74c3c';
      valid = false;
    }

    if (!valid) return;

    // Simulate sending
    btn.disabled = true;
    btnText.textContent = 'Sending...';

    setTimeout(() => {
      btnText.textContent = '✅ Sent!';
      successMsg.style.display = 'block';

      // Reset form fields
      Object.values(fields).forEach(f => (f.value = ''));

      setTimeout(() => {
        btnText.textContent = 'Send Message ✈';
        btn.disabled = false;
      }, 3000);
    }, 1600);
  });

  // Highlight border teal on focus
  Object.values(fields).forEach(field => {
    field.addEventListener('focus', () => {
      field.style.borderColor = '';  // let CSS handle it
    });
  });


  // ── 2. FAQ Accordion ─────────────────────────────────────────
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-q');
    const answer   = item.querySelector('.faq-a');

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all others
      faqItems.forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-a').classList.remove('open');
      });

      // Toggle clicked one
      if (!isOpen) {
        item.classList.add('open');
        answer.classList.add('open');
      }
    });
  });


  // ── 3. Scroll-reveal for info cards & form ───────────────────
  const revealEls = document.querySelectorAll('.info-card, .form-card, .faq-item');

  revealEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const idx = Array.from(revealEls).indexOf(entry.target);
        setTimeout(() => {
          entry.target.style.opacity  = '1';
          entry.target.style.transform = 'translateY(0)';
        }, 80 * (idx % 5));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => observer.observe(el));


  // ── 4. Active nav highlight ───────────────────────────────────
  const navLinks = document.querySelectorAll('nav ul li a');
  navLinks.forEach(link => {
    if (link.href === window.location.href) link.classList.add('active');
  });

});