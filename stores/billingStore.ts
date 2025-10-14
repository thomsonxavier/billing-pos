import { create } from 'zustand';

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  image?: string;
  description?: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface CustomerDetails {
  type: 'walk-in' | 'regular' | 'new';
  mode: 'takeaway' | 'parcel' | 'delivery';
  name?: string;
  phone?: string;
  email?: string;
}

export interface PaymentDetails {
  method: 'cash' | 'card' | 'upi';
  amountReceived: number;
  notes?: string;
}

export interface Order {
  id: string;
  customer: CustomerDetails;
  items: CartItem[];
  payment: PaymentDetails;
  subtotal: number;
  gst: number;
  total: number;
  status: 'pending' | 'paid' | 'completed';
  createdAt: Date;
}

interface BillingStore {
  // Current step (0: direct, 1: customer, 2: items, 3: payment, 4: summary)
  currentStep: number;
  
  // Customer details
  customerDetails: CustomerDetails;
  
  // Cart
  cart: CartItem[];
  
  // Payment
  paymentDetails: PaymentDetails;
  
  // Current order
  currentOrder: Order | null;
  
  // Actions
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setCustomerDetails: (details: Partial<CustomerDetails>) => void;
  addToCart: (item: MenuItem) => void;
  updateCartItem: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  setPaymentDetails: (details: Partial<PaymentDetails>) => void;
  createOrder: () => void;
  resetBilling: () => void;
  
  // Computed values
  getCartTotal: () => number;
  getCartSubtotal: () => number;
  getCartGST: () => number;
}

const defaultCustomerDetails: CustomerDetails = {
  type: 'walk-in',
  mode: 'takeaway'
};

const defaultPaymentDetails: PaymentDetails = {
  method: 'cash',
  amountReceived: 0
};

export const useBillingStore = create<BillingStore>((set, get) => ({
  currentStep: 0, // 0: direct, 1: customer, 2: items, 3: payment, 4: summary
  customerDetails: defaultCustomerDetails,
  cart: [],
  paymentDetails: defaultPaymentDetails,
  currentOrder: null,

  setCurrentStep: (step) => set({ currentStep: step }),
  
  nextStep: () => set((state) => ({ 
    currentStep: Math.min(state.currentStep + 1, 4) 
  })),
  
  prevStep: () => set((state) => ({ 
    currentStep: Math.max(state.currentStep - 1, 0) 
  })),
  
  setCustomerDetails: (details) => 
    set((state) => ({ 
      customerDetails: { ...state.customerDetails, ...details } 
    })),
  
  addToCart: (item) => 
    set((state) => {
      const existingItem = state.cart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return {
          cart: state.cart.map(cartItem =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          )
        };
      } else {
        return {
          cart: [...state.cart, { ...item, quantity: 1 }]
        };
      }
    }),
  
  updateCartItem: (id, quantity) =>
    set((state) => ({
      cart: state.cart.map(item =>
        item.id === id ? { ...item, quantity } : item
      ).filter(item => item.quantity > 0)
    })),
  
  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter(item => item.id !== id)
    })),
  
  clearCart: () => set({ cart: [] }),
  
  setPaymentDetails: (details) =>
    set((state) => ({
      paymentDetails: { ...state.paymentDetails, ...details }
    })),
  
  createOrder: () => {
    const state = get();
    const subtotal = state.getCartSubtotal();
    const gst = state.getCartGST();
    const total = subtotal + gst;
    
    const order: Order = {
      id: `ORD${Date.now()}`,
      customer: state.customerDetails,
      items: state.cart,
      payment: state.paymentDetails,
      subtotal,
      gst,
      total,
      status: 'completed',
      createdAt: new Date()
    };
    
    set({ currentOrder: order });
  },
  
  resetBilling: () => set({
    currentStep: 0,
    customerDetails: defaultCustomerDetails,
    cart: [],
    paymentDetails: defaultPaymentDetails,
    currentOrder: null
  }),
  
  getCartTotal: () => {
    const state = get();
    return state.getCartSubtotal() + state.getCartGST();
  },
  
  getCartSubtotal: () => {
    const state = get();
    return state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  },
  
  getCartGST: () => {
    const state = get();
    return state.getCartSubtotal() * 0.18;
  }
}));
