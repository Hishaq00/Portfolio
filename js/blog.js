// Blog functionality for Haleema Portfolio
class Blog {
    constructor() {
        this.blogData = [];
        this.blogGrid = document.getElementById('blog-grid');
        
        this.init();
    }

    init() {
        this.loadBlogData();
        this.renderBlog();
    }

    loadBlogData() {
        // Blog data - you can modify this with your actual blog posts
        this.blogData = [
            {
                id: 1,
                title: "Getting Started with ASP.NET Core MVC",
                date: "2025-08-10",
                category: "ASP.NET",
                excerpt: "Learn how to set up your first ASP.NET Core MVC project step by step...",
                content: `
                  <p>ASP.NET Core MVC is a cross-platform, open-source framework for building web apps. 
                  It follows the MVC pattern (Model-View-Controller) and makes development structured and maintainable.</p>
              
                  <h3>Step 1: Install .NET SDK</h3>
                  <p>Make sure you have the latest .NET SDK installed. You can verify using:</p>
                  <pre><code>dotnet --version</code></pre>
                  <p>If not installed, download from the official <a href="https://dotnet.microsoft.com/download" target="_blank">.NET website</a>.</p>
              
                  <h3>Step 2: Create a New MVC Project</h3>
                  <p>Open terminal/command prompt and run:</p>
                  <pre><code>dotnet new mvc -n MyFirstApp</code></pre>
                  <p>This command scaffolds a basic MVC application named <code>MyFirstApp</code>.</p>
              
                  <h3>Step 3: Navigate to Project Folder</h3>
                  <pre><code>cd MyFirstApp</code></pre>
                  <p>Now you’re inside your new project directory.</p>
              
                  <h3>Step 4: Run the Application</h3>
                  <pre><code>dotnet run</code></pre>
                  <p>Open <code>https://localhost:5001</code> or <code>http://localhost:5000</code> in your browser to see your app running.</p>
              
                  <h3>Step 5: Explore Project Structure</h3>
                  <ul>
                    <li><strong>Controllers/</strong> – Handles requests & responses.</li>
                    <li><strong>Views/</strong> – Razor views (HTML + C#).</li>
                    <li><strong>Models/</strong> – Business logic & data classes.</li>
                    <li><strong>wwwroot/</strong> – Static files (CSS, JS, images).</li>
                  </ul>
              
                  <h3>Step 6: Create Your First Controller</h3>
                  <p>Inside <code>Controllers</code> folder, add a new file <code>HelloController.cs</code>:</p>
                  <pre><code>
              using Microsoft.AspNetCore.Mvc;
              
              namespace MyFirstApp.Controllers
              {
                  public class HelloController : Controller
                  {
                      public IActionResult Index()
                      {
                          return Content("Hello, ASP.NET Core MVC!");
                      }
                  }
              }
                  </code></pre>
                  <p>Visit <code>/Hello</code> in the browser to see the output.</p>
              
                  <h3>Step 7: Add a Razor View</h3>
                  <p>Create a new folder <code>Views/Hello</code> and add <code>Index.cshtml</code>:</p>
                  <pre><code>
              @{
                  ViewData["Title"] = "Hello Page";
              }
              <h2>@ViewData["Title"]</h2>
              <p>Welcome to your first ASP.NET Core MVC view!</p>
                  </code></pre>
                  <p>Now your controller returns a beautiful HTML view instead of plain text.</p>
              
                  <h3>Step 8: Add Routing</h3>
                  <p>In <code>Program.cs</code>, the default route is:</p>
                  <pre><code>
              app.MapControllerRoute(
                  name: "default",
                  pattern: "{controller=Home}/{action=Index}/{id?}");
                  </code></pre>
                  <p>This means if no controller/action is specified, it loads <code>HomeController.Index</code>.</p>
              
                  <h3>Step 9: Apply Bootstrap for Styling</h3>
                  <p>ASP.NET Core MVC templates already include Bootstrap. You can edit <code>Views/Shared/_Layout.cshtml</code> to customize your layout.</p>
              
                  <h3>Step 10: Build & Publish</h3>
                  <p>Once satisfied, build your app for production:</p>
                  <pre><code>dotnet publish -c Release -o ./publish</code></pre>
                  <p>Your app is now ready to be deployed 🚀.</p>
              
                  <hr>
                  <p><em>Congrats 🎉 You just built your first ASP.NET Core MVC application!</em></p>
                `,
                slug: "getting-started-aspnet-core-mvc",
                tags: ["ASP.NET", "C#", "MVC", "Web Development"],
                image: "assets/AspCore.jpg"
              }
              ,
              {
                id: 2,
                title: "JavaScript Array Methods You Should Know",
                date: "2025-08-15",
                category: "JavaScript",
                excerpt: "Explore essential JavaScript array methods like map, filter, and reduce to write cleaner and more powerful code...",
                content: `
                  <p>JavaScript arrays are powerful and come with many built-in methods. Mastering them will make your code shorter, more efficient, and easier to read.</p>
              
                  <h3>1. <code>map()</code></h3>
                  <p>The <code>map()</code> method creates a new array by applying a function to each element.</p>
                  <pre><code>[1, 2, 3].map(x => x * 2); // [2, 4, 6]</code></pre>
              
                  <h3>2. <code>filter()</code></h3>
                  <p>The <code>filter()</code> method returns a new array with only the elements that pass a condition.</p>
                  <pre><code>[1, 2, 3, 4].filter(x => x > 2); // [3, 4]</code></pre>
              
                  <h3>3. <code>reduce()</code></h3>
                  <p>The <code>reduce()</code> method reduces an array to a single value by applying a function on each element (like sum, product, etc.).</p>
                  <pre><code>[1, 2, 3].reduce((a, b) => a + b, 0); // 6</code></pre>
              
                  <h3>4. <code>forEach()</code></h3>
                  <p>Executes a function for each array element (does not return a new array).</p>
                  <pre><code>[1, 2, 3].forEach(x => console.log(x));
              // Output: 1 2 3</code></pre>
              
                  <h3>5. <code>find()</code></h3>
                  <p>Returns the <strong>first</strong> element that matches the condition.</p>
                  <pre><code>[10, 20, 30].find(x => x > 15); // 20</code></pre>
              
                  <h3>6. <code>some()</code> and <code>every()</code></h3>
                  <p><code>some()</code> checks if at least one element passes the condition, while <code>every()</code> checks if all elements do.</p>
                  <pre><code>[1, 2, 3].some(x => x > 2); // true
              [1, 2, 3].every(x => x > 0); // true</code></pre>
              
                  <h3>7. <code>includes()</code></h3>
                  <p>Checks if an array contains a certain value.</p>
                  <pre><code>[1, 2, 3].includes(2); // true</code></pre>
              
                  <h3>8. <code>sort()</code></h3>
                  <p>Sorts the elements of an array. By default, it sorts as strings, so numbers need a compare function.</p>
                  <pre><code>[3, 1, 2].sort(); // [1, 2, 3]
              ["banana", "apple"].sort(); // ["apple", "banana"]</code></pre>
              
                  <h3>Conclusion</h3>
                  <p>These array methods will help you write cleaner, functional, and modern JavaScript. Next time you manipulate arrays, think about using one of these methods instead of loops!</p>
                `,
                slug: "javascript-array-methods",
                tags: ["JavaScript", "Frontend", "Arrays"],
                image: "assets/javascript.jpg"
              }
              
  ];
  
    }

    renderBlog() {
        if (!this.blogGrid) return;

        this.blogGrid.innerHTML = '';

        this.blogData.forEach(item => {
            const blogItem = this.createBlogItem(item);
            this.blogGrid.appendChild(blogItem);
        });

        // Trigger animation for blog items
        this.animateBlogItems();
    }

    createBlogItem(item) {
        const blogItem = document.createElement('div');
        blogItem.className = 'blog-item';
        blogItem.setAttribute('data-id', item.id);

        const formattedDate = this.formatDate(item.date);

        blogItem.innerHTML = `
           <div class="blog-image">
    <img src="${item.image}" alt="${item.title}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
    <i class="fas fa-newspaper"></i>
</div>

            <div class="blog-content">
                <div class="blog-meta">
                    <span class="blog-date">${formattedDate}</span>
                </div>
                <h3 class="blog-title">${item.title}</h3>
                <p class="blog-excerpt">${item.excerpt}</p>
                <div class="blog-tags">
                    ${item.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('')}
                </div>
                <a href="#" class="blog-link" data-slug="${item.slug}">
                    Read More <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        `;

        // Add click event for blog item
        const readMoreLink = blogItem.querySelector('.blog-link');
        readMoreLink.addEventListener('click', (e) => {
            e.preventDefault();
            this.showBlogPost(item);
        });

        return blogItem;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    showBlogPost(post) {
        // Create blog post modal
        const modalHTML = `
            <div class="blog-modal" id="blog-modal">
                <div class="modal-overlay"></div>
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="modal-meta">
                            <span class="modal-date">${this.formatDate(post.date)}</span>
                        </div>
                        <button class="modal-close" id="blog-modal-close">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <h1 class="modal-title">${post.title}</h1>
                        <div class="modal-author">
                            <i class="fas fa-user"></i>
                            <span>By Haleema Ishaq</span>
                        </div>
                        <div class="modal-tags">
                            ${post.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('')}
                        </div>
                      <div class="modal-image">
    <img src="${post.image}" alt="${post.title}" 
         onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
    <i class="fas fa-newspaper"></i>
</div>

                        <div class="modal-content-text">
                            ${post.content}
                            <p class="modal-more-content">
                                This is a preview of the full article. The complete post would contain much more detailed content, 
                                code examples, and practical implementation guidance. Stay tuned for the full version!
                            </p>
                        </div>
                        <div class="modal-actions">
                            <button class="btn btn-secondary" onclick="this.shareBlogPost('${post.title}', '${post.slug}')">
                                <i class="fas fa-share"></i> Share
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add modal to body
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Add modal styles
        this.addBlogModalStyles();

        // Bind close event
        const modal = document.getElementById('blog-modal');
        const closeBtn = document.getElementById('blog-modal-close');
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

    addBlogModalStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .blog-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .blog-modal.active {
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
                max-width: 900px;
                width: 95%;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: var(--shadow-heavy);
                transition: transform 0.3s ease;
            }
            
            .blog-modal.active .modal-content {
                transform: translate(-50%, -50%) scale(1);
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                padding: 1.5rem;
                border-bottom: 1px solid var(--border-color);
            }
            
            .modal-meta {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }
            
            .modal-date, .modal-read-time {
                color: var(--text-light);
                font-size: 0.875rem;
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
            
            .modal-title {
                font-size: 2rem;
                color: var(--text-primary);
                margin-bottom: 1rem;
                line-height: 1.2;
            }
            
            .modal-author {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                color: var(--text-secondary);
                margin-bottom: 1rem;
            }
            
            .modal-tags {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
                margin-bottom: 1.5rem;
            }
            
         .modal-image {
    width: 100%;
    height: 250px; /* a bit taller for modal */
    background: var(--bg-tertiary);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    margin-bottom: 1.5rem;
    color: var(--text-light);
    font-size: 3rem;
    position: relative;  /* allow layering */
    overflow: hidden;    /* avoid image overflow */
}

.modal-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;   /* scales nicely */
    display: block;
    border-radius: 0.5rem;
}

.modal-image i {
    position: absolute;
    display: none; /* only visible if image fails */
}

            
            .modal-content-text {
                color: var(--text-secondary);
                line-height: 1.7;
                margin-bottom: 2rem;
            }
            
            .modal-content-text p {
                margin-bottom: 1rem;
            }
            
            .modal-more-content {
                font-style: italic;
                color: var(--text-light);
                background: var(--bg-secondary);
                padding: 1rem;
                border-radius: 0.5rem;
                border-left: 4px solid var(--primary-color);
            }
            
            .modal-actions {
                display: flex;
                gap: 1rem;
                flex-wrap: wrap;
            }
            
            @media (max-width: 768px) {
                .modal-content {
                    width: 98%;
                    max-height: 95vh;
                }
                
                .modal-title {
                    font-size: 1.5rem;
                }
                
                .modal-actions {
                    flex-direction: column;
                }
                
                .modal-actions .btn {
                    width: 100%;
                }
            }
        `;
        document.head.appendChild(style);
    }

    animateBlogItems() {
        const items = this.blogGrid.querySelectorAll('.blog-item');
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

    // Method to share blog post
    shareBlogPost(title, slug) {
        if (navigator.share) {
            navigator.share({
                title: title,
                url: `https://haleemaishaq.dev/blog/${slug}`,
                text: `Check out this article: ${title}`
            });
        } else {
            // Fallback for browsers that don't support Web Share API
            const url = `https://haleemaishaq.dev/blog/${slug}`;
            const text = `Check out this article: ${title}`;
            
            // Copy to clipboard
            navigator.clipboard.writeText(`${text}\n${url}`).then(() => {
                if (window.PortfolioUtils) {
                    window.PortfolioUtils.showSuccessMessage('Link copied to clipboard!');
                }
            }).catch(() => {
                // Fallback: create temporary input element
                const tempInput = document.createElement('input');
                tempInput.value = `${text}\n${url}`;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);
                
                if (window.PortfolioUtils) {
                    window.PortfolioUtils.showSuccessMessage('Link copied to clipboard!');
                }
            });
        }
    }

    // Method to add new blog posts
    addBlogPost(post) {
        this.blogData.unshift(post); // Add to beginning
        this.renderBlog();
    }

    // Method to remove blog posts
    removeBlogPost(id) {
        this.blogData = this.blogData.filter(post => post.id !== id);
        this.renderBlog();
    }

    // Method to update blog posts
    updateBlogPost(id, updatedPost) {
        const index = this.blogData.findIndex(post => post.id === id);
        if (index !== -1) {
            this.blogData[index] = { ...this.blogData[index], ...updatedPost };
            this.renderBlog();
        }
    }

    // Method to search blog posts
    searchBlogPosts(query) {
        if (!query.trim()) {
            this.renderBlog();
            return;
        }

        const filteredPosts = this.blogData.filter(post => 
            post.title.toLowerCase().includes(query.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
            post.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
        );

        this.renderFilteredBlog(filteredPosts);
    }

    renderFilteredBlog(posts) {
        if (!this.blogGrid) return;

        this.blogGrid.innerHTML = '';

        if (posts.length === 0) {
            this.showNoBlogResults();
            return;
        }

        posts.forEach(item => {
            const blogItem = this.createBlogItem(item);
            this.blogGrid.appendChild(blogItem);
        });

        this.animateBlogItems();
    }

    showNoBlogResults() {
        this.blogGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search" style="font-size: 3rem; color: var(--text-light); margin-bottom: 1rem;"></i>
                <h3 style="color: var(--text-secondary);">No blog posts found</h3>
                <p style="color: var(--text-light);">Try adjusting your search terms or check back later for new articles.</p>
            </div>
        `;
    }

    // Method to get blog post by slug
    getBlogPostBySlug(slug) {
        return this.blogData.find(post => post.slug === slug);
    }

    // Method to get related blog posts
    getRelatedPosts(currentPostId, limit = 3) {
        const currentPost = this.blogData.find(post => post.id === currentPostId);
        if (!currentPost) return [];

        const relatedPosts = this.blogData
            .filter(post => post.id !== currentPostId)
            .filter(post => 
                post.tags.some(tag => currentPost.tags.includes(tag))
            )
            .slice(0, limit);

        return relatedPosts;
    }
}

// Initialize blog when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('blog-grid')) {
        window.blogInstance = new Blog();
    }
});

// Export Blog class for external use
window.Blog = Blog;
