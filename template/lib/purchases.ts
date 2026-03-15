import { Platform } from 'react-native';
import Purchases from 'react-native-purchases';

export async function initPurchases() {
  const apiKey = Platform.select({
    ios: process.env.EXPO_PUBLIC_REVENUECAT_IOS_KEY,
    android: process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_KEY,
  });

  if (!apiKey) {
    console.warn('[purchases] No RevenueCat API key configured');
    return;
  }

  Purchases.configure({ apiKey });
}

export async function getOfferings() {
  try {
    const offerings = await Purchases.getOfferings();
    return offerings.current;
  } catch (e) {
    console.error('[purchases] Failed to get offerings:', e);
    return null;
  }
}

export async function purchasePackage(pkg: any) {
  try {
    const { customerInfo } = await Purchases.purchasePackage(pkg);
    return customerInfo;
  } catch (e: any) {
    if (!e.userCancelled) {
      console.error('[purchases] Purchase failed:', e);
    }
    return null;
  }
}

export async function restorePurchases() {
  try {
    const customerInfo = await Purchases.restorePurchases();
    return customerInfo;
  } catch (e) {
    console.error('[purchases] Restore failed:', e);
    return null;
  }
}
