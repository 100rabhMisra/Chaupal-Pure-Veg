# The Punjab Club - Restaurant Website

A beautiful, fully responsive static website for The Punjab Club family restaurant in Greater Noida West.

## 🌟 Features

### Core Functionality
- **📱 Fully Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- **🍽️ Interactive Menu** - Filter dishes by category (Starters, Main Course, Breads, Desserts, Beverages)
- **📅 Table Booking System** - Easy-to-use reservation form with date/time selection
- **🛒 Online Ordering** - Complete shopping cart with quantity management
- **🖼️ Photo Gallery** - Showcase restaurant ambiance and dishes
- **📍 Google Maps Integration** - Easy location finding
- **✨ Smooth Animations** - Professional scroll effects and transitions

### User Experience
- Smooth scrolling navigation
- Real-time cart updates
- Form validation
- Success notifications
- Beautiful modal dialogs
- Mobile-friendly hamburger menu

## 📁 File Structure

```
Punjab/
├── index.html          # Main HTML file
├── styles.css          # All styling and responsive design
├── script.js           # Interactive functionality
└── README.md           # This file
```

## 🚀 How to Use

### Option 1: Direct Opening
1. Simply open `index.html` in any modern web browser
2. The website will load with all features working

### Option 2: Local Server (Recommended for Development)
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```
Then visit `http://localhost:8000` in your browser.

## 🎨 Customization Guide

### 1. Update Restaurant Information

**Contact Details** (in `index.html`):
```html
<!-- Search for these sections and update -->
<p>+91 XXX XXX XXXX</p>  <!-- Update phone number -->
<p>info@thepunjabclub.com</p>  <!-- Update email -->
```

**Location** (in `index.html`):
- Update the Google Maps iframe with your actual coordinates
- Replace the placeholder map embed code

### 2. Modify Menu Items

Add new dishes in `index.html`:
```html
<div class="menu-item" data-category="CATEGORY_NAME">
    <img src="IMAGE_URL" alt="Dish Name">
    <div class="menu-item-content">
        <h3>Dish Name</h3>
        <p>Description of the dish</p>
        <div class="menu-item-footer">
            <span class="price">₹XXX</span>
            <button class="btn-add-to-cart" onclick="addToCart('Dish Name', XXX)">
                <i class="fas fa-plus"></i> Add
            </button>
        </div>
    </div>
</div>
```

Categories: `starters`, `main-course`, `breads`, `desserts`, `beverages`

### 3. Change Colors

Edit CSS variables in `styles.css`:
```css
:root {
    --primary-color: #d4af37;      /* Golden color */
    --primary-dark: #b8941f;       /* Darker golden */
    --secondary-color: #8b4513;    /* Brown */
    --text-dark: #2c2c2c;          /* Dark text */
    --text-light: #666;             /* Light text */
}
```

### 4. Update Images

Replace image URLs in `index.html`:
- Hero background image
- About section image
- Menu item images
- Gallery images

**Using Local Images:**
1. Create an `images/` folder
2. Place your images there
3. Update URLs: `src="images/your-image.jpg"`

### 5. Social Media Links

Update in the footer section:
```html
<a href="YOUR_FACEBOOK_URL"><i class="fab fa-facebook"></i></a>
<a href="YOUR_INSTAGRAM_URL"><i class="fab fa-instagram"></i></a>
```

## 💡 Features Breakdown

### Table Booking System
- Name, Email, Phone validation
- Date picker (minimum date: today)
- Time selection
- Guest count selection
- Special occasion dropdown
- Notes for special requests
- Success confirmation modal

### Online Ordering
- Add items to cart
- Adjust quantities (+/-)
- Remove items
- Real-time price calculation
- GST calculation (5%)
- Delivery form with address
- Order summary display

### Menu Filtering
- Filter by All, Starters, Main Course, Breads, Desserts, Beverages
- Smooth animations on filter
- Active tab highlighting

## 🔌 Backend Integration (Future)

The website is ready for backend integration. Uncomment and modify these functions in `script.js`:

### For Bookings:
```javascript
function sendBookingToServer(bookingData) {
    fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch(error => console.error('Error:', error));
}
```

### For Orders:
```javascript
function sendOrderToServer(orderData) {
    fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch(error => console.error('Error:', error));
}
```

## 📱 Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: 767px and below

## 🎯 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Opera (latest)

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Grid & Flexbox
- **JavaScript (ES6+)** - Interactive functionality
- **Font Awesome** - Icons
- **Google Fonts** - Typography (Playfair Display, Poppins)

## 📋 Testing Checklist

Before presenting to client:

- [ ] All contact information updated
- [ ] Phone numbers working
- [ ] Email addresses correct
- [ ] Google Maps showing correct location
- [ ] All menu items and prices accurate
- [ ] Images loading properly
- [ ] Social media links working
- [ ] Test on mobile devices
- [ ] Test all form validations
- [ ] Test booking system
- [ ] Test ordering system
- [ ] Check all pages scroll smoothly

## 🚀 Deployment Options

### 1. GitHub Pages (Free)
1. Create a GitHub repository
2. Upload all files
3. Enable GitHub Pages in settings
4. Your site will be live at `https://username.github.io/repository-name`

### 2. Netlify (Free)
1. Drag and drop your folder to netlify.com
2. Get instant deployment
3. Free HTTPS and custom domain support

### 3. Vercel (Free)
1. Import from GitHub
2. Automatic deployments on updates

### 4. Traditional Web Hosting
1. Upload files via FTP
2. Supports any hosting service (GoDaddy, Hostinger, etc.)

## 💼 Client Presentation Tips

1. **Demo Flow**:
   - Start with hero section
   - Show menu filtering
   - Demonstrate booking system
   - Show cart and ordering
   - Scroll through gallery
   - Show mobile responsiveness

2. **Highlight Features**:
   - Professional design
   - Easy navigation
   - Customer-friendly booking
   - Simple ordering process
   - Mobile-optimized

3. **Future Enhancements** (Optional):
   - Payment gateway integration
   - Customer accounts
   - Order tracking
   - Reviews and ratings
   - Newsletter subscription
   - WhatsApp integration

## 📞 Support

For customization help or questions:
- Check the comments in the code files
- All functions are well-documented
- Console logs available for debugging

## 📝 License

This is a custom website created for The Punjab Club restaurant.

---

**Made with ❤️ for The Punjab Club**

*Authentic Punjabi Cuisine in Greater Noida West*
