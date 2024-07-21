import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreen from 'app/screens/cliente/Home';
import { Routes } from 'app/constants/enums';
import { Icon, useTheme } from 'react-native-paper';
import ProfileScreen from 'app/screens/cliente/Profile';


const Tab = createMaterialBottomTabNavigator<StackScreen>();

const BottomTabsCliente: React.FC = () => {
  const theme = useTheme();
  return (
    <Tab.Navigator
      initialRouteName={Routes.HOME}
      shifting={true}
      barStyle={{
        backgroundColor: theme.colors.surfaceVariant,
      }}
      activeColor={theme.colors.onBackground}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName: string;

          switch (route.name) {
            case Routes.HOME:
              iconName = 'home';
              break;
            case Routes.EDIT_USER:
              iconName = 'account';
              break;
            default:
              iconName = 'circle';
              break;
          }

          return <Icon  source={iconName} size={24} color={theme.colors.background} />;
        },
        tabBarColor: theme.colors.background,
      })}
      sceneAnimationEnabled={false}
    >
      <Tab.Screen
        name={Routes.HOME}
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name={Routes.EDIT_USER}
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Perfil',
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabsCliente;