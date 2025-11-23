// Year in footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// Smooth scroll for sidebar nav
const navLinks = document.querySelectorAll(".nav-link");
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

// Highlight active nav on scroll
const sections = document.querySelectorAll("main .section");
function updateActiveLink() {
    let currentId = "";
    sections.forEach(sec => {
        const rect = sec.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) {
            currentId = "#" + sec.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === currentId);
    });
}
window.addEventListener("scroll", updateActiveLink);
updateActiveLink();

// Scroll-to-top button
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
    scrollBtn.addEventListener("click", () =>
        window.scrollTo({ top: 0, behavior: "smooth" })
    );
}

// Typing effect: "Open to work as ..."
const heroTypingSpan = document.querySelector(".hero-typing");
if (heroTypingSpan) {
    const texts = JSON.parse(heroTypingSpan.getAttribute("data-text") || "[]");
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function type() {
        const currentWord = texts[wordIndex] || "";
        const visible = currentWord.substring(0, charIndex);
        heroTypingSpan.textContent = visible;

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

    if (texts.length) type();
}
