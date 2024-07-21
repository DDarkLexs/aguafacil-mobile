import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Routes} from 'app/constants/enums';
import HomeScreen from 'app/screens/cliente/Home';
import React from 'react';
import {StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';

const Tab = createBottomTabNavigator();

const ClientTabNavigator: React.FC = (): React.JSX.Element => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.secondary,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
        },
        headerShown: false,
      }}>
      <Tab.Screen name={Routes.HOME} component={HomeScreen} />
      {/* <Tab.Screen name={Routes.PROFILE} component={ProfileScreen} /> */}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  appStyle: {
    flex: 1,
    margin: 'auto',
    justifyContent: 'center',
    textAlign: 'center',
    alignContent: 'center',
  },
  text: {
    fontFamily: 'Abel-Regular',
    position: 'absolute',
    alignSelf: 'center',
    fontSize: 25,
  },
});

export default ClientTabNavigator;
