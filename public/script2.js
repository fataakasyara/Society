document.addEventListener('DOMContentLoaded', function() {
    // Scroll down button functionality
    document.getElementById('scrollDown').addEventListener('click', function() {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if(this.getAttribute('href') === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });


// Add active class to navigation items based on scroll position
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-item');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('bg-blue-600');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('bg-blue-600');
        }
    });
});

// Add some visual effects based on scroll
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const videoOpacity = 1 - (scrollPosition / 1000);
    
    // Adjust video opacity on scroll
    document.getElementById('bg-video').style.opacity = videoOpacity > 0.3 ? videoOpacity : 0.3;
    
    // Parallax effect for certain elements
    document.querySelectorAll('.floating').forEach(element => {
        const speed = element.getAttribute('data-speed') || 0.1;
        element.style.transform = `translateY(${scrollPosition * speed}px)`;
    });
});

// Add glitch effect to hero title on hover
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    heroTitle.addEventListener('mouseover', () => {
        heroTitle.classList.add('glitch');
        heroTitle.setAttribute('data-text', heroTitle.textContent);
    });
    
    heroTitle.addEventListener('mouseout', () => {
        heroTitle.classList.remove('glitch');
    });
}

// Initialize AOS animation library if imported
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });
}

// Simple form validation for the volunteer section
const applyButton = document.querySelector('.cyber-button');
if (applyButton) {
    applyButton.addEventListener('click', () => {
        // You can replace this with actual form submission logic
        Swal.fire({
            title: 'Join Blue Nation',
            html: `
                <div class="text-left">
                    <div class="mb-3">
                        <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input type="text" id="name" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                    <div class="mb-3">
                        <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input type="email" id="email" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                    <div class="mb-3">
                        <label class="block text-sm font-medium text-gray-700 mb-1">I'm interested in:</label>
                        <select id="interest" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="moderator">Event Moderator</option>
                            <option value="speaker">Event Speaker</option>
                            <option value="developer">Developer</option>
                            <option value="designer">Designer</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>
            `,
            background: '#0f172a',
            color: '#ffffff',
            confirmButtonText: 'Submit Application',
            confirmButtonColor: '#2563eb',
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            cancelButtonColor: '#334155',
            preConfirm: () => {
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                
                if (!name || !email) {
                    Swal.showValidationMessage('Please fill in all required fields');
                    return false;
                }
                
                return {
                    name: name,
                    email: email,
                    interest: document.getElementById('interest').value
                };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Thank You!',
                    text: 'Your application has been submitted. We will contact you shortly.',
                    icon: 'success',
                    background: '#0f172a',
                    color: '#ffffff',
                    confirmButtonColor: '#2563eb'
                });
            }
        });
    });
}
});