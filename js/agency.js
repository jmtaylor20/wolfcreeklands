(() => {
  if (!document.querySelector('link[rel~="icon"]')) {
    const favicon = document.createElement("link");
    favicon.rel = "icon";
    favicon.type = "image/png";
    favicon.href = "assets/logo/wolf-creek-logo.png";
    document.head.append(favicon);
  }

  const nav = document.querySelector(".nav");
  const toggle = document.querySelector(".menu-toggle");

  if (nav && toggle && !toggle.dataset.agencyBound) {
    toggle.dataset.agencyBound = "true";
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((link) => {
    const target = (link.getAttribute("href") || "").split("#")[0];
    if (target === current || (current === "" && target === "index.html")) {
      link.setAttribute("aria-current", "page");
    }
  });

  const candidates = document.querySelectorAll(
    ".section-head, .feature, .service-card, .project-card, .case-card, .step, .why-card, .promise-card, .faq-item, .timeline-item, .info-box, .type-card, .use-card, .problem-card"
  );

  if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  document.documentElement.classList.add("reveal-ready");
  candidates.forEach((element) => element.setAttribute("data-reveal", ""));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -42px" }
  );

  candidates.forEach((element) => observer.observe(element));
})();
