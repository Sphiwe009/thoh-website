# Thobile Beauty & Cosmetic Online Store 🌸✨

A modern, high-end e-commerce web storefront engineered for **Thobile Beauty & Cosmetics**, featuring curated collections in **Skincare, Makeup, Haircare, and Fragrance**.

---

## 🌟 Highlights & Features

- **Luxury Aesthetic**: Rose-gold, champagne, and blush palette with Playfair Display editorial typography and subtle micro-interactions.
- **Product Catalog**:
  - Filterable by categories: *All Products*, *Skincare*, *Makeup*, *Haircare*, *Fragrance*.
  - Live search bar filtering by name, subcategory, or description.
  - Sorting by *Featured / Best Sellers*, *Price: Low to High*, *Price: High to Low*, and *Customer Rating*.
  - Rich product badges (`Bestseller`, `Clean Beauty`, `Editor Choice`, `Award Winner`, etc.).
- **Interactive Shopping Bag (Cart)**:
  - Slide-out drawer with persisted state in `localStorage`.
  - Item quantity increment/decrement and removal controls.
  - Dynamic **Free Delivery Progress Indicator** (threshold: R500).
  - Promo code discounts system (e.g. `GLOW10` for 10% off, `THOBILE20` for 20% off, `BEAUTY50` for R50 off).
- **Product Details Modal**:
  - Full-resolution preview, star rating, and customer review count.
  - Shade & scent selector with live active state.
  - Detailed product information: skin suitability, volume, key botanical ingredients, and how-to-use instructions.
- **Wishlist Functionality**:
  - One-click heart toggle on product cards, saved to `localStorage`, with header badge counter.
- **Seamless Checkout & Receipt**:
  - Address collection with South African context (ZAR pricing, major cities).
  - Multiple payment methods: Instant EFT / Ozow, Debit & Credit Card, Cash on Delivery.
  - Order confirmation screen with generated Order Number, breakdown, and printable receipt.
- **Zero-Dependency Setup**:
  - Built with modern HTML5, Tailwind CSS (via CDN), and Vanilla JavaScript.
  - Runs directly in any web browser without needing a Node.js or Python backend.

---

## 📁 Project Structure

```
Thobile Beauty Cosmetic Online Store/
├── index.html          # Main storefront HTML template
├── css/
│   └── styles.css      # Custom styling, animations & luxury themes
├── js/
│   ├── products.js     # Comprehensive beauty product catalog & discount rules
│   └── app.js          # Cart, catalog filtering, search, modal & checkout logic
└── README.md           # Documentation and usage guide
```

---

## 🚀 How to Run Locally

### Option 1: Direct Browser Launch
Simply double-click `index.html` or right-click `index.html` and select **Open with Google Chrome / Microsoft Edge / Safari**.

### Option 2: VS Code Live Server
1. Open the project folder in **VS Code**.
2. Right click `index.html` and click **"Open with Live Server"**.

---

## 🏷️ Test Promo Codes
Try applying any of these promo codes in the shopping cart drawer:
- **`GLOW10`**: 10% off your entire order
- **`THOBILE20`**: 20% welcome discount
- **`BEAUTY50`**: R50 flat discount

