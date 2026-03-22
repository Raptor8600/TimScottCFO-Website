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
    
    const btnDefault = document.getElementById('btn-default');
    const btnGmail = document.getElementById('btn-gmail');
    const btnOutlook = document.getElementById('btn-outlook');

    if (contactForm) {
        
        const handleSend = (method, btnElement) => {
            // Trigger native HTML5 validation UI if fields are missing
            if (!contactForm.reportValidity()) return;
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const company = document.getElementById('company').value;
            const message = document.getElementById('message').value;

            // Generate email content
            const subject = encodeURIComponent(`Website Inquiry from ${name}`);
            let bodyText = `Name: ${name}\nEmail: ${email}\n`;
            if (company) bodyText += `Company: ${company}\n`;
            bodyText += `\nMessage:\n${message}`;

            let sendUrl = '';
            if (method === 'default') {
                sendUrl = `mailto:timscottcfo@gmail.com?subject=${subject}&body=${encodeURIComponent(bodyText)}`;
            } else if (method === 'gmail') {
                sendUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=timscottcfo@gmail.com&su=${subject}&body=${encodeURIComponent(bodyText)}`;
            } else if (method === 'outlook') {
                sendUrl = `https://outlook.live.com/mail/0/deeplink/compose?to=timscottcfo@gmail.com&subject=${subject}&body=${encodeURIComponent(bodyText)}`;
            }

            // Simulate sending visual state
            const btnText = btnElement.querySelector('span');
            const originalText = btnText.textContent;
            btnText.textContent = 'Preparing Draft...';
            btnElement.style.opacity = '0.7';
            
            formStatus.textContent = 'Opening your email client...';
            formStatus.style.color = '#10B981'; // success green

            // Trigger the email client draft
            setTimeout(() => {
                // Open web links in a new tab, open mailto in the same window
                if (method === 'default') {
                    window.location.href = sendUrl;
                } else {
                    window.open(sendUrl, '_blank');
                }
                
                // Reset Button
                btnText.textContent = originalText;
                btnElement.style.opacity = '1';

                // Clear status message after a few seconds
                setTimeout(() => {
                    formStatus.textContent = '';
                }, 4000);
            }, 600);
        };

        if (btnDefault) btnDefault.addEventListener('click', () => handleSend('default', btnDefault));
        if (btnGmail) btnGmail.addEventListener('click', () => handleSend('gmail', btnGmail));
        if (btnOutlook) btnOutlook.addEventListener('click', () => handleSend('outlook', btnOutlook));
    }
});
