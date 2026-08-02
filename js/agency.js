(() => {
  if (!document.querySelector('link[rel~="icon"]')) {
    const favicon = document.createElement("link");
    favicon.rel = "icon";
    favicon.type = "image/png";
    favicon.href = "assets/logo/wolf-creek-logo.png";
    document.head.append(favicon);
  }

  const nav = document.querySelector(".nav");
  let toggle = document.querySelector(".menu-toggle");

  // Ensure every legacy page has the same accessible mobile-menu control.
  if (nav && !toggle) {
    toggle = document.createElement("button");
    toggle.className = "menu-toggle";
    toggle.type = "button";
    toggle.setAttribute("aria-label", "Open menu");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", "primary-navigation");
    toggle.innerHTML = "<span></span><span></span><span></span>";
    nav.insertBefore(toggle, nav.querySelector(".nav-links"));
  }

  if (nav && toggle) {
    // Remove the homepage's legacy inline listener, which toggled the menu a
    // second time and immediately closed it.
    const cleanToggle = toggle.cloneNode(true);
    toggle.replaceWith(cleanToggle);
    toggle = cleanToggle;
    toggle.type = "button";
    toggle.setAttribute("aria-controls", "primary-navigation");

    const links = nav.querySelector(".nav-links");
    if (links) links.id = "primary-navigation";

    const closeMenu = () => {
      nav.classList.remove("open");
      document.body.classList.remove("menu-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    };

    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      document.body.classList.toggle("menu-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    matchMedia("(min-width: 981px)").addEventListener("change", (event) => {
      if (event.matches) closeMenu();
    });
  }

  const canonicalPath = location.pathname === "/index.html"
    ? "/"
    : location.pathname.replace(/\.html$/, "");
  const canonicalUrl = `https://wolfcreeklands.com${canonicalPath}`;
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.append(canonical);
  }
  canonical.href = canonicalUrl;

  const socialMeta = {
    "og:type": "website",
    "og:site_name": "Wolf Creek Farms",
    "og:title": document.title,
    "og:description": document.querySelector('meta[name="description"]')?.content || "",
    "og:url": canonicalUrl,
    "og:image": "https://wolfcreeklands.com/assets/equipment/wolf-creek-hero-excavator.jpg"
  };
  Object.entries(socialMeta).forEach(([property, content]) => {
    let meta = document.querySelector(`meta[property="${property}"]`);
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("property", property);
      document.head.append(meta);
    }
    meta.content = content;
  });

  if (!document.querySelector('script[data-wcf-schema]')) {
    const schema = document.createElement("script");
    schema.type = "application/ld+json";
    schema.dataset.wcfSchema = "true";
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://wolfcreeklands.com/#business",
      name: "Wolf Creek Farms",
      url: "https://wolfcreeklands.com/",
      telephone: "+1-334-207-3331",
      email: "russ@wolfcreeklands.com",
      image: "https://wolfcreeklands.com/assets/equipment/wolf-creek-hero-excavator.jpg",
      description: "Land clearing, land preparation, road building, drainage, house pads, pond building, demolition, hunting land development, fire breaks, clay gravel and land management in East Central Alabama.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Notasulga",
        addressRegion: "AL",
        addressCountry: "US"
      },
      areaServed: ["Notasulga", "Tallassee", "Auburn", "Opelika", "Tuskegee", "Lake Martin", "Wetumpka", "Eclectic", "Shorter", "Pike Road", "East Central Alabama"],
      priceRange: "$$"
    });
    document.head.append(schema);
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
