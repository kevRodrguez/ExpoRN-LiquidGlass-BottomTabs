import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, SafeAreaView } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
    Easing,
    withDelay,
} from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons'; // Assuming usage of expo icons
import { router } from 'expo-router';

// A custom component for the animated icon
const AnimatedIcon = Animated.createAnimatedComponent(Feather);

const PaymentSuccessScreen = ({ navigation }: any) => {
    // Shared values for animations
    const scaleValue = useSharedValue(0);
    const iconScaleValue = useSharedValue(0);
    const textOpacity = useSharedValue(0);
    const textTranslateY = useSharedValue(30);
    const buttonOpacity = useSharedValue(0);

    useEffect(() => {
        // Animate the main circle scale
        scaleValue.value = withSpring(1, { damping: 15, stiffness: 100 });

        // Animate the check icon scale with a slight delay
        iconScaleValue.value = withDelay(200, withSpring(1, { damping: 12, stiffness: 120 }));

        // Animate the text opacity and position
        textOpacity.value = withDelay(500, withTiming(1, { duration: 500 }));
        textTranslateY.value = withDelay(500, withTiming(0, { duration: 400, easing: Easing.out(Easing.ease) }));

        // Animate the button opacity
        buttonOpacity.value = withDelay(900, withTiming(1, { duration: 500 }));
    }, []);

    // Animated style for the main circle container
    const animatedContainerStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scaleValue.value }],
        };
    });

    // Animated style for the check icon
    const animatedIconStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: iconScaleValue.value }],
        };
    });

    // Animated style for the text blocks
    const animatedTextStyle = useAnimatedStyle(() => {
        return {
            opacity: textOpacity.value,
            transform: [{ translateY: textTranslateY.value }],
        };
    });

    // Animated style for the button
    const animatedButtonStyle = useAnimatedStyle(() => {
        return {
            opacity: buttonOpacity.value,
        };
    });

    const handleDonePress = () => {
        // Navigate back to the home screen or another appropriate screen
        router.push('/'); // Adjust the path as needed
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#F0FFF4" />
            <View style={styles.container}>
                <Animated.View style={[styles.iconContainer, animatedContainerStyle]}>
                    <AnimatedIcon
                        name="check"
                        size={80}
                        color="#228B22"
                        style={animatedIconStyle}
                    />
                </Animated.View>

                <Animated.View style={[styles.textContainer, animatedTextStyle]}>
                    <Text style={styles.title}>Payment Successful!</Text>
                    <Text style={styles.subtitle}>
                        Your order has been confirmed. You will receive a confirmation email shortly.
                    </Text>
                </Animated.View>

                <Animated.View style={[styles.buttonWrapper, animatedButtonStyle]}>
                    <TouchableOpacity style={styles.button} onPress={handleDonePress}>
                        <Text style={styles.buttonText}>Continue</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F0FFF4', // A very light mint green
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    iconContainer: {
        width: 160,
        height: 160,
        borderRadius: 80,
        backgroundColor: '#C1F0C1', // A light green
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 8,
    },
    textContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#2F4F4F', // Dark Slate Gray
        marginBottom: 16,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 18,
        color: '#556B2F', // Dark Olive Green
        textAlign: 'center',
        maxWidth: '85%',
    },
    buttonWrapper: {
        position: 'absolute',
        bottom: 50,
        width: '100%',
        paddingHorizontal: 20,
    },
    button: {
        backgroundColor: '#228B22', // Forest Green
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
    },
});

export default PaymentSuccessScreen;