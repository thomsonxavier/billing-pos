import { MenuItem } from '@/lib/billingStore';

export const menuItems: MenuItem[] = [
  // Main Course
  {
    id: '1',
    name: 'Paneer Butter Masala',
    category: 'Main Course',
    price: 280,
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300&h=300&fit=crop',
    description: 'Creamy tomato curry with cottage cheese'
  },
  {
    id: '2',
    name: 'Chicken Tikka Masala',
    category: 'Main Course',
    price: 320,
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d4d0?w=300&h=300&fit=crop',
    description: 'Tender chicken in spiced tomato cream sauce'
  },
  {
    id: '3',
    name: 'Dal Makhani',
    category: 'Main Course',
    price: 220,
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=300&h=300&fit=crop',
    description: 'Rich black lentils in creamy tomato sauce'
  },
  
  // Breads
  {
    id: '4',
    name: 'Butter Naan',
    category: 'Breads',
    price: 45,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&h=300&fit=crop',
    description: 'Soft leavened bread with butter'
  },
  {
    id: '5',
    name: 'Garlic Naan',
    category: 'Breads',
    price: 55,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&h=300&fit=crop',
    description: 'Naan bread with garlic and herbs'
  },
  {
    id: '6',
    name: 'Tandoori Roti',
    category: 'Breads',
    price: 35,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&h=300&fit=crop',
    description: 'Whole wheat bread cooked in tandoor'
  },
  
  // Rice
  {
    id: '7',
    name: 'Biryani (Veg)',
    category: 'Rice',
    price: 250,
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d4d0?w=300&h=300&fit=crop',
    description: 'Fragrant basmati rice with vegetables'
  },
  {
    id: '8',
    name: 'Biryani (Chicken)',
    category: 'Rice',
    price: 320,
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d4d0?w=300&h=300&fit=crop',
    description: 'Fragrant basmati rice with chicken'
  },
  
  // South Indian
  {
    id: '9',
    name: 'Masala Dosa',
    category: 'South Indian',
    price: 120,
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300&h=300&fit=crop',
    description: 'Crispy crepe with spiced potato filling'
  },
  {
    id: '10',
    name: 'Idli Sambar',
    category: 'South Indian',
    price: 80,
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300&h=300&fit=crop',
    description: 'Steamed rice cakes with lentil curry'
  },
  
  // Starters
  {
    id: '11',
    name: 'Chicken Tikka',
    category: 'Starters',
    price: 180,
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d4d0?w=300&h=300&fit=crop',
    description: 'Tender chicken marinated in spices'
  },
  {
    id: '12',
    name: 'Paneer Tikka',
    category: 'Starters',
    price: 160,
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300&h=300&fit=crop',
    description: 'Grilled cottage cheese with spices'
  },
  
  // Beverages
  {
    id: '13',
    name: 'Coffee',
    category: 'Beverages',
    price: 40,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop',
    description: 'Freshly brewed coffee'
  },
  {
    id: '14',
    name: 'Tea',
    category: 'Beverages',
    price: 30,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop',
    description: 'Traditional Indian chai'
  },
  
  // Desserts
  {
    id: '15',
    name: 'Gulab Jamun',
    category: 'Desserts',
    price: 60,
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300&h=300&fit=crop',
    description: 'Sweet milk dumplings in syrup'
  },
  {
    id: '16',
    name: 'Kheer',
    category: 'Desserts',
    price: 80,
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300&h=300&fit=crop',
    description: 'Rice pudding with nuts and raisins'
  }
];

export const categories = [
  'Main Course',
  'Breads', 
  'Rice',
  'South Indian',
  'Starters',
  'Beverages',
  'Desserts'
];
