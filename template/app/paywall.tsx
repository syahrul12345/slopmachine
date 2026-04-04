import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { getOfferings, purchasePackage, restorePurchases } from '../lib/purchases';

export default function PaywallScreen() {
  const [offerings, setOfferings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    loadOfferings();
  }, []);

  async function loadOfferings() {
    setLoading(true);
    const current = await getOfferings();
    setOfferings(current);
    setLoading(false);
  }

  async function handlePurchase(pkg: any) {
    setPurchasing(true);
    const customerInfo = await purchasePackage(pkg);
    setPurchasing(false);

    if (customerInfo) {
      Alert.alert('Success', 'Purchase complete!', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    }
  }

  async function handleRestore() {
    setPurchasing(true);
    const customerInfo = await restorePurchases();
    setPurchasing(false);

    if (customerInfo) {
      const hasActive = Object.keys(customerInfo.entitlements.active).length > 0;
      if (hasActive) {
        Alert.alert('Restored', 'Your purchases have been restored.', [
          { text: 'OK', onPress: () => router.back() },
        ]);
      } else {
        Alert.alert('No Purchases', 'No previous purchases found.');
      }
    }
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!offerings) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Unable to load offerings.</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadOfferings}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Upgrade to Premium</Text>
      <Text style={styles.subtitle}>Unlock all features</Text>

      {offerings.availablePackages.map((pkg: any) => (
        <TouchableOpacity
          key={pkg.identifier}
          style={styles.packageCard}
          onPress={() => handlePurchase(pkg)}
          disabled={purchasing}
        >
          <Text style={styles.packageTitle}>{pkg.product.title}</Text>
          <Text style={styles.packageDescription}>{pkg.product.description}</Text>
          <Text style={styles.packagePrice}>{pkg.product.priceString}</Text>
        </TouchableOpacity>
      ))}

      {purchasing && (
        <ActivityIndicator size="small" style={styles.purchasingIndicator} />
      )}

      <TouchableOpacity
        style={styles.restoreButton}
        onPress={handleRestore}
        disabled={purchasing}
      >
        <Text style={styles.restoreText}>Restore Purchases</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 24, paddingBottom: 48 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 28, fontWeight: '700', textAlign: 'center', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 32 },
  packageCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  packageTitle: { fontSize: 18, fontWeight: '600', marginBottom: 4 },
  packageDescription: { fontSize: 14, color: '#666', marginBottom: 8 },
  packagePrice: { fontSize: 20, fontWeight: '700', color: '#007AFF' },
  purchasingIndicator: { marginVertical: 16 },
  restoreButton: { marginTop: 24, alignItems: 'center', padding: 12 },
  restoreText: { fontSize: 14, color: '#007AFF' },
  retryButton: { marginTop: 16, padding: 12 },
  retryText: { fontSize: 16, color: '#007AFF' },
  errorText: { fontSize: 16, color: '#666' },
});
