document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navOverlay = document.getElementById('navOverlay');
  const nameElement = document.getElementById('animated-name');

  hamburger?.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.classList.toggle('active');
    navOverlay.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', (!expanded).toString());
  });

  navOverlay?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navOverlay.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  if (nameElement) {
    const names = ['Arsalan', 'ارسلان'];
    let nameIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typingSpeed = 150;
    const erasingSpeed = 100;
    const pauseDelay = 2000;

    const type = () => {
      const current = names[nameIndex];
      if (!isDeleting) {
        nameElement.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === current.length) {
          isDeleting = true;
          setTimeout(type, pauseDelay);
        } else {
          setTimeout(type, typingSpeed);
        }
      } else {
        nameElement.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          nameIndex = (nameIndex + 1) % names.length;
          setTimeout(type, typingSpeed);
        } else {
          setTimeout(type, erasingSpeed);
        }
      }
    };

    type();
  }
});
