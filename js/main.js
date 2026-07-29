/* ==========================================================================
   Fercamp Ferramentas e Ferragens - Interactive Scripts
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Drawer Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const mobileCloseBtn = document.getElementById('mobileCloseBtn');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileMenu() {
    mobileNavDrawer.classList.add('open');
    drawerOverlay.classList.add('open');
    mobileToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileNavDrawer.classList.remove('open');
    drawerOverlay.classList.remove('open');
    mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', openMobileMenu);
  }

  if (mobileCloseBtn) {
    mobileCloseBtn.addEventListener('click', closeMobileMenu);
  }

  if (drawerOverlay) {
    drawerOverlay.addEventListener('click', closeMobileMenu);
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // 2. Sticky Header Shadow on Scroll
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // 3. Structure Gallery Lightbox Modal
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  function openLightbox(imgSrc, captionText) {
    if (!lightboxModal || !lightboxImage) return;
    lightboxImage.src = imgSrc;
    lightboxImage.alt = captionText;
    if (lightboxCaption) {
      lightboxCaption.textContent = captionText;
    }
    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const caption = item.getAttribute('data-caption') || img?.alt || 'Fercamp Ferramentas e Ferragens';
      if (img) {
        openLightbox(img.src, caption);
      }
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });
  }

  // Keyboard accessibility for ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      closeMobileMenu();
    }
  });

  // 4. Contact Form Frontend Validation & Feedback
  const contactForm = document.getElementById('contactForm');
  const formSuccessAlert = document.getElementById('formSuccessAlert');
  const formErrorAlert = document.getElementById('formErrorAlert');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Reset alert states
      if (formSuccessAlert) formSuccessAlert.style.display = 'none';
      if (formErrorAlert) formErrorAlert.style.display = 'none';

      const name = document.getElementById('formName')?.value.trim();
      const phone = document.getElementById('formPhone')?.value.trim();
      const email = document.getElementById('formEmail')?.value.trim();
      const subject = document.getElementById('formSubject')?.value.trim();
      const message = document.getElementById('formMessage')?.value.trim();

      if (!name || !phone || !email || !message) {
        if (formErrorAlert) {
          formErrorAlert.textContent = 'Por favor, preencha todos os campos obrigatórios (*).';
          formErrorAlert.style.display = 'block';
        }
        return;
      }

      // Basic email regex
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        if (formErrorAlert) {
          formErrorAlert.textContent = 'Por favor, informe um endereço de e-mail válido.';
          formErrorAlert.style.display = 'block';
        }
        return;
      }

      // Simulation of submission success
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          contactForm.reset();

          if (formSuccessAlert) {
            formSuccessAlert.textContent = `Obrigado, ${name}! Sua mensagem foi enviada com sucesso. Nossa equipe entrará em contato em breve.`;
            formSuccessAlert.style.display = 'block';
          }
        }, 1000);
      }
    });
  }

  // 5. Update Copyright Year Automatically
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // 6. Smooth Scrolling for Navigation Links & Active State Highlighting
  const sections = document.querySelectorAll('section[id]');
  const navLinksList = document.querySelectorAll('.nav-link');

  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinksList.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavOnScroll);
});
