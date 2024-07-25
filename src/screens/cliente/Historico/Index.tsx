// src/navigation/ProfileNavigator.tsx
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import Historico from './Historico';
import OneHistorico from './Visualizar';
import { Routes } from 'app/constants/enums';

const Stack = createStackNavigator<StackScreen>();

const HistoricoStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Routes.HISTORIC_CLIENT}
        component={Historico}
        options={{title: 'Histórico'}}
      />
      <Stack.Screen
        name={Routes.HISTORIC_CLIENT_SINGLE}
        component={OneHistorico}
        options={{title: 'Visualizar Histórico'}}
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

export default HistoricoStack;
