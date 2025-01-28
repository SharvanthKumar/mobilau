// Add Intersection Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }
    });
}, { threshold: 0.1 }); // Trigger animation when 10% visible

// Apply observer to all chart containers
document.querySelectorAll('.chart-container').forEach(container => {
    observer.observe(container);
});
