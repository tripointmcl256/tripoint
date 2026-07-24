const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
const siteHeader = document.querySelector('.site-header');

if (menuButton && mobileNav && siteHeader) {
  mobileNav.setAttribute('aria-label', mobileNav.getAttribute('aria-label') || 'Mobile navigation');

  const setMenuState = (isOpen, restoreFocus = false) => {
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    mobileNav.classList.toggle('open', isOpen);
    mobileNav.toggleAttribute('inert', !isOpen);
    siteHeader.classList.toggle('menu-open', isOpen);
    document.body.classList.toggle('menu-open', isOpen);

    if (isOpen) {
      mobileNav.querySelector('a')?.focus({ preventScroll: true });
    } else if (restoreFocus) {
      menuButton.focus({ preventScroll: true });
    }
  };

  setMenuState(false);

  menuButton.addEventListener('click', () => {
    setMenuState(menuButton.getAttribute('aria-expanded') !== 'true');
  });

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setMenuState(false));
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      setMenuState(false, true);
    }
  });

  document.addEventListener('click', event => {
    if (menuButton.getAttribute('aria-expanded') === 'true' && !siteHeader.contains(event.target)) {
      setMenuState(false);
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900 && menuButton.getAttribute('aria-expanded') === 'true') {
      setMenuState(false);
    }
  }, { passive: true });
}

const mainContent = document.querySelector('main');
if (mainContent) {
  mainContent.id ||= 'main-content';
  const skipLink = document.createElement('a');
  skipLink.className = 'skip-link';
  skipLink.href = '#main-content';
  skipLink.textContent = 'Skip to content';
  document.body.prepend(skipLink);
}

const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.desktop-nav a, .mobile-nav a, .nav-cta').forEach(link => {
  const destination = (link.getAttribute('href') || '').split('#')[0];
  if (destination && destination === currentPage) {
    link.classList.add('active');
    link.setAttribute('aria-current', 'page');
  }
});

const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -24px' });

  revealElements.forEach(element => observer.observe(element));
} else {
  revealElements.forEach(element => element.classList.add('visible'));
}

document.querySelectorAll('#year').forEach(year => {
  year.textContent = new Date().getFullYear();
});

const updateHeaderBackground = () => {
  siteHeader?.classList.toggle('scrolled', window.scrollY > 24);
};

updateHeaderBackground();
window.addEventListener('scroll', updateHeaderBackground, { passive: true });

let toastTimer;
const showToast = message => {
  let toast = document.querySelector('.ui-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'ui-toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.append(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('show'), 3600);
};

document.querySelectorAll('[data-placeholder-link]').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    showToast('Agri-market Linkage is coming soon. Download links will be added when the app launches.');
  });
});

document.querySelectorAll('.back-to-top').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, left: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    window.history.replaceState(null, '', '#top');
  });
});

const footerLinksMarkup = `
  <div class="social-links footer-socials" aria-label="Tripoint contact and social links">
    <a href="mailto:tripoint.mcl@gmail.com"><img src="assets/gmail.jpg" alt=""><span><small>Email</small><strong>tripoint.mcl@gmail.com</strong></span><b>↗</b></a>
    <a href="tel:+256781678974"><img src="assets/phone.jpg" alt=""><span><small>Call</small><strong>+256 781 678 974</strong></span><b>↗</b></a>
    <a href="https://wa.me/256781678974" target="_blank" rel="noopener"><img src="assets/whatsapp.jpg" alt=""><span><small>WhatsApp</small><strong>Chat with Tripoint</strong></span><b>↗</b></a>
    <a href="https://www.instagram.com/" target="_blank" rel="noopener"><img src="assets/instagram.jpg" alt=""><span><small>Instagram</small><strong>@tripoint.mcl</strong></span><b>↗</b></a>
    <a href="https://www.tiktok.com/" target="_blank" rel="noopener"><img src="assets/tiktok.jpg" alt=""><span><small>TikTok</small><strong>@tripoint.mcl</strong></span><b>↗</b></a>
    <a href="https://www.google.com/maps/search/?api=1&query=Arua+City+Uganda" target="_blank" rel="noopener"><img src="assets/maps.jpg" alt=""><span><small>Find us</small><strong>Arua City, Uganda</strong></span><b>↗</b></a>
  </div>`;

const contactSocialLinksMarkup = `
  <div class="social-links footer-socials" aria-label="Tripoint social media">
    <a href="https://www.instagram.com/" target="_blank" rel="noopener"><img src="assets/instagram.jpg" alt=""><span>Instagram</span></a>
    <a href="https://www.tiktok.com/" target="_blank" rel="noopener"><img src="assets/tiktok.jpg" alt=""><span>TikTok</span></a>
  </div>`;

document.querySelectorAll('.simple-footer').forEach(footer => {
  if (!footer.querySelector('.footer-socials')) {
    footer.insertAdjacentHTML('beforeend', footerLinksMarkup);
  }
});

const contactPanel = document.querySelector('.contact-page .contact-panel');
if (contactPanel) {
  contactPanel.innerHTML = `
    <a href="mailto:tripoint.mcl@gmail.com"><img src="assets/gmail.jpg" alt=""><span><small>Email</small><strong>tripoint.mcl@gmail.com</strong></span><b>↗</b></a>
    <a href="tel:+256781678974"><img src="assets/phone.jpg" alt=""><span><small>Call</small><strong>+256 781 678 974</strong></span><b>↗</b></a>
    <a href="https://wa.me/256781678974" target="_blank" rel="noopener"><img src="assets/whatsapp.jpg" alt=""><span><small>WhatsApp</small><strong>Message us</strong></span><b>↗</b></a>
    <a href="https://www.google.com/maps/search/?api=1&query=Arua+City+Uganda" target="_blank" rel="noopener"><img src="assets/maps.jpg" alt=""><span><small>Head office</small><strong>Arua City, Uganda</strong></span><b>↗</b></a>
    <div class="contact-panel-socials"><span>Follow Tripoint</span>${contactSocialLinksMarkup}</div>`;
}
