document.addEventListener('DOMContentLoaded', function() {
    // Animation for principle cards
    const principleCards = document.querySelectorAll('.principle-card');
    
    principleCards.forEach((card, index) => {
        // Add delay for staggered animation
        card.style.animationDelay = `${index * 0.1}s`;
        
        // Add hover effect
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
    
    // Interactive before/after slider
    const beforeAfterContainers = document.querySelectorAll('.before-after');
    
    beforeAfterContainers.forEach(container => {
        const beforeImg = container.querySelector('img:first-child');
        const afterImg = container.querySelector('img:last-child');
        const slider = document.createElement('input');
        slider.type = 'range';
        slider.min = '0';
        slider.max = '100';
        slider.value = '50';
        slider.classList.add('slider');
        
        container.appendChild(slider);
        
        // Position slider
        container.style.position = 'relative';
        slider.style.position = 'absolute';
        slider.style.bottom = '20px';
        slider.style.left = '50%';
        slider.style.transform = 'translateX(-50%)';
        slider.style.width = '90%';
        slider.style.zIndex = '10';
        
        // Set initial clip
        afterImg.style.clipPath = 'polygon(0 0, 50% 0, 50% 100%, 0 100%)';
        
        // Update on slider change
        slider.addEventListener('input', function() {
            const value = this.value;
            afterImg.style.clipPath = `polygon(0 0, ${value}% 0, ${value}% 100%, 0 100%)`;
        });
    });
});