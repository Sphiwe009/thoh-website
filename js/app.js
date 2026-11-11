// Main Application Logic for Thobile Beauty Cosmetic Online Store

let state = {
  products: PRODUCTS,
  cart: JSON.parse(localStorage.getItem('tb_cart')) || [],
  wishlist: JSON.parse(localStorage.getItem('tb_wishlist')) || [],
  activeCategory: 'all',
  searchQuery: '',
  sortBy: 'featured',
  appliedCoupon: null,
  activeProductModalId: null,
  selectedShade: null
};

// DOM ready initialization
document.addEventListener('DOMContentLoaded', () => {
  renderCategoryPills();
  renderProducts();
  renderCart();
  updateWishlistCount();
  setupEventListeners();
});

// Setup UI Event Listeners
function setupEventListeners() {
  // Search input
  const searchInput = document.getElementById('searchInput');
  const mobileSearchInput = document.getElementById('mobileSearchInput');
  
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value.toLowerCase().trim();
      renderProducts();
    });
  }
  if (mobileSearchInput) {
    mobileSearchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value.toLowerCase().trim();
      renderProducts();
    });
  }

  // Sort dropdown
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      renderProducts();
    });
  }

  // Cart drawer open/close
  const cartBtn = document.getElementById('cartBtn');
  const closeCartBtn = document.getElementById('closeCartBtn');
  const cartOverlay = document.getElementById('cartOverlay');

  if (cartBtn) cartBtn.addEventListener('click', () => toggleCart(true));
  if (closeCartBtn) closeCartBtn.addEventListener('click', () => toggleCart(false));
  if (cartOverlay) cartOverlay.addEventListener('click', () => toggleCart(false));

  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Coupon apply
  const applyCouponBtn = document.getElementById('applyCouponBtn');
  const couponInput = document.getElementById('couponInput');
  if (applyCouponBtn && couponInput) {
    applyCouponBtn.addEventListener('click', () => {
      applyCoupon(couponInput.value.trim().toUpperCase());
    });
  }

  // Checkout modal
  const checkoutBtn = document.getElementById('checkoutBtn');
  const closeCheckoutBtn = document.getElementById('closeCheckoutBtn');
  const checkoutOverlay = document.getElementById('checkoutOverlay');
  const checkoutForm = document.getElementById('checkoutForm');

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (state.cart.length === 0) {
        showToast('Your shopping bag is empty!', 'error');
        return;
      }
      toggleCart(false);
      openCheckoutModal();
    });
  }
  if (closeCheckoutBtn) closeCheckoutBtn.addEventListener('click', closeCheckoutModal);
  if (checkoutOverlay) checkoutOverlay.addEventListener('click', closeCheckoutModal);
  if (checkoutForm) checkoutForm.addEventListener('submit', handleCheckoutSubmit);

  // Product detail modal overlay click
  const productModalOverlay = document.getElementById('productModalOverlay');
  const closeProductModalBtn = document.getElementById('closeProductModalBtn');
  if (productModalOverlay) productModalOverlay.addEventListener('click', closeProductModal);
  if (closeProductModalBtn) closeProductModalBtn.addEventListener('click', closeProductModal);

  // Close receipt modal
  const closeReceiptBtn = document.getElementById('closeReceiptBtn');
  if (closeReceiptBtn) {
    closeReceiptBtn.addEventListener('click', () => {
      const receiptModal = document.getElementById('receiptModal');
      if (receiptModal) receiptModal.classList.add('hidden');
    });
  }

  // Newsletter form
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('newsletterEmail');
      showToast(`Thank you for subscribing! Your 15% welcome code is GLOW10.`, 'success');
      if (emailInput) emailInput.value = '';
    });
  }
}

// Render Category Filter Buttons
function renderCategoryPills() {
  const categories = [
    { id: 'all', label: 'All Products', icon: 'sparkles' },
    { id: 'skincare', label: 'Skincare', icon: 'droplet' },
    { id: 'makeup', label: 'Makeup', icon: 'palette' },
    { id: 'haircare', label: 'Haircare', icon: 'wind' },
    { id: 'fragrance', label: 'Fragrance', icon: 'heart' }
  ];

  const container = document.getElementById('categoryFilters');
  if (!container) return;

  container.innerHTML = categories.map(cat => {
    const isActive = state.activeCategory === cat.id;
    return `
      <button 
        onclick="setCategory('${cat.id}')"
        class="px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 shadow-sm flex items-center space-x-2 ${
          isActive 
            ? 'bg-[#be6b7b] text-white shadow-rose-200' 
            : 'bg-white text-gray-700 hover:bg-rose-50 hover:text-[#be6b7b] border border-gray-200'
        }"
      >
        <span>${cat.label}</span>
      </button>
    `;
  }).join('');
}

function setCategory(catId) {
  state.activeCategory = catId;
  renderCategoryPills();
  renderProducts();

  // Highlight active link in header if applicable
  const navLinks = document.querySelectorAll('.nav-cat-link');
  navLinks.forEach(link => {
    if (link.dataset.category === catId) {
      link.classList.add('text-[#be6b7b]', 'font-bold');
      link.classList.remove('text-gray-700');
    } else {
      link.classList.remove('text-[#be6b7b]', 'font-bold');
      link.classList.add('text-gray-700');
    }
  });

  // Smooth scroll to catalog section
  const catalogSection = document.getElementById('productCatalogSection');
  if (catalogSection && window.scrollY > 300) {
    catalogSection.scrollIntoView({ behavior: 'smooth' });
  }
}

// Filter and Sort Products
function getFilteredProducts() {
  return state.products
    .filter(product => {
      // Category match
      if (state.activeCategory !== 'all' && product.category !== state.activeCategory) {
        return false;
      }
      // Search match
      if (state.searchQuery) {
        const query = state.searchQuery;
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesSub = product.subCategory.toLowerCase().includes(query);
        return matchesName || matchesDesc || matchesSub;
      }
      return true;
    })
    .sort((a, b) => {
      if (state.sortBy === 'price-low') return a.price - b.price;
      if (state.sortBy === 'price-high') return b.price - a.price;
      if (state.sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured (default array order)
    });
}

// Render Product Grid
function renderProducts() {
  const container = document.getElementById('productsGrid');
  const countLabel = document.getElementById('productsCountLabel');
  if (!container) return;

  const filtered = getFilteredProducts();

  if (countLabel) {
    countLabel.textContent = `Showing ${filtered.length} luxury cosmetic ${filtered.length === 1 ? 'item' : 'items'}`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center">
        <div class="w-16 h-16 mx-auto mb-4 bg-rose-50 text-[#be6b7b] rounded-full flex items-center justify-center text-2xl font-serif">
          ✨
        </div>
        <h3 class="text-xl font-serif font-medium text-gray-900 mb-2">No beauty products found</h3>
        <p class="text-gray-500 max-w-md mx-auto mb-6 text-sm">We couldn't find matches for "${state.searchQuery || state.activeCategory}". Try clearing your search or browsing another category.</p>
        <button onclick="resetFilters()" class="btn-primary-gradient px-6 py-2.5 rounded-full text-sm font-medium">
          View All Products
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(product => {
    const isWishlisted = state.wishlist.includes(product.id);
    const hasDiscount = product.originalPrice && product.originalPrice > product.price;

    return `
      <div class="product-card group bg-white rounded-2xl overflow-hidden border border-rose-100/60 shadow-sm flex flex-col justify-between">
        <!-- Image & Badges Container -->
        <div class="relative bg-[#fbf9f8] aspect-square overflow-hidden cursor-pointer" onclick="openProductModal('${product.id}')">
          <img 
            src="${product.image}" 
            alt="${product.name}" 
            class="product-img w-full h-full object-cover object-center"
            loading="lazy"
          />

          <!-- Badge -->
          ${product.badge ? `
            <div class="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-[#8c3b4d] text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
              ${product.badge}
            </div>
          ` : ''}

          <!-- Wishlist Button -->
          <button 
            type="button"
            onclick="event.stopPropagation(); toggleWishlist('${product.id}')"
            class="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-gray-600 hover:text-rose-600 shadow-sm transition-transform active:scale-90"
            title="Add to Wishlist"
          >
            <svg class="w-4 h-4 ${isWishlisted ? 'text-rose-600 fill-rose-600' : 'text-gray-600'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>

          <!-- Quick view hint -->
          <div class="absolute inset-x-0 bottom-0 py-2.5 bg-gradient-to-t from-black/60 to-transparent text-white text-xs font-medium text-center opacity-0 group-hover:opacity-100 transition-opacity">
            Click to view ingredients & details
          </div>
        </div>

        <!-- Details Container -->
        <div class="p-5 flex flex-col flex-1 justify-between">
          <div>
            <!-- Category and rating -->
            <div class="flex items-center justify-between text-xs text-[#be6b7b] font-medium uppercase tracking-wider mb-1.5">
              <span>${product.subCategory}</span>
              <div class="flex items-center text-amber-500">
                <svg class="w-3.5 h-3.5 fill-current mr-1" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                <span class="text-gray-700 font-semibold text-xs">${product.rating}</span>
                <span class="text-gray-400 ml-1">(${product.reviewsCount})</span>
              </div>
            </div>

            <!-- Title -->
            <h3 
              onclick="openProductModal('${product.id}')"
              class="font-serif text-base font-semibold text-gray-900 group-hover:text-[#be6b7b] transition-colors cursor-pointer line-clamp-1 mb-2"
              title="${product.name}"
            >
              ${product.name}
            </h3>

            <!-- Short description -->
            <p class="text-xs text-gray-500 line-clamp-2 mb-4 leading-relaxed">
              ${product.description}
            </p>
          </div>

          <!-- Price and Add to Cart -->
          <div>
            <div class="flex items-baseline space-x-2 mb-3">
              <span class="text-lg font-bold text-gray-900">R${product.price}</span>
              ${hasDiscount ? `
                <span class="text-xs text-gray-400 line-through">R${product.originalPrice}</span>
                <span class="text-[10px] bg-red-50 text-red-600 font-bold px-1.5 py-0.5 rounded">SAVE R${product.originalPrice - product.price}</span>
              ` : ''}
            </div>

            <button 
              type="button"
              onclick="addToCart('${product.id}')"
              class="w-full py-2.5 rounded-xl border border-[#be6b7b] text-[#be6b7b] hover:bg-[#be6b7b] hover:text-white font-medium text-xs tracking-wider uppercase transition-all duration-200 flex items-center justify-center space-x-2 active:scale-98 shadow-sm"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span>Quick Add</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function resetFilters() {
  state.activeCategory = 'all';
  state.searchQuery = '';
  const searchInput = document.getElementById('searchInput');
  const mobileSearchInput = document.getElementById('mobileSearchInput');
  if (searchInput) searchInput.value = '';
  if (mobileSearchInput) mobileSearchInput.value = '';
  renderCategoryPills();
  renderProducts();
}

// Product Detail Modal
function openProductModal(productId) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;

  state.activeProductModalId = productId;
  state.selectedShade = product.details.shades ? product.details.shades[0] : null;

  const modal = document.getElementById('productModal');
  const content = document.getElementById('productModalContent');
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      <!-- Product Image -->
      <div class="relative rounded-2xl overflow-hidden bg-[#faf7f6] aspect-square border border-rose-100">
        <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover">
        ${product.badge ? `
          <span class="absolute top-4 left-4 bg-white/95 text-[#be6b7b] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
            ${product.badge}
          </span>
        ` : ''}
      </div>

      <!-- Product Information -->
      <div class="flex flex-col justify-between h-full">
        <div>
          <div class="flex items-center justify-between text-xs text-[#be6b7b] font-semibold uppercase tracking-wider mb-2">
            <span>${product.subCategory}</span>
            <div class="flex items-center text-amber-500">
              <svg class="w-4 h-4 fill-current mr-1" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <span class="font-bold text-gray-800">${product.rating}</span>
              <span class="text-gray-400 ml-1">(${product.reviewsCount} customer reviews)</span>
            </div>
          </div>

          <h2 class="font-serif text-2xl lg:text-3xl font-bold text-gray-900 mb-3">${product.name}</h2>

          <div class="flex items-baseline space-x-3 mb-4">
            <span class="text-2xl font-bold text-[#be6b7b]">R${product.price}</span>
            ${product.originalPrice ? `
              <span class="text-sm text-gray-400 line-through">R${product.originalPrice}</span>
              <span class="text-xs bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded">Save R${product.originalPrice - product.price}</span>
            ` : ''}
          </div>

          <p class="text-sm text-gray-600 leading-relaxed mb-6">
            ${product.description}
          </p>

          <!-- Shades / Variants if present -->
          ${product.details.shades ? `
            <div class="mb-5">
              <label class="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Select Shade: <span id="selectedShadeLabel" class="text-[#be6b7b] font-medium capitalize">${product.details.shades[0]}</span>
              </label>
              <div class="flex flex-wrap gap-2">
                ${product.details.shades.map((shade, idx) => `
                  <button 
                    type="button"
                    onclick="selectModalShade('${shade}')" 
                    id="shade-btn-${idx}"
                    class="shade-option-btn text-xs px-3.5 py-1.5 rounded-lg border ${idx === 0 ? 'border-[#be6b7b] bg-rose-50 text-[#be6b7b] font-semibold' : 'border-gray-200 text-gray-700 hover:border-gray-400'} transition-all"
                  >
                    ${shade}
                  </button>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Product Specs Accordion / Info Box -->
          <div class="border-t border-b border-rose-100 py-4 mb-6 space-y-3 text-xs">
            ${product.details.volume ? `
              <div class="flex">
                <span class="w-28 font-bold text-gray-700">Size / Volume:</span>
                <span class="text-gray-600">${product.details.volume}</span>
              </div>
            ` : ''}
            ${product.details.skinType ? `
              <div class="flex">
                <span class="w-28 font-bold text-gray-700">Skin Suitability:</span>
                <span class="text-gray-600">${product.details.skinType}</span>
              </div>
            ` : ''}
            ${product.details.hairType ? `
              <div class="flex">
                <span class="w-28 font-bold text-gray-700">Hair Type:</span>
                <span class="text-gray-600">${product.details.hairType}</span>
              </div>
            ` : ''}
            ${product.details.scentFamily ? `
              <div class="flex">
                <span class="w-28 font-bold text-gray-700">Scent Profile:</span>
                <span class="text-gray-600">${product.details.scentFamily}</span>
              </div>
            ` : ''}
            ${product.details.notes ? `
              <div class="flex">
                <span class="w-28 font-bold text-gray-700">Fragrance Notes:</span>
                <span class="text-gray-600">${product.details.notes}</span>
              </div>
            ` : ''}
            ${product.details.ingredients ? `
              <div class="flex">
                <span class="w-28 font-bold text-gray-700">Key Ingredients:</span>
                <span class="text-gray-600">${product.details.ingredients}</span>
              </div>
            ` : ''}
            ${product.details.howToUse ? `
              <div class="flex">
                <span class="w-28 font-bold text-gray-700">How to Use:</span>
                <span class="text-gray-600">${product.details.howToUse}</span>
              </div>
            ` : ''}
          </div>
        </div>

        <!-- Action Controls -->
        <div class="flex items-center space-x-4">
          <div class="flex items-center border border-gray-200 rounded-xl bg-gray-50 p-1">
            <button onclick="decrementModalQty()" class="w-8 h-8 rounded-lg flex items-center justify-center text-gray-600 hover:bg-white transition">-</button>
            <span id="modalQuantity" class="w-10 text-center font-bold text-sm text-gray-800">1</span>
            <button onclick="incrementModalQty()" class="w-8 h-8 rounded-lg flex items-center justify-center text-gray-600 hover:bg-white transition">+</button>
          </div>

          <button 
            type="button"
            onclick="addModalProductToCart()"
            class="flex-1 btn-primary-gradient py-3.5 px-6 rounded-xl font-medium text-sm tracking-wider uppercase shadow-md flex items-center justify-center space-x-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span>Add To Shopping Bag</span>
          </button>
        </div>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
}

function selectModalShade(shade) {
  state.selectedShade = shade;
  const label = document.getElementById('selectedShadeLabel');
  if (label) label.textContent = shade;

  const buttons = document.querySelectorAll('.shade-option-btn');
  buttons.forEach(btn => {
    if (btn.textContent.trim() === shade) {
      btn.className = 'shade-option-btn text-xs px-3.5 py-1.5 rounded-lg border border-[#be6b7b] bg-rose-50 text-[#be6b7b] font-semibold transition-all';
    } else {
      btn.className = 'shade-option-btn text-xs px-3.5 py-1.5 rounded-lg border border-gray-200 text-gray-700 hover:border-gray-400 transition-all';
    }
  });
}

function incrementModalQty() {
  const qtyEl = document.getElementById('modalQuantity');
  if (qtyEl) {
    let current = parseInt(qtyEl.textContent) || 1;
    qtyEl.textContent = current + 1;
  }
}

function decrementModalQty() {
  const qtyEl = document.getElementById('modalQuantity');
  if (qtyEl) {
    let current = parseInt(qtyEl.textContent) || 1;
    if (current > 1) {
      qtyEl.textContent = current - 1;
    }
  }
}

function addModalProductToCart() {
  const qtyEl = document.getElementById('modalQuantity');
  const quantity = qtyEl ? parseInt(qtyEl.textContent) : 1;
  addToCart(state.activeProductModalId, quantity, state.selectedShade);
  closeProductModal();
  toggleCart(true);
}

function closeProductModal() {
  const modal = document.getElementById('productModal');
  if (modal) modal.classList.add('hidden');
  state.activeProductModalId = null;
  state.selectedShade = null;
}

// Shopping Cart Management
function toggleCart(isOpen) {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  if (!drawer || !overlay) return;

  if (isOpen) {
    overlay.classList.remove('hidden');
    setTimeout(() => {
      overlay.classList.remove('opacity-0');
      drawer.classList.remove('translate-x-full');
    }, 10);
  } else {
    drawer.classList.add('translate-x-full');
    overlay.classList.add('opacity-0');
    setTimeout(() => {
      overlay.classList.add('hidden');
    }, 300);
  }
}

function addToCart(productId, quantity = 1, variant = null) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;

  const existingIndex = state.cart.findIndex(item => item.id === productId && item.variant === variant);

  if (existingIndex > -1) {
    state.cart[existingIndex].quantity += quantity;
  } else {
    state.cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      subCategory: product.subCategory,
      variant: variant,
      quantity: quantity
    });
  }

  saveCart();
  renderCart();
  showToast(`Added "${product.name}" to your bag`, 'success');
}

function updateCartItemQuantity(index, delta) {
  if (state.cart[index]) {
    state.cart[index].quantity += delta;
    if (state.cart[index].quantity <= 0) {
      state.cart.splice(index, 1);
    }
    saveCart();
    renderCart();
  }
}

function removeCartItem(index) {
  if (state.cart[index]) {
    const item = state.cart[index];
    state.cart.splice(index, 1);
    saveCart();
    renderCart();
    showToast(`Removed "${item.name}" from bag`, 'info');
  }
}

function saveCart() {
  localStorage.setItem('tb_cart', JSON.stringify(state.cart));
}

function applyCoupon(code) {
  if (!code) {
    showToast('Please enter a promo code.', 'error');
    return;
  }

  if (COUPONS[code]) {
    state.appliedCoupon = { code, ...COUPONS[code] };
    showToast(`Coupon "${code}" applied successfully!`, 'success');
    renderCart();
  } else {
    showToast(`Code "${code}" is invalid or expired. Try "GLOW10"`, 'error');
  }
}

function removeCoupon() {
  state.appliedCoupon = null;
  renderCart();
  showToast('Coupon removed.', 'info');
}

// Calculate totals (subtotal, discount, shipping, grand total)
function calculateCartTotals() {
  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  let discount = 0;
  if (state.appliedCoupon) {
    if (state.appliedCoupon.discountPercent) {
      discount = Math.round((subtotal * state.appliedCoupon.discountPercent) / 100);
    } else if (state.appliedCoupon.discountFixed) {
      discount = Math.min(subtotal, state.appliedCoupon.discountFixed);
    }
  }

  const shipping = subtotal >= SHIPPING.thresholdFree || subtotal === 0 ? 0 : SHIPPING.standardCost;
  const grandTotal = Math.max(0, subtotal - discount + shipping);

  return { subtotal, discount, shipping, grandTotal };
}

// Render Cart Drawer
function renderCart() {
  const itemsContainer = document.getElementById('cartItemsContainer');
  const cartBadge = document.getElementById('cartBadgeCount');
  const cartFooter = document.getElementById('cartFooter');
  const emptyCartState = document.getElementById('emptyCartState');

  const totalItemCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  // Update badge
  if (cartBadge) {
    cartBadge.textContent = totalItemCount;
    cartBadge.classList.toggle('hidden', totalItemCount === 0);
  }

  if (!itemsContainer) return;

  if (state.cart.length === 0) {
    itemsContainer.innerHTML = '';
    if (emptyCartState) emptyCartState.classList.remove('hidden');
    if (cartFooter) cartFooter.classList.add('hidden');
    updateShippingBar(0);
    return;
  }

  if (emptyCartState) emptyCartState.classList.add('hidden');
  if (cartFooter) cartFooter.classList.remove('hidden');

  const { subtotal, discount, shipping, grandTotal } = calculateCartTotals();
  updateShippingBar(subtotal);

  // Render items list
  itemsContainer.innerHTML = state.cart.map((item, index) => `
    <div class="flex items-center space-x-3 py-3 border-b border-rose-50 last:border-b-0">
      <img src="${item.image}" alt="${item.name}" class="w-16 h-16 rounded-xl object-cover bg-rose-50 border border-rose-100 flex-shrink-0">
      <div class="flex-1 min-w-0">
        <h4 class="text-xs font-semibold text-gray-900 truncate">${item.name}</h4>
        ${item.variant ? `<p class="text-[11px] text-[#be6b7b]">Shade: ${item.variant}</p>` : ''}
        <div class="flex items-baseline space-x-2 mt-1">
          <span class="text-xs font-bold text-gray-900">R${item.price}</span>
          <span class="text-[10px] text-gray-400">× ${item.quantity}</span>
        </div>
        <!-- Quantity buttons -->
        <div class="flex items-center space-x-2 mt-2">
          <div class="flex items-center border border-gray-200 rounded-lg bg-gray-50 px-1 py-0.5">
            <button onclick="updateCartItemQuantity(${index}, -1)" class="w-5 h-5 flex items-center justify-center text-xs font-bold text-gray-600 hover:text-black">-</button>
            <span class="w-6 text-center text-xs font-bold">${item.quantity}</span>
            <button onclick="updateCartItemQuantity(${index}, 1)" class="w-5 h-5 flex items-center justify-center text-xs font-bold text-gray-600 hover:text-black">+</button>
          </div>
          <button onclick="removeCartItem(${index})" class="text-[11px] text-gray-400 hover:text-red-600 transition ml-2">Remove</button>
        </div>
      </div>
      <div class="text-right">
        <span class="text-xs font-bold text-gray-900">R${item.price * item.quantity}</span>
      </div>
    </div>
  `).join('');

  // Update totals in drawer footer
  const subtotalEl = document.getElementById('cartSubtotal');
  const discountEl = document.getElementById('cartDiscount');
  const discountRow = document.getElementById('cartDiscountRow');
  const shippingEl = document.getElementById('cartShipping');
  const totalEl = document.getElementById('cartTotal');

  if (subtotalEl) subtotalEl.textContent = `R${subtotal}`;
  
  if (discountRow) {
    if (discount > 0) {
      discountRow.classList.remove('hidden');
      if (discountEl) discountEl.textContent = `-R${discount}`;
    } else {
      discountRow.classList.add('hidden');
    }
  }

  if (shippingEl) {
    shippingEl.textContent = shipping === 0 ? 'FREE' : `R${shipping}`;
    if (shipping === 0) shippingEl.className = 'text-xs font-bold text-emerald-600';
    else shippingEl.className = 'text-xs font-bold text-gray-900';
  }

  if (totalEl) totalEl.textContent = `R${grandTotal}`;

  // Coupon applied tag
  const appliedCouponContainer = document.getElementById('appliedCouponContainer');
  if (appliedCouponContainer) {
    if (state.appliedCoupon) {
      appliedCouponContainer.innerHTML = `
        <div class="flex items-center justify-between bg-rose-50 border border-rose-200 rounded-lg px-3 py-1.5 text-xs text-[#be6b7b] mb-3">
          <span>Code <strong>${state.appliedCoupon.code}</strong> applied (${state.appliedCoupon.description})</span>
          <button onclick="removeCoupon()" class="text-gray-400 hover:text-red-500 font-bold ml-2">×</button>
        </div>
      `;
    } else {
      appliedCouponContainer.innerHTML = '';
    }
  }
}

// Shipping progress indicator
function updateShippingBar(subtotal) {
  const shippingBar = document.getElementById('shippingProgressBar');
  const shippingText = document.getElementById('shippingProgressText');
  if (!shippingBar || !shippingText) return;

  const threshold = SHIPPING.thresholdFree;
  const percent = Math.min(100, Math.round((subtotal / threshold) * 100));
  shippingBar.style.width = `${percent}%`;

  if (subtotal >= threshold) {
    shippingText.innerHTML = `🎉 <strong>Congratulations!</strong> You qualify for <strong>FREE Delivery</strong> across SA!`;
  } else {
    const diff = threshold - subtotal;
    shippingText.innerHTML = `Add <strong>R${diff}</strong> more to unlock <strong>FREE Delivery</strong>!`;
  }
}

// Wishlist Functionality
function toggleWishlist(productId) {
  const index = state.wishlist.indexOf(productId);
  const product = state.products.find(p => p.id === productId);

  if (index > -1) {
    state.wishlist.splice(index, 1);
    showToast(`Removed from your wishlist`, 'info');
  } else {
    state.wishlist.push(productId);
    showToast(`Saved "${product ? product.name : ''}" to your wishlist`, 'success');
  }

  localStorage.setItem('tb_wishlist', JSON.stringify(state.wishlist));
  updateWishlistCount();
  renderProducts();
}

function updateWishlistCount() {
  const badge = document.getElementById('wishlistBadgeCount');
  if (badge) {
    badge.textContent = state.wishlist.length;
    badge.classList.toggle('hidden', state.wishlist.length === 0);
  }
}

// Checkout Modal & Processing
function openCheckoutModal() {
  const modal = document.getElementById('checkoutModal');
  const orderSummaryList = document.getElementById('checkoutOrderSummary');
  const checkoutSubtotal = document.getElementById('checkoutSubtotal');
  const checkoutShipping = document.getElementById('checkoutShipping');
  const checkoutDiscount = document.getElementById('checkoutDiscount');
  const checkoutDiscountRow = document.getElementById('checkoutDiscountRow');
  const checkoutTotal = document.getElementById('checkoutTotal');

  if (!modal) return;

  const { subtotal, discount, shipping, grandTotal } = calculateCartTotals();

  if (orderSummaryList) {
    orderSummaryList.innerHTML = state.cart.map(item => `
      <div class="flex items-center justify-between text-xs py-1.5 border-b border-gray-100 last:border-0">
        <div class="flex items-center space-x-2 truncate">
          <span class="font-medium text-gray-800 truncate">${item.name}</span>
          <span class="text-gray-400">×${item.quantity}</span>
        </div>
        <span class="font-bold text-gray-900 ml-2">R${item.price * item.quantity}</span>
      </div>
    `).join('');
  }

  if (checkoutSubtotal) checkoutSubtotal.textContent = `R${subtotal}`;
  if (checkoutShipping) checkoutShipping.textContent = shipping === 0 ? 'FREE' : `R${shipping}`;
  if (checkoutDiscountRow) {
    if (discount > 0) {
      checkoutDiscountRow.classList.remove('hidden');
      if (checkoutDiscount) checkoutDiscount.textContent = `-R${discount}`;
    } else {
      checkoutDiscountRow.classList.add('hidden');
    }
  }
  if (checkoutTotal) checkoutTotal.textContent = `R${grandTotal}`;

  modal.classList.remove('hidden');
}

function closeCheckoutModal() {
  const modal = document.getElementById('checkoutModal');
  if (modal) modal.classList.add('hidden');
}

function handleCheckoutSubmit(e) {
  e.preventDefault();

  const name = document.getElementById('orderFullName')?.value;
  const email = document.getElementById('orderEmail')?.value;
  const phone = document.getElementById('orderPhone')?.value;
  const address = document.getElementById('orderAddress')?.value;
  const city = document.getElementById('orderCity')?.value;
  const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value || 'Instant EFT / Ozow';

  const { grandTotal, subtotal } = calculateCartTotals();
  const orderNumber = 'TB-' + Math.floor(100000 + Math.random() * 900000);
  const orderDate = new Date().toLocaleDateString('en-ZA', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  // Render receipt modal
  const receiptContent = document.getElementById('receiptContent');
  if (receiptContent) {
    receiptContent.innerHTML = `
      <div class="text-center pb-4 border-b border-rose-100">
        <div class="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 class="font-serif text-2xl font-bold text-gray-900">Order Confirmed!</h3>
        <p class="text-xs text-gray-500 mt-1">Thank you for shopping with Thobile Beauty. We're packaging your order with care!</p>
      </div>

      <div class="bg-rose-50/50 rounded-xl p-4 my-4 text-xs space-y-2 border border-rose-100">
        <div class="flex justify-between">
          <span class="text-gray-500">Order Number:</span>
          <span class="font-bold text-gray-900">${orderNumber}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-500">Order Date:</span>
          <span class="font-medium text-gray-800">${orderDate}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-500">Customer:</span>
          <span class="font-medium text-gray-800">${name} (${phone})</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-500">Delivery Address:</span>
          <span class="font-medium text-gray-800 text-right">${address}, ${city}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-500">Payment Option:</span>
          <span class="font-medium text-[#be6b7b]">${paymentMethod}</span>
        </div>
        <div class="flex justify-between border-t border-rose-200/60 pt-2 text-sm font-bold text-gray-900">
          <span>Amount Paid:</span>
          <span>R${grandTotal}</span>
        </div>
      </div>

      <p class="text-center text-[11px] text-gray-400">A confirmation SMS and receipt have been dispatched to ${email}.</p>
    `;
  }

  // Clear Cart
  state.cart = [];
  state.appliedCoupon = null;
  saveCart();
  renderCart();
  closeCheckoutModal();

  // Show receipt modal
  const receiptModal = document.getElementById('receiptModal');
  if (receiptModal) receiptModal.classList.remove('hidden');
}

// Toast Alert Messages
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  const bgColors = {
    success: 'bg-emerald-900/90 text-white border-emerald-500',
    error: 'bg-rose-900/90 text-white border-rose-500',
    info: 'bg-gray-900/90 text-white border-[#be6b7b]'
  };

  toast.className = `toast-enter flex items-center space-x-3 px-4 py-3 rounded-xl shadow-xl backdrop-blur-md border text-xs font-medium max-w-sm pointer-events-auto ${bgColors[type] || bgColors.info}`;
  toast.innerHTML = `
    <span class="text-base">${type === 'success' ? '✨' : type === 'error' ? '⚠️' : 'ℹ️'}</span>
    <span class="flex-1">${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

