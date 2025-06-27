import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';


import { withLayoutContext } from 'expo-router';
import {
  createNativeBottomTabNavigator,
  NativeBottomTabNavigationOptions,
  NativeBottomTabNavigationEventMap,
} from '@bottom-tabs/react-navigation';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';

const BottomTabNavigator = createNativeBottomTabNavigator().Navigator;

const Tabs = withLayoutContext<
  NativeBottomTabNavigationOptions,
  typeof BottomTabNavigator,
  TabNavigationState<ParamListBase>,
  NativeBottomTabNavigationEventMap
>(BottomTabNavigator);


import { AppOpenAd, InterstitialAd, RewardedAd, BannerAd, TestIds, BannerAdSize } from 'react-native-google-mobile-ads';
import { SafeAreaView } from 'react-native-safe-area-context';
import Constants from 'expo-constants'
import { View } from 'react-native';




// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {

  return (
    <>
      {/* <View style={{ paddingTop: Constants.statusBarHeight, backgroundColor: '#fff' }}>

        <BannerAd
          unitId={TestIds.BANNER}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
            networkExtras: {
              collapsible: "top",
            }
          }}
        >
        </BannerAd>

      </View> */}
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Tab One',
            tabBarIcon: () => ({ sfSymbol: "house" }),
          }}
        />
        <Tabs.Screen
          name="two"
          options={{
            title: 'Add',
            tabBarIcon: () => ({ sfSymbol: "plus" }),
          }}
        />
        <Tabs.Screen
          name="three"
          options={{
            title: 'Profile',
            tabBarIcon: () => ({ sfSymbol: "flag" }),
          }}
        />
        <Tabs.Screen
          name="pricing"
          options={{
            title: 'Pricing',
            tabBarIcon: () => ({ sfSymbol: "creditcard" }),
          }}
        />
      </Tabs>
    </>
  );
}
