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
  const isMobile = () => window.innerWidth <= 760;

  const openMenu = () => {
    document.body.classList.add("menu-open");
    toggle.setAttribute("aria-expanded", "true");
    nav.setAttribute("aria-hidden", "false");
  };

  const closeMenu = () => {
    document.body.classList.remove("menu-open");
    toggle.setAttribute("aria-expanded", "false");
    if (isMobile()) nav.setAttribute("aria-hidden", "true");
    else nav.removeAttribute("aria-hidden");
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
    closeMenu();
  });

  closeMenu();
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
      card.dataset.hidden = filter === "all" || tags.includes(filter) ? "false" : "true";
    });
  };

  chips.forEach((chip) => {
    chip.addEventListener("click", () => applyFilter(chip.dataset.filter || "all"));
  });

  applyFilter("all");
})();
