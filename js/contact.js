// Contact form functionality for Haleema Portfolio
class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.submitButton = this.form ? this.form.querySelector('button[type="submit"]') : null;
        this.formData = {};
        
        this.init();
    }

    init() {
        if (this.form) {
            this.bindEvents();
            this.setupFormValidation();
        }
    }

    bindEvents() {
        // Form submission
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });

        // Real-time validation
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });

            input.addEventListener('input', () => {
                this.clearFieldError(input);
            });
        });

        // Auto-resize textarea
        const textarea = this.form.querySelector('textarea');
        if (textarea) {
            textarea.addEventListener('input', () => {
                this.autoResizeTextarea(textarea);
            });
        }
    }

    setupFormValidation() {
        // Add required field indicators
        const requiredFields = this.form.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            const label = field.previousElementSibling;
            if (label && label.tagName === 'LABEL') {
                label.innerHTML += ' <span class="required">*</span>';
            }
        });

        // Add required field styles
        const style = document.createElement('style');
        style.textContent = `
            .required {
                color: #ef4444;
                font-weight: bold;
            }
            
            .form-group.success label {
                color: #10b981;
            }
            
            .form-group.error label {
                color: #ef4444;
            }
        `;
        document.head.appendChild(style);
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = `${this.getFieldLabel(field)} is required.`;
        }

        // Email validation
        if (fieldName === 'email' && value && !this.isValidEmail(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address.';
        }

        // Length validation
        if (fieldName === 'name' && value && value.length < 2) {
            isValid = false;
            errorMessage = 'Name must be at least 2 characters long.';
        }

        if (fieldName === 'subject' && value && value.length < 5) {
            isValid = false;
            errorMessage = 'Subject must be at least 5 characters long.';
        }

        if (fieldName === 'message' && value && value.length < 10) {
            isValid = false;
            errorMessage = 'Message must be at least 10 characters long.';
        }

        // Show or clear error
        if (!isValid) {
            this.showFieldError(field, errorMessage);
        } else {
            this.clearFieldError(field);
        }

        return isValid;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    getFieldLabel(field) {
        const label = field.previousElementSibling;
        if (label && label.tagName === 'LABEL') {
            return label.textContent.replace(' *', '').trim();
        }
        return field.name.charAt(0).toUpperCase() + field.name.slice(1);
    }

    showFieldError(field, message) {
        const formGroup = field.closest('.form-group');
        formGroup.classList.remove('success');
        formGroup.classList.add('error');

        let errorElement = formGroup.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            formGroup.appendChild(errorElement);
        }
        errorElement.textContent = message;
    }

    clearFieldError(field) {
        const formGroup = field.closest('.form-group');
        formGroup.classList.remove('error');
        
        const errorElement = formGroup.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }

    autoResizeTextarea(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    }

    validateForm() {
        const fields = this.form.querySelectorAll('input, textarea');
        let isValid = true;

        fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    collectFormData() {
        const formData = new FormData(this.form);
        this.formData = {};

        for (let [key, value] of formData.entries()) {
            this.formData[key] = value.trim();
        }

        return this.formData;
    }

    async handleSubmit() {
        // Validate form
        if (!this.validateForm()) {
            if (window.PortfolioUtils) {
                window.PortfolioUtils.showErrorMessage('Please fix the errors in the form.');
            }
            return;
        }

        // Collect form data
        const data = this.collectFormData();

        // Show loading state
        const originalButtonText = this.submitButton.innerHTML;
        this.submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        this.submitButton.disabled = true;

        try {
            // Simulate form submission (replace with actual API call)
            await this.submitForm(data);
            
            // Show success message
            if (window.PortfolioUtils) {
                window.PortfolioUtils.showSuccessMessage('Thank you! Your message has been sent successfully.');
            }

            // Reset form
            this.resetForm();
            
        } catch (error) {
            // Show error message
            if (window.PortfolioUtils) {
                window.PortfolioUtils.showErrorMessage('Sorry, there was an error sending your message. Please try again.');
            }
            console.error('Form submission error:', error);
        } finally {
            // Restore button state
            this.submitButton.innerHTML = originalButtonText;
            this.submitButton.disabled = false;
        }
    }

    async submitForm(data) {
        // This is a simulation - replace with actual API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate network delay
                if (Math.random() > 0.1) { // 90% success rate
                    resolve({ success: true, message: 'Message sent successfully' });
                } else {
                    reject(new Error('Network error'));
                }
            }, 1500);
        });

        // Example of actual API call:
        /*
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            return result;
        } catch (error) {
            throw error;
        }
        */
    }

    resetForm() {
        this.form.reset();
        
        // Clear all error states
        const formGroups = this.form.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            group.classList.remove('error', 'success');
            const errorElement = group.querySelector('.error-message');
            if (errorElement) {
                errorElement.remove();
            }
        });

        // Reset textarea height
        const textarea = this.form.querySelector('textarea');
        if (textarea) {
            textarea.style.height = 'auto';
        }

        // Clear form data
        this.formData = {};
    }

    // Method to pre-fill form (useful for testing or pre-population)
    prefillForm(data) {
        Object.keys(data).forEach(key => {
            const field = this.form.querySelector(`[name="${key}"]`);
            if (field) {
                field.value = data[key];
            }
        });
    }

    // Method to get form data
    getFormData() {
        return { ...this.formData };
    }

    // Method to check if form is valid
    isFormValid() {
        return this.validateForm();
    }

    // Method to focus on first error field
    focusFirstError() {
        const firstError = this.form.querySelector('.form-group.error input, .form-group.error textarea');
        if (firstError) {
            firstError.focus();
        }
    }

    // Method to add custom validation rule
    addValidationRule(fieldName, validator, errorMessage) {
        const field = this.form.querySelector(`[name="${fieldName}"]`);
        if (field) {
            field.addEventListener('blur', () => {
                const value = field.value.trim();
                if (value && !validator(value)) {
                    this.showFieldError(field, errorMessage);
                }
            });
        }
    }

    // Method to enable/disable form
    setFormEnabled(enabled) {
        const fields = this.form.querySelectorAll('input, textarea, button');
        fields.forEach(field => {
            field.disabled = !enabled;
        });
    }

    // Method to show form status
    showFormStatus(message, type = 'info') {
        const statusDiv = document.createElement('div');
        statusDiv.className = `form-status form-status-${type}`;
        statusDiv.textContent = message;
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .form-status {
                padding: 1rem;
                border-radius: 0.5rem;
                margin-bottom: 1rem;
                font-weight: 500;
            }
            
            .form-status-info {
                background: var(--bg-secondary);
                color: var(--text-secondary);
                border: 1px solid var(--border-color);
            }
            
            .form-status-success {
                background: #d1fae5;
                color: #065f46;
                border: 1px solid #10b981;
            }
            
            .form-status-error {
                background: #fee2e2;
                color: #991b1b;
                border: 1px solid #ef4444;
            }
        `;
        document.head.appendChild(style);
        
        // Insert at the beginning of the form
        this.form.insertBefore(statusDiv, this.form.firstChild);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (statusDiv.parentNode) {
                statusDiv.remove();
            }
        }, 5000);
    }
}

// Initialize contact form when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('contact-form')) {
        window.contactFormInstance = new ContactForm();
    }
});

// Export ContactForm class for external use
window.ContactForm = ContactForm;

// Additional utility functions for contact form
window.ContactUtils = {
    // Validate email format
    validateEmail: function(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    // Format phone number
    formatPhoneNumber: function(phone) {
        const cleaned = phone.replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return '(' + match[1] + ') ' + match[2] + '-' + match[3];
        }
        return phone;
    },

    // Sanitize input
    sanitizeInput: function(input) {
        return input.replace(/[<>]/g, '');
    },

    // Generate contact form data for testing
    generateTestData: function() {
        return {
            name: 'John Doe',
            email: 'john.doe@example.com',
            subject: 'Project Inquiry',
            message: 'I would like to discuss a potential project with you. Please let me know when you are available for a call.'
        };
    }
};
