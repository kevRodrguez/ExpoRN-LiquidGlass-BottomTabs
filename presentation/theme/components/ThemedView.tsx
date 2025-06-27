import { View, ViewProps } from 'react-native';
import { useTheme } from '../hooks/useTheme';

interface ThemedViewProps extends ViewProps {
    type?: 'default' | 'card';
}

export const ThemedView = ({ style, type = 'default', ...props }: ThemedViewProps) => {
    const { colors } = useTheme();

    const getViewStyle = () => {
        switch (type) {
            case 'card':
                return {
                    backgroundColor: colors.background,
                    borderRadius: 8,
                    padding: 16,
                    shadowColor: colors.text,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 3,
                };
            default:
                return { backgroundColor: colors.background };
        }
    };

    return <View style={[getViewStyle(), style]} {...props} />;
}; 