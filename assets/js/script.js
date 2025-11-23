// ===== MOBILE NAV TOGGLE =====
const navToggle = document.getElementById("navToggle");
const nav = document.getElementById("mainNav");

if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
        nav.classList.toggle("open");
    });

    // Close menu when a link is clicked (on mobile)
    nav.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => nav.classList.remove("open"));
    });
}

// ===== SMOOTH SCROLL + ACTIVE LINK =====
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section");

navLinks.forEach(link => {
    link.addEventListener("click", e => {
        const href = link.getAttribute("href");
        if (href && href.startsWith("#")) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        }
    });
});

function updateActiveNav() {
    let currentId = "";
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) {
            currentId = "#" + section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === currentId);
    });
}

window.addEventListener("scroll", updateActiveNav);
updateActiveNav();

// ===== SCROLL TO TOP BUTTON =====
const scrollBtn = document.getElementById("scrollToTop");
window.addEventListener("scroll", () => {
    if (!scrollBtn) return;
    if (window.scrollY > 400) {
        scrollBtn.classList.add("show");
    } else {
        scrollBtn.classList.remove("show");
    }
});

if (scrollBtn) {
    scrollBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// ===== TYPING EFFECT IN HERO =====
const typingSpan = document.querySelector(".typing");

if (typingSpan) {
    const texts = JSON.parse(typingSpan.getAttribute("data-text") || "[]");
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function type() {
        const currentWord = texts[wordIndex] || "";
        const visibleText = currentWord.substring(0, charIndex);
        typingSpan.textContent = visibleText;

        if (!deleting && charIndex < currentWord.length) {
            charIndex++;
        } else if (deleting && charIndex > 0) {
            charIndex--;
        } else {
            if (!deleting) {
                deleting = true;
                setTimeout(type, 1000);
                return;
            } else {
                deleting = false;
                wordIndex = (wordIndex + 1) % texts.length;
            }
        }

        const speed = deleting ? 60 : 120;
        setTimeout(type, speed);
    }

    if (texts.length > 0) {
        type();
    }
}

// ===== PROJECT FILTERS =====
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const filter = btn.getAttribute("data-filter");

        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        projectCards.forEach(card => {
            const category = card.getAttribute("data-category");
            if (filter === "all" || filter === category) {
                card.classList.remove("hidden");
            } else {
                card.classList.add("hidden");
            }
        });
    });
});
