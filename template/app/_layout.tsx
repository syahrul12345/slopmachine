import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { initAnalytics } from '@/lib/analytics';
import { initPurchases } from '@/lib/purchases';
import { registerForPushNotifications } from '@/lib/notifications';
import { AuthProvider } from '@/lib/auth';

export default function RootLayout() {
  useEffect(() => {
    initAnalytics();
    initPurchases();
    registerForPushNotifications();
  }, []);

  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </AuthProvider>
  );
}
