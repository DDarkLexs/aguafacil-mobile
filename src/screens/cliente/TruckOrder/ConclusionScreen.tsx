// src/screens/cliente/TruckOrder/ConclusionScreen.tsx

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const ConclusionScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Thank you for placing your order!</Text>
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
