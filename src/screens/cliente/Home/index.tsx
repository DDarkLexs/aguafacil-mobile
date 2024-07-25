// src/navigation/ProfileNavigator.tsx
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import Home from './Home';
import {Routes} from 'app/constants/enums';

const Stack = createStackNavigator<StackScreen>();

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName={Routes.CLIENT_SERVICE_AVAILABLE}>
      <Stack.Screen
        name={Routes.CLIENT_SERVICE_AVAILABLE}
        component={Home}
        options={{title: 'Principal'}}
      />
      {/*       <Stack.Screen
        name={Routes.CLIENT_EDIT_USER}
        component={EditProfileScreen}
        options={{title: 'Alterar Perfil'}}
      /> */}
      {/*
      <Stack.Screen name={Routes} component={ViewProfileScreen} options={{ title: 'Ver Perfil' }} />
      <Stack.Screen name={Routes} component={EditProfileScreen} options={{ title: 'Editar Perfil' }} /> */}
    </Stack.Navigator>
  );
};

export default HomeStack;
