export type UserRole = 'admin' | 'waiter' | 'kitchen';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  pin?: string;
  username?: string;
  password?: string;
  isActive: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface Order {
  id: string;
  tableNumber?: number;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
  waiterId: string;
  paymentMethod?: PaymentMethod;
}

export interface OrderItem {
  id: string;
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  notes?: string;
}

export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'served' | 'completed';

export type PaymentMethod = 'cash' | 'card' | 'upi';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  isAvailable: boolean;
  image?: string;
}

export interface DashboardStats {
  todaySales: number;
  totalOrders: number;
  averageOrderValue: number;
  peakHour: string;
  topDishes: TopDish[];
  paymentMethods: PaymentStats[];
}

export interface TopDish {
  id: string;
  name: string;
  quantitySold: number;
}

export interface PaymentStats {
  method: PaymentMethod;
  amount: number;
}

export interface Table {
  id: string;
  number: number;
  capacity: number;
  status: TableStatus;
  currentOrder?: Order;
}

export type TableStatus = 'available' | 'occupied' | 'reserved' | 'cleaning';

export interface NavigationProps {
  navigation: any;
  route: any;
}
