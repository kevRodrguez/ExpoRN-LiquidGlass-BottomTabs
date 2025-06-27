import { View, Text, PressableProps, Pressable, StyleProp, ViewStyle, TextStyle, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from './ThemedText';
import { StyleSheet } from 'react-native';
import { useThemeColor } from '../hooks/useThemeColor';
import { Image } from 'expo-image';

interface Props extends PressableProps {
    icon?: keyof typeof Ionicons.glyphMap;
    iconColor?: string;
    logoImage?: string;
    children?: string;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    onPress?: () => Promise<void> | void;
}

const ThemedButton = ({ children, icon, style, textStyle, logoImage, iconColor, onPress, ...rest }: Props) => {
    const primaryColor = useThemeColor({}, 'primary')
    const [isLoading, setIsLoading] = useState(false);

    const handlePress = async () => {
        if (!onPress) return;
        try {
            setIsLoading(true);
            await onPress();
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Pressable
            style={[styles.button, style]}

            className='active:opacity-20 dark:bg-[#3D64F4] bg-[#3d65f444]'
            disabled={isLoading}
            onPress={handlePress}
            {...rest}
        >
            {isLoading ? (
                <ActivityIndicator size="small" color="white" />
            ) : (
                <>
                    {logoImage && (
                        <Image
                            source={logoImage}
                            style={{
                                width: 25,
                                height: 25,

                            }}
                        />
                    )}

                    {icon && (
                        <Ionicons
                            name={icon}
                            size={24}
                            color={iconColor || primaryColor}
                            style={{ marginHorizontal: 10 }}
                        />
                    )}
                    <ThemedText
                        style={[
                            {
                                color: 'white',
                            },
                            textStyle
                        ]}
                    >
                        {children}
                    </ThemedText>
                </>
            )}
        </Pressable>
    )
}

export default ThemedButton

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,

    }

})