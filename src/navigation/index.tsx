import {DarkTheme, DefaultTheme} from '@react-navigation/native';
import {useAppDispatch} from 'app/hooks/useRedux';
import React, {useEffect} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {NavigationContainer, useTheme} from '../modules/index';
// import {setRoutePath} from '../store/features/app';
import {useAuth} from 'app/hooks/useAuth';
import AuthStack from 'app/navigation/stack/authstack';
import ClientNavigator from 'app/navigation/stack/clientStack';
import {dark, light} from 'app/styles/Theme';
// import MainStack from './Stack/MainStack';

const AppNavigator: React.FC<any> = (): React.JSX.Element => {
  //   const isAuthenticated = useAppSelector(state => state.auth.token);
  const theme = useTheme();
  const isDark = useColorScheme() == 'dark';
  const navigationTheme: any = theme.dark ? dark : light;
  const dispatch = useAppDispatch();
  const {cliente, motorista, token, logOutAccount} = useAuth();
  const scheme = useColorScheme();

  return (
    <>
      <StatusBar
        backgroundColor={theme.colors.background}
        barStyle={isDark ? 'light-content' : 'dark-content'}
        animated={true}
      />
      <NavigationContainer
        theme={navigationTheme}
        // onStateChange={state => {
        //   if (state?.routes[state?.index].state) {
        //     const state2 = state?.routes[state?.index].state;

        //     const route1 = state2?.routes[Number(state2?.index)].name;
        //     dispatch(setRoutePath(String(route1)));
        //   }
        // }}

        // theme={navigationTheme}
      >
        {!token ? <AuthStack /> : cliente ? <ClientNavigator /> : null}
      </NavigationContainer>
    </>
  );
};

export default AppNavigator;
