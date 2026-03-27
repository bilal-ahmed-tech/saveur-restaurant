const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validators = Object.freeze({
  name:   { validate: (v) => v.trim().length >= 3,    message: "Name must be at least 3 characters."  },
  email:  { validate: (v) => EMAIL_RE.test(v.trim()), message: "Please enter a valid email address."  },
  phone:  { validate: (v) => v.trim().length >= 7,    message: "Please enter a valid phone number."   },
  date:   { validate: (v) => v !== "",                message: "Please select a date."                },
  time:   { validate: (v) => v !== "",                message: "Please select a time."                },
  guests: { validate: (v) => v !== "",                message: "Please select number of guests."      },
});

function validateTimeForDate(dateVal, timeVal) {
  if (!dateVal || !timeVal) return null;
  const today = new Date().toISOString().split("T")[0];
  if (dateVal !== today) return null;
  const [hours, minutes] = timeVal.split(":").map(Number);
  const now = new Date();
  const selected = new Date();
  selected.setHours(hours, minutes, 0, 0);
  return selected <= now ? "Selected time has already passed. Please choose a later time." : null;
}

document.addEventListener("DOMContentLoaded", () => {

  // ============================================
  // NAVBAR — FULLSCREEN OVERLAY MENU
  // ============================================
  const toggler     = document.getElementById("navToggler");
  const navOverlay  = document.getElementById("navOverlay");
  const togglerOpen  = document.querySelector(".toggler-open");
  const togglerClose = document.querySelector(".toggler-close");

  if (toggler && navOverlay) {
    function openMenu() {
      navOverlay.classList.add("open");
      navOverlay.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      togglerOpen.classList.add("d-none");
      togglerClose.classList.remove("d-none");
    }

    function closeMenu() {
      navOverlay.classList.remove("open");
      navOverlay.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      togglerOpen.classList.remove("d-none");
      togglerClose.classList.add("d-none");
    }

    toggler.addEventListener("click", () => {
      navOverlay.classList.contains("open") ? closeMenu() : openMenu();
    });

    navOverlay.addEventListener("click", (e) => {
      if (e.target.closest("a")) closeMenu();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navOverlay.classList.contains("open")) {
        closeMenu();
      }
    });

    window.matchMedia("(min-width: 992px)").addEventListener("change", (e) => {
      if (e.matches) closeMenu();
    });
  }

  // ============================================
  // ACTIVE NAV LINK ON SCROLL
  // ============================================
  const sections = document.querySelectorAll("section[id]");
  const navLinks  = document.querySelectorAll(".nav-link");

  if (sections.length && navLinks.length) {
    const setActiveLink = (id) => {
      navLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${id}`;
        link.classList.toggle("active", isActive);
        isActive
          ? link.setAttribute("aria-current", "page")
          : link.removeAttribute("aria-current");
      });
    };

    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveLink(entry.target.id);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40% 0px" }
    );

    sections.forEach((s) => navObserver.observe(s));
  }

  // ============================================
  // MENU TABS
  // ============================================
  const menuTabsEl = document.querySelector(".menu-tabs");
  const menuItems  = document.querySelectorAll(".menu-item");

  if (menuTabsEl && menuItems.length) {
    const allTabs = menuTabsEl.querySelectorAll(".menu-tab");

    menuTabsEl.addEventListener("click", (e) => {
      const clicked = e.target.closest(".menu-tab");
      if (!clicked) return;

      allTabs.forEach((t) => t.classList.remove("active"));
      clicked.classList.add("active");

      const category = clicked.dataset.category;
      menuItems.forEach((item) =>
        item.classList.toggle("d-none", item.dataset.category !== category)
      );
    });
  }

  // ============================================
  // GALLERY LIGHTBOX
  // ============================================
  const gallery       = document.querySelector(".gallery-grid");
  const lightbox      = document.querySelector("#lightbox");
  const lightboxImg   = document.querySelector("#lightbox-img");
  const lightboxClose = document.querySelector("#lightbox-close");

  if (gallery && lightbox) {
    function openLightbox(img) {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add("active");
      document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
      lightbox.classList.remove("active");
      document.body.style.overflow = "";
      lightboxImg.src = "";
    }

    gallery.addEventListener(
      "click",
      (e) => {
        const img = e.target.closest(".gallery-item")?.querySelector("img");
        if (img) openLightbox(img);
      },
      { passive: true }
    );

    lightboxClose?.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && lightbox.classList.contains("active")) {
        closeLightbox();
      }
    });
  }

  // ============================================
  // SCROLL REVEAL
  // ============================================
  const revealEls = document.querySelectorAll("[data-reveal]");

  if (revealEls.length) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealEls.forEach((el) => revealObserver.observe(el));
  }

  // ============================================
  // RESERVATION FORM
  // ============================================
  const reservationForm = document.getElementById("reservation-form");
  const reserveMsg      = document.getElementById("reserve-msg");
  const dateInput       = document.getElementById("res-date");

  if (dateInput) {
    dateInput.setAttribute("min", new Date().toISOString().split("T")[0]);
  }

  if (reservationForm && reserveMsg) {
    reservationForm.addEventListener("input", (e) => {
      const input = e.target;
      if (!input.classList.contains("form-input")) return;

      const rule = validators[input.name];
      if (rule) {
        input.style.borderColor = rule.validate(input.value)
          ? "var(--primary)"
          : "var(--border)";
      }

        if (input.name === "date" || input.name === "time") {
        const dateVal = reservationForm.querySelector("[name='date']")?.value;
        const timeVal = reservationForm.querySelector("[name='time']")?.value;
        const timeInput = reservationForm.querySelector("[name='time']");
        if (timeVal && timeInput) {
          const timeError = validateTimeForDate(dateVal, timeVal);
          timeInput.style.borderColor = timeError ? "#e74c3c" : "var(--primary)";
        }
      }
    });

    reservationForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const reserveBtn = document.getElementById("reserve-btn");
      const inputs     = reservationForm.querySelectorAll(".form-input");
      let allValid   = true;
      let firstError = "";

      inputs.forEach((input) => {
        const rule = validators[input.name];
        if (rule && !rule.validate(input.value)) {
          allValid = false;
          input.style.borderColor = "#e74c3c";
          if (!firstError) firstError = rule.message;
        } else if (rule) {
          input.style.borderColor = "var(--primary)";
        }
      });

      if (allValid) {
        const dateVal = reservationForm.querySelector("[name='date']")?.value;
        const timeVal = reservationForm.querySelector("[name='time']")?.value;
        const timeError = validateTimeForDate(dateVal, timeVal);
        if (timeError) {
          allValid = false;
          firstError = timeError;
          reservationForm.querySelector("[name='time']").style.borderColor = "#e74c3c";
        }
      }

      if (!allValid) {
        reserveMsg.textContent = firstError;
        reserveMsg.className   = "reserve-msg error";
        return;
      }

      reserveBtn.disabled  = true;
      reserveBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Confirming...`;

      setTimeout(() => {
        reserveMsg.textContent = "Your table has been reserved! We will confirm via email shortly.";
        reserveMsg.className   = "reserve-msg success";

        inputs.forEach((input) => {
          input.value             = "";
          input.style.borderColor = "var(--border)";
        });

        reserveBtn.disabled  = false;
        reserveBtn.innerHTML = `<i class="fa-solid fa-calendar-check"></i> Confirm Reservation`;

        setTimeout(() => {
          reserveMsg.textContent = "";
          reserveMsg.className   = "reserve-msg";
        }, 5000);
      }, 1200);
    });
  }

  // ============================================
  // NAVBAR SCROLL EFFECT
  // ============================================
  const navbar = document.querySelector(".navbar");

  if (navbar) {
    const handleNavScroll = () =>
      navbar.classList.toggle("scrolled", window.scrollY > 80);

    window.addEventListener("scroll", handleNavScroll, { passive: true });
    handleNavScroll();
  }

  // ============================================
  // COPYRIGHT YEAR
  // ============================================
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});