// Portfolio functionality for Haleema Portfolio
class Portfolio {
    constructor() {
        this.portfolioData = [];
        this.currentFilter = 'all';
        this.portfolioGrid = document.getElementById('portfolio-grid');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        
        this.init();
    }

    init() {
        this.loadPortfolioData();
        this.bindFilterEvents();
        this.renderPortfolio();
    }

    loadPortfolioData() {
        // Portfolio data - you can modify this with your actual projects
        this.portfolioData = [
            {
                id: 1,
                title: "ABCD-Mall",
                description: "An advanced mall booking and shopping platform built with ASP.NET Core MVC, featuring user authentication, product catalog, cart system, slot booking, and email notifications.",
                image: "assets/ABCD-Mall.jpg",
                category: ".net",
                tech: ["ASP.NET Core", "C#", "SQL Server", "Entity Framework", "Bootstrap", "JavaScript"],
                link: "#",
                github: "https://github.com/Hishaq00/ABCD-Mall"
            },
            {
                id: 2,
                title: "Parking Management System",
                description: "A smart parking management system that handles slot assignment, vehicle tracking, booking status updates, and provides a modern dashboard for admins.",
                image: "assets/ParkingManagmentSystem.jpg",
                category: ".net",
                tech: ["ASP.NET Core", "C#", "SQL Server"],
                link: "#",
                github: "https://github.com/Hishaq00/ParkingManagmentSystem"
            },
            {
                id: 3,
                title: "Portfolio Website",
                description: "A fully responsive and modern portfolio website built with HTML, CSS, and JavaScript, featuring dark/light mode toggle, smooth animations, and project showcase.",
                image: "assets/Portfolio.jpg",
                category: "frontend",
                tech: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "CSS Grid", "Flexbox"],
                link: "#",
                github: "https://github.com/Hishaq00/Portfolio"
            },
            {
                id: 4,
                title: "Floral Decor",
                description: "A decorative website for floral design and home decor ideas, built with modern frontend technologies and a responsive layout.",
                image: "assets/FloralDecor.jpg",
                category: "frontend",
                tech: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
                link: "https://hishaq00.github.io/FloralDecors/",
                github: "https://github.com/Hishaq00/FloralDecors"
            },
            {
                id: 5,
                title: "Lab Automation",
                description: "A PHP and MySQL-based lab automation system that manages product categories, testing workflows, and reporting with CRUD functionalities.",
                image: "assets/LabAutomation.jpg",
                category: "fullstack",
                tech: ["PHP", "MySQL", "HTML5", "CSS3", "JavaScript", "jQuery"],
                link: "#",
                github: "https://github.com/Hishaq00/SRSElectronics"
            },
            {
                id: 6,
                title: "Quiz App",
                description: "An online quiz system built with ASP.NET Core MVC that allows users to register, log in, take timed quizzes, and view their results with a beautiful Bootstrap UI.",
                image: "assets/QuizApp.jpg",
                category: ".net",
                tech: ["ASP.NET Core", "C#", "SQL Server", "Entity Framework", "Bootstrap"],
                link: "#",
                github: "https://github.com/Hishaq00/MiniQuizApp"
            },
            {
                id: 7,
                title: "Nature Canva",
                description: "A creative frontend project for displaying nature-inspired designs and layouts using HTML, CSS, and JavaScript with responsive design principles.",
                image: "assets/NatureCanva.jpg",
                category: "frontend",
                tech: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
                link: "#",
                github: "https://github.com/Hishaq00/NatureCanvas"
            }
        ];
        
    }

    bindFilterEvents() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.setActiveFilter(e.target);
                this.filterPortfolio();
            });
        });
    }

    setActiveFilter(clickedButton) {
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        clickedButton.classList.add('active');
        this.currentFilter = clickedButton.getAttribute('data-filter');
    }

    filterPortfolio() {
        const filteredData = this.currentFilter === 'all' 
            ? this.portfolioData 
            : this.portfolioData.filter(item => item.category === this.currentFilter);
        
        this.renderPortfolio(filteredData);
    }

    renderPortfolio(data = this.portfolioData) {
        if (!this.portfolioGrid) return;

        this.portfolioGrid.innerHTML = '';

        if (data.length === 0) {
            this.showNoResults();
            return;
        }

        data.forEach(item => {
            const portfolioItem = this.createPortfolioItem(item);
            this.portfolioGrid.appendChild(portfolioItem);
        });

        // Trigger animation for new items
        this.animatePortfolioItems();
    }

    createPortfolioItem(item) {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item';
        portfolioItem.setAttribute('data-category', item.category);

        portfolioItem.innerHTML = `
            <div class="portfolio-image">
                <img src="${item.image}" alt="${item.title}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="portfolio-image-fallback" style="display: none;">
                    <i class="fas fa-code"></i>
                </div>
            </div>
            <div class="portfolio-content">
                <h3 class="portfolio-title">${item.title}</h3>
                <p class="portfolio-description">${item.description}</p>
                <div class="portfolio-tech">
                    ${item.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="portfolio-actions">
                    <a href="${item.link}" class="portfolio-link">
                        <i class="fas fa-external-link-alt"></i> View Project
                    </a>
                    <a href="${item.github}" class="portfolio-link" target="_blank">
                        <i class="fab fa-github"></i> View Code
                    </a>
                </div>
            </div>
        `;

        // Add click event for portfolio item
        portfolioItem.addEventListener('click', (e) => {
            if (!e.target.closest('a')) {
                this.showPortfolioModal(item);
            }
        });

        return portfolioItem;
    }

    showNoResults() {
        this.portfolioGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search" style="font-size: 3rem; color: var(--text-light); margin-bottom: 1rem;"></i>
                <h3 style="color: var(--text-secondary);">No projects found</h3>
                <p style="color: var(--text-light);">Try selecting a different category or check back later for new projects.</p>
            </div>
        `;
    }

    showPortfolioModal(item) {
        // Create modal HTML
        const modalHTML = `
            <div class="portfolio-modal" id="portfolio-modal">
                <div class="modal-overlay"></div>
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>${item.title}</h2>
                        <button class="modal-close" id="modal-close">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                    <div class="modal-image">
    <img src="${item.image}" alt="${item.title}" 
         onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
    <i class="fas fa-code"></i>
</div>

                        <div class="modal-info">
                            <h3>Project Description</h3>
                            <p>${item.description}</p>
                            
                            <h3>Technologies Used</h3>
                            <div class="modal-tech">
                                ${item.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                            </div>
                            
                            <h3>Project Links</h3>
                            <div class="modal-links">
                                <a href="${item.link}" class="btn btn-primary" target="_blank">
                                    <i class="fas fa-external-link-alt"></i> Live Demo
                                </a>
                                <a href="${item.github}" class="btn btn-secondary" target="_blank">
                                    <i class="fab fa-github"></i> Source Code
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add modal to body
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Add modal styles
        this.addModalStyles();

        // Bind close event
        const modal = document.getElementById('portfolio-modal');
        const closeBtn = document.getElementById('modal-close');
        const overlay = modal.querySelector('.modal-overlay');

        const closeModal = () => {
            modal.remove();
        };

        closeBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', closeModal);

        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeModal();
            }
        });

        // Animate modal in
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
    }

    addModalStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .portfolio-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .portfolio-modal.active {
                opacity: 1;
            }
            
            .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                backdrop-filter: blur(5px);
            }
            
            .modal-content {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) scale(0.9);
                background: var(--bg-primary);
                border-radius: 1rem;
                max-width: 800px;
                width: 90%;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: var(--shadow-heavy);
                transition: transform 0.3s ease;
            }
            
            .portfolio-modal.active .modal-content {
                transform: translate(-50%, -50%) scale(1);
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1.5rem;
                border-bottom: 1px solid var(--border-color);
            }
            
            .modal-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                color: var(--text-secondary);
                cursor: pointer;
                padding: 0.5rem;
                border-radius: 0.5rem;
                transition: all 0.2s ease;
            }
            
            .modal-close:hover {
                background: var(--bg-secondary);
                color: var(--text-primary);
            }
            
            .modal-body {
                padding: 1.5rem;
            }
            
          .modal-image {
    width: 100%;
    height: 250px;
    background: var(--bg-tertiary);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    margin-bottom: 1.5rem;
    color: var(--text-light);
    font-size: 3rem;
    position: relative;
    overflow: hidden;
}

.modal-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;  /* keeps ratio, fills box */
    display: block;
    border-radius: 0.5rem;
}

.modal-image i {
    position: absolute;
    display: none; /* only shows if image fails */
}

            
            .modal-info h3 {
                margin-bottom: 1rem;
                color: var(--text-primary);
            }
            
            .modal-tech {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
                margin-bottom: 1.5rem;
            }
            
            .modal-links {
                display: flex;
                gap: 1rem;
                flex-wrap: wrap;
            }
            
            @media (max-width: 768px) {
                .modal-content {
                    width: 95%;
                    max-height: 95vh;
                }
                
                .modal-links {
                    flex-direction: column;
                }
                
                .modal-links .btn {
                    width: 100%;
                }
            }
        `;
        document.head.appendChild(style);
    }

    animatePortfolioItems() {
        const items = this.portfolioGrid.querySelectorAll('.portfolio-item');
        items.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    // Method to add new portfolio items dynamically
    addPortfolioItem(item) {
        this.portfolioData.push(item);
        this.renderPortfolio();
    }

    // Method to remove portfolio items
    removePortfolioItem(id) {
        this.portfolioData = this.portfolioData.filter(item => item.id !== id);
        this.renderPortfolio();
    }

    // Method to update portfolio items
    updatePortfolioItem(id, updatedItem) {
        const index = this.portfolioData.findIndex(item => item.id === id);
        if (index !== -1) {
            this.portfolioData[index] = { ...this.portfolioData[index], ...updatedItem };
            this.renderPortfolio();
        }
    }
}

// Initialize portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('portfolio-grid')) {
        window.portfolioInstance = new Portfolio();
    }
});

// Export Portfolio class for external use
window.Portfolio = Portfolio;
