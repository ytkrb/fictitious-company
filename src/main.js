import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================================================
     1. Theme Toggle Setup
     ========================================================================== */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const body = document.body;

  // Retrieve theme preference or default to dark
  const currentTheme = localStorage.getItem('theme') || 'dark';
  if (currentTheme === 'light') {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
  } else {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
  }

  themeToggleBtn.addEventListener('click', () => {
    if (body.classList.contains('dark-theme')) {
      body.classList.remove('dark-theme');
      body.classList.add('light-theme');
      localStorage.setItem('theme', 'light');
    } else {
      body.classList.remove('light-theme');
      body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    }
  });

  /* ==========================================================================
     2. Sticky Header & Active Navigation Link Indicator
     ========================================================================== */
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link, .nav-link-btn');
  const sections = document.querySelectorAll('section');

  const handleHeaderScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleHeaderScroll);
  handleHeaderScroll(); // Initial check

  // ScrollSpy with Intersection Observer
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px', // Trigger when section occupies the middle part of screen
    threshold: 0
  };

  const scrollSpyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    scrollSpyObserver.observe(section);
  });

  /* ==========================================================================
     3. Mobile Menu Toggle
     ========================================================================== */
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('open');
      navMenu.classList.toggle('open');
    });

    // Close menu when links are clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('open');
        navMenu.classList.remove('open');
      });
    });
  }

  /* ==========================================================================
     4. Technology Stack Filters
     ========================================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const techItems = document.querySelectorAll('.tech-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Set active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      techItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.classList.remove('hidden');
          // Simple visual pop animation
          item.style.animation = 'fadeIn 0.3s ease-out forwards';
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  /* ==========================================================================
     5. Interactive Process Timeline
     ========================================================================== */
  const processSteps = document.querySelectorAll('.process-step');
  const processCards = document.querySelectorAll('.process-detail-card');

  processSteps.forEach(step => {
    step.addEventListener('click', () => {
      const stepNum = step.getAttribute('data-step');

      // Update active step line UI
      processSteps.forEach(s => s.classList.remove('active'));
      step.classList.add('active');

      // Update detail card display
      processCards.forEach(card => card.classList.remove('active'));
      const activeCard = document.getElementById(`process-detail-${stepNum}`);
      if (activeCard) {
        activeCard.classList.add('active');
      }
    });
  });

  /* ==========================================================================
     6. Scroll Animate-In (Intersection Observer)
     ========================================================================== */
  const animateItems = document.querySelectorAll('.fade-in-up');

  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear');
        animationObserver.unobserve(entry.target); // Trigger only once
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.1
  });

  animateItems.forEach(item => {
    animationObserver.observe(item);
  });

  /* ==========================================================================
     7. Numeric Counters Animation
     ========================================================================== */
  const counterItems = document.querySelectorAll('.animate-num');

  const animateCounters = (element) => {
    const targetValue = parseInt(element.getAttribute('data-val'), 10);
    const duration = 2000; // 2 seconds
    const startTime = performance.now();

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (easeOutQuad)
      const easeProgress = progress * (2 - progress);
      const currentValue = Math.floor(easeProgress * targetValue);

      if (element.classList.contains('card-val')) {
        // Format with commas for large numbers like MAU
        element.textContent = currentValue.toLocaleString();
      } else {
        element.textContent = currentValue;
      }

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        if (element.classList.contains('card-val')) {
          element.textContent = targetValue.toLocaleString();
        } else {
          element.textContent = targetValue;
        }
      }
    };

    requestAnimationFrame(updateCounter);
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters(entry.target);
        counterObserver.unobserve(entry.target); // Animate only once
      }
    });
  }, {
    threshold: 0.5
  });

  counterItems.forEach(counter => {
    counterObserver.observe(counter);
  });

  /* ==========================================================================
     8. Project Planner / Contact Form Validation & Submission
     ========================================================================== */
  const form = document.getElementById('project-planner-form');
  const successModal = document.getElementById('success-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');

  // Input elements
  const fields = [
    {
      element: document.getElementById('contact-name'),
      validate: (val) => val.trim().length > 0
    },
    {
      element: document.getElementById('contact-email'),
      validate: (val) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(val);
      }
    },
    {
      element: document.getElementById('contact-message'),
      validate: (val) => val.trim().length > 0
    }
  ];

  const validateField = (fieldObj) => {
    const parent = fieldObj.element.closest('.form-group');
    const isValid = fieldObj.validate(fieldObj.element.value);

    if (!isValid) {
      parent.classList.add('has-error');
    } else {
      parent.classList.remove('has-error');
    }
    return isValid;
  };

  // Add validation listeners
  fields.forEach(fieldObj => {
    // Validate on blur
    fieldObj.element.addEventListener('blur', () => {
      validateField(fieldObj);
    });

    // Validate on input, but only remove error (don't show error while typing)
    fieldObj.element.addEventListener('input', () => {
      const parent = fieldObj.element.closest('.form-group');
      if (parent.classList.contains('has-error') && fieldObj.validate(fieldObj.element.value)) {
        parent.classList.remove('has-error');
      }
    });
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let isFormValid = true;
      fields.forEach(fieldObj => {
        const isValid = validateField(fieldObj);
        if (!isValid) {
          isFormValid = false;
        }
      });

      if (isFormValid) {
        // Collect form data (for simulation)
        const formData = new FormData(form);
        const types = formData.getAll('project_type');
        const budget = formData.get('project_budget');
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        console.log('Form Submitted Successfully:', {
          types,
          budget,
          name,
          email,
          message
        });

        // Show Success Modal
        if (successModal) {
          successModal.classList.add('open');
        }

        // Reset form
        form.reset();
        
        // Remove active state styling from radio/checkbox buttons if reset didn't catch it
        const checkInputs = form.querySelectorAll('input[type="checkbox"], input[type="radio"]');
        checkInputs.forEach(input => {
          // Trigger style updates if needed
        });
      }
    });
  }

  // Close Modal Action
  if (closeModalBtn && successModal) {
    closeModalBtn.addEventListener('click', () => {
      successModal.classList.remove('open');
    });

    // Close on click outside modal card
    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) {
        successModal.classList.remove('open');
      }
    });
  }
});
