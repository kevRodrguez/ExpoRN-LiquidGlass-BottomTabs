import { Link, Stack, usePathname } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';
import React, { useEffect } from 'react';

export default function NotFoundScreen() {
  const pathname = usePathname();

  useEffect(() => {
    console.log('[Not Found Screen] Ruta actual:', pathname);
  }, [pathname]);

  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <Text style={styles.title}>This screen doesn't exist.</Text>
        <Text style={styles.subtitle}>Ruta no encontrada: {pathname}</Text>

        <Link href="/(tabs)/two" style={styles.link}>
          <Text style={styles.linkText}>Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
