// src/navigation/ProfileNavigator.tsx
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {createStackNavigator} from '@react-navigation/stack';
import {Routes} from 'app/constants/enums';
import * as React from 'react';
import LocationConfirmScreen from './LocationConfirm';
import MetodoPagamentoScreen from './MetodoPagamento';
import WaitingScreen from './WaitingScreen';

const Stack = createStackNavigator<StackScreen>();

const TruckOrderStack: React.FC<
  NativeStackScreenProps<StackScreen, Routes.CLIENT_TRUCK_ORDER>
> = ({navigation, route}): React.JSX.Element => {
  return (
    <Stack.Navigator initialRouteName={Routes.CLIENT_PAYMENT_METHOD}>
      <Stack.Screen
        name={Routes.CLIENT_PAYMENT_METHOD}
        component={MetodoPagamentoScreen}
        initialParams={route.params}
        options={{title: 'Método de Pagamento'}}
      />
      <Stack.Screen
        name={Routes.CLIENT_WAITING_ORDER}
        component={WaitingScreen}
        options={{title: 'Aguardando motorista'}}
      />
      <Stack.Screen
        name={Routes.CLIENT_SERVICE_CONFIRMED}
        component={LocationConfirmScreen}
        options={{title: 'Motorista à caminho'}}
      />
    </Stack.Navigator>
  );
};

export default TruckOrderStack;
