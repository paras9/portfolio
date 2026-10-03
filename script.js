const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  });
});

// Reveal sections as they enter the viewport.
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}

// Highlight the navigation item for the section currently in view.
const sections = document.querySelectorAll("main section[id]");
const navigationItems = document.querySelectorAll(".nav-links a");

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        navigationItems.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${entry.target.id}`
          );
        });
      });
    },
    { rootMargin: "-35% 0px -55% 0px" }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

// Project filtering.
const filterButtons = document.querySelectorAll(".filter");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    projectCards.forEach((card) => {
      const shouldShow =
        filter === "all" || card.dataset.category === filter;

      card.classList.toggle("hidden", !shouldShow);
    });
  });
});

// Project detail modal.
const modal = document.querySelector("#project-modal");
const modalTitle = document.querySelector("#modal-title");
const modalType = document.querySelector("#modal-type");
const modalDescription = document.querySelector("#modal-description");
const modalFocus = document.querySelector("#modal-focus");
const modalTags = document.querySelector("#modal-tags");

const projectDetails = {
  reporting: {
    type: "BACKEND",
    title: "BFUI Reporting Backend",
    description:
      "Backend engineering work around reporting APIs, device/report operations, request handling and database-backed workflows.",
    focus:
      "API design, service-layer logic, relational database integration, pagination/filtering and maintainable backend code.",
    tags: ["Go", "Gin", "GORM", "REST", "SQL"]
  },
  automation: {
    type: "AUTOMATION",
    title: "API Automation Framework",
    description:
      "Automation workflow for executing large API collections in a repeatable CI environment with dependency handling, retries and generated reports.",
    focus:
      "Reliable collection execution, environment initialization, cleanup, failure handling and CI-friendly reporting.",
    tags: ["Go", "Postman", "Newman", "Jenkins", "CI/CD"]
  },
  csv: {
    type: "DATA / BACKEND",
    title: "Large CSV Processing",
    description:
      "A backend processing approach for large CSV datasets designed around streaming instead of loading the complete file into memory.",
    focus:
      "Streaming input, batch database writes and bounded concurrency using worker-based processing.",
    tags: ["Go", "Streaming", "Workers", "Batching", "SQL"]
  },
  coverage: {
    type: "TESTING",
    title: "Coverage & Test Reporting",
    description:
      "A workflow for running automated tests and producing coverage and HTML reporting artifacts for CI-oriented visibility.",
    focus:
      "Unit test execution, coverage data generation, report artifact creation and reliable output-path handling.",
    tags: ["Go", "Testing", "Coverage", "HTML", "CI"]
  }
};

document.querySelectorAll(".project-details").forEach((button) => {
  button.addEventListener("click", () => {
    const project = button.closest(".project-card").dataset.project;
    const data = projectDetails[project];

    if (!data) return;

    modalType.textContent = data.type;
    modalTitle.textContent = data.title;
    modalDescription.textContent = data.description;
    modalFocus.textContent = data.focus;
    modalTags.innerHTML = data.tags.map((tag) => `<span>${tag}</span>`).join("");

    modal.showModal();
  });
});

document.querySelector(".modal-close").addEventListener("click", () => {
  modal.close();
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.close();
  }
});
