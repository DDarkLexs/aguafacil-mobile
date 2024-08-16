import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {Routes} from 'app/constants/enums';
import HistoricoScreen from 'app/screens/cliente/Home/Historico/Index';
import HomeStack from 'app/screens/cliente/Home/Service_avaliable';
// import HomeScreen from 'app/screens/cliente/Home/Home';
import ProfileNavigator from 'app/screens/cliente/Home/Perfil/Index';
import ProfileScreen from 'app/screens/cliente/Home/Perfil/Profile';
import React from 'react';
import {Icon, useTheme} from 'react-native-paper';

const Tab = createMaterialBottomTabNavigator<StackScreen>();

const HomeBottomTabStack: React.FC = () => {
  const theme = useTheme();
  const MyTheme = {
    dark: false,
    colors: {
      primary: 'rgb(255, 45, 85)',
      background: 'rgb(242, 242, 242)',
      card: 'rgb(255, 255, 255)',
      text: 'rgb(28, 28, 30)',
      border: 'rgb(199, 199, 204)',
      notification: 'rgb(255, 69, 58)',
    },
  };
  return (
    <Tab.Navigator
      initialRouteName={Routes.CLIENT_HOME}
      shifting={true}
      activeColor={theme.colors.primary}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color}) => {
          let iconName: string;

          switch (route.name) {
            case Routes.CLIENT_HOME:
              iconName = 'home';
              break;
            case Routes.CLIENT_EDIT_USER:
              iconName = 'account';
              break;
            default:
              iconName = 'circle';
              break;
          }

          return (
            <Icon source={iconName} size={24} color={theme.colors.background} />
          );
        },
        tabBarColor: theme.colors.background,
      })}
      sceneAnimationEnabled={true}>
      <Tab.Screen
        name={Routes.CLIENT_HOME}
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name={Routes.HISTORIC_STACK_CLIENT}
        component={HistoricoScreen}
        options={{
          tabBarLabel: 'Histórico',
        }}
      />
      <Tab.Screen
        name={Routes.CLIENT_USER_STACK}
        component={ProfileNavigator}
        options={{
          tabBarLabel: 'Perfil',
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeBottomTabStack;
