import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {ShopStack} from './ShopStack';
import {CartScreen} from '@screens/CartScreen';
import {MeScreen} from '@screens/MeScreen';

export type MainTabParamList = {
  Shop: undefined;
  Cart: undefined;
  Me: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Shop"
        component={ShopStack}
        options={{title: 'Shop', headerShown: false}}
      />

      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{title: 'Giỏ'}}
      />

      <Tab.Screen
        name="Me"
        component={MeScreen}
        options={{title: 'Tôi'}}
      />
    </Tab.Navigator>
  );
};