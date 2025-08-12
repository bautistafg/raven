/**
 * RAVEN GASTRONOMÍA - JAVASCRIPT PRINCIPAL
 * Funcionalidades principales del sitio web
 */

// ============================================
// CONFIGURACIÓN INICIAL
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🌿 Raven Gastronomía - Sitio web cargado');
    
    // Inicializar funcionalidades
    initMobileMenu();
    initSmoothScrolling();
    initScrollEffects();
    initAnimationsOnScroll();
    initLoadingScreen();
});

// ============================================
// MENÚ MÓVIL
// ============================================

function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (!mobileMenuBtn || !navLinks) return;
    
    // Toggle menú móvil
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        // Cambiar icono del hamburguesa a X
        if (navLinks.classList.contains('active')) {
            this.innerHTML = '✕';
        } else {
            this.innerHTML = '☰';
        }
    });

    // Cerrar menú al hacer click en un enlace
    const navLinksItems = document.querySelectorAll('.nav-links a');
    navLinksItems.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            mobileMenuBtn.innerHTML = '☰';
        });
    });

    // Cerrar menú al hacer click fuera
    document.addEventListener('click', function(e) {
        if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            mobileMenuBtn.innerHTML = '☰';
        }
    });
}

// ============================================
// SCROLL SUAVE
// ============================================

function initSmoothScrolling() {
    // Scroll suave para enlaces internos
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// EFECTOS DE SCROLL
// ============================================

function initScrollEffects() {
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Efecto de transparencia en header
        if (scrollTop > 100) {
            header.style.background = 'linear-gradient(135deg, rgba(0, 184, 148, 0.95) 0%, rgba(0, 160, 133, 0.95) 100%)';
            header.style.backdropFilter = 'blur(10px)';
            header.classList.add('header-scrolled');
        } else {
            header.style.background = 'linear-gradient(135deg, #00b894 0%, #00a085 100%)';
            header.style.backdropFilter = 'none';
            header.classList.remove('header-scrolled');
        }
        
        // Ocultar/mostrar header al hacer scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // Scroll hacia abajo - ocultar header
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scroll hacia arriba - mostrar header
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// ============================================
// ANIMACIONES EN SCROLL
// ============================================

function initAnimationsOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Observar tarjetas y elementos animables
    const animatedElements = document.querySelectorAll('.service-card, .menu-item, .contact-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ============================================
// PANTALLA DE CARGA
// ============================================

function initLoadingScreen() {
    const loadingSpinner = document.getElementById('loadingSpinner');
    
    // Simular carga y ocultar spinner
    window.addEventListener('load', function() {
        if (loadingSpinner) {
            setTimeout(() => {
                loadingSpinner.style.opacity = '0';
                setTimeout(() => {
                    loadingSpinner.style.display = 'none';
                }, 300);
            }, 500);
        }
    });
}

// ============================================
// UTILIDADES
// ============================================

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-cerrar después de 5 segundos
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
    
    // Cerrar al hacer click en X
    notification.querySelector('.notification-close').addEventListener('click', () => {
        removeNotification(notification);
    });
}

function removeNotification(notification) {
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Función para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Función para formatear números de teléfono
function formatPhoneNumber(phone) {
    return phone.replace(/\D/g, '').replace(/(\d{2})(\d{4})(\d{4})/, '+54 $1 $2-$3');
}

// Función para scroll a elemento
function scrollToElement(elementId, offset = 80) {
    const element = document.getElementById(elementId);
    if (element) {
        const elementPosition = element.offsetTop - offset;
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// ============================================
// MANEJO DE ERRORES
// ============================================

window.addEventListener('error', function(e) {
    console.error('Error en la aplicación:', e.error);
    // Aquí puedes agregar logging o reportes de errores
});

// ============================================
// EVENTOS GLOBALES
// ============================================

// Redimensionar ventana
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        // Reajustar elementos si es necesario
        console.log('Ventana redimensionada');
    }, 150);
});

// Detectar dispositivo móvil
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
if (isMobile) {
    document.body.classList.add('mobile-device');
}

// ============================================
// EXPORT PARA OTROS MÓDULOS
// ============================================

// ============================================
// FUNCIONES DE WHATSAPP
// ============================================

function openWhatsApp(message = '') {
    const whatsappUrl = 'https://walink.co/330540';
    const fullUrl = message ? `${whatsappUrl}?text=${encodeURIComponent(message)}` : whatsappUrl;
    window.open(fullUrl, '_blank');
}

function orderItem(itemName, price) {
    const message = `¡Hola! Me interesa pedir: ${itemName} - $${price}. ¿Podrían darme más información?`;
    openWhatsApp(message);
}

// Agregar eventos a los botones de pedidos
document.addEventListener('DOMContentLoaded', function() {
    const orderButtons = document.querySelectorAll('.order-btn');
    orderButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Obtener información del elemento del menú
            const menuItem = this.closest('.menu-item');
            const itemName = menuItem.querySelector('h3').textContent;
            const itemPrice = menuItem.querySelector('.menu-item-price').textContent;
            
            orderItem(itemName, itemPrice);
        });
    });
});

window.RavenApp = {
    showNotification,
    isValidEmail,
    formatPhoneNumber,
    scrollToElement,
    openWhatsApp,
    orderItem,
    isMobile
};
