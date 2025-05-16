const products = [
  {
    name: 'African Black Soap',
    image: '/images/black-soap.jpg',
    description:
      'Traditional African black soap made with plantain ash, cocoa pod ash, palm oil, and shea butter. Great for cleansing and treating acne-prone skin.',
    brand: 'AyoGlow',
    category: 'Cleansers',
    price: 8.99,
    countInStock: 100,
    rating: 4.5,
    numReviews: 12,
    ingredients: ['Plantain Ash', 'Cocoa Pod Ash', 'Palm Oil', 'Shea Butter'],
    benefits: ['Treats Acne', 'Exfoliates Dead Skin', 'Reduces Inflammation'],
    isFeatured: true,
    isNatural: true,
    skinType: ['Oily', 'Combination', 'Acne-Prone']
  },
  {
    name: 'Shea Butter Moisturizer',
    image: '/images/shea-butter.jpg',
    description:
      'Rich and nourishing shea butter moisturizer that hydrates and repairs dry skin. Sourced from Ghana and whipped to perfection.',
    brand: 'AyoGlow',
    category: 'Moisturizers',
    price: 12.99,
    countInStock: 80,
    rating: 4.8,
    numReviews: 8,
    ingredients: ['Raw Shea Butter', 'Coconut Oil', 'Jojoba Oil', 'Vitamin E'],
    benefits: ['Intense Hydration', 'Repairs Skin Barrier', 'Anti-Aging'],
    isFeatured: true,
    isNatural: true,
    skinType: ['Dry', 'Normal', 'Sensitive']
  },
  {
    name: 'Baobab Oil Serum',
    image: '/images/baobab-oil.jpg',
    description:
      'Lightweight baobab oil serum that absorbs quickly and delivers potent antioxidants to protect against environmental damage.',
    brand: 'AyoGlow',
    category: 'Serums',
    price: 19.99,
    countInStock: 60,
    rating: 4.6,
    numReviews: 14,
    ingredients: ['Baobab Oil', 'Marula Oil', 'Rosehip Oil', 'Frankincense Essential Oil'],
    benefits: ['Antioxidant Protection', 'Reduces Fine Lines', 'Brightens Skin Tone'],
    isFeatured: true,
    isNatural: true,
    skinType: ['All', 'Aging', 'Dull']
  },
  {
    name: 'Moringa Clay Mask',
    image: '/images/moringa-mask.jpg',
    description:
      'Detoxifying clay mask made with moringa powder and bentonite clay to draw out impurities and tighten pores.',
    brand: 'AyoGlow',
    category: 'Masks',
    price: 15.99,
    countInStock: 75,
    rating: 4.3,
    numReviews: 10,
    ingredients: ['Moringa Powder', 'Bentonite Clay', 'Activated Charcoal', 'Tea Tree Oil'],
    benefits: ['Detoxifies', 'Unclogs Pores', 'Controls Excess Oil'],
    isFeatured: false,
    isNatural: true,
    skinType: ['Oily', 'Combination', 'Acne-Prone']
  },
  {
    name: 'Aloe & Cucumber Toner',
    image: '/images/aloe-toner.jpg',
    description:
      'Refreshing alcohol-free toner with aloe vera and cucumber extract to hydrate and balance skin after cleansing.',
    brand: 'AyoGlow',
    category: 'Toners',
    price: 11.99,
    countInStock: 90,
    rating: 4.7,
    numReviews: 6,
    ingredients: ['Aloe Vera Juice', 'Cucumber Extract', 'Witch Hazel', 'Rose Water'],
    benefits: ['Balances pH', 'Hydrates', 'Soothes Irritation'],
    isFeatured: false,
    isNatural: true,
    skinType: ['All', 'Sensitive', 'Dry']
  },
  {
    name: 'Hibiscus & Papaya Enzyme Exfoliator',
    image: '/images/hibiscus-exfoliator.jpg',
    description:
      'Gentle exfoliating treatment with hibiscus and papaya enzymes to remove dead skin cells and reveal brighter skin.',
    brand: 'AyoGlow',
    category: 'Exfoliators',
    price: 16.99,
    countInStock: 65,
    rating: 4.4,
    numReviews: 9,
    ingredients: ['Hibiscus Powder', 'Papaya Enzyme', 'Jojoba Beads', 'Honey'],
    benefits: ['Gentle Exfoliation', 'Brightens Complexion', 'Improves Texture'],
    isFeatured: false,
    isNatural: true,
    skinType: ['Normal', 'Combination', 'Dull']
  }
];

export default products; 