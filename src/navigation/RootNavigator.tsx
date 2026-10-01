import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {useAuthStore} from '@stores/authStore';
import {AuthStack} from './AuthStack';
import {MainTabs} from './MainTabs';

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export const RootNavigator = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};