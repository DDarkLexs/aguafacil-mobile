// src/screens/cliente/TruckOrder/ConclusionScreen.tsx

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Routes} from 'app/constants/enums';
import Layout from 'app/styles/Layout';
import { convertToCurrency } from 'app/utils';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-paper';

const ConclusionScreen: React.FC<
  NativeStackScreenProps<StackScreen, Routes.CLIENT_FINISHED_ORDER>
> = ({navigation, route}): React.JSX.Element => {
  return (
    <View style={styles.container}>
      <View
        style={{
          width: 150,
          height: 150,
          borderRadius: 100,
          backgroundColor: '#ccc',
          justifyContent: 'center',
          alignItems: 'center',
          bottom: 20,
        }}>
        <Image
          style={{width: 100, height: 100}}
          source={require('app/assets/images/icon.png')}
        />
      </View>
      <Text style={styles.text}>Valor a pagar</Text>
      <Text style={{fontSize: 50, fontWeight: 'normal'}}>{convertToCurrency(route.params.valor)}</Text>
      <Button
        onPress={() => navigation.navigate(Routes.CLIENT_HOME)}
        style={{marginTop: 20, borderRadius: Layout.radius}}
        mode="contained">
        Terminar
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ConclusionScreen;
