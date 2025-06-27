import { StyleSheet, View, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ThemedText } from '@/presentation/theme/components/ThemedText'
import Animated, {
    useSharedValue,
    withTiming,
    withDelay,
    Easing,
} from 'react-native-reanimated';
import { router } from 'expo-router';
import ThemedButton from '@/presentation/theme/components/ThemedButton';
import Constants from 'expo-constants';

// Define the structure for a plan
interface Plan {
    id: string;
    name: string;
    price: string;
    billingCycle: string;
    features: string[];
    priceValue: number; // For sorting or comparison if needed
    checkoutUrl: string; // Optional URL for checkout
}

// Define the plans
const plans: Plan[] = [
    {
        id: 'plus',
        name: 'Plus',
        price: '$3.99',
        billingCycle: 'Monthly',
        features: [
            'Unlimited financial assistant chat',
            'Voice expense input',
            'Ticket scanning',
        ],
        priceValue: 3.99,
        checkoutUrl: 'https://sandbox-pay.paddle.io/hsc_01jyphedbpmyh79x9e0xhz0w39_kpnvgbhxz0r3jfed5gsme9qx8g045tjt', 
    },
    {
        id: 'annual_plus',
        name: 'Annual Plus',
        price: '$34.99',
        billingCycle: 'Annually',
        features: [
            'All Plus features',
            'Save over 20% annually',
        ],
        priceValue: 34.99,
        checkoutUrl: 'https://sandbox-pay.paddle.io/hsc_01jyqz7qnjbt963q59bv4v1dh7_fg7ydxpvjtc8aaqzepj7kzgtqcy7v12t', 
    },
    {
        id: 'lifetime',
        name: 'Lifetime',
        price: '$49.99',
        billingCycle: 'One-time payment',
        features: [
            'All Plus features',
            'Lifetime access',
            'Future updates included',
        ],
        priceValue: 49.99,
        checkoutUrl: 'https://sandbox-pay.paddle.io/hsc_01jyqz83b50wv1xgvk8tdvv4yp_mdwx81gs5w76fz12v41mktrd74jd69t2',
    },
];

export default function pricing() {
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

    // Animation shared values for each plan card
    const animatedValues = plans.map(() => ({
        opacity: useSharedValue(0),
        translateY: useSharedValue(50),
    }));

    useEffect(() => {
        animatedValues.forEach((val, index) => {
            val.opacity.value = withDelay(
                index * 150, // Staggered delay for each card
                withTiming(1, { duration: 600, easing: Easing.out(Easing.ease) })
            );
            val.translateY.value = withDelay(
                index * 150,
                withTiming(0, { duration: 600, easing: Easing.out(Easing.ease) })
            );
        });
    }, []);

    const handleSelectPlan = (plan: Plan) => {
        setSelectedPlan(plan);
    };

    const handleContinueToCheckout = () => {
        if (selectedPlan) {
            console.log('Selected Plan for Checkout:', selectedPlan.name, selectedPlan.price, selectedPlan.checkoutUrl);
            // In a real application, you would pass the selectedPlan details
            // to your payment gateway or checkout process.
            // For this example, we'll navigate to the success screen.
            router.push({
                pathname: '/checkout-screen',
                params: { paddleCheckoutUrl: selectedPlan.checkoutUrl },
            });
        } else {
            // Optionally, show a toast or alert asking the user to select a plan
            console.log('Please select a plan first.');
        }
    };

    return (
        <SafeAreaView style={[style.safeArea]}>
            <ScrollView contentContainerStyle={style.scrollViewContent}>
                <View style={style.headerContainer}>
                    <ThemedText
                        type='title'
                        style={style.mainTitle}
                    >
                        Pricing
                    </ThemedText>

                    <ThemedText
                        type='subtitle'
                        style={style.mainSubtitle}
                    >
                        Choose one of the available plans to continue
                    </ThemedText>
                </View>

                <View style={style.plansContainer}>
                    {plans.map((plan, index) => (
                        <Animated.View
                            key={plan.id}
                            style={[
                                style.planCardAnimatedWrapper,
                                {
                                    opacity: animatedValues[index].opacity,
                                    transform: [{ translateY: animatedValues[index].translateY }],
                                },
                            ]}
                        >
                            <TouchableOpacity
                                style={[
                                    style.planCard,
                                    selectedPlan?.id === plan.id && style.selectedPlanCard,
                                ]}
                                onPress={() => handleSelectPlan(plan)}
                                activeOpacity={0.7}
                            >
                                <ThemedText type='title' style={style.planName}>{plan.name}</ThemedText>
                                <ThemedText style={style.planPrice}>{plan.price}</ThemedText>
                                <ThemedText style={style.planBillingCycle}>{plan.billingCycle}</ThemedText>
                                <View style={style.featuresContainer}>
                                    {plan.features.map((feature, featureIndex) => (
                                        <View key={featureIndex} style={style.featureItem}>
                                            <ThemedText style={style.featureBullet}>•</ThemedText>
                                            <ThemedText style={style.featureText}>{feature}</ThemedText>
                                        </View>
                                    ))}
                                </View>
                            </TouchableOpacity>
                        </Animated.View>
                    ))}
                </View>
            </ScrollView>

            <View style={style.buttonContainer}>
                <ThemedButton
                    onPress={handleContinueToCheckout}
                    disabled={!selectedPlan}
                    style={[
                        style.checkoutButton,
                        !selectedPlan && style.checkoutButtonDisabled,
                    ]}
                    textStyle={style.checkoutButtonText}
                >
                    Continue to Checkout
                </ThemedButton>
            </View>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingBottom: 30, // space button at the bottom
    },
    headerContainer: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
    },
    mainTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#333', // Darker text for better contrast
    },
    mainSubtitle: {
        fontSize: 16,
        color: '#666',
        marginTop: 5,
    },
    plansContainer: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        gap: 15, // Space between cards
    },
    planCardAnimatedWrapper: {
        // This wrapper is specifically for the animation
    },
    planCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        borderWidth: 2,
        borderColor: 'transparent', // Default border, will be highlighted when selected
    },
    selectedPlanCard: {
        borderColor: '#007AFF', // A vibrant blue to highlight the selected card
        shadowColor: '#007AFF',
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 8,
    },
    planName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    planPrice: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#007AFF', // Price in a prominent color
        marginBottom: 5,
    },
    planBillingCycle: {
        fontSize: 14,
        color: '#888',
        marginBottom: 15,
    },
    featuresContainer: {
        marginTop: 10,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 5,
    },
    featureBullet: {
        fontSize: 16,
        marginRight: 8,
        color: '#555',
    },
    featureText: {
        fontSize: 16,
        color: '#555',
        flexShrink: 1, // Allows text to wrap within the available space
    },
    buttonContainer: {
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderTopWidth: 1,
        borderTopColor: '#EEE',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 10,
    },
    checkoutButton: {
        backgroundColor: '#0161fd',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkoutButtonDisabled: {
        backgroundColor: '#e9ecef', // Greyed out when disabled
    },
    checkoutButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
    },
});

const styles = StyleSheet.create({})