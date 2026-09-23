/* =========================================
   MEDICARE+ MAIN SCRIPT
   ========================================= */

/* =========================
   DARK MODE
   ========================= */

const themeToggle = document.getElementById("themeToggle");

function applyTheme(theme) {
    if (theme === "dark") {
        document.body.classList.add("dark-mode");

        if (themeToggle) {
            themeToggle.textContent = "☀️";
        }
    } else {
        document.body.classList.remove("dark-mode");

        if (themeToggle) {
            themeToggle.textContent = "🌙";
        }
    }
}

const savedTheme = localStorage.getItem("theme") || "light";
applyTheme(savedTheme);

if (themeToggle) {
    themeToggle.addEventListener("click", function () {
        const isDark = document.body.classList.contains("dark-mode");

        if (isDark) {
            localStorage.setItem("theme", "light");
            applyTheme("light");
        } else {
            localStorage.setItem("theme", "dark");
            applyTheme("dark");
        }
    });
}


/* =========================
   TOAST NOTIFICATION
   ========================= */

function showToast(message) {
    const toast = document.getElementById("toast");

    if (!toast) {
        return;
    }

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(function () {
        toast.classList.remove("show");
    }, 3000);
}


/* =========================
   NAVIGATION ACTIVE STATE
   ========================= */

const currentPage = window.location.pathname.split("/").pop();

const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach(function (link) {
    const linkPage = link.getAttribute("href");

    if (
        linkPage === currentPage ||
        (currentPage === "" && linkPage === "index.html")
    ) {
        link.classList.add("active");
    }
});


/* =========================
   SMOOTH SCROLL
   ========================= */

document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
        const targetId = this.getAttribute("href");

        if (targetId === "#") {
            return;
        }

        const target = document.querySelector(targetId);

        if (target) {
            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});


/* =========================
   SCROLL REVEAL
   ========================= */

const revealElements = document.querySelectorAll(
    ".feature-card, .service-card, .mission-card, .process-card, .work-step, .doctor-card"
);

if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {
                    entry.target.classList.add("fade-up");
                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.15
        }
    );

    revealElements.forEach(function (element) {
        observer.observe(element);
    });
}


/* =========================
   NAVBAR SCROLL EFFECT
   ========================= */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", function () {

    if (!navbar) {
        return;
    }

    if (window.scrollY > 30) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});


/* =========================
   MOBILE MENU
   ========================= */

const nav = document.querySelector("nav");
const navLinksContainer = document.querySelector(".nav-links");

if (nav && navLinksContainer) {

    const menuButton = document.createElement("button");

    menuButton.className = "mobile-menu-btn";
    menuButton.innerHTML = "☰";
    menuButton.setAttribute("aria-label", "Open navigation menu");

    nav.appendChild(menuButton);

    menuButton.addEventListener("click", function () {
        navLinksContainer.classList.toggle("mobile-open");

        if (navLinksContainer.classList.contains("mobile-open")) {
            menuButton.innerHTML = "✕";
        } else {
            menuButton.innerHTML = "☰";
        }
    });


    navLinksContainer.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", function () {
            navLinksContainer.classList.remove("mobile-open");
            menuButton.innerHTML = "☰";
        });

    });

}


/* =========================
   UPDATE YEAR
   ========================= */

const yearElements = document.querySelectorAll(".current-year");

yearElements.forEach(function (element) {
    element.textContent = new Date().getFullYear();
});


/* =========================
   FORM INPUT VALIDATION
   ========================= */

const mobileInput = document.getElementById("mobile");

if (mobileInput) {

    mobileInput.addEventListener("input", function () {

        this.value = this.value.replace(/\D/g, "");

        if (this.value.length > 10) {
            this.value = this.value.slice(0, 10);
        }

    });

}


/* =========================
   PAGE READY
   ========================= */

document.addEventListener("DOMContentLoaded", function () {

    const body = document.body;

    if (body) {
        body.classList.add("page-loaded");
    }

});