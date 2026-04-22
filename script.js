/* =============================================
   MORALES & ASOCIADOS — JAVASCRIPT
   ============================================= */

// ---- NAVBAR: scroll effect + hamburger ----
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  document.getElementById('backToTop').classList.toggle('visible', window.scrollY > 400);
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

// Close menu on link click (mobile)
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ---- SMOOTH SCROLL ----
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// ---- COUNTER ANIMATION ----
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 2000;
  const start = performance.now();
  const update = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Easing: ease-out
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  };
  requestAnimationFrame(update);
}

// ---- INTERSECTION OBSERVER ----
const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };

// Fade-in observer
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.service-card, .team-card, .testimonial-card, .contact-item, .nosotros-text, .nosotros-img, .section-header')
  .forEach(el => {
    el.classList.add('fade-in');
    fadeObserver.observe(el);
  });

// Add staggered delays to cards
document.querySelectorAll('.services-grid .service-card').forEach((el, i) => {
  el.classList.add(`fade-in-delay-${(i % 3) + 1}`);
});
document.querySelectorAll('.team-grid .team-card').forEach((el, i) => {
  el.classList.add(`fade-in-delay-${(i % 4) + 1}`);
});

// Counter observer
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-num').forEach(animateCounter);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) counterObserver.observe(heroStats);


// ---- FORM VALIDATION ----
const form = document.getElementById('contactForm');

function showError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(fieldId + '-error');
  if (field) field.classList.add('invalid');
  if (error) error.textContent = message;
}

function clearError(fieldId) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(fieldId + '-error');
  if (field) field.classList.remove('invalid');
  if (error) error.textContent = '';
}

// Live validation
['nombre', 'email', 'area', 'mensaje'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('input', () => clearError(id));
});

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  let valid = true;

  const nombre = document.getElementById('nombre');
  const email = document.getElementById('email');
  const area = document.getElementById('area');
  const mensaje = document.getElementById('mensaje');
  const privacidad = document.getElementById('privacidad');

  // Reset
  ['nombre', 'email', 'area', 'mensaje', 'privacidad'].forEach(clearError);

  if (!nombre?.value.trim() || nombre.value.trim().length < 3) {
    showError('nombre', 'Por favor ingrese su nombre completo.');
    valid = false;
  }

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email?.value.trim() || !emailRe.test(email.value)) {
    showError('email', 'Ingrese un correo electrónico válido.');
    valid = false;
  }

  if (!area?.value) {
    showError('area', 'Seleccione el área legal de su consulta.');
    valid = false;
  }

  if (!mensaje?.value.trim() || mensaje.value.trim().length < 20) {
    showError('mensaje', 'Por favor describa su caso (mínimo 20 caracteres).');
    valid = false;
  }

  if (!privacidad?.checked) {
    showError('privacidad', 'Debe aceptar el aviso de privacidad.');
    valid = false;
  }

  if (!valid) return;

  // Simulate form submission
  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.textContent = 'Enviando...';
  submitBtn.disabled = true;

  setTimeout(() => {
    form.reset();
    submitBtn.textContent = 'Enviar Solicitud';
    submitBtn.disabled = false;
    document.getElementById('form-success').classList.remove('hidden');
    setTimeout(() => document.getElementById('form-success').classList.add('hidden'), 6000);
  }, 1500);
});

// ---- ACTIVE NAV LINK on scroll ----
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('#nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => {
        a.style.color = a.getAttribute('href') === '#' + entry.target.id
          ? 'var(--gold)'
          : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
