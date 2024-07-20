import {createStackNavigator, useTheme} from 'app/modules/index';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';

const Stack = createStackNavigator<StackScreen>();

const AuthStack: React.FC = (): React.JSX.Element => {
  const theme = useTheme();

  return (
    <Text style={styles.text}>hello world</Text>
    // <Stack.Navigator initialRouteName={Routes.LOGIN}>
    //   <Stack.Group
    //     // screenOptions={{
    //     //   headerShown: false,
    //     //   contentStyle: {backgroundColor: theme.colors.background},
    //     // }}

    //     >
    //     <Stack.Screen name={Routes.LOGIN} component={LoginScreen} />
    //     {/* <Stack.Screen name={Routes.REGISTER} component={SignupScreen} /> */}
    //   </Stack.Group>
    // </Stack.Navigator>
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
    // alignContent:"center",
    position: 'absolute',
    alignSelf: 'center',

    fontSize: 25,
  },
});

export default AuthStack;
