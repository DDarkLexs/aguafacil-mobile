// src/screens/cliente/TruckOrder/ConclusionScreen.tsx

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Routes} from 'app/constants/enums';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

import {Button, Text} from 'react-native-paper';

const ConclusionScreen: React.FC<
  NativeStackScreenProps<StackScreen, Routes.CLIENT_FINISHED_ORDER>
> = ({navigation, route}): React.JSX.Element => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/checked.png')}
        style={styles.image}
      />
      <Text style={styles.text}>Solicitação concluída!</Text>
      <Text style={styles.value}>Valor a pagar</Text>
      <Text style={styles.payment}>20 000,00 kz</Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate(Routes.CLIENT_HOME)}>
        Voltar para menu principal
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
  image: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  value: {
    fontSize: 20,
    marginBottom: 20,
  },
  payment: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default ConclusionScreen;
