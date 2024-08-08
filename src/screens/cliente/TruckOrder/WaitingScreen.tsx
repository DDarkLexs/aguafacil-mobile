import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Text } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import io from 'socket.io-client';

const WaitingScreen = () => {
  const scaleAnim = useRef(new Animated.Value(1)).current; // Escala inicial da animação
  const socket = useRef<any>(null);

  useEffect(() => {
    // Conectar ao servidor via socket.io
    socket.current = io('http://your-server-url'); // Substitua pela URL do seu servidor

    socket.current.on('connect', () => {
      console.log('Conectado ao servidor');
    });

    socket.current.on('driverAccepted', (data: any) => {
      console.log('Motorista aceitou:', data);
      // Aqui você pode navegar para outra tela ou fazer outra ação necessária
    });

    // Limpeza na desmontagem
    return () => {
      socket.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    // Configuração da animação
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [scaleAnim]);

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.waitingText, { transform: [{ scale: scaleAnim }] }]}>
        Esperando o motorista aceitar...
      </Animated.Text>
      <ActivityIndicator size="large" style={styles.indicator} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  waitingText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  indicator: {
    marginTop: 20,
  },
});

export default WaitingScreen;
