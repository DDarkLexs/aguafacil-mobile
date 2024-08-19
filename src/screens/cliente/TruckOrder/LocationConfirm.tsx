import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Routes} from 'app/constants/enums';
import { useAppSelector } from 'app/hooks/useRedux';
import {useSocket} from 'app/hooks/useSocket';
import {useAppToast} from 'app/hooks/useToast';
import Layout from 'app/styles/Layout';
import { convertToCurrency } from 'app/utils';
import React, {useEffect} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {
  Avatar,
  Button,
  Card,
  Divider,
  Paragraph,
  Text,
} from 'react-native-paper';

const LocationConfirmScreen: React.FC<
  NativeStackScreenProps<StackScreen, Routes.CLIENT_SERVICE_CONFIRMED>
> = ({navigation, route}): React.JSX.Element => {
  const {showPrimaryToast} = useAppToast();
  const utilizador = useAppSelector(state => state.clientArquivo.servicoEmcurso?.utilizador);
  const servico = useAppSelector(state => state.clientArquivo.servicoEmcurso?.solicitacao);
  const {socket, connectSocket, disconnectSocket, turnOnConnection} =
    useSocket();
  useEffect(() => {
    if (socket && socket.isConnected) {
      socket.socket?.on(
        'motoristaTerminaSolicitacao',
        (data: any) => {
          showPrimaryToast({
            text1: 'Solicitação concluída',
            text2: 'Sua solicitação foi concluída',
            img: require('../../../assets/images/checked.png'),
          });
          disconnectSocket()
          navigation.navigate(Routes.CLIENT_HOME);
        },
      );
    
 
    }

    return () => {
      // Unsubscribe from socket events when the component unmounts
      if (socket) {
        desligarEventos()
      }
    };
  }, [socket, socket.isConnected]);

  const desligarEventos = () => {
    try {
      if (socket.socket && socket.isConnected) {
        socket.socket.off('motoristaTerminaSolicitacao');
        socket.socket.off('motoristaAceitaSolicitacao');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cancelOrder = () => {
    try {
      Alert.alert(
        'Cancelar Solicitação',
        'Tem a certeza que deseja cancelar a solicitação?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Confirmar',
            onPress: () => {
              if (socket.socket && socket.isConnected) {
                socket.socket.emit('clienteCancelaSolicitacao')
                desligarEventos()
                disconnectSocket();
                showPrimaryToast({
                  text1: 'Solicitação cancelada',
                  text2: 'Sua solicitação foi cancelada com sucesso',
                  img: require('../../../assets/images/checked.png'),
                });
                navigation.navigate(Routes.CLIENT_HOME);
              }
            },
          },
        ],
      )
      // if (socket.socket && socket.isConnected) {
      //   socket.socket.emit('clienteCancelaSolicitacao')
      //   // desligarEventos()
      //   // disconnectSocket();
      //   // navigation.navigate(Routes.CLIENT_HOME);
      // }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Texto no topo */}
      <Text style={styles.headerText}>Seu caminhão de água chega em 10:20</Text>

      {/* Card com informações do motorista */}
      <Card style={styles.card}>
        <Card.Title
          title={utilizador?.nome}
          left={() => (
            <Avatar.Image
              size={48}
              source={{uri: utilizador?.motorista.fotoPerfil}}
            />
          )}
          subtitle="800m"
          subtitleStyle={styles.subtitle}
        />
        <Card.Content>
          <Paragraph style={styles.rating}>⭐⭐⭐⭐⭐</Paragraph>
        </Card.Content>
      </Card>

      {/* Separador com método de pagamento e valor */}
      <Divider style={styles.divider} />
      <View style={styles.paymentContainer}>
        <Text style={styles.paymentText}>Método de pagamento</Text>
        <Text style={styles.valueText}>{convertToCurrency(Number(servico?.preco))}</Text>
      </View>

      {/* Botões de ação */}
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          style={[{...styles.button, borderRadius: Layout.radius}]}>
          Chamar
        </Button>
        <Button
          mode="contained"
          style={[{...styles.button, borderRadius: Layout.radius}]}>
          Mensagem
        </Button>
      </View>

      {/* Botão de cancelar */}
      <Button mode="text" 
      onPress={cancelOrder}
      style={[{...styles.cancelButton, borderRadius: Layout.radius}]}>
        Cancelar
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    marginBottom: 16,
  },
  subtitle: {
    color: 'grey',
  },
  rating: {
    fontSize: 16,
    marginTop: 8,
  },
  divider: {
    marginVertical: 16,
  },
  paymentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  paymentText: {
    fontSize: 16,
  },
  valueText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
  cancelButton: {
    // alignSelf: 'center',
  },
});

export default LocationConfirmScreen;
