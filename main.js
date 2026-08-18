// JavaScript behavior for Arivakam Redesign (2026 Standard)

document.addEventListener("DOMContentLoaded", () => {
  // Sticky header scroll behavior
  const header = document.querySelector(".site-header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Mobile Hamburger Toggle
  const hamburger = document.querySelector(".hamburger");
  const body = document.body;
  if (hamburger) {
    hamburger.addEventListener("click", () => {
      body.classList.toggle("mobile-menu-active");
    });
  }

  // Close mobile menu on clicking nav link
  const navLinks = document.querySelectorAll(".nav-item a");
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      body.classList.remove("mobile-menu-active");
    });
  });

  // Intersection Observer for scroll fade-in animation
  const animatedElements = document.querySelectorAll(".scroll-animate");
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        scrollObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  });

  animatedElements.forEach(el => scrollObserver.observe(el));

  // Stats Counter Animation
  const statsElements = document.querySelectorAll(".stat-number");
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const targetElement = entry.target;
        const targetValue = parseInt(targetElement.getAttribute("data-target"), 10);
        let startValue = 0;
        const duration = 1500; // 1.5s animation
        const stepTime = Math.abs(Math.floor(duration / targetValue));
        
        // Safety step limit for high numbers
        const increment = targetValue > 1000 ? Math.ceil(targetValue / 100) : 1;
        const intervalTime = targetValue > 1000 ? 15 : stepTime;

        const timer = setInterval(() => {
          startValue += increment;
          if (startValue >= targetValue) {
            targetElement.textContent = targetElement.getAttribute("data-target") + (targetElement.hasAttribute("data-plus") ? "+" : "");
            clearInterval(timer);
          } else {
            targetElement.textContent = startValue;
          }
        }, intervalTime);
        
        counterObserver.unobserve(targetElement);
      }
    });
  }, {
    threshold: 0.5
  });

  statsElements.forEach(stat => counterObserver.observe(stat));

  // Accordion Toggle for FAQs
  const faqQuestions = document.querySelectorAll(".faq-question");
  faqQuestions.forEach(question => {
    question.addEventListener("click", () => {
      const item = question.parentElement;
      const isActive = item.classList.contains("active");

      // Close all active faq items first
      document.querySelectorAll(".faq-item").forEach(el => {
        el.classList.remove("active");
      });

      // Toggle current item
      if (!isActive) {
        item.classList.add("active");
      }
    });
  });
});
