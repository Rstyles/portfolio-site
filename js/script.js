// EmailJS Configuration
// Replace these with your actual EmailJS credentials
const EMAILJS_SERVICE_ID = 'service_jt0kp8o'; // e.g., 'service_abc123'
const EMAILJS_TEMPLATE_ID = 'template_3bvkjwg'; // e.g., 'template_xyz789'
const EMAILJS_PUBLIC_KEY = 'HPCYSWCIQNp05EmgG'; // e.g., 'abcd1234567890'

// Initialize EmailJS
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with your public key
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }
    
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                showMessage('Please fill in all fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Check if EmailJS is loaded
            if (typeof emailjs === 'undefined') {
                showMessage('Email service is not available. Please try again later.', 'error');
                return;
            }
            
            // Prepare template parameters
            const templateParams = {
                from_name: name,
                from_email: email,
                subject: subject,
                message: message,
                to_name: 'Ryan Styles' // Your name
            };
            
            // Show loading state
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Send email using EmailJS
            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
                .then(function(response) {
                    console.log('Email sent successfully!', response.status, response.text);
                    
                    // Reset button
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    
                    // Show success message
                    showMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
                    
                    // Reset form
                    contactForm.reset();
                })
                .catch(function(error) {
                    console.error('Failed to send email:', error);
                    
                    // Reset button
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    
                    // Show error message
                    showMessage('Sorry, there was an error sending your message. Please try again.', 'error');
                });
        });
    }
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show message function
function showMessage(text, type) {
    // Remove any existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const message = document.createElement('div');
    message.className = `form-message ${type}`;
    message.textContent = text;
    
    // Insert message before the form
    const contactContent = document.querySelector('.contact-content');
    const contactForm = document.querySelector('.contact-form');
    contactContent.insertBefore(message, contactForm);
    
    // Auto-remove message after 5 seconds
    setTimeout(() => {
        if (message.parentNode) {
            message.remove();
        }
    }, 5000);
}