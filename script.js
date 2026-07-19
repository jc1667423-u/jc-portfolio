// ============================================
// PORTAFOLIO PROFESIONAL - JAVASCRIPT
// ============================================

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {

    // ============================================
    // NAVEGACIÓN
    // ============================================

    // Header scroll effect
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Cerrar menú al hacer click en un enlace
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // Smooth scrolling para enlaces de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // ANIMACIONES ON SCROLL
    // ============================================

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observar todos los elementos con clase fade-in
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // ============================================
    // ANIMACIÓN DE BARRAS DE HABILIDADES
    // ============================================

    const skillsSection = document.getElementById('habilidades');
    let skillsAnimated = false;

    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !skillsAnimated) {
                animateSkillBars();
                skillsAnimated = true;
            }
        });
    }, { threshold: 0.5 });

    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }

    function animateSkillBars() {
        const skillBards = document.querySelectorAll('.skill-progress');
        skillBars.forEach((bar, index) => {
            const width = bar.style.width;
            bar.style.width = '0';

            setTimeout(() => {
                bar.style.width = width;
            }, index * 100);
        });
    }

    // ============================================
    // FORMULARIO DE CONTACTO
    // ============================================

    const contactForm = document.getElementById('contactForm');

    if (contactForm) { 
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Obtener valores del formulario
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Validación básica
            if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
                alert('Por favor, completa todos los campos.');
                return;
            }

            // Validación de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, ingresa un email válido.');
                return;
            }

            // Aquí puedes agregar la lógica para enviar el formulario
            // Por ahora, solo mostramos un mensaje de éxito
            alert(`¡Gracias por tu mensaje, ${name}! Te contactaré pronto.`);

            // Limpiar formulario
            contactForm.reset();
        });
    }

    // ============================================
    // EFECTO DE TIPEO EN HERO (OPCIONAL)
    // ============================================

    const heroSubtitle = document.querySelector('.hero-subtitle');

    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        const typingSpeed = 100;
        const deletingSpeed = 50;
        const pauseDuration = 2000;

        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {
            if (!isDeleting && charIndex < originalText.length) {
                heroSubtitle.textContent = originalText.substring(0, charIndex + 1);
                charIndex++;
                setTimeout(typeEffect, typingSpeed);
            } else if (isDeleting && charIndex > 0) {
                heroSubtitle.textContent = originalText.substring(0, charIndex - 1);
                charIndex--;
                setTimeout(typeEffect, deletingSpeed);
            } else if (!isDeleting && charIndex === originalText.length) {
                setTimeout(() => {
                    isDeleting = true;
                    typeEffect();
                }, pauseDuration);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                setTimeout(typeEffect, typingSpeed);
            }
        }

        // Descomentar la siguiente línea para activar el efecto de tipeo
        // setTimeout(typeEffect, 1000);
    }

    // ============================================
    // ACTIVE LINK EN NAVEGACIÓN
    // ============================================

    const sections = document.querySelectorAll('section[id]');

    function highlightNavLink() {
        const scrollPosition = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);

    // ============================================
    // CARGAR IMÁGENES DE PLACEHOLDER
    // ============================================

    // Esta función se ejecutará cuando las imágenes sean generadas
    function loadPlaceholderImages() {
        // Las imágenes se cargarán automáticamente desde los archivos generados
        console.log('Portafolio cargado exitosamente');
    }

    loadPlaceholderImages();

    // ============================================
    // ANIMACIÓN DE ENTRADA INICIAL
    // ============================================

    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);

});

// ============================================
// UTILIDADES
// ============================================

// Función para detectar si un elemento está en viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Función para scroll suave a una posición específica
function smoothScrollTo(targetPosition, duration = 1000) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}
