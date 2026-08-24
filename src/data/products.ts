import { Product, Coupon, StoreLocation } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  // --- MEN'S SHOES ---
  {
    id: 'titaan-men-01',
    title: "Titaan Men's Handcrafted Leather Penny Loafers",
    brand: 'Titaan',
    gender: 'Men',
    category: 'Loafers & Moccasins',
    price: 2490,
    originalPrice: 4990,
    discountPercentage: 50,
    rating: 4.6,
    reviewsCount: 384,
    images: [
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Tan Brown', hex: '#8B4513', imageIndex: 0 },
      { name: 'Classic Black', hex: '#1C1C1C', imageIndex: 1 },
      { name: 'Deep Burgundy', hex: '#4A0E17', imageIndex: 2 }
    ],
    sizes: [6, 7, 8, 9, 10, 11],
    inStock: true,
    isBestseller: true,
    isSpecialDeal: true,
    description: 'Elevate your business-casual ensemble with Titaan handcrafted penny loafers. Designed with premium Argentine leather and cushioned arch insoles for all-day comfort.',
    features: [
      'Genuine full-grain soft leather upper',
      'Memory foam footbed with moisture-wicking lining',
      'Durable TPR anti-skid grooved sole',
      'Hand-stitched moc-toe detailing'
    ],
    material: 'Genuine Leather',
    soleMaterial: 'Thermo Plastic Rubber (TPR)',
    occasion: 'Casual',
    sku: 'TITN-M-LF-1042',
    reviews: [
      {
        id: 'r1',
        userName: 'Vikramaditya S.',
        rating: 5,
        date: '18 Aug 2026',
        comment: 'Extremely comfortable! The tan color looks very rich with chinos and trousers. Pure Titaan quality.',
        verifiedPurchase: true,
        userCity: 'Mumbai',
        helpfulCount: 28
      },
      {
        id: 'r2',
        userName: 'Aakash Mehta',
        rating: 4,
        date: '10 Aug 2026',
        comment: 'Great finish. Fit is true to size (UK 8). Delivered in 2 days.',
        verifiedPurchase: true,
        userCity: 'Bangalore',
        helpfulCount: 14
      }
    ]
  },
  {
    id: 'titaan-men-02',
    title: "Titaan Men's Classic Oxford Formal Lace-Up Shoes",
    brand: 'Titaan',
    gender: 'Men',
    category: 'Formal Shoes',
    price: 2990,
    originalPrice: 5990,
    discountPercentage: 50,
    rating: 4.7,
    reviewsCount: 512,
    images: [
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Glossy Black', hex: '#0a0a0a', imageIndex: 0 },
      { name: 'Dark Brown', hex: '#3E2723', imageIndex: 1 }
    ],
    sizes: [7, 8, 9, 10, 11],
    inStock: true,
    isBestseller: true,
    description: 'A timeless staple for corporate and black-tie events. Crafted with polished burnished leather and sleek closed lacing.',
    features: [
      'Premium burnished calfskin finish',
      'Reinforced heel counter for stable posture',
      'Anti-sweat breathable inner lining',
      'Formal stacked block heel'
    ],
    material: 'Genuine Leather',
    soleMaterial: 'High-Grade Neolite',
    occasion: 'Formal',
    sku: 'TITN-M-OX-8821',
    reviews: [
      {
        id: 'r3',
        userName: 'Rohan Deshmukh',
        rating: 5,
        date: '05 Aug 2026',
        comment: 'Wore these for my cousin’s wedding reception. Got so many compliments. High shine and comfortable.',
        verifiedPurchase: true,
        userCity: 'Pune',
        helpfulCount: 19
      }
    ]
  },
  {
    id: 'titaan-men-03',
    title: "Titaan Men's Urban Pulse Chunky White Sneakers",
    brand: 'Titaan',
    gender: 'Men',
    category: 'Sneakers',
    price: 1990,
    originalPrice: 3990,
    discountPercentage: 50,
    rating: 4.5,
    reviewsCount: 620,
    images: [
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Triple White', hex: '#FFFFFF', imageIndex: 0 },
      { name: 'White / Navy', hex: '#1E3A8A', imageIndex: 1 },
      { name: 'Olive Green', hex: '#3B4D3C', imageIndex: 2 }
    ],
    sizes: [6, 7, 8, 9, 10, 11, 12],
    inStock: true,
    isBestseller: true,
    isSpecialDeal: true,
    description: 'Street-ready, ultra-cushioned lifestyle sneakers. Engineered with lightweight Phylon soles and breathable textured mesh uppers.',
    features: [
      'Super-lightweight shock-absorbing midsole',
      'Padded collar and tongue for ankle cushioning',
      'Non-marking rubber tread patterns',
      'Easy wipe-clean synthetic outer'
    ],
    material: 'Synthetic Leather',
    soleMaterial: 'Phylon & Rubber Grip',
    occasion: 'Casual',
    sku: 'TITN-M-SN-4419',
    reviews: [
      {
        id: 'r4',
        userName: 'Kunal Kapoor',
        rating: 5,
        date: '14 Aug 2026',
        comment: 'Best white sneakers under ₹2000! Super bouncy and looks super stylish with denims and joggers.',
        verifiedPurchase: true,
        userCity: 'New Delhi',
        helpfulCount: 42
      }
    ]
  },
  {
    id: 'metro-men-04',
    title: "Metro Men's Royal Leather Kolhapuri Ethnic Sandals",
    brand: 'Metro',
    gender: 'Men',
    category: 'Ethnic & Kolhapuris',
    price: 1490,
    originalPrice: 2990,
    discountPercentage: 50,
    rating: 4.8,
    reviewsCount: 298,
    images: [
      'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Antique Brown', hex: '#5D4037', imageIndex: 0 },
      { name: 'Mustard Tan', hex: '#C67D0A', imageIndex: 1 }
    ],
    sizes: [6, 7, 8, 9, 10],
    inStock: true,
    description: 'Authentic Indian ethnic craftsmanship meets modern cushioned soles. Ideal for weddings, pujas, and festive kurtas.',
    features: [
      'Braided handcrafted leather strap',
      'Double-cushioned insole to eliminate biting',
      'Laser-carved decorative motifs',
      'Anti-slip flexible sole'
    ],
    material: 'Genuine Leather',
    soleMaterial: 'Flexible TPR',
    occasion: 'Ethnic',
    sku: 'METR-M-KH-2091',
    reviews: [
      {
        id: 'r5',
        userName: 'Aditya Joshi',
        rating: 5,
        date: '02 Aug 2026',
        comment: 'Unlike traditional hard kolhapuris, these have a soft padded bed. Wore it all day during Ganesh Utsav with no pain!',
        verifiedPurchase: true,
        userCity: 'Nagpur',
        helpfulCount: 31
      }
    ]
  },
  {
    id: 'jfontini-men-05',
    title: "J.Fontini Men's Premium Italian Slip-on Moccasins",
    brand: 'J.Fontini',
    gender: 'Men',
    category: 'Loafers & Moccasins',
    price: 3490,
    originalPrice: 6990,
    discountPercentage: 50,
    rating: 4.9,
    reviewsCount: 175,
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Rich Cognac', hex: '#9A3324', imageIndex: 0 },
      { name: 'Jet Black', hex: '#111111', imageIndex: 1 }
    ],
    sizes: [7, 8, 9, 10, 11],
    inStock: true,
    isLimitedStock: true,
    description: 'Handmade luxury moccasins from J.Fontini featuring butter-soft nappa leather and equestrian bit ornament.',
    features: [
      'Imported glove-soft nappa leather',
      'Gunmetal hardware horsebit buckle',
      'Tubular moccasin flexible construction',
      'Ultra-plush footbed cushioning'
    ],
    material: 'Genuine Leather',
    soleMaterial: 'Hand-Finished Leather & Rubber Pad',
    occasion: 'Work',
    sku: 'JFT-M-MC-7710',
    reviews: []
  },
  {
    id: 'titaan-men-06',
    title: "Titaan Men's Rugged Outdoor Leather Comfort Sandals",
    brand: 'Titaan',
    gender: 'Men',
    category: 'Sandals & Floaters',
    price: 1690,
    originalPrice: 3290,
    discountPercentage: 49,
    rating: 4.4,
    reviewsCount: 440,
    images: [
      'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Mocha Brown', hex: '#4E3629', imageIndex: 0 },
      { name: 'Olive Gray', hex: '#4A5568', imageIndex: 1 }
    ],
    sizes: [6, 7, 8, 9, 10, 11],
    inStock: true,
    description: 'Engineered for supreme daily walking comfort and rainy day resilience. Adjustable velcro straps ensure customized arch fit.',
    features: [
      'Dual-strap adjustable velcro closure',
      'Contoured anatomical footbed',
      'High-traction all-terrain rubber lug sole',
      'Water-resistant nubuck finish'
    ],
    material: 'Genuine Leather',
    soleMaterial: 'High-Density PU',
    occasion: 'Casual',
    sku: 'TITN-M-SD-3301',
    reviews: []
  },
  {
    id: 'fila-men-07',
    title: "Fila Men's Disruptor Retro Athletic Running Shoes",
    brand: 'Fila',
    gender: 'Men',
    category: 'Sneakers',
    price: 2790,
    originalPrice: 5490,
    discountPercentage: 49,
    rating: 4.6,
    reviewsCount: 310,
    images: [
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Optic White', hex: '#F8F9FA', imageIndex: 0 },
      { name: 'Black Shadow', hex: '#1A1A1A', imageIndex: 1 }
    ],
    sizes: [7, 8, 9, 10, 11],
    inStock: true,
    description: 'Iconic chunky silhouette with signature sawtooth outsole tread. Delivers maximum impact absorption and street-style aesthetic.',
    features: [
      'Embroidered Fila branding on tongue and heel',
      'Cushioned EVA midsole for athletic rebounds',
      'Padded collar with heel pull tab'
    ],
    material: 'Synthetic Leather',
    soleMaterial: 'Sawtooth Rubber',
    occasion: 'Sports',
    sku: 'FILA-M-DR-9011',
    reviews: []
  },

  // --- WOMEN'S SHOES ---
  {
    id: 'titaan-women-01',
    title: "Titaan Women's Glamour Embellished Stiletto Party Pumps",
    brand: 'Titaan',
    gender: 'Women',
    category: 'Heels & Pumps',
    price: 1890,
    originalPrice: 3790,
    discountPercentage: 50,
    rating: 4.8,
    reviewsCount: 462,
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Metallic Rose Gold', hex: '#B76E79', imageIndex: 0 },
      { name: 'Champagne Gold', hex: '#D4AF37', imageIndex: 1 },
      { name: 'Silver Shimmer', hex: '#C0C0C0', imageIndex: 2 }
    ],
    sizes: [36, 37, 38, 39, 40, 41],
    inStock: true,
    isBestseller: true,
    isSpecialDeal: true,
    description: 'Make a dazzling entrance with Titaan crystalline embellished pointed-toe party pumps. Featuring plush padded ball-of-foot support for pain-free dancing.',
    features: [
      'Fine micro-glitter and rhinestone stone applique',
      '3-inch balanced slim stiletto heel',
      'Latex cushioned insole for night-long comfort',
      'Smooth non-marking outsoles'
    ],
    material: 'Fabric / Mesh',
    soleMaterial: 'Sheet Sole with Anti-Slip Tip',
    occasion: 'Party',
    heelHeight: '3.0 Inches',
    sku: 'TITN-W-HL-6612',
    reviews: [
      {
        id: 'r6',
        userName: 'Pooja Hegde M.',
        rating: 5,
        date: '19 Aug 2026',
        comment: 'These are STUNNING in real life! The rose gold matches my lehenga perfectly. Surprised by how cushioned they feel.',
        verifiedPurchase: true,
        userCity: 'Hyderabad',
        helpfulCount: 39
      }
    ]
  },
  {
    id: 'titaan-women-02',
    title: "Titaan Women's Comfort Walk Braided Strap Wedge Sandals",
    brand: 'Titaan',
    gender: 'Women',
    category: 'Wedges',
    price: 1590,
    originalPrice: 3190,
    discountPercentage: 50,
    rating: 4.7,
    reviewsCount: 520,
    images: [
      'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Warm Tan', hex: '#D27D2D', imageIndex: 0 },
      { name: 'Blush Pink', hex: '#FFB6C1', imageIndex: 1 },
      { name: 'Onyx Black', hex: '#1B1B1B', imageIndex: 0 }
    ],
    sizes: [36, 37, 38, 39, 40],
    inStock: true,
    isBestseller: true,
    description: 'The holy grail of everyday elevation! Ergonomic 2.2-inch wedge platform with soft braided straps and ankle slingback support.',
    features: [
      'Soft zero-bite synthetic leather straps',
      'Featherlight cork-textured PU wedge platform',
      'Arch contour pillow footbed',
      'Elasticated slingback for effortless slip-on'
    ],
    material: 'Synthetic Leather',
    soleMaterial: 'Lightweight PU',
    occasion: 'Casual',
    heelHeight: '2.2 Inches',
    sku: 'TITN-W-WD-9941',
    reviews: [
      {
        id: 'r7',
        userName: 'Shweta S.',
        rating: 5,
        date: '12 Aug 2026',
        comment: 'I can walk in these all day at work without tired feet. Ordered a second pair in blush pink!',
        verifiedPurchase: true,
        userCity: 'Chennai',
        helpfulCount: 22
      }
    ]
  },
  {
    id: 'metro-women-03',
    title: "Metro Women's Festive Zari Embroidered Mojari Juttis",
    brand: 'Metro',
    gender: 'Women',
    category: 'Ethnic & Kolhapuris',
    price: 1290,
    originalPrice: 2590,
    discountPercentage: 50,
    rating: 4.9,
    reviewsCount: 370,
    images: [
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Gold & Ivory', hex: '#E6BE8A', imageIndex: 0 },
      { name: 'Ruby Maroon', hex: '#800000', imageIndex: 1 },
      { name: 'Emerald Green', hex: '#097969', imageIndex: 0 }
    ],
    sizes: [36, 37, 38, 39, 40, 41],
    inStock: true,
    isBestseller: true,
    description: 'Exquisite threadwork and dabka zari detailing crafted by generational artisans on pure silk fabric with cushioned bite-free inner lining.',
    features: [
      'Hand-embroidered floral motifs with sequins',
      'Triple-layer memory foam base',
      'Genuine leather sole for organic foot breathe',
      'Curved ergonomic heel wall'
    ],
    material: 'Fabric / Mesh',
    soleMaterial: 'Genuine Leather Sole',
    occasion: 'Ethnic',
    sku: 'METR-W-JT-5120',
    reviews: []
  },
  {
    id: 'davinci-women-04',
    title: "Davinci Women's Minimalist Pointed Toe Block Heel Pumps",
    brand: 'Davinci',
    gender: 'Women',
    category: 'Heels & Pumps',
    price: 2190,
    originalPrice: 4390,
    discountPercentage: 50,
    rating: 4.6,
    reviewsCount: 190,
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Nude Beige', hex: '#E8D3C3', imageIndex: 0 },
      { name: 'Raven Black', hex: '#171717', imageIndex: 1 },
      { name: 'Scarlet Red', hex: '#B22222', imageIndex: 0 }
    ],
    sizes: [36, 37, 38, 39, 40],
    inStock: true,
    description: 'Sleek Italian-inspired minimalism. The sturdy block heel gives you confidence and poise in boardroom presentations and dinner dates alike.',
    features: [
      'Matte faux leather outer with waterproof finish',
      '2.5-inch stable block heel',
      'Cushioned arch support technology'
    ],
    material: 'Synthetic Leather',
    soleMaterial: 'Slip-Resistant Resinite',
    occasion: 'Formal',
    heelHeight: '2.5 Inches',
    sku: 'DAV-W-BL-8410',
    reviews: []
  },
  {
    id: 'titaan-women-05',
    title: "Titaan Women's Chic Gold Hardware Flat Ballerinas",
    brand: 'Titaan',
    gender: 'Women',
    category: 'Flats & Ballerinas',
    price: 1190,
    originalPrice: 2390,
    discountPercentage: 50,
    rating: 4.5,
    reviewsCount: 410,
    images: [
      'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Pastel Peach', hex: '#FFDAB9', imageIndex: 0 },
      { name: 'Midnight Blue', hex: '#191970', imageIndex: 1 },
      { name: 'Tan Suede', hex: '#A0522D', imageIndex: 0 }
    ],
    sizes: [36, 37, 38, 39, 40, 41],
    inStock: true,
    isSpecialDeal: true,
    description: 'Your everyday wardrobe workhorse. Super flexible ballerina flats with interlocking golden horsebit charm and sweat-absorbent lining.',
    features: [
      'Super-flexible 360-degree bendable sole',
      'Reinforced toe box with metallic trim',
      'Anti-blister padded collar'
    ],
    material: 'Synthetic Leather',
    soleMaterial: 'Ultra-Flex Rubber',
    occasion: 'Casual',
    sku: 'TITN-W-FL-3382',
    reviews: []
  },
  {
    id: 'biofoot-women-06',
    title: "Biofoot Women's Orthopedic Cloud Soft Slide Sandals",
    brand: 'Biofoot',
    gender: 'Women',
    category: 'Slippers & Flip Flops',
    price: 1390,
    originalPrice: 2790,
    discountPercentage: 50,
    rating: 4.8,
    reviewsCount: 315,
    images: [
      'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Dusty Lavender', hex: '#BDB0D0', imageIndex: 0 },
      { name: 'Charcoal Grey', hex: '#374151', imageIndex: 1 }
    ],
    sizes: [36, 37, 38, 39, 40],
    inStock: true,
    description: 'Doctor recommended orthopedic slides with deep heel cup, biomechanical arch support and ultra-rebound cushioning for plantar fasciitis relief.',
    features: [
      'Biomechanical molded footbed',
      'Reduces heel strike impact by 45%',
      'Waterproof, washable and lightweight'
    ],
    material: 'Croslite / EVA',
    soleMaterial: 'High-Density EVA',
    occasion: 'Casual',
    sku: 'BIO-W-SL-1192',
    reviews: []
  },

  // --- BAGS & ACCESSORIES ---
  {
    id: 'titaan-bag-01',
    title: "Titaan Women's Structured Quilted Top-Handle Satchel Bag",
    brand: 'Titaan',
    gender: 'Women',
    category: 'Bags & Handbags',
    price: 1990,
    originalPrice: 3990,
    discountPercentage: 50,
    rating: 4.7,
    reviewsCount: 280,
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Warm Caramel', hex: '#AF6E4D', imageIndex: 0 },
      { name: 'Ivory White', hex: '#FFFFF0', imageIndex: 1 },
      { name: 'Emerald Forest', hex: '#0B6623', imageIndex: 0 }
    ],
    sizes: ['Free Size'],
    inStock: true,
    isBestseller: true,
    description: 'Elegance in craftsmanship. Luxurious chevron diamond quilting with metallic twist lock clasp, spacious dual compartments, and detachable shoulder strap.',
    features: [
      '3 large inner zipper compartments & card slots',
      'Heavy-duty gold-tone hardware that never tarnishes',
      'Scratch-resistant saffiano vegan leather',
      'Includes detachable adjustable crossbody strap'
    ],
    material: 'Synthetic Leather',
    soleMaterial: 'N/A',
    occasion: 'Party',
    sku: 'TITN-B-HB-7721',
    reviews: [
      {
        id: 'r8',
        userName: 'Ananya Sharma',
        rating: 5,
        date: '08 Aug 2026',
        comment: 'Looks like a luxury designer bag! Spacious enough for iPhone 16 Pro Max, wallet, makeup kit and keys.',
        verifiedPurchase: true,
        userCity: 'Delhi NCR',
        helpfulCount: 17
      }
    ]
  },
  {
    id: 'titaan-acc-02',
    title: "Titaan Men's Reversible Genuine Leather Belt & RFID Wallet Set",
    brand: 'Titaan',
    gender: 'Men',
    category: 'Wallets & Belts',
    price: 1290,
    originalPrice: 2590,
    discountPercentage: 50,
    rating: 4.9,
    reviewsCount: 640,
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Black & Brown Reversible', hex: '#212121', imageIndex: 0 }
    ],
    sizes: ['32-34', '36-38', '40-42'],
    inStock: true,
    isBestseller: true,
    isSpecialDeal: true,
    description: 'The ultimate gift set. Features a 100% genuine full-grain leather belt that swivels between black and dark brown, paired with an RFID-blocking slim bi-fold wallet in a gift box.',
    features: [
      'Reversible twist-lock zinc alloy buckle',
      'RFID protective shield against electronic theft',
      '8 dedicated card slots + currency sleeve',
      'Comes in luxury Titaan magnetic gift box'
    ],
    material: 'Genuine Leather',
    soleMaterial: 'N/A',
    occasion: 'Formal',
    sku: 'TITN-A-ST-5509',
    reviews: []
  },
  {
    id: 'crocs-unisex-01',
    title: 'Crocs Classic All-Terrain Clog with Jibbitz Slots',
    brand: 'Crocs',
    gender: 'Unisex',
    category: 'Slippers & Flip Flops',
    price: 2490,
    originalPrice: 4995,
    discountPercentage: 50,
    rating: 4.7,
    reviewsCount: 890,
    images: [
      'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Army Green', hex: '#4B5320', imageIndex: 0 },
      { name: 'Bone Off-White', hex: '#E3DAC9', imageIndex: 1 },
      { name: 'Navy Blue', hex: '#000080', imageIndex: 0 }
    ],
    sizes: [6, 7, 8, 9, 10, 11],
    inStock: true,
    isBestseller: true,
    description: 'Travel. Exploration. Adventures near and far. Rugged lug outsoles with enhanced tread for increased traction and support.',
    features: [
      'Fully molded Croslite foam upper',
      'Ventilation ports shed water and debris',
      'Adjustable turbo heel strap for snug fit',
      'Customizable with Jibbitz charms'
    ],
    material: 'Croslite / EVA',
    soleMaterial: 'Rugged Lug Croslite',
    occasion: 'Casual',
    sku: 'CRX-U-CL-2088',
    reviews: []
  },

  // --- KIDS FOOTWEAR ---
  {
    id: 'titaan-kids-01',
    title: "Titaan Junior Boys' Active Light-Up Racer Sneakers",
    brand: 'Titaan',
    gender: 'Kids',
    category: 'Sneakers',
    price: 1190,
    originalPrice: 2390,
    discountPercentage: 50,
    rating: 4.6,
    reviewsCount: 140,
    images: [
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Royal Blue / Orange', hex: '#1E40AF', imageIndex: 0 },
      { name: 'Neon Lime / Black', hex: '#84CC16', imageIndex: 1 }
    ],
    sizes: [10, 11, 12, 13, 1, 2, 3],
    inStock: true,
    description: 'Fun, bright, and durable sneakers designed for active kids. Features motion-activated LED sole lights and easy dual velcro straps.',
    features: [
      'Dual velcro straps for independent wearing',
      'Long-lasting motion-activated LED lights in heel',
      'Padded tongue and ankle protection',
      'Non-slip rubber base'
    ],
    material: 'Fabric / Mesh',
    soleMaterial: 'EVA & Rubber',
    occasion: 'Casual',
    sku: 'TITN-K-SN-1099',
    reviews: []
  },
  {
    id: 'metro-kids-02',
    title: "Metro Princess Girls' Shimmer Bow Ballerina Shoes",
    brand: 'Metro',
    gender: 'Kids',
    category: 'Flats & Ballerinas',
    price: 990,
    originalPrice: 1990,
    discountPercentage: 50,
    rating: 4.8,
    reviewsCount: 165,
    images: [
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Sparkle Silver', hex: '#E5E7EB', imageIndex: 0 },
      { name: 'Princess Pink', hex: '#F472B6', imageIndex: 1 }
    ],
    sizes: [10, 11, 12, 13, 1, 2],
    inStock: true,
    description: 'Perfect for birthday parties and festive occasions. Finished with glittering fabric and a cute satin bow detail with secure elastic strap.',
    features: [
      'Instep elastic band prevents slipping off',
      'Super-cushioned insole with zero hard edges',
      'Non-marking skid-resistant bottom'
    ],
    material: 'Fabric / Mesh',
    soleMaterial: 'Soft Flexible TPR',
    occasion: 'Party',
    sku: 'METR-K-BL-3310',
    reviews: []
  },

  // --- ADDITIONAL MEN'S & WOMEN'S STYLES FOR RICH FILTERING ---
  {
    id: 'titaan-men-08',
    title: "Titaan Men's Chelsea Leather Ankle Boots with Elastic Gusset",
    brand: 'Titaan',
    gender: 'Men',
    category: 'Boots',
    price: 3490,
    originalPrice: 6990,
    discountPercentage: 50,
    rating: 4.7,
    reviewsCount: 180,
    images: [
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Burnished Tan', hex: '#8B4513', imageIndex: 0 },
      { name: 'Matte Charcoal', hex: '#262626', imageIndex: 1 }
    ],
    sizes: [7, 8, 9, 10, 11],
    inStock: true,
    description: 'Sleek British-inspired Chelsea boots. Features heavy-duty elastic side panels and front/rear pull loops for effortless pull-on styling.',
    features: [
      'Full grain cowhide leather',
      'Reinforced welt construction',
      'Shock-absorbing crepe-textured sole',
      'Moisture management lining'
    ],
    material: 'Genuine Leather',
    soleMaterial: 'Durable Crepe Rubber',
    occasion: 'Casual',
    sku: 'TITN-M-BT-5100',
    reviews: []
  },
  {
    id: 'titaan-women-07',
    title: "Titaan Women's Strappy Metallic Block Heel Party Sandals",
    brand: 'Titaan',
    gender: 'Women',
    category: 'Heels & Pumps',
    price: 1790,
    originalPrice: 3490,
    discountPercentage: 49,
    rating: 4.6,
    reviewsCount: 220,
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Glossy Gold', hex: '#FFD700', imageIndex: 0 },
      { name: 'Silver Chrome', hex: '#E0E0E0', imageIndex: 1 }
    ],
    sizes: [36, 37, 38, 39, 40, 41],
    inStock: true,
    isSpecialDeal: true,
    description: 'Geometric strappy design that flatters every foot. The 2-inch block heel gives supreme stability for sangeet and cocktail parties.',
    features: [
      'Adjustable ankle buckle with concealed elastic',
      'Non-slip ribbed sole plate',
      'Metallic foil finish with anti-flaking coat'
    ],
    material: 'Synthetic Leather',
    soleMaterial: 'Neolite Sheet',
    occasion: 'Party',
    heelHeight: '2.0 Inches',
    sku: 'TITN-W-ST-2299',
    reviews: []
  },
  {
    id: 'zeemo-men-01',
    title: "Zeemo Men's Aeroflex Ultra-Lightweight Breathable Slip-ons",
    brand: 'Zeemo',
    gender: 'Men',
    category: 'Casual Shoes',
    price: 1290,
    originalPrice: 2490,
    discountPercentage: 48,
    rating: 4.4,
    reviewsCount: 310,
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Navy Space Knit', hex: '#1E3A8A', imageIndex: 0 },
      { name: 'Slate Grey', hex: '#64748B', imageIndex: 1 }
    ],
    sizes: [6, 7, 8, 9, 10],
    inStock: true,
    description: 'Seamless knit sock-fit casual shoes weighing under 210 grams. Engineered for morning walks, errands, and all-day casual wear.',
    features: [
      'One-piece 3D stretch-knit breathable upper',
      'Memory rebound cloud footbed',
      'Machine washable cold cycle'
    ],
    material: 'Fabric / Mesh',
    soleMaterial: 'Ultra-Light EVA',
    occasion: 'Casual',
    sku: 'ZEE-M-AF-9090',
    reviews: []
  }
];

export const AVAILABLE_COUPONS: Coupon[] = [
  {
    code: 'TITAAN50',
    description: 'Flat 50% discount on entire catalog sale items',
    discountType: 'percentage',
    discountValue: 50,
    minOrderValue: 999
  },
  {
    code: 'EXTRA10',
    description: 'Additional 10% instant off on orders above ₹1,999',
    discountType: 'percentage',
    discountValue: 10,
    minOrderValue: 1999,
    maxDiscount: 500
  },
  {
    code: 'METRO200',
    description: 'Flat ₹200 OFF on your first Titaan / Metro purchase',
    discountType: 'flat',
    discountValue: 200,
    minOrderValue: 1499
  },
  {
    code: 'FREESHIP',
    description: 'Free expedited express shipping on all orders',
    discountType: 'flat',
    discountValue: 99,
    minOrderValue: 0
  }
];

export const STORE_LOCATIONS: StoreLocation[] = [
  {
    id: 'store-1',
    name: 'Titaan - Linking Road',
    city: 'Mumbai',
    address: 'Ground Floor, 442 Linking Road, Khar West, Mumbai - 400052',
    phone: '+91 22 2648 1122',
    timings: '10:30 AM - 9:30 PM (Open All 7 Days)',
    distanceKm: 2.4,
    isMallStore: false
  },
  {
    id: 'store-2',
    name: 'Titaan - Phoenix Palladium',
    city: 'Mumbai',
    address: 'Level 1, High Street Phoenix, Lower Parel, Mumbai - 400013',
    phone: '+91 22 2498 7700',
    timings: '11:00 AM - 10:00 PM',
    distanceKm: 4.8,
    isMallStore: true
  },
  {
    id: 'store-3',
    name: 'Titaan - Connaught Place (Inner Circle)',
    city: 'New Delhi',
    address: 'F-14, Inner Circle, Connaught Place, New Delhi - 110001',
    phone: '+91 11 2341 8899',
    timings: '10:30 AM - 9:00 PM',
    distanceKm: 1.2,
    isMallStore: false
  },
  {
    id: 'store-4',
    name: 'Titaan - Brigade Road',
    city: 'Bengaluru',
    address: '88 Brigade Road, Ashok Nagar, Bengaluru, Karnataka - 560001',
    phone: '+91 80 2558 3311',
    timings: '10:00 AM - 9:30 PM',
    distanceKm: 3.1,
    isMallStore: false
  },
  {
    id: 'store-5',
    name: 'Titaan - Park Street',
    city: 'Kolkata',
    address: '22 Park Street, Park Street area, Kolkata, West Bengal - 700016',
    phone: '+91 33 2229 4455',
    timings: '10:30 AM - 8:30 PM',
    distanceKm: 5.0,
    isMallStore: false
  },
  {
    id: 'store-6',
    name: 'Titaan - Express Avenue Mall',
    city: 'Chennai',
    address: 'Shop No S-218, Express Avenue Mall, Royapettah, Chennai - 600014',
    phone: '+91 44 2846 9911',
    timings: '10:00 AM - 10:00 PM',
    distanceKm: 3.7,
    isMallStore: true
  },
  {
    id: 'store-7',
    name: 'Titaan - Inorbit Mall Cyberabad',
    city: 'Hyderabad',
    address: 'Upper Ground Floor, Inorbit Mall, Madhapur, Hyderabad - 500081',
    phone: '+91 40 4012 3344',
    timings: '11:00 AM - 10:00 PM',
    distanceKm: 6.2,
    isMallStore: true
  }
];
