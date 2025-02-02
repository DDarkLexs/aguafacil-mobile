// src/navigation/ProfileNavigator.tsx
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import ProfileScreen from './Profile';
import EditProfileScreen from './Edit';
import {Routes} from 'app/constants/enums';

const Stack = createStackNavigator<StackScreen>();

const ProfileNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Routes.CLIENT_VIEW_USER}
        component={ProfileScreen}
        options={{title: 'Perfil'}}
      />
      <Stack.Screen
        name={Routes.CLIENT_EDIT_USER}
        component={EditProfileScreen}
        options={{title: 'Alterar Perfil'}}
      />
      {/*
      <Stack.Screen name={Routes} component={ViewProfileScreen} options={{ title: 'Ver Perfil' }} />
      <Stack.Screen name={Routes} component={EditProfileScreen} options={{ title: 'Editar Perfil' }} /> */}
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
