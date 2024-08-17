import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Routes} from 'app/constants/enums';
import {useAppNavigation} from 'app/hooks/useNavigation';
import {useAppToast} from 'app/hooks/useToast';
import {useServicoAvaliableQuery} from 'app/store/api/cliente/servico';
import Layout from 'app/styles/Layout';
import {convertToCurrency} from 'app/utils';
import {getDistance} from 'geolib';
import numeral from 'numeral';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Avatar, Button, Card, Text, TextInput} from 'react-native-paper';

// Componente TruckCard
const TruckCard: React.FC<{truck: IServicoAvaliable}> = ({truck}) => {
  const navigation = useAppNavigation();
  return (
    <Card style={styles.card}>
      <Card.Title
        title={truck.motorista.usuario.nome}
        subtitle={`${convertToCurrency(truck.preco)} | Capacidade: ${
          truck.litroAgua
        }L`}
        left={props => (
          <Avatar.Image {...props} source={{uri: truck.motorista.fotoPerfil}} />
        )}
      />
      <Card.Content>
        <Text>{truck.descricao}</Text>
      </Card.Content>
      <Card.Actions>
        <Button
          mode="contained"
          style={{borderRadius: Layout.radius}}
          onPress={() =>
            navigation.navigate(Routes.CLIENT_TRUCK_ORDER, truck)
          }> 
          Chamar Agora
        </Button>
      </Card.Actions>
    </Card>
  );
};

// Componente HomeScreen
const HomeScreen: React.FC<
  NativeStackScreenProps<StackScreen, Routes.CLIENT_SERVICE_AVAILABLE>
> = ({navigation, route}): React.JSX.Element => {
  const [searchQuery, setSearchQuery] = useState('');
  const [trucks, setTrucks] = useState<IServicoAvaliable[]>([]);
  const apiResponse = useServicoAvaliableQuery();
  const {showErrorToast} = useAppToast();

  // Coordenadas de exemplo
  const origin = {latitude: -8.8399876, longitude: 13.2894368}; // Origem (Luanda, por exemplo)
  const destination = {latitude: -9.6899101, longitude: 13.4067913}; // Destino (Benguela, por exemplo)

  const distance = getDistance(origin, destination);

  // Calcular distância em metros usando geolib
  const distanceKm = distance / 1000;

  // Usar numeral para formatar a distância
  const formattedDistance = numeral(distanceKm).format('0,0.00');
  console.log(`Distância: ${formattedDistance} km`);

  // Atualizar lista de caminhões quando a resposta da API mudar
  useEffect(() => {
    if (apiResponse.isSuccess) {
      setTrucks(apiResponse.data);
    }
    if (apiResponse.isError) {
      showErrorToast({
        text1: 'Ocorreu um erro ao processar sua solicitação.',
        text2: JSON.stringify(apiResponse.error),
      });
    }
  }, [apiResponse, showErrorToast]);

  // Filtrar caminhões com base na busca
  const filteredTrucks = trucks.filter(truck =>
    truck.motorista.usuario.nome
      .toLowerCase()
      .includes(searchQuery.toLowerCase()),
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        label="Buscar"
        mode="outlined"
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchInput}
      />
      <Text style={styles.title}>Caminhões Disponíveis</Text>
      <Text style={styles.subtitle}>
        {filteredTrucks.length} caminhões encontrados
      </Text>
      {filteredTrucks.map((truck, index) => (
        <TruckCard key={index} truck={truck} />
      ))}
    </ScrollView>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'grey',
    marginBottom: 16,
  },
  searchInput: {
    marginBottom: 16,
  },
  card: {
    marginBottom: 16,
  },
});

export default HomeScreen;
