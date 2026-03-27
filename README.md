# 🍽️ Saveur | Modern Fine Dining Landing Page

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)

**Saveur** is a high-end, responsive restaurant landing page designed with a "Dark Luxury" aesthetic. This project showcases modern frontend development techniques, focusing on performance, fluid typography, and professional-grade accessibility.

---

## 🚀 Live Demo
🔗 **[Experience Saveur Live](https://bilal-ahmed-tech.github.io/saveur-restaurant/)**

---

## 🛠️ Technical Stack
* **Architecture:** Mobile-First Responsive Design.
* **Frontend:** HTML5, CSS3 (Custom Properties & Flexbox/Grid).
* **Framework:** Bootstrap 5.3.8 (Customized utility integration).
* **Logic:** Vanilla JavaScript (ES6+).
* **Iconography:** Font Awesome 6.5.0.
* **Typography:** Google Fonts (Playfair Display & Jost).

---

## ✨ Key Technical Features

### 1. High-Performance Navigation
* **Intersection Observer API:** Implemented a scroll-spy system that dynamically updates active navigation links without the performance overhead of heavy scroll event listeners.
* **Sticky UI Logic:** A glassmorphism-inspired navbar that adapts its visual density based on scroll depth to maintain readability.

### 2. Intelligent Reservation System
* **Time-Sensitive Validation:** A custom JavaScript validation engine that prevents users from selecting past times for the current date.
* **Interactive Feedback:** Features state-driven UI updates, including animated loading spinners and asynchronous success messaging via Web3Forms logic.

### 3. Professional Accessibility (a11y)
* **Screen Reader Optimization:** Every icon-only link (YouTube, Google, Instagram) is equipped with descriptive `aria-label` attributes.
* **Decorative Elements:** Utilized `aria-hidden="true"` on Font Awesome icons to reduce noise for assistive technologies.

### 4. Fluid Typography & Layout
* **Dynamic Scaling:** Leverages the CSS `clamp()` function to ensure headings and body text scale seamlessly between 320px and 1400px+ viewports.
* **Core Web Vitals:** Optimized for **CLS (Cumulative Layout Shift)** by using explicit aspect ratios and `font-display: swap`.

---

## 📸 Project Interface

| Desktop Experience | Mobile Optimized |
| :--- | :--- |
| <img src="./assets/Desktop%20view.png" width="600" alt="Desktop View"> | <img src="./assets/Mobile%20view.jpg" width="240" alt="Mobile View"> |

---

## 🔧 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/bilal-ahmed-tech/saveur-restaurant.git](https://github.com/bilal-ahmed-tech/saveur-restaurant.git)