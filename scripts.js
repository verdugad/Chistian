// Mostrar detalles del producto en el modal
function showProductDetails(product) {
    const title = product.getAttribute('data-title');
    const description = product.getAttribute('data-description');
    const image = product.getAttribute('data-image');
    const whatsappLink = "https://wa.me/1234567890?text=" + encodeURIComponent(title + " - " + description);

    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalDescription').textContent = description;
    document.getElementById('modalImage').src = image;
    document.getElementById('whatsappButton').href = whatsappLink;

    document.getElementById('productModal').style.display = 'block';
}

// Cerrar el modal
document.querySelector('.close-modal').addEventListener('click', function() {
    document.getElementById('productModal').style.display = 'none';
});

// Filtrar productos por categoría
function filterProducts(category) {
    const products = document.querySelectorAll('.product');
    products.forEach(function(product) {
        if (category === 'all' || product.getAttribute('data-category') === category) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}
// Slider functionality
class Slider {
    constructor() {
        this.slider = document.querySelector('.slider-promo');
        this.items = document.querySelectorAll('.slider-promo-item');
        this.prevBtn = document.querySelector('.prev');
        this.nextBtn = document.querySelector('.next');
        
        this.current = 0;
        this.isDragging = false;
        this.startPos = 0;
        this.currentTranslate = 0;
        this.prevTranslate = 0;
        
        this.initControls();
        this.initTouch();
        this.updateButtonVisibility();
        this.handleResize();
    }

    initControls() {
        this.prevBtn.addEventListener('click', () => this.move('prev'));
        this.nextBtn.addEventListener('click', () => this.move('next'));
    }

    initTouch() {
        // Touch events
        this.slider.addEventListener('touchstart', (e) => this.touchStart(e));
        this.slider.addEventListener('touchmove', (e) => this.touchMove(e));
        this.slider.addEventListener('touchend', () => this.touchEnd());

        // Mouse events
        this.slider.addEventListener('mousedown', (e) => this.touchStart(e));
        this.slider.addEventListener('mousemove', (e) => this.touchMove(e));
        this.slider.addEventListener('mouseup', () => this.touchEnd());
        this.slider.addEventListener('mouseleave', () => this.touchEnd());
    }

    handleResize() {
        window.addEventListener('resize', () => {
            this.updateSliderLimits();
            this.updateButtonVisibility();
        });
    }

    touchStart(e) {
        this.isDragging = true;
        this.startPos = this.getPositionX(e);
        this.slider.style.transition = 'none';
    }

    touchMove(e) {
        if (!this.isDragging) return;
        const currentPosition = this.getPositionX(e);
        const diff = currentPosition - this.startPos;
        this.currentTranslate = this.prevTranslate + diff;
        this.setSliderPosition();
    }

    touchEnd() {
        this.isDragging = false;
        this.slider.style.transition = 'transform 0.3s ease-out';
        this.snapToClosest();
    }

    getPositionX(e) {
        return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    }

    move(direction) {
        const itemWidth = this.items[0].offsetWidth + 20; // width + gap
        const moveAmount = direction === 'next' ? itemWidth : -itemWidth;
        
        this.currentTranslate = Math.max(
            Math.min(this.currentTranslate - moveAmount, 0),
            -this.getMaxScroll()
        );
        
        this.prevTranslate = this.currentTranslate;
        this.setSliderPosition();
        this.updateButtonVisibility();
    }

    setSliderPosition() {
        this.slider.style.transform = `translateX(${this.currentTranslate}px)`;
    }

    snapToClosest() {
        const itemWidth = this.items[0].offsetWidth + 20;
        this.currentTranslate = Math.round(this.currentTranslate / itemWidth) * itemWidth;
        this.currentTranslate = Math.max(
            Math.min(this.currentTranslate, 0),
            -this.getMaxScroll()
        );
        this.prevTranslate = this.currentTranslate;
        this.setSliderPosition();
        this.updateButtonVisibility();
    }

    getMaxScroll() {
        const containerWidth = this.slider.parentElement.offsetWidth;
        const totalWidth = Array.from(this.items).reduce((width, item) => 
            width + item.offsetWidth + 20, 0);
        return Math.max(0, totalWidth - containerWidth);
    }

    updateButtonVisibility() {
        this.prevBtn.style.opacity = this.currentTranslate >= 0 ? '0.3' : '1';
        this.nextBtn.style.opacity = this.currentTranslate <= -this.getMaxScroll() ? '0.3' : '1';
    }

    updateSliderLimits() {
        const maxScroll = this.getMaxScroll();
        if (Math.abs(this.currentTranslate) > maxScroll) {
            this.currentTranslate = -maxScroll;
            this.prevTranslate = this.currentTranslate;
            this.setSliderPosition();
        }
    }
}

// Initialize slider
document.addEventListener('DOMContentLoaded', () => {
    new Slider();
});

// Newsletter functionality
document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Aquí agregarías la lógica para procesar la suscripción
    alert('¡Gracias por suscribirte!');
});

// Support chat functionality
document.querySelectorAll('.support-button').forEach(button => {
    button.addEventListener('click', function() {
        // Aquí agregarías la lógica para cada botón de soporte
    });
});

// Add this to your existing scripts.js
document.addEventListener('DOMContentLoaded', function() {
    // Show iPhone grid by default
    document.getElementById('iphone').style.display = 'grid';
    
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Hide all grids
            document.querySelectorAll('.comparison-grid').forEach(grid => {
                grid.style.display = 'none';
            });
            
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show selected grid
            const category = button.dataset.category;
            document.getElementById(category).style.display = 'grid';
        });
    });
});
function showProductDetails(element) {
    const modal = document.getElementById('productModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');

    // Get data from clicked element
    const title = element.getAttribute('data-title');
    const description = element.getAttribute('data-description');
    const image = element.getAttribute('data-image');

    // Set modal content
    modalImage.src = image;
    modalTitle.textContent = title;
    modalDescription.textContent = description;

    // Show modal
    modal.style.display = 'block';
}

// Load products when page loads
document.addEventListener('DOMContentLoaded', loadProducts);
