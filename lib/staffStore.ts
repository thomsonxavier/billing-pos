import { create } from 'zustand';
import { User } from '../types';

interface StaffState {
  staff: User[];
  isLoading: boolean;
  error: string | null;
}

interface StaffStore extends StaffState {
  // Actions
  addStaff: (staff: Omit<User, 'id'>) => void;
  updateStaff: (id: string, updates: Partial<User>) => void;
  deleteStaff: (id: string) => void;
  toggleStaffStatus: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

// Mock initial staff data
const initialStaff: User[] = [
  {
    id: '1',
    name: 'Raj Kumar',
    role: 'admin',
    username: 'admin',
    isActive: true,
  },
  {
    id: '2',
    name: 'Amit Sharma',
    role: 'waiter',
    username: 'waiter1',
    isActive: true,
  },
  {
    id: '3',
    name: 'Priya Singh',
    role: 'waiter',
    username: 'waiter2',
    isActive: true,
  },
  {
    id: '4',
    name: 'Ramesh Chef',
    role: 'kitchen',
    username: 'kitchen1',
    isActive: true,
  },
  {
    id: '5',
    name: 'Suresh Kumar',
    role: 'kitchen',
    username: 'kitchen2',
    isActive: true,
  },
];

export const useStaffStore = create<StaffStore>((set) => ({
  // Initial state
  staff: initialStaff,
  isLoading: false,
  error: null,

  // Actions
  addStaff: (staffData) => {
    const newStaff: User = {
      ...staffData,
      id: Date.now().toString(), // Simple ID generation
    };
    
    set((state) => ({
      staff: [...state.staff, newStaff],
      error: null,
    }));
  },

  updateStaff: (id, updates) => {
    set((state) => ({
      staff: state.staff.map((staff) =>
        staff.id === id ? { ...staff, ...updates } : staff
      ),
      error: null,
    }));
  },

  deleteStaff: (id) => {
    set((state) => ({
      staff: state.staff.filter((staff) => staff.id !== id),
      error: null,
    }));
  },

  toggleStaffStatus: (id) => {
    set((state) => ({
      staff: state.staff.map((staff) =>
        staff.id === id ? { ...staff, isActive: !staff.isActive } : staff
      ),
      error: null,
    }));
  },

  setLoading: (loading) => {
    set({ isLoading: loading });
  },

  setError: (error) => {
    set({ error });
  },

  clearError: () => {
    set({ error: null });
  },
}));

// Selectors
export const useStaff = () => useStaffStore((state) => state.staff);
export const useStaffLoading = () => useStaffStore((state) => state.isLoading);
export const useStaffError = () => useStaffStore((state) => state.error);
