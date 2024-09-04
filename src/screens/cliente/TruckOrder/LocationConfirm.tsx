import {NativeStackScreenProps} from '@react-navigation/native-stack';
import DestinationTrip from 'app/components/maps/route';
import {Routes} from 'app/constants/enums';
import {useAppDispatch, useAppSelector} from 'app/hooks/useRedux';
import {useSocket} from 'app/hooks/useSocket';
import {useAppToast} from 'app/hooks/useToast';
import {setMotoristaLocacao} from 'app/store/features/cliente/emCurso';
import Layout from 'app/styles/Layout';
import {
  calculateAndFormatDistance,
  calculateDistanceAndTime,
  convertToCurrency,
  playSound_1,
} from 'app/utils';
import React, {useEffect} from 'react';
import {Alert, Linking, ScrollView, StyleSheet, View} from 'react-native';
import {
  Avatar,
  Button,
  Card,
  Divider,
  Paragraph,
  Text,
  useTheme,
} from 'react-native-paper';

const LocationConfirmScreen: React.FC<
  NativeStackScreenProps<StackScreen, Routes.CLIENT_SERVICE_CONFIRMED>
> = ({navigation, route}): React.JSX.Element => {
  const {showPrimaryToast} = useAppToast();
  const dispatch = useAppDispatch();
  const [distancia, setDistancia] = React.useState<string>('');
  const [tempo, setTempo] = React.useState<string>('');
  const [motoristaGps, setMotoristaGps] = React.useState<
    number[] | null
  >(null);
  const theme = useTheme();
  const {destination, origin} = route.params;
  const utilizador = useAppSelector(
    state => state.clienteEmCurso.data?.utilizador,
  );
  console.log(utilizador)
  const servico = useAppSelector(
    state => state.clienteEmCurso.data?.solicitacao,
  );
  const motoristaLocalizacao = useAppSelector(
    state => state.clienteEmCurso.motoristalocaizacaoEmCurso,
  );
  const {socket, connectSocket, disconnectSocket, turnOnConnection} =
    useSocket();
  useEffect(() => {
    if (socket && socket.isConnected) {
      socket.socket?.on('motoristaTerminaSolicitacao', (data: ISSNotaPagamento) => {
        showPrimaryToast({
          text1: 'Solicitação concluída',
          text2: 'Sua solicitação foi concluída',
          img: require('../../../assets/images/checked.png'),
        });
        disconnectSocket();
        navigation.navigate(Routes.CLIENT_FINISHED_ORDER, data);
      });
      socket.socket?.on(
        'motoristaChegou', (data: any) => {
          showPrimaryToast({
            text1: 'O motorista chegou!',
            text2: "O  motorista chegou no seu destino",
            img: require('app/assets/images/checked.png'),
          });
          playSound_1();
        });
    
      socket.socket?.on(
        'motoristaAtualizaLocalizacao',
        ({data}: IMotoristaUpdatePositionResponse) => {
          dispatch(
            setMotoristaLocacao({
              ...data.address,
              coordinates: `${data.lat},${data.lon}`,
              endereco: data.display_name,
            }),
          );
          const distance = calculateAndFormatDistance(
            {
              latitude: Number(data.lat),
              longitude: Number(data.lon),
            },
            {
              latitude: Number(destination.cordenada.split(',')[0]),
              longitude: Number(destination.cordenada.split(',')[1]),
            },
          );
          const tempoRestante = calculateDistanceAndTime(
            {
              latitude: Number(data.lat),
              longitude: Number(data.lon),
            },
            {
              latitude: Number(destination.cordenada.split(',')[0]),
              longitude: Number(destination.cordenada.split(',')[1]),
            },
            50,
          );
          setTempo(tempoRestante);
          setMotoristaGps([Number(data.lon), Number(data.lat)]);

          setDistancia(distance);
        },
      );
    }

    return () => {
      // Unsubscribe from socket events when the component unmounts
      if (socket) {
        desligarEventos();
      }
    };
  }, [socket, socket.isConnected]);

  const desligarEventos = () => {
    try {
      if (socket.socket && socket.isConnected) {
        socket.socket.off('motoristaTerminaSolicitacao');
        socket.socket.off('motoristaAtualizaLocalizacao');
        socket.socket.off('motoristaAceitaSolicitacao');
        socket.socket.off('motoristaCancelaSolicitacao');
        socket.socket.off('motoristaChegou');
        //  dispatch(setMotoristaLocacao(null));
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
                socket.socket.emit('clienteCancelaSolicitacao');
                desligarEventos();
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
      );
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
      {/* faça aqui o container do mapa */}
      {destination.cordenada && motoristaGps && (
        <DestinationTrip
          destino={[
            Number(destination.cordenada.split(',')[0]),
            Number(destination.cordenada.split(',')[1]),
          ]}
          driverLocation={motoristaGps}
          origem={[Number(origin.lat), Number(origin.lon)]}
        />
      )}

      {/* Texto no topo */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.headerText}>
          Seu caminhão de água chega em {tempo}
        </Text>
        {/* Card com informações do destino e localização do motorista */}
        <Divider style={styles.divider} />
        <Card style={styles.card}>
          <Card.Title
            title={'Localização do destino'}
            subtitle={destination?.endereco}
            left={() => <Avatar.Icon size={48} icon="map-marker-outline" />}
          />
          <Card.Title
            title={'Localização do motorista'}
            subtitle={motoristaLocalizacao?.endereco}
            left={() => (
              <Avatar.Icon
                size={48}
                style={{backgroundColor: theme.colors.secondary}}
                icon="map-marker-outline"
              />
            )}
          />
        </Card>
        {/* Card com informações do motorista */}
        <Divider style={styles.divider} />
        <Card style={styles.card}>
          <Card.Title
            title={utilizador?.nome}
            left={() => (
              <Avatar.Image
                size={48}
                source={{uri: servico?.motorista.fotoPerfil}}
              />
            )}
            subtitle={`Distância: ${distancia}`}
            subtitleStyle={styles.subtitle}
          />
          <Card.Content>
            <Paragraph style={styles.rating}>⭐⭐⭐⭐⭐</Paragraph>
          </Card.Content>
        </Card>

        {/* Separador com método de pagamento e valor */}
        <Divider style={styles.divider} />
        <View style={styles.paymentContainer}>
          <Text style={styles.paymentText}>Valor a pagar</Text>
          <Text style={styles.valueText}>
            {convertToCurrency(Number(servico?.preco))}
          </Text>
        </View>

        {/* Botões de ação */}
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => Linking.openURL(`tel: +244 ${utilizador?.telefone}`)}
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
        <Button
          mode="text"
          onPress={cancelOrder}
          style={[{...styles.cancelButton, borderRadius: Layout.radius}]}>
          Cancelar
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 16,
  },

  label: {
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
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
