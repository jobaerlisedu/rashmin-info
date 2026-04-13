(function () {
  "use strict";

  /* =============================
   Header toggle
  ============================== */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header')?.classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }

  if (headerToggleBtn) {
    headerToggleBtn.addEventListener('click', headerToggle);
  }

  /* =============================
   Hide mobile nav on link click
  ============================== */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });
  });

  /* =============================
   Preloader
  ============================== */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => preloader.remove());
  }

  /* =============================
   Scroll top button
  ============================== */
  const scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (!scrollTop) return;
    window.scrollY > 100
      ? scrollTop.classList.add('active')
      : scrollTop.classList.remove('active');
  }

  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /* =============================
   BLOG AOS SETUP (FIXED)
  ============================== */
  function setupBlogAOS() {
    const blogItems = document.querySelectorAll('.blog .blog-item');

    if (blogItems.length) {
      blogItems.forEach((item, index) => {
        item.setAttribute('data-aos', 'fade-up');
        item.setAttribute('data-aos-delay', (index % 3) * 100);
      });

      // IMPORTANT
      AOS.refreshHard();
    }
  }

  /* =============================
   AOS GLOBAL INIT (ONLY ONCE)
  ============================== */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: true,
      mirror: false,
      offset: 100
    });

    setupBlogAOS();
  });

  /* =============================
   Typed.js
  ============================== */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items').split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /* =============================
   Pure Counter
  ============================== */
  if (typeof PureCounter !== "undefined") {
    new PureCounter();
  }

  /* =============================
   Skills animation
  ============================== */
  document.querySelectorAll('.skills-animation').forEach(item => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function () {
        item.querySelectorAll('.progress .progress-bar').forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /* =============================
   GLightbox
  ============================== */
  if (typeof GLightbox !== "undefined") {
    GLightbox({ selector: '.glightbox' });
  }

  /* =============================
   Swiper
  ============================== */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(swiperElement => {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );
      new Swiper(swiperElement, config);
    });
  }
  window.addEventListener("load", initSwiper);

  /* =============================
   Scrollspy
  ============================== */
  const navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(link => {
      if (!link.hash) return;
      const section = document.querySelector(link.hash);
      if (!section) return;

      const position = window.scrollY + 200;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        document.querySelectorAll('.navmenu a.active')
          .forEach(active => active.classList.remove('active'));
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

document.querySelectorAll('.blog-item, .blog-details').forEach(container => {
  // If on listing page, get URL from the title link. If on detail page, use current URL.
  const linkElement = container.querySelector('.post-title a');
  const url = linkElement ? linkElement.href : window.location.href;
  const title = container.querySelector('h2, h3').innerText;

  const twitterBtn = container.querySelector('.share-twitter');
  const linkedinBtn = container.querySelector('.share-linkedin');
  const shareBtn = container.querySelector('.share-general');

  if (twitterBtn) {
    twitterBtn.setAttribute('href', `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`);
    twitterBtn.setAttribute('target', '_blank');
  }
  
  if (linkedinBtn) {
    linkedinBtn.setAttribute('href', `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`);
    linkedinBtn.setAttribute('target', '_blank');
  }

  if (shareBtn) {
    shareBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (navigator.share) {
        navigator.share({ title: title, url: url }).catch(console.error);
      } else {
        // Fallback: Copy to clipboard
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
      }
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.blog-details, .blog-item').forEach(container => {
        // Find the URL: Use the link in the title if on listing page, otherwise use current URL
        const titleLink = container.querySelector('.post-title a');
        const url = titleLink ? titleLink.href : window.location.href;
        const title = container.querySelector('h2, h3').innerText;

        // Select the buttons
        const twitterBtn = container.querySelector('.bi-twitter-x')?.parentElement;
        const linkedinBtn = container.querySelector('.bi-linkedin')?.parentElement;
        const shareBtn = container.querySelector('.bi-share')?.parentElement;

        if (twitterBtn) {
            twitterBtn.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
            twitterBtn.target = "_blank";
        }
        
        if (linkedinBtn) {
            // Updated to use the 2026-standard LinkedIn share URL
            linkedinBtn.href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
            linkedinBtn.target = "_blank";
        }

        if (shareBtn) {
            shareBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (navigator.share) {
                    navigator.share({ title: title, url: url }).catch(() => {});
                } else {
                    navigator.clipboard.writeText(url);
                    alert('Link copied to clipboard!');
                }
            });
        }
    });
});