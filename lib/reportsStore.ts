import { create } from 'zustand';

export interface RevenueData {
  today: number;
  weekly: number;
  monthly: number;
}

export interface WeeklyPerformance {
  day: string;
  revenue: number;
  orders: number;
}

export interface PaymentMethodData {
  method: 'cash' | 'card' | 'upi';
  amount: number;
  percentage: number;
}

export interface ReportsState {
  revenue: RevenueData;
  weeklyPerformance: WeeklyPerformance[];
  paymentMethods: PaymentMethodData[];
  isLoading: boolean;
  error: string | null;
}

interface ReportsStore extends ReportsState {
  // Actions
  setRevenue: (revenue: RevenueData) => void;
  setWeeklyPerformance: (performance: WeeklyPerformance[]) => void;
  setPaymentMethods: (methods: PaymentMethodData[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  refreshData: () => void;
}

// Mock initial data
const initialRevenue: RevenueData = {
  today: 0,
  weekly: 186100,
  monthly: 750000,
};

const initialWeeklyPerformance: WeeklyPerformance[] = [
  { day: 'Mon', revenue: 28000, orders: 45 },
  { day: 'Sun', revenue: 32000, orders: 52 },
  { day: 'Sat', revenue: 29000, orders: 48 },
  { day: 'Fri', revenue: 26000, orders: 42 },
  { day: 'Thu', revenue: 24000, orders: 38 },
  { day: 'Wed', revenue: 22000, orders: 35 },
  { day: 'Tue', revenue: 21000, orders: 33 },
];

const initialPaymentMethods: PaymentMethodData[] = [
  { method: 'cash', amount: 0, percentage: 0 },
  { method: 'card', amount: 0, percentage: 0 },
  { method: 'upi', amount: 0, percentage: 0 },
];

export const useReportsStore = create<ReportsStore>((set) => ({
  // Initial state
  revenue: initialRevenue,
  weeklyPerformance: initialWeeklyPerformance,
  paymentMethods: initialPaymentMethods,
  isLoading: false,
  error: null,

  // Actions
  setRevenue: (revenue) => {
    set({ revenue, error: null });
  },

  setWeeklyPerformance: (performance) => {
    set({ weeklyPerformance: performance, error: null });
  },

  setPaymentMethods: (methods) => {
    set({ paymentMethods: methods, error: null });
  },

  setLoading: (loading) => {
    set({ isLoading: loading });
  },

  setError: (error) => {
    set({ error });
  },

  refreshData: () => {
    set({ isLoading: true, error: null });
    // Simulate API call
    setTimeout(() => {
      set({ isLoading: false });
    }, 1000);
  },
}));

// Selectors
export const useReports = () => useReportsStore((state) => state);
export const useRevenue = () => useReportsStore((state) => state.revenue);
export const useWeeklyPerformance = () => useReportsStore((state) => state.weeklyPerformance);
export const usePaymentMethods = () => useReportsStore((state) => state.paymentMethods);
export const useReportsLoading = () => useReportsStore((state) => state.isLoading);
export const useReportsError = () => useReportsStore((state) => state.error);
