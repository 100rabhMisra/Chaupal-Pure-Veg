// ===== Shopping Cart Management =====
let cart = [];

// Update cart badge
function updateCartBadge() {
    const cartBadge = document.getElementById('cartBadge');
    if (cartBadge) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartBadge.textContent = totalItems;
        
        if (totalItems > 0) {
            cartBadge.style.display = 'flex';
            // Trigger animation
            cartBadge.style.animation = 'none';
            setTimeout(() => {
                cartBadge.style.animation = 'badgePulse 0.3s ease';
            }, 10);
        } else {
            cartBadge.style.display = 'none';
        }
    }
}

// Add item to cart
function addToCart(itemName, price) {
    const existingItem = cart.find(item => item.name === itemName);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: itemName,
            price: price,
            quantity: 1
        });
    }
    
    updateCartDisplay();
    updateCartBadge();
    showNotification(`${itemName} added to cart!`);
}

// Update quantity
function updateQuantity(itemName, change) {
    const item = cart.find(item => item.name === itemName);
    
    if (item) {
        item.quantity += change;
        
        if (item.quantity <= 0) {
            removeFromCart(itemName);
        } else {
            updateCartDisplay();
            updateCartBadge();
        }
    }
}

// Remove item from cart
function removeFromCart(itemName) {
    cart = cart.filter(item => item.name !== itemName);
    updateCartDisplay();
    updateCartBadge();
    showNotification(`${itemName} removed from cart`);
}

// Update cart display
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartSummary = document.getElementById('cartSummary');
    const orderForm = document.getElementById('orderForm');
    
    // Update cart badge
    updateCartBadge();
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty. Add items from the menu!</p>';
        cartSummary.style.display = 'none';
        orderForm.style.display = 'none';
        return;
    }
    
    let cartHTML = '';
    let subtotal = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        cartHTML += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>₹${item.price} each</p>
                </div>
                <div class="cart-item-actions">
                    <div class="quantity-controls">
                        <button class="qty-btn" onclick="updateQuantity('${item.name}', -1)">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity('${item.name}', 1)">+</button>
                    </div>
                    <span class="cart-item-price">₹${itemTotal}</span>
                    <button class="btn-remove" onclick="removeFromCart('${item.name}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    });
    
    cartItemsContainer.innerHTML = cartHTML;
    
    // Calculate totals
    const gst = subtotal * 0.05;
    const total = subtotal + gst;
    
    document.getElementById('subtotal').textContent = `₹${subtotal.toFixed(2)}`;
    document.getElementById('gst').textContent = `₹${gst.toFixed(2)}`;
    document.getElementById('total').textContent = `₹${total.toFixed(2)}`;
    
    cartSummary.style.display = 'block';
    orderForm.style.display = 'block';
}

// ===== Menu Filtering =====
function filterMenu(category) {
    const menuItems = document.querySelectorAll('.menu-item');
    const menuTabs = document.querySelectorAll('.menu-tab');
    
    // Update active tab
    menuTabs.forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');
    
    // Filter items
    menuItems.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, 10);
        } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        }
    });
}

// ===== Modal Functions =====

// Booking Modal
function openBookingModal() {
    document.getElementById('bookingModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('bookingDate').setAttribute('min', today);
}

function closeBookingModal() {
    document.getElementById('bookingModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    document.getElementById('bookingForm').reset();
}

// Order Modal
function openOrderModal() {
    document.getElementById('orderModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
    updateCartDisplay();
}

function closeOrderModal() {
    document.getElementById('orderModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Success Modal
function openSuccessModal(title, message) {
    document.getElementById('successTitle').textContent = title;
    document.getElementById('successMessage').textContent = message;
    document.getElementById('successModal').style.display = 'block';
}

function closeSuccessModal() {
    document.getElementById('successModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const bookingModal = document.getElementById('bookingModal');
    const orderModal = document.getElementById('orderModal');
    const successModal = document.getElementById('successModal');
    
    if (event.target === bookingModal) {
        closeBookingModal();
    }
    if (event.target === orderModal) {
        closeOrderModal();
    }
    if (event.target === successModal) {
        closeSuccessModal();
    }
}

// ===== Form Submissions =====

// Submit Booking
function submitBooking(event) {
    event.preventDefault();
    
    const formData = {
        name: document.getElementById('bookingName').value,
        email: document.getElementById('bookingEmail').value,
        phone: document.getElementById('bookingPhone').value,
        date: document.getElementById('bookingDate').value,
        time: document.getElementById('bookingTime').value,
        guests: document.getElementById('bookingGuests').value,
        occasion: document.getElementById('bookingOccasion').value,
        notes: document.getElementById('bookingNotes').value
    };
    
    console.log('Booking Data:', formData);
    
    // Close booking modal
    closeBookingModal();
    
    // Show success message
    const bookingDate = new Date(formData.date).toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    openSuccessModal(
        'Reservation Confirmed!',
        `Thank you ${formData.name}! Your table for ${formData.guests} guest(s) has been reserved for ${bookingDate} at ${formData.time}. We'll send a confirmation to ${formData.email}.`
    );
    
    // In a real application, you would send this data to a server
    // Example: sendBookingToServer(formData);
}

// Submit Order
function submitOrder(event) {
    event.preventDefault();
    
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const formData = {
        name: document.getElementById('orderName').value,
        phone: document.getElementById('orderPhone').value,
        address: document.getElementById('orderAddress').value,
        notes: document.getElementById('orderNotes').value,
        items: cart,
        subtotal: parseFloat(document.getElementById('subtotal').textContent.replace('₹', '')),
        gst: parseFloat(document.getElementById('gst').textContent.replace('₹', '')),
        total: parseFloat(document.getElementById('total').textContent.replace('₹', ''))
    };
    
    console.log('Order Data:', formData);
    
    // Close order modal
    closeOrderModal();
    
    // Show success message
    openSuccessModal(
        'Order Placed Successfully!',
        `Thank you ${formData.name}! Your order of ₹${formData.total.toFixed(2)} has been received. We'll deliver it to your address shortly. You'll receive a call on ${formData.phone} for confirmation.`
    );
    
    // Clear cart
    updateCartBadge();
    cart = [];
    document.getElementById('orderForm').reset();
    
    // In a real application, you would send this data to a server
    // Example: sendOrderToServer(formData);
}

// ===== Notification System =====
function showNotification(message) {
    // Remove existing notification if any
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: #28a745;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Navbar Scroll Effect =====
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
    }
    
    lastScroll = currentScroll;
});

// ===== Hamburger Menu (Mobile) =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('The Punjab Club Website Loaded Successfully!');
    
    // Add fade-in animation to sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

// ===== Prevent Form Resubmission =====
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// ===== Helper Functions for Future Backend Integration =====

// Example function to send booking to server
function sendBookingToServer(bookingData) {
    // Uncomment and modify when you have a backend
    /*
    fetch('/api/bookings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Booking confirmed:', data);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error processing your booking. Please try again.');
    });
    */
}

// Example function to send order to server
function sendOrderToServer(orderData) {
    // Uncomment and modify when you have a backend
    /*
    fetch('/api/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Order confirmed:', data);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error processing your order. Please try again.');
    });
    */
}
