// Leader Climat - Site Scripts

document.addEventListener('DOMContentLoaded', function () {

    // Initialize GLightbox if available
    if (typeof GLightbox !== 'undefined') {
        GLightbox({ selector: '.glightbox' });
    }

    // Navbar scroll effect
    var navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                navbar.classList.add('shadow');
            } else {
                navbar.classList.remove('shadow');
            }
        });
    }

    // Active nav link based on current page
    var currentPath = window.location.pathname;
    var navLinks = document.querySelectorAll('.navbar .nav-link');
    navLinks.forEach(function (link) {
        var href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '/' && href === '/')) {
            link.classList.add('active');
        }
    });

    // Simple counter animation for stat boxes
    var statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length > 0) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(function (el) {
            observer.observe(el);
        });
    }

    function animateCounter(el) {
        var text = el.textContent.trim();
        var match = text.match(/(\d+)/);
        if (!match) return;

        var target = parseInt(match[1]);
        var suffix = text.replace(match[1], '').trim();
        var current = 0;
        var increment = Math.max(1, Math.floor(target / 60));
        var timer = setInterval(function () {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            el.textContent = current + suffix;
        }, 30);
    }
});
