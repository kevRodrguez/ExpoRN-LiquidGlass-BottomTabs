import React from 'react';
import { StyleSheet, View, Platform, ViewStyle, Pressable, useColorScheme } from 'react-native';
import { ThemedText } from './ThemedText';
import { Image } from 'expo-image';
import Constants from 'expo-constants';
import { useTheme } from '../hooks/useTheme';
import { BlurView } from 'expo-blur';

import { router } from 'expo-router';

const PlaceholderImage = require('@/assets/images/user_default.jpg');

interface HeaderBarProps {
  userImage: string | number;
  userName?: string;
  isBusito?: boolean;
}

const HeaderBar = ({ userImage, userName, isBusito = false}: HeaderBarProps) => {
  const { colors } = useTheme();
  const colorScheme = useColorScheme();

  const renderHeader = () => {
    const containerStyle: ViewStyle[] = [styles.blurContainer];

    if (Platform.OS === 'android') {
      containerStyle.push({ backgroundColor: colors.background });
    }

    const content = (
      <View style={[styles.container, { marginTop: Constants.statusBarHeight }]}>

        <ThemedText
          style={
            {
              fontSize: 18,
              fontWeight: 'bold',
              color: colors.text,
              marginRight: 10
            }
          }
        >
          {userName}
        </ThemedText>

        <Pressable

          onPress={
            () => {
              if (!isBusito) {
                router.push('/profile');
              }
            }}
        >
          <Image
            source={userImage || PlaceholderImage}
            style={styles.avatar}
            contentFit="cover"
            transition={1000}
          />
        </Pressable>

      </View>
    );

    if (Platform.OS === 'ios') {
      return (
        <BlurView
          intensity={20}
          tint={colorScheme === 'dark' ? 'systemMaterialDark' : 'systemMaterialLight'}
          style={containerStyle}>
          {content}
        </BlurView>
      );
    }

    return (
      <View style={containerStyle}>
        {content}
      </View>
    );
  };

  return renderHeader();
};

const styles = StyleSheet.create({
  blurContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 99,
  },
});

export default HeaderBar;