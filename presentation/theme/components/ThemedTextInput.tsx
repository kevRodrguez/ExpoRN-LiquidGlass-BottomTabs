import { View, StyleSheet, ViewStyle } from 'react-native';
import React, { useRef, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from '../hooks/useThemeColor';
import { useTheme } from '../hooks/useTheme';
import { Input, InputProps } from '@rneui/themed';

type IconName = keyof typeof Ionicons.glyphMap;

interface Props extends Omit<InputProps, 'rightIcon'> {
    icon?: IconName;
    rightIcon?: IconName;
    onRightIconPress?: () => void;
}

interface StyleProps extends ViewStyle {
    style?: ViewStyle;
}

const ThemedTextInput = ({ icon, rightIcon, onRightIconPress, style, ...rest }: Props & { style?: StyleProps }) => {

    const [isActive, setIsActive] = useState(false);
    const inputRef = useRef<any>(null);

    const { colors } = useTheme();
    const theme = useTheme();
    return (
        <View
            style={[
                {
                    borderColor: isActive ? colors.primary : '#ccc',
                },
                style,
            ]}
        >
            <Input
                labelStyle={{
                    color: theme.isDark ? colors.text : colors.primary,
                    fontSize: 16,
                    fontWeight: '600',
                }}
                ref={inputRef}
                leftIcon={
                    icon ? {
                        type: 'ionicon',
                        name: icon,
                        color: isActive ? colors.primary : '#ccc',
                    } : undefined
                }
                rightIcon={
                    rightIcon ? {
                        type: 'ionicon',
                        name: rightIcon,
                        color: isActive ? colors.primary : '#ccc',
                        onPress: onRightIconPress,
                    } : undefined
                }
                onFocus={() => setIsActive(true)}
                onBlur={() => setIsActive(false)}
                inputStyle={{
                    color: colors.text,
                    fontSize: 16,
                }}
                placeholderTextColor={isActive ? colors.primary : 'grey'}
                {...rest}
            />
        </View>
    );
};

export default ThemedTextInput;
