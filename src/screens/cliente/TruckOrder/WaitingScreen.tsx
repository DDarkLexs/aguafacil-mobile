import {useAuth} from 'app/hooks/useAuth';
import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {useSocket} from '../../../hooks/useSocket';
import { useAppNavigation } from 'app/hooks/useNavigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Routes } from 'app/constants/enums';
import { useAppToast } from 'app/hooks/useToast';

const WaitingScreen: React.FC<
NativeStackScreenProps<StackScreen, Routes.CLIENT_WAITING_ORDER>
> = ({navigation, route}): React.JSX.Element => {
  const scaleAnim = useRef(new Animated.Value(1)).current; // Escala inicial da animação
  const {socket, connectSocket, disconnectSocket, turnOnConnection} =
    useSocket();
    const {showPrimaryToast} = useAppToast();
  const {cliente, token} = useAuth();
  useEffect(() => {
    // if (socket && step <= 4) {
    //   disconnectSocket();
    //   console.log('====================================');
    //   console.log('socket.IO esta desligado!');
    //   console.log('====================================');
    // }

    if (!socket.socket && cliente) {
      // console.log("tentando se conectar ao socket");
      connectSocket(Number(cliente?.cliente.id), String(token));
    }

    if (socket && !socket.isConnected) {
      turnOnConnection();
    }
  }, []);

  useEffect(() => {
    if (socket && socket.isConnected) {
      socket.socket?.on('motoristaAceitaSolicitacao', (solicitacao: IServicoSolicitado) => {
        showPrimaryToast({
          text1: 'Solicitação aceita',
          text2: 'Sua solicitação foi aceita pelo motorista',
          img: require('../../../assets/images/checked.png'),
        })
        navigation.navigate(Routes.CLIENT_SERVICE_CONFIRMED, solicitacao);
      });
    }

    return () => {
      // Unsubscribe from socket events when the component unmounts
      if (socket) {
        socket.socket?.off('motoristaAceitaSolicitacao');
      }
    };
  }, [socket, socket.isConnected]);

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
      <Animated.Text
        style={[styles.waitingText, {transform: [{scale: scaleAnim}]}]}>
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
