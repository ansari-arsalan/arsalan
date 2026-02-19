(() => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();

(() => {
  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("primaryNav");
  const backdrop = document.getElementById("menuBackdrop");
  const drawerClose = document.getElementById("drawerClose");

  if (!toggle || !nav) return;

  const isOpen = () => document.body.classList.contains("menu-open");

  const openMenu = () => {
    document.body.classList.add("menu-open");
    toggle.setAttribute("aria-expanded", "true");
    nav.setAttribute("aria-hidden", "false");
  };

  const closeMenu = () => {
    document.body.classList.remove("menu-open");
    toggle.setAttribute("aria-expanded", "false");
    nav.setAttribute("aria-hidden", "true");
  };

  toggle.addEventListener("click", () => {
    if (isOpen()) closeMenu();
    else openMenu();
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  backdrop?.addEventListener("click", closeMenu);
  drawerClose?.addEventListener("click", closeMenu);

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isOpen()) closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) closeMenu();
  });

  closeMenu();
})();

(() => {
  const root = document.documentElement;
  const btn = document.getElementById("themeToggle");
  if (!btn) return;

  const icon = btn.querySelector(".theme-icon");
  const media = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

  const getSystemTheme = () => (media && media.matches ? "dark" : "light");
  const getCurrent = () => root.getAttribute("data-theme") || getSystemTheme();

  const renderIcon = () => {
    const current = getCurrent();
    if (icon) icon.textContent = current === "dark" ? "☀" : "☾";
    btn.setAttribute("aria-label", current === "dark" ? "Switch to light mode" : "Switch to dark mode");
  };

  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") {
    root.setAttribute("data-theme", saved);
  }
  renderIcon();

  btn.addEventListener("click", () => {
    const next = getCurrent() === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    renderIcon();
  });

  if (media && media.addEventListener) {
    media.addEventListener("change", () => {
      if (!localStorage.getItem("theme")) renderIcon();
    });
  }
})();

(() => {
  const revealEls = Array.from(document.querySelectorAll(".reveal"));
  if (!revealEls.length || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("in"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.18 }
  );

  revealEls.forEach((el) => observer.observe(el));
})();

(() => {
  const sectionIds = ["about", "experience", "projects", "languages", "leadership", "contact"];
  const links = Array.from(document.querySelectorAll(".primary-nav a"));
  if (!links.length || !("IntersectionObserver" in window)) return;

  const byId = new Map();
  links.forEach((link) => {
    const id = link.getAttribute("href")?.slice(1);
    if (!id) return;
    if (!byId.has(id)) byId.set(id, []);
    byId.get(id).push(link);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        links.forEach((link) => {
          link.classList.remove("is-active");
          link.removeAttribute("aria-current");
        });
        (byId.get(id) || []).forEach((link) => {
          link.classList.add("is-active");
          link.setAttribute("aria-current", "page");
        });
      });
    },
    { rootMargin: "-45% 0px -45% 0px", threshold: 0.01 }
  );

  sectionIds.forEach((id) => {
    const section = document.getElementById(id);
    if (section) observer.observe(section);
  });
})();

(() => {
  // Pause ticker on hover/focus for accessibility
  const ticker = document.querySelector('.hero-ticker');
  const track = document.querySelector('.ticker-track');
  if (!ticker || !track) return;
  ticker.addEventListener('mouseenter', () => track.style.animationPlayState = 'paused');
  ticker.addEventListener('mouseleave', () => track.style.animationPlayState = 'running');
})();

(() => {
  const hero = document.querySelector(".hero");
  if (!hero) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  let ticking = false;

  const updateHeroFx = () => {
    const rect = hero.getBoundingClientRect();
    const travel = Math.max(hero.offsetHeight * 0.8, 1);
    const progress = Math.min(Math.max(-rect.top / travel, 0), 1);

    const fade = 1 - progress * 0.9;
    const scale = 1.02 + progress * 0.12;

    hero.style.setProperty("--hero-fade", fade.toFixed(3));
    hero.style.setProperty("--hero-scale", scale.toFixed(3));

    ticking = false;
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateHeroFx);
  };

  updateHeroFx();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
})();

(() => {
  const chips = Array.from(document.querySelectorAll(".project-chip"));
  const cards = Array.from(document.querySelectorAll("#projectGrid .project-card"));

  if (!chips.length || !cards.length) return;

  const applyFilter = (filter) => {
    chips.forEach((chip) => {
      const active = chip.dataset.filter === filter;
      chip.classList.toggle("is-active", active);
      chip.setAttribute("aria-pressed", String(active));
    });

    cards.forEach((card) => {
      const tags = (card.dataset.tags || "").split(/\s+/).filter(Boolean);
      const show = filter === "all" || tags.includes(filter);
      card.dataset.hidden = show ? "false" : "true";
    });
  };

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      applyFilter(chip.dataset.filter || "all");
    });
  });

  applyFilter("all");
})();

(() => {
  const copyButtons = Array.from(document.querySelectorAll(".copy-btn"));
  const statusEl = document.getElementById("copyStatus");

  if (!copyButtons.length || !statusEl) return;

  const setStatus = (text) => {
    statusEl.textContent = text;
    window.clearTimeout(setStatus.timeout);
    setStatus.timeout = window.setTimeout(() => {
      statusEl.textContent = "";
    }, 2200);
  };

  const fallbackCopy = (text) => {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    let ok = false;
    try {
      ok = document.execCommand("copy");
    } catch {
      ok = false;
    }
    document.body.removeChild(ta);
    return ok;
  };

  copyButtons.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const text = btn.dataset.copy || "";
      if (!text) return;

      let copied = false;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        try {
          await navigator.clipboard.writeText(text);
          copied = true;
        } catch {
          copied = fallbackCopy(text);
        }
      } else {
        copied = fallbackCopy(text);
      }

      setStatus(copied ? `Copied: ${text}` : "Could not copy. Please copy manually.");
    });
  });
})();
