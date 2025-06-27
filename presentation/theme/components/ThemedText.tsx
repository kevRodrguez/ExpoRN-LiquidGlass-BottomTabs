import { Text, TextProps, TextStyle } from 'react-native';
import { useTheme } from '../hooks/useTheme';

interface ThemedTextProps extends TextProps {
  type?: 'default' | 'title' | 'subtitle';
}

export const ThemedText = ({ style, type = 'default', ...props }: ThemedTextProps) => {
  const { colors } = useTheme();

  const getTextStyle = (): TextStyle => {
    switch (type) {
      case 'title':
        return { fontSize: 24, fontWeight: '700', color: colors.text };
      case 'subtitle':
        return { fontSize: 18, fontWeight: '400', color: colors.text };
      default:
        return { color: colors.text };
    }
  };

  return <Text style={[getTextStyle(), style]} {...props} />;
};
