document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    function nextSlide() {
        if (slides.length === 0) return;
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    setInterval(nextSlide, 5000);

    const items = document.querySelectorAll('.carousel-item');
    let activeIndex = 0;

    function updateCarousel() {
        items.forEach((item, index) => {
            item.classList.remove('active', 'prev', 'next');
            if (index === activeIndex) {
                item.classList.add('active');
            } else if (index === (activeIndex - 1 + items.length) % items.length) {
                item.classList.add('prev');
            } else if (index === (activeIndex + 1) % items.length) {
                item.classList.add('next');
            }
        });
    }

    if (items.length > 0) {
        setInterval(() => {
            activeIndex = (activeIndex + 1) % items.length;
            updateCarousel();
        }, 4000);
        updateCarousel();
    }

    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        const sections = document.querySelectorAll('section, main');
        const navLi = document.querySelectorAll('nav ul li');
        
        if (window.scrollY > 50) {
            header.style.background = 'rgba(13, 20, 21, 0.95)';
            header.style.padding = '15px 50px';
            header.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
        } else {
            header.style.background = 'transparent';
            header.style.padding = '20px 50px';
            header.style.borderBottom = 'none';
        }

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLi.forEach(li => {
            li.classList.remove('active');
            const clickAttr = li.getAttribute('onclick');
            if (clickAttr && clickAttr.includes(`'${current}'`)) {
                li.classList.add('active');
            }
        });
    });
});

function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}