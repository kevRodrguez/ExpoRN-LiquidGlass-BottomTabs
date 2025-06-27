
import React from 'react';
import { WebView, WebViewNavigation } from 'react-native-webview';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView, StyleSheet } from 'react-native';
import Constants from 'expo-constants';



export default function PaddleCheckoutScreen() {

  const { paddleCheckoutUrl } = useLocalSearchParams();

  const PADDLE_CHECKOUT_URL = paddleCheckoutUrl || 'https://sandbox-pay.paddle.io/hsc_01jyphedbpmyh79x9e0xhz0w39_kpnvgbhxz0r3jfed5gsme9qx8g045tjt';

  const handleNavigationStateChange = (navState: WebViewNavigation) => {
    const { url } = navState;
    if (!url) return;

    // Listen for the success URL
    // if (url.startsWith(SUCCESS_URL)) {
    //   console.log('Payment successful!');
    // Navigate back to the main screen or a success screen
    //   router.back();
    // }

    // Listen for the cancel URL
    // if (url.startsWith(CANCEL_URL)) {
    //   console.log('Payment cancelled.');
    // Navigate back to the main screen
    //   router.back();
    // }
  };

  return (
  
      <WebView
        source={{ uri: PADDLE_CHECKOUT_URL as string }}
        style={styles.container}
        onNavigationStateChange={handleNavigationStateChange}
      />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
