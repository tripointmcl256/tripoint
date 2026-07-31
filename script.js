const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
const siteHeader = document.querySelector('.site-header');
const desktopNav = document.querySelector('.desktop-nav');

const desktopNavigationMarkup = `
  <a href="about.html">About</a>
  <details class="nav-group">
    <summary>What we do <span aria-hidden="true">⌄</span></summary>
    <div class="nav-dropdown">
      <a href="expertise.html">Expertise</a>
      <a href="approach.html">Approach</a>
      <a href="sectors.html">Sectors</a>
    </div>
  </details>
  <a href="gallery.html">Gallery</a>
  <a href="blog.html">Blog</a>`;

const mobileNavigationMarkup = `
  <a href="about.html">About</a>
  <details class="mobile-nav-group">
    <summary>What we do</summary>
    <div>
      <a href="expertise.html">Expertise</a>
      <a href="approach.html">Approach</a>
      <a href="sectors.html">Sectors</a>
    </div>
  </details>
  <a href="gallery.html">Gallery</a>
  <a href="blog.html">Blog</a>
  <a href="contact.html">Contact</a>`;

if (desktopNav) {
  desktopNav.setAttribute('aria-label', desktopNav.getAttribute('aria-label') || 'Primary navigation');
  desktopNav.innerHTML = desktopNavigationMarkup;
}
if (mobileNav) mobileNav.innerHTML = mobileNavigationMarkup;

if (menuButton && mobileNav && siteHeader) {
  mobileNav.setAttribute('aria-label', mobileNav.getAttribute('aria-label') || 'Mobile navigation');

  const setMenuState = (isOpen, restoreFocus = false) => {
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    mobileNav.classList.toggle('open', isOpen);
    mobileNav.toggleAttribute('inert', !isOpen);
    siteHeader.classList.toggle('menu-open', isOpen);
    document.body.classList.toggle('menu-open', isOpen);

    if (!isOpen) {
      mobileNav.querySelectorAll('details[open]').forEach(group => group.removeAttribute('open'));
    }

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

document.querySelectorAll('.nav-group, .mobile-nav-group').forEach(group => {
  if (group.querySelector('a.active')) {
    group.querySelector('summary')?.classList.add('active');
  }
});

document.addEventListener('click', event => {
  document.querySelectorAll('.nav-group[open]').forEach(group => {
    if (!group.contains(event.target)) group.removeAttribute('open');
  });
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    document.querySelectorAll('.nav-group[open]').forEach(group => group.removeAttribute('open'));
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
    <a href="tel:+256393002945"><img src="assets/phone.jpg" alt=""><span><small>Call</small><strong>0393 002 945</strong></span><b>↗</b></a>
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
    <a href="tel:+256393002945"><img src="assets/phone.jpg" alt=""><span><small>Call</small><strong>0393 002 945</strong></span><b>↗</b></a>
    <a href="https://wa.me/256781678974" target="_blank" rel="noopener"><img src="assets/whatsapp.jpg" alt=""><span><small>WhatsApp</small><strong>Message us</strong></span><b>↗</b></a>
    <a href="https://www.google.com/maps/search/?api=1&query=Arua+City+Uganda" target="_blank" rel="noopener"><img src="assets/maps.jpg" alt=""><span><small>Head office</small><strong>Arua City, Uganda</strong></span><b>↗</b></a>
    <div class="contact-panel-socials"><span>Follow Tripoint</span>${contactSocialLinksMarkup}</div>`;
}

const fetchCmsJson = async path => {
  const response = await fetch(path, { cache: 'no-store' });
  if (!response.ok) throw new Error(`Unable to load ${path}`);
  return response.json();
};

const fetchCmsData = async path => {
  const data = await fetchCmsJson(path);
  if (!Array.isArray(data)) throw new Error(`${path} must contain a list`);
  return data;
};

const pageHeroImageKeys = {
  'about.html': 'about_hero',
  'expertise.html': 'expertise_hero',
  'approach.html': 'approach_hero',
  'sectors.html': 'sectors_hero'
};

fetchCmsJson('content/site-images.json').then(imageSlots => {
  if (!imageSlots || Array.isArray(imageSlots) || typeof imageSlots !== 'object') return;

  document.querySelectorAll('[data-cms-image]').forEach(image => {
    const slot = imageSlots[image.dataset.cmsImage];
    if (!slot?.image) return;
    image.src = slot.image;
    image.alt = slot.alt || image.alt;
  });

  const pageHeroImage = document.querySelector('.page-hero-art img');
  const pageHeroKey = pageHeroImageKeys[currentPage];
  const pageHeroSlot = pageHeroKey ? imageSlots[pageHeroKey] : null;
  if (pageHeroImage && pageHeroSlot?.image) {
    pageHeroImage.src = pageHeroSlot.image;
    pageHeroImage.alt = pageHeroSlot.alt || pageHeroImage.alt;
    pageHeroImage.classList.add('cms-page-photo');
  }
}).catch(() => {
  // Keep the built-in page images visible if CMS data is temporarily unavailable.
});

const galleryGrid = document.querySelector('#cms-gallery-grid');
if (galleryGrid) {
  fetchCmsData('content/gallery.json').then(items => {
    const visibleItems = items.filter(item => item?.published !== false && item?.image && item?.caption);
    if (!visibleItems.length) return;

    const fragment = document.createDocumentFragment();
    visibleItems.forEach(item => {
      const card = document.createElement('button');
      const layout = ['wide', 'tall'].includes(item.layout) ? ` gallery-card-${item.layout}` : '';
      card.className = `gallery-card${layout}`;
      card.type = 'button';
      card.dataset.gallerySrc = item.image;
      card.dataset.galleryCaption = item.caption;

      const image = document.createElement('img');
      image.src = item.image;
      image.alt = item.alt || item.caption;
      image.loading = 'lazy';

      const label = document.createElement('span');
      const category = document.createElement('small');
      category.textContent = item.category || 'Tripoint';
      const caption = document.createElement('strong');
      caption.textContent = item.caption;
      const action = document.createElement('b');
      action.textContent = 'View ↗';
      label.append(category, caption, action);
      card.append(image, label);
      fragment.append(card);
    });

    galleryGrid.replaceChildren(fragment);
  }).catch(() => {
    // Keep the built-in gallery visible if CMS data is temporarily unavailable.
  });
}

const sanitiseCmsHtml = html => {
  const template = document.createElement('template');
  template.innerHTML = String(html || '');
  template.content.querySelectorAll('script,style,iframe,object,embed,form').forEach(element => element.remove());
  template.content.querySelectorAll('*').forEach(element => {
    [...element.attributes].forEach(attribute => {
      const name = attribute.name.toLowerCase();
      const value = attribute.value.trim().toLowerCase();
      if (name.startsWith('on') || ((name === 'href' || name === 'src') && value.startsWith('javascript:'))) {
        element.removeAttribute(attribute.name);
      }
    });
  });
  return template.innerHTML;
};

const formatCmsDate = value => {
  if (!value) return '';
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat('en-UG', { day: 'numeric', month: 'short', year: 'numeric' }).format(date);
};

const blogGrid = document.querySelector('#cms-blog-grid');
const featuredInsight = document.querySelector('#cms-featured-insight');
if (blogGrid) {
  fetchCmsData('content/blog.json').then(items => {
    const visiblePosts = items
      .filter(item => item?.published !== false && item?.title && item?.image && item?.body)
      .sort((a, b) => {
        const aTime = a.date ? new Date(a.date).getTime() : 0;
        const bTime = b.date ? new Date(b.date).getTime() : 0;
        return bTime - aTime;
      });
    if (!visiblePosts.length) return;

    const fragment = document.createDocumentFragment();
    visiblePosts.forEach(post => {
      const slug = String(post.slug || post.title)
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      const article = document.createElement('article');
      article.className = 'blog-card';
      article.id = `post-${slug}`;
      if (String(post.image).includes('boardroom')) article.classList.add('blog-card-contain');

      const figure = document.createElement('figure');
      const image = document.createElement('img');
      image.src = post.image;
      image.alt = post.image_alt || post.title;
      image.loading = 'lazy';
      figure.append(image);

      const content = document.createElement('div');
      const meta = document.createElement('span');
      const formattedDate = formatCmsDate(post.date);
      meta.textContent = [post.category, formattedDate].filter(Boolean).join(' · ');
      const title = document.createElement('h3');
      title.textContent = post.title;
      const excerpt = document.createElement('p');
      excerpt.textContent = post.excerpt || '';

      const details = document.createElement('details');
      const summary = document.createElement('summary');
      summary.append(document.createTextNode('Read article '));
      const plus = document.createElement('b');
      plus.textContent = '+';
      summary.append(plus);
      const body = document.createElement('div');
      body.className = 'cms-article-body';
      body.innerHTML = sanitiseCmsHtml(post.body);
      details.append(summary, body);
      content.append(meta, title, excerpt, details);
      article.append(figure, content);
      fragment.append(article);
    });
    blogGrid.replaceChildren(fragment);

    if (featuredInsight) {
      const featuredPost = visiblePosts.find(post => post.featured) || visiblePosts[0];
      const featuredSlug = String(featuredPost.slug || featuredPost.title)
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      const image = featuredInsight.querySelector('img');
      const label = featuredInsight.querySelector('span');
      const title = featuredInsight.querySelector('h2');
      const excerpt = featuredInsight.querySelector('p');
      const link = featuredInsight.querySelector('a');
      image.src = featuredPost.image;
      image.alt = featuredPost.image_alt || featuredPost.title;
      label.textContent = 'Featured perspective';
      title.textContent = featuredPost.title;
      excerpt.textContent = featuredPost.excerpt || '';
      link.href = `#post-${featuredSlug}`;
    }
  }).catch(() => {
    // Keep the built-in article previews visible if CMS data is temporarily unavailable.
  });
}

const galleryLightbox = document.querySelector('.gallery-lightbox');
let activeGalleryTrigger;

if (galleryLightbox) {
  const lightboxImage = galleryLightbox.querySelector('img');
  const lightboxCaption = galleryLightbox.querySelector('figcaption');
  const lightboxClose = galleryLightbox.querySelector('.lightbox-close');

  const closeLightbox = () => {
    if (typeof galleryLightbox.close === 'function') {
      galleryLightbox.close();
    } else {
      galleryLightbox.removeAttribute('open');
      activeGalleryTrigger?.focus({ preventScroll: true });
    }
  };

  document.addEventListener('click', event => {
    const trigger = event.target.closest('[data-gallery-src]');
    if (!trigger) return;
    activeGalleryTrigger = trigger;
    lightboxImage.src = trigger.dataset.gallerySrc;
    lightboxImage.alt = trigger.querySelector('img')?.alt || '';
    lightboxCaption.textContent = trigger.dataset.galleryCaption || '';

    if (typeof galleryLightbox.showModal === 'function') {
      galleryLightbox.showModal();
    } else {
      galleryLightbox.setAttribute('open', '');
    }
    lightboxClose?.focus({ preventScroll: true });
  });

  lightboxClose?.addEventListener('click', closeLightbox);
  galleryLightbox.addEventListener('click', event => {
    if (event.target === galleryLightbox) closeLightbox();
  });
  galleryLightbox.addEventListener('close', () => activeGalleryTrigger?.focus({ preventScroll: true }));
}
