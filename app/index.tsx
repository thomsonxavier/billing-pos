import React from 'react';
import { useAuthStore } from '@/lib/authStore';
import { Redirect } from 'expo-router';

export default function Index() {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Redirect href="/(auth)" />;
  }

  // Redirect based on user role
  if (user?.role === 'admin') {
    return <Redirect href="/(admin)/dashboard" />;
  } else if (user?.role === 'waiter') {
    return <Redirect href="/(waiter)/dashboard" />;
  } else if (user?.role === 'kitchen') {
    return <Redirect href="/(kitchen)/dashboard" />;
  }

  return <Redirect href="/(auth)" />;
}
