// src/navigation/ProfileNavigator.tsx
import {createStackNavigator} from '@react-navigation/stack';
import HomeBottomTabStack from 'app/screens/cliente/Home/Main';
import * as React from 'react';
import TruckOrderStack from '../../screens/cliente/TruckOrder';
import { Routes } from 'app/constants/enums';

const Stack = createStackNavigator<StackScreen>();

const ClientStack = () => (
  <Stack.Navigator
    screenOptions={{headerShown: false}}
    initialRouteName={Routes.CLIENT_TAB_BOTTOM_HOME}>
    <Stack.Screen name={Routes.CLIENT_TAB_BOTTOM_HOME} component={HomeBottomTabStack} />
    <Stack.Screen
      name={Routes.CLIENT_TRUCK_ORDER}
      component={TruckOrderStack}
    />
  </Stack.Navigator>
);

export default ClientStack;
