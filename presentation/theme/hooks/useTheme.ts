import { Colors } from '@/constants/Colors';
import { useColorScheme } from 'react-native';

export const useTheme = () => {
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];

    return {
        colorScheme,
        colors: {
            text: theme.text,
            background: theme.background,
            tint: theme.tint,
            icon: theme.icon,
            primary: theme.primary,
            tabIconDefault: theme.tabIconDefault,
            tabIconSelected: theme.tabIconSelected,
            greenChip: theme.greenChip,
            redChip: theme.redChip,
            blueChip: theme.blueChip,
            yellowChip: theme.yellowChip,
            orangeChip: theme.orangeChip
        },
        isDark: colorScheme === 'dark',
    };
}; 