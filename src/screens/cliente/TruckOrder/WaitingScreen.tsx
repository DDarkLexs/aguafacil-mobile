import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Routes} from 'app/constants/enums';
import {useAuth} from 'app/hooks/useAuth';
import {useAppDispatch} from 'app/hooks/useRedux';
import {useAppToast} from 'app/hooks/useToast';
import {setServicoEmCurso} from 'app/store/features/cliente/arquivo';
import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {useSocket} from '../../../hooks/useSocket';

const WaitingScreen: React.FC<
  NativeStackScreenProps<StackScreen, Routes.CLIENT_WAITING_ORDER>
> = ({navigation, route}): React.JSX.Element => {
  const scaleAnim = useRef(new Animated.Value(1)).current; // Escala inicial da animação
  const {socket, connectSocket, disconnectSocket, turnOnConnection} =
    useSocket();
  const dispatch = useAppDispatch();
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
      connectSocket(Number(route.params.id), String(token));
    }

    if (socket && !socket.isConnected) {
      turnOnConnection();
    }
  }, []);

  useEffect(() => {
    if (socket && socket.isConnected) {
      socket.socket?.on(
        'motoristaAceitaSolicitacao',
        (data: IMotoristaAceitaSolicitacaoResponse) => {
          showPrimaryToast({
            text1: 'Solicitação aceita',
            text2: 'Sua solicitação foi aceita pelo motorista',
            img: require('../../../assets/images/checked.png'),
          });
          dispatch(setServicoEmCurso(data));
          // console.log(data);
          navigation.navigate(Routes.CLIENT_SERVICE_CONFIRMED);
        },
      );
      socket.socket?.on('motoristaRecusaSolicitacao', (data: any) => {
        showPrimaryToast({
          text1: 'Solicitação recusada',
          text2: 'Sua solicitação foi recusada',
          img: require('../../../assets/images/checked.png'),
        });
        disconnectSocket();
        navigation.navigate(Routes.CLIENT_HOME);
      });
    }

    return () => {
      // Unsubscribe from socket events when the component unmounts
      if (socket) {
        socket.socket?.off('motoristaAceitaSolicitacao');
        socket.socket?.off('motoristaRecusaSolicitacao');
      }
    };
  }, [socket, socket.isConnected]);

  useEffect(() => {
    // Configuração da animação
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1000,
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
