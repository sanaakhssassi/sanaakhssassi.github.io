document.addEventListener('DOMContentLoaded', function() {
    // Initialize project filtering
    initProjectFilter();

    // Initialize scroll animations
    initScrollAnimations();
});

// Function to handle project filtering
function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            // Show/hide project cards based on filter
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'flex';
                    // Trigger animation
                    setTimeout(() => {
                        card.classList.add('show');
                    }, 10); // Small delay for smoother effect
                } else {
                    card.classList.remove('show');
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300); // Wait for animation to finish before hiding
                }
            });
        });
    });
}

// Function to handle scroll-based animations
function initScrollAnimations() {
    const sections = document.querySelectorAll('.section');
    const projectCards = document.querySelectorAll('.project-card');

    // Observe sections for fade-in on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                sectionObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Observe project cards for staggered fade-in
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add a small delay for each card to create a staggered effect
                setTimeout(() => {
                    entry.target.classList.add('show');
                }, index * 100);
                projectObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    projectCards.forEach(card => {
        projectObserver.observe(card);
    });
}