// src/navigation/ProfileNavigator.tsx
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import HomeBottomTab from 'app/screens/cliente/Home/main';
import TruckOrderStack from 'app/screens/cliente/TruckOrder';

const Stack = createStackNavigator<StackScreen>();

const ClientStack = () => {
  return (
    <Stack.Navigator 
    screenOptions={{headerShown: false}}
    initialRouteName={Routes.CLIENT_HOME}>
      <Stack.Screen name={Routes.CLIENT_HOME} component={HomeBottomTab} />
      <Stack.Screen name={Routes.CLIENT_TRUCK_ORDER} component={TruckOrderStack} />

    </Stack.Navigator>
  );
};

export default ClientStack;
