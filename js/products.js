// Product catalog for Thobile Beauty & Cosmetics
// Categories: skincare, makeup, haircare, fragrance

const PRODUCTS = [
  {
    id: 'tb-skin-01',
    name: 'Radiance Glow Vitamin C Serum',
    category: 'skincare',
    subCategory: 'Serums & Treatments',
    price: 380,
    originalPrice: 450,
    rating: 4.9,
    reviewsCount: 142,
    badge: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    description: 'A potent 15% Vitamin C and Hyaluronic Acid brightening serum designed to fade dark spots, even out skin tone, and restore youthful luminescence.',
    details: {
      volume: '30ml / 1.0 fl oz',
      skinType: 'All Skin Types (especially hyperpigmentation & dull skin)',
      ingredients: 'Aqua, Ascorbic Acid (Vitamin C), Hyaluronic Acid, Niacinamide, Ferulic Acid, Aloe Barbadensis Leaf Juice, Tocopherol (Vitamin E).',
      howToUse: 'Apply 3-4 drops morning and evening to cleansed face and neck before moisturizer. Follow with SPF during the day.'
    },
    inStock: true
  },
  {
    id: 'tb-skin-02',
    name: 'Hydra-Infusion Moisture Barrier Cream',
    category: 'skincare',
    subCategory: 'Moisturizers',
    price: 420,
    originalPrice: null,
    rating: 4.8,
    reviewsCount: 98,
    badge: 'Trending',
    image: 'https://images.unsplash.com/photo-1608248597359-5033c467a3a9?auto=format&fit=crop&w=800&q=80',
    description: 'Ultra-nourishing peptide and ceramide cream that deeply quenches dry skin, locks in hydration for up to 72 hours, and reinforces the skin barrier.',
    details: {
      volume: '50ml / 1.7 oz',
      skinType: 'Dry to Combination Skin',
      ingredients: 'Ceramide Complex (NP, AP, EOP), Squalane, Shea Butter, Centella Asiatica Extract, Peptides.',
      howToUse: 'Smooth generously onto face and neck after serum morning and night.'
    },
    inStock: true
  },
  {
    id: 'tb-skin-03',
    name: 'Rosewater & Witch Hazel Clarifying Toner',
    category: 'skincare',
    subCategory: 'Toners & Mists',
    price: 260,
    originalPrice: 310,
    rating: 4.7,
    reviewsCount: 64,
    badge: 'Clean Beauty',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    description: 'Alcohol-free balancing facial toner infused with pure organic Damask rosewater to tighten pores, calm redness, and prep skin for serums.',
    details: {
      volume: '150ml / 5.1 fl oz',
      skinType: 'Sensitive & Oily / Acne-prone',
      ingredients: 'Organic Rosa Damascena Flower Water, Hamamelis Virginiana (Witch Hazel), Glycerin, Chamomile Extract.',
      howToUse: 'Mist directly over face or apply with a reusable cotton round after cleansing.'
    },
    inStock: true
  },
  {
    id: 'tb-skin-04',
    name: 'Gentle Melt Cleansing Balm',
    category: 'skincare',
    subCategory: 'Cleansers',
    price: 340,
    originalPrice: null,
    rating: 4.9,
    reviewsCount: 110,
    badge: 'Editor Choice',
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80',
    description: 'A transformative balm-to-oil cleanser that dissolves waterproof makeup, sunscreen, and daily pollutants without stripping moisture.',
    details: {
      volume: '100g / 3.5 oz',
      skinType: 'All Skin Types',
      ingredients: 'Jojoba Oil, Sweet Almond Oil, Papaya Seed Oil, Sunflower Seed Wax, Vitamin E.',
      howToUse: 'Massage onto dry face to break down makeup, add warm water to emulsify into a milky rinse, then rinse clean.'
    },
    inStock: true
  },
  {
    id: 'tb-make-01',
    name: 'Velvet Velvet Matte Liquid Lipstick',
    category: 'makeup',
    subCategory: 'Lips',
    price: 220,
    originalPrice: 260,
    rating: 4.9,
    reviewsCount: 230,
    badge: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80',
    description: 'Richly pigmented, non-drying matte liquid lipstick that lasts up to 16 hours. Enriched with argan oil and vitamin E for pillow-soft comfort.',
    details: {
      volume: '5ml',
      shades: ['Rich Nude', 'Ruby Majesty', 'Berry Seduction', 'Warm Mocha'],
      ingredients: 'Isododecane, Dimethicone, Argania Spinosa Kernel Oil, Tocopheryl Acetate, CI 77491.',
      howToUse: 'Define lips with the precision wand and fill in. Allow 60 seconds to set.'
    },
    inStock: true
  },
  {
    id: 'tb-make-02',
    name: 'Luminous Silk Foundation',
    category: 'makeup',
    subCategory: 'Face',
    price: 490,
    originalPrice: null,
    rating: 4.8,
    reviewsCount: 175,
    badge: 'Award Winner',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    description: 'Weightless medium-to-full buildable coverage with a natural second-skin luminous satin finish. Available in beautifully matched undertones.',
    details: {
      volume: '35ml / 1.2 fl oz',
      shades: ['Caramel Amber', 'Deep Bronze', 'Warm Golden', 'Almond Honey', 'Porcelain Ivory'],
      ingredients: 'Water, Cyclopentasiloxane, Titanium Dioxide, Dimethicone, Squalane, Hyaluronic Acid.',
      howToUse: 'Blend outwards using a damp beauty sponge or dense foundation brush.'
    },
    inStock: true
  },
  {
    id: 'tb-make-03',
    name: 'Sun-Kissed Goddess Bronzer & Highlighter Palette',
    category: 'makeup',
    subCategory: 'Face',
    price: 360,
    originalPrice: 420,
    rating: 4.9,
    reviewsCount: 88,
    badge: 'Limited Edition',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
    description: 'A 4-pan face palette featuring warm terracotta bronzers and champagne duochrome highlighters for an ethereal candlelit glow.',
    details: {
      volume: '16g Net Wt.',
      shades: ['Champagne Aura', 'Golden Hour', 'Warm Terracotta', 'Deep Cocoa Bronze'],
      ingredients: 'Mica, Talc, Magnesium Stearate, Jojoba Seed Oil, Phenoxyethanol.',
      howToUse: 'Sweep bronzer along cheekbones and forehead, then dab highlighter on high points of cheeks and nose.'
    },
    inStock: true
  },
  {
    id: 'tb-make-04',
    name: 'Panoramic Lift & Curl Mascara',
    category: 'makeup',
    subCategory: 'Eyes',
    price: 210,
    originalPrice: null,
    rating: 4.7,
    reviewsCount: 133,
    badge: 'Smudgeproof',
    image: 'https://images.unsplash.com/photo-1591360236480-4ed861025fa1?auto=format&fit=crop&w=800&q=80',
    description: 'Infused with castor oil and lash fibers to deliver sensational volume, 36-hour hold, and zero clumping or flaking.',
    details: {
      volume: '10ml',
      shades: ['Midnight Jet Black'],
      ingredients: 'Aqua, Cera Alba, Copernicia Cerifera Cera, Castor Seed Oil, Panthenol.',
      howToUse: 'Wiggle brush from lash roots to tips in a zigzag motion for maximum lift.'
    },
    inStock: true
  },
  {
    id: 'tb-hair-01',
    name: 'Crown Nourish Botanical Hair Oil',
    category: 'haircare',
    subCategory: 'Oils & Scalp',
    price: 310,
    originalPrice: 370,
    rating: 4.9,
    reviewsCount: 164,
    badge: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1608248597359-5033c467a3a9?auto=format&fit=crop&w=800&q=80',
    description: 'An Ayurvedic & African botanical blend of Chebe, Marula, and Rosemary oils to stimulate healthy hair growth, soothe scalp, and seal split ends.',
    details: {
      volume: '100ml / 3.4 fl oz',
      hairType: 'Curly, Coily, Kinky, & Textured hair',
      ingredients: 'Cold Pressed Sclerocarya Birrea (Marula) Seed Oil, Rosemary Leaf Oil, Castor Oil, Jojoba Oil, Peppermint Extract.',
      howToUse: 'Massage a few drops directly into scalp 3x weekly, or apply on damp ends after washing to lock in hydration.'
    },
    inStock: true
  },
  {
    id: 'tb-hair-02',
    name: 'Intense Silk Protein Deep Conditioner',
    category: 'haircare',
    subCategory: 'Conditioners & Masks',
    price: 350,
    originalPrice: null,
    rating: 4.8,
    reviewsCount: 92,
    badge: 'Salon Grade',
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80',
    description: 'Deep penetrating restorative hair mask formulated with silk amino acids and raw shea butter to restore elasticity and soften brittle curls.',
    details: {
      volume: '300ml / 10.1 fl oz',
      hairType: 'Color-treated, Dry & Damaged hair',
      ingredients: 'Hydrolyzed Silk Protein, Raw Unrefined Shea Butter, Cetearyl Alcohol, Argan Oil, Provitamin B5.',
      howToUse: 'After shampooing, apply generously from roots to tips. Cover with a shower cap for 20-30 mins, then rinse.'
    },
    inStock: true
  },
  {
    id: 'tb-hair-03',
    name: 'Curl Defining Custard & Moisture Butter',
    category: 'haircare',
    subCategory: 'Styling',
    price: 280,
    originalPrice: 320,
    rating: 4.8,
    reviewsCount: 78,
    badge: 'Crunch-Free',
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80',
    description: 'Delivers springy, defined curl clumps without flakes, stiffness, or sticky residue. Holds twist-outs and wash-and-gos for up to 5 days.',
    details: {
      volume: '250ml / 8.5 oz',
      hairType: 'Type 3 & Type 4 Curls / Coils',
      ingredients: 'Aloe Leaf Juice, Agave Nectar, Flaxseed Extract, Marshmallow Root Extract, Coconut Oil.',
      howToUse: 'Section damp hair and smooth through from roots to ends with fingers or a styling comb.'
    },
    inStock: true
  },
  {
    id: 'tb-frag-01',
    name: 'Thobile Oud Royale Eau de Parfum',
    category: 'fragrance',
    subCategory: 'Luxury Perfumes',
    price: 790,
    originalPrice: 950,
    rating: 5.0,
    reviewsCount: 204,
    badge: 'Signature',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80',
    description: 'An intoxicating, regal aroma balancing precious Cambodian Agarwood, velvety Bulgarian rose, warm golden amber, and vanilla musk.',
    details: {
      volume: '100ml / 3.4 fl oz',
      scentFamily: 'Warm Oriental & Woody Floral',
      notes: 'Top: Bergamot, Pink Peppercorn | Heart: Damask Rose, Smoky Oud | Base: Amber Crystals, Vanilla Bean, Patchouli.',
      howToUse: 'Spritz on pulse points (wrists, collarbone, and behind earlobes). Do not rub.'
    },
    inStock: true
  },
  {
    id: 'tb-frag-02',
    name: 'Blossom Nectarine Hair & Body Mist',
    category: 'fragrance',
    subCategory: 'Body Mists',
    price: 240,
    originalPrice: null,
    rating: 4.7,
    reviewsCount: 83,
    badge: 'Fresh',
    image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80',
    description: 'A light, uplifting whisper of sparkling white nectarine, honeysuckle blossoms, and soft clean musk designed for refreshing on-the-go.',
    details: {
      volume: '150ml / 5.1 fl oz',
      scentFamily: 'Fruity Floral Gourmand',
      notes: 'Top: White Peach, Crisp Clementine | Heart: Honeysuckle, Jasmine Petals | Base: Sheer Vanilla, Cashmere Wood.',
      howToUse: 'Mist liberally over body and hair throughout the day.'
    },
    inStock: true
  },
  {
    id: 'tb-frag-03',
    name: 'Vanilla Santal Eau de Parfum',
    category: 'fragrance',
    subCategory: 'Luxury Perfumes',
    price: 680,
    originalPrice: 750,
    rating: 4.9,
    reviewsCount: 119,
    badge: 'Trending',
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80',
    description: 'A cozy, sensual blend of creamy Australian sandalwood, salted Madagascar vanilla, and delicate white cedarwood.',
    details: {
      volume: '75ml / 2.5 fl oz',
      scentFamily: 'Woody Gourmand',
      notes: 'Top: Cardamom, Almond Milk | Heart: Sandalwood, Iris | Base: Salted Vanilla, Tonka Bean, Cedar.',
      howToUse: 'Spray generously on pulse points.'
    },
    inStock: true
  }
];

// Available discount coupons
const COUPONS = {
  'GLOW10': { discountPercent: 10, description: '10% off your entire order' },
  'THOBILE20': { discountPercent: 20, description: '20% welcome discount' },
  'BEAUTY50': { discountFixed: 50, description: 'R50 flat discount' }
};

// Shipping rules
const SHIPPING = {
  thresholdFree: 500, // Free delivery on orders over R500
  standardCost: 75
};

