// ===== Yandex Maps Initialization =====
ymaps.ready(initMap);

function initMap() {
    // Координаты ресторана (замените на реальные координаты вашего ресторана)
    const restaurantCoords = [55.751244, 37.618423]; // Москва, Красная площадь (пример)
    
    const map = new ymaps.Map("map", {
        center: restaurantCoords,
        zoom: 16,
        controls: ['zoomControl', 'fullscreenControl']
    });

    // Создаем метку с кастомным дизайном
    const placemark = new ymaps.Placemark(restaurantCoords, {
        hintContent: 'Ресторан "Grand Palace"',
        balloonContent: `
            <div style="padding: 10px;">
                <h3 style="margin: 0 0 10px 0; color: #d4a574;">Ресторан "Grand Palace"</h3>
                <p style="margin: 0;">г. Москва, ул. Праздничная, дом 1</p>
                <p style="margin: 10px 0 0 0; font-weight: bold;">Время сбора гостей: 15:00</p>
            </div>
        `
    }, {
        preset: 'islands#brownWeddingIcon'
    });

    map.geoObjects.add(placemark);

    // Отключаем скролл зум для мобильных устройств
    map.behaviors.disable('scrollZoom');
    
    // Адаптация под мобильные устройства
    if (window.innerWidth < 768) {
        map.behaviors.disable('drag');
    }
}

// ===== RSVP Form Handler =====
document.addEventListener('DOMContentLoaded', function() {
    const rsvpForm = document.getElementById('rsvpForm');
    
    rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Собираем данные формы
        const formData = {
            name: document.getElementById('name').value,
            attendance: document.getElementById('attendance').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value
        };
        
        // Здесь можно добавить отправку данных на сервер или в Google Sheets
        console.log('RSVP Data:', formData);
        
        // Показываем сообщение об успешной отправке
        alert(`Спасибо, ${formData.name}! Ваш ответ успешно отправлен.`);
        
        // Очищаем форму
        rsvpForm.reset();
        
        // В реальном проекте здесь будет код отправки данных
        // Например, через fetch API или интеграция с Telegram ботом
    });
});

// ===== Smooth Scroll for Navigation Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});

// ===== Animation on Scroll =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Применяем анимацию ко всем карточкам и элементам
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.couple-card, .detail-card, .timeline-item, .rsvp-form');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ===== Mobile Menu Toggle (если понадобится в будущем) =====
function toggleMobileMenu() {
    const menu = document.querySelector('.mobile-menu');
    if (menu) {
        menu.classList.toggle('active');
    }
}

// ===== Countdown Timer (опционально) =====
function initCountdown() {
    const weddingDate = new Date('July 15, 2025 00:00:00').getTime();
    
    const countdownFunction = setInterval(function() {
        const now = new Date().getTime();
        const distance = weddingDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Можно добавить отображение таймера на страницу
        console.log(`${days}д ${hours}ч ${minutes}м ${seconds}с`);
        
        if (distance < 0) {
            clearInterval(countdownFunction);
        }
    }, 1000);
}

// ===== Photo Gallery Lightbox (простая реализация) =====
function openLightbox(imageSrc) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="close-lightbox">&times;</span>
            <img src="${imageSrc}" alt="Full size photo">
        </div>
    `;
    
    lightbox.style.cssText = `
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.9);
        display: flex;
        justify-content: center;
        align-items: center;
    `;
    
    document.body.appendChild(lightbox);
    
    lightbox.querySelector('.close-lightbox').addEventListener('click', function() {
        document.body.removeChild(lightbox);
    });
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            document.body.removeChild(lightbox);
        }
    });
}

// ===== Share Functionality =====
function shareWedding() {
    if (navigator.share) {
        navigator.share({
            title: 'Приглашение на свадьбу',
            text: 'Приглашаем вас на нашу свадьбу 15 июля 2025!',
            url: window.location.href
        })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    } else {
        // Fallback для браузеров без поддержки Web Share API
        const dummy = document.createElement('input');
        document.body.appendChild(dummy);
        dummy.value = window.location.href;
        dummy.select();
        document.execCommand('copy');
        document.body.removeChild(dummy);
        alert('Ссылка скопирована в буфер обмена!');
    }
}

// ===== Initialize everything when DOM is loaded =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('Wedding website loaded successfully! 💕');
    
    // Раскомментируйте для использования таймера обратного отсчета
    // initCountdown();
});

// ===== Service Worker Registration (для PWA) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('SW registered: ', registration);
        }).catch(error => {
            console.log('SW registration failed: ', error);
        });
    });
}
