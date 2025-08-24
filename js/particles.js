// Particles animation for hero section background
class Particles {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.particleCount = 50;
        this.mouse = { x: 0, y: 0 };
        this.animationId = null;
        
        this.init();
    }

    init() {
        this.createCanvas();
        this.createParticles();
        this.bindEvents();
        this.animate();
    }

    createCanvas() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;

        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        
        particlesContainer.appendChild(this.canvas);
        
        this.resize();
    }

    createParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2,
                color: this.getRandomColor()
            });
        }
    }

    getRandomColor() {
        const colors = [
            'rgba(236, 72, 153, 0.6)',   // Pink
            'rgba(34, 197, 94, 0.6)',    // Emerald Green
            'rgba(250, 204, 21, 0.6)',   // Amber
            'rgba(14, 165, 233, 0.6)',   // Sky Blue
            'rgba(168, 85, 247, 0.6)'    // Violet
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    

    bindEvents() {
        window.addEventListener('resize', () => this.resize());
        
        // Mouse movement for interactive particles
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });

        // Touch events for mobile
        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.touches[0].clientX - rect.left;
            this.mouse.y = e.touches[0].clientY - rect.top;
        });
    }

    resize() {
        if (!this.canvas) return;
        
        const rect = this.canvas.parentElement.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        
        // Recreate particles with new dimensions
        this.particles = [];
        this.createParticles();
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.updateParticles();
        this.drawParticles();
        this.drawConnections();
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    updateParticles() {
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.vx *= -1;
            }
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.vy *= -1;
            }
            
            // Keep particles within bounds
            particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
            particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
            
            // Mouse interaction
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.vx += (dx / distance) * force * 0.02;
                particle.vy += (dy / distance) * force * 0.02;
            }
            
            // Dampen velocity
            particle.vx *= 0.99;
            particle.vy *= 0.99;
        });
    }

    drawParticles() {
        this.particles.forEach(particle => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.fill();
        });
        
        this.ctx.globalAlpha = 1;
    }

    drawConnections() {
        const maxDistance = 150;
        
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    const opacity = (maxDistance - distance) / maxDistance * 0.3;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            }
        }
    }

    // Method to change theme colors
    updateThemeColors(isDark) {
        if (isDark) {
            // Dark theme colors
            this.particles.forEach(particle => {
                const darkColors = [
            'rgba(129, 140, 248, 0.6)',   // Primary color (dark)
            'rgba(251, 191, 36, 0.6)',   // Secondary color (dark)
            'rgba(167, 139, 250, 0.4)',  // Purple (dark)
            'rgba(96, 165, 250, 0.4)',  // Blue (dark)
            'rgba(52, 211, 153, 0.4)'   // Green (dark)
        ];
        particle.color = darkColors[Math.floor(Math.random() * darkColors.length)];
            });
        } else {
            // Light theme colors
            this.particles.forEach(particle => {
                const lightColors = [
            'rgba(99, 102, 241, 0.6)',   // Primary color
            'rgba(245, 158, 11, 0.6)',   // Secondary color
            'rgba(139, 92, 246, 0.4)',   // Purple
            'rgba(59, 130, 246, 0.4)',   // Blue
            'rgba(16, 185, 129, 0.4)'    // Green
        ];
        particle.color = lightColors[Math.floor(Math.random() * lightColors.length)];
            });
        }
    }

    // Method to pause/resume animation
    pause() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    resume() {
        if (!this.animationId) {
            this.animate();
        }
    }

    // Method to destroy particles
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.canvas && this.canvas.parentElement) {
            this.canvas.parentElement.removeChild(this.canvas);
        }
    }
}

// Initialize particles when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if particles container exists
    if (document.getElementById('particles')) {
        window.particlesInstance = new Particles();
        
        // Listen for theme changes to update particle colors
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
                    if (window.particlesInstance) {
                        window.particlesInstance.updateThemeColors(isDark);
                    }
                }
            });
        });
        
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        });
    }
});

// Performance optimization: Pause particles when not visible
if ('IntersectionObserver' in window) {
    const particlesObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (window.particlesInstance) {
                    window.particlesInstance.resume();
                }
            } else {
                if (window.particlesInstance) {
                    window.particlesInstance.pause();
                }
            }
        });
    }, { threshold: 0.1 });

    // Observe the hero section
    const heroSection = document.getElementById('home');
    if (heroSection) {
        particlesObserver.observe(heroSection);
    }
}
