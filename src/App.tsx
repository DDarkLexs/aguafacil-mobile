/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, useColorScheme} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {dark, light} from 'app/styles/Theme';
import {PaperProvider, StoreProvider} from 'app/modules/index';
// import AppNavigator from './src/navigation';
import {store} from 'app/store/store';
import 'react-native-gesture-handler';
import AppNavigator from './navigation';
// import AppNavigator from './navigation';
// import Toast from 'react-native-toast-message';
// import { toastConfig } from './src/components/layout/Toast/CustomToast';

function App(): JSX.Element {
  const theme = useColorScheme() == 'light' ? light : dark;
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <StoreProvider store={store}>
        <PaperProvider theme={theme}>
          <SafeAreaView style={{flex: 1}}>
            <AppNavigator />
            {/* <Toast config={toastConfig} /> */}
          </SafeAreaView>
        </PaperProvider>
      </StoreProvider>
    </GestureHandlerRootView>
  );
}

export default App;
