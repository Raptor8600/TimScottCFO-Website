/// Created by Raptor8600 ///


document.addEventListener('DOMContentLoaded', () => {
    // Set Current Year in Footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Hamburger Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Close menu when a link is clicked (mobile)
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // Scroll Reveal Animation (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in, .slide-up');
    animatedElements.forEach(el => observer.observe(el));

    // Form Submission Handling
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const submitBtn = contactForm ? contactForm.querySelector('.btn-submit') : null;

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simple validation check
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (!name || !email || !message) {
                formStatus.textContent = 'Please fill out all required fields.';
                formStatus.style.color = '#ff4d4f'; // error red
                return;
            }

            const company = document.getElementById('company').value;

            // Simulate sending visual state
            const btnText = submitBtn.querySelector('span');
            const originalText = btnText.textContent;
            btnText.textContent = 'Preparing Email...';
            submitBtn.style.opacity = '0.7';
            submitBtn.disabled = true;

            // Generate mailto link
            const subject = encodeURIComponent(`Website Inquiry from ${name}`);
            let bodyText = `Name: ${name}\nEmail: ${email}\n`;
            if (company) bodyText += `Company: ${company}\n`;
            bodyText += `\nMessage:\n${message}`;

            const mailtoLink = `mailto:timscottcfo@gmail.com?subject=${subject}&body=${encodeURIComponent(bodyText)}`;

            // Trigger the email client draft
            setTimeout(() => {
                window.location.href = mailtoLink;

                formStatus.textContent = 'Opening your email client to send...';
                formStatus.style.color = '#10B981'; // success green
                // contactForm.reset();

                // Reset Button
                btnText.textContent = originalText;
                submitBtn.style.opacity = '1';
                submitBtn.disabled = false;

                // Clear status message after a few seconds
                setTimeout(() => {
                    formStatus.textContent = '';
                }, 5000);
            }, 800);
        });
    }
});
