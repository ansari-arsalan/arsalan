document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("hamburger");
    const navOverlay = document.getElementById("navOverlay");
    const nameElement = document.getElementById("animated-name");
    const names = ['Arsalan', 'ارسلان'];
    let index = 0;
  
    // Toggle nav overlay
    hamburger?.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navOverlay.classList.toggle("open");
    });
  
    // Close overlay on link click
    navOverlay?.querySelectorAll("a").forEach(link =>
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navOverlay.classList.remove("open");
      })
    );
  
    // Animate name change every 1s
    setInterval(() => {
      if (nameElement) {
        index = (index + 1) % names.length;
        nameElement.textContent = names[index];
      }
    }, 1000);
  });

  document.addEventListener("DOMContentLoaded", () => {
    const nameElement = document.getElementById("animated-name");
  
    if (!nameElement) {
      console.error("Element with id 'animated-name' not found.");
      return;
    }
  
    const names = ["Arsalan", "ارسلان"];
    let nameIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
  
    const typingSpeed = 400;
    const erasingSpeed = 200;
    const pauseDelay = 3000;
  
    function typeLoop() {
      const currentName = names[nameIndex];
  
      if (!isDeleting) {
        nameElement.textContent = currentName.substring(0, charIndex + 1);
        charIndex++;
  
        if (charIndex === currentName.length) {
          isDeleting = true;
          setTimeout(typeLoop, pauseDelay);
        } else {
          setTimeout(typeLoop, typingSpeed);
        }
      } else {
        nameElement.textContent = currentName.substring(0, charIndex - 1);
        charIndex--;
  
        if (charIndex === 0) {
          isDeleting = false;
          nameIndex = (nameIndex + 1) % names.length;
          setTimeout(typeLoop, typingSpeed);
        } else {
          setTimeout(typeLoop, erasingSpeed);
        }
      }
    }
  
    setTimeout(typeLoop, 1000);
  });
  
  function getRandomSpeed(baseSpeed, variation = 100) {
    return baseSpeed + Math.random() * variation;
  }
  
  setTimeout(typeLoop, getRandomSpeed(typingSpeed));

  document.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById("carouselTrack");
    const slides = Array.from(track.children);
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
  
    let currentIndex = 0;
  
    const getSlidesToShow = () => (window.innerWidth <= 768 ? 1 : 2);
    const slideWidth = () => slides[0].getBoundingClientRect().width;
  
    const updateCarousel = () => {
      const slideCount = getSlidesToShow();
      const offset = currentIndex * slideWidth();
      track.style.transform = `translateX(-${offset}px)`;
    };
  
    const moveToNext = () => {
      const maxIndex = slides.length - getSlidesToShow();
      currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
      updateCarousel();
    };
  
    const moveToPrev = () => {
      const maxIndex = slides.length - getSlidesToShow();
      currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
      updateCarousel();
    };
  
    nextBtn.addEventListener("click", moveToNext);
    prevBtn.addEventListener("click", moveToPrev);
  
    // Auto-slide
    setInterval(moveToNext, 4000);
  
    // Adjust on resize
    window.addEventListener("resize", updateCarousel);
    updateCarousel();
  });
  