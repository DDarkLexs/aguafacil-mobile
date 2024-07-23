import { useAppToast } from 'app/hooks/useToast';
import { useServicoAvaliableQuery } from 'app/store/api/cliente/servico';
import Layout from 'app/styles/Layout';
import { convertToCurrency } from 'app/utils';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Avatar, Button, Card, Text, TextInput} from 'react-native-paper';


const TruckCard: React.FC<{ truck: IServicoAvaliable }> = ({ truck }) => (
  <Card style={styles.card}>
    <Card.Title
      title={truck.motorista.Usuario.nome}
      subtitle={`${convertToCurrency(truck.preco)} | Capacidade: ${truck.litroAgua}L`}
      left={(props) => <Avatar.Image {...props} source={{ uri: truck.motorista.fotoPerfil }} />}
    />
    <Card.Content>
      <Text>{truck.descricao}</Text>
    </Card.Content>
    <Card.Actions>
      <Button mode="contained" style={{ borderRadius: Layout.radius }} onPress={() => console.log('Chamar Agora')}>
        Chamar Agora
      </Button>
    </Card.Actions>
  </Card>
);

const HomeScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const apiResponde = useServicoAvaliableQuery();
  const { showErrorToast } = useAppToast()
  useEffect(() => {
    if (apiResponde.isSuccess) {
      
      setTrucks(apiResponde.data)
    }
    if (apiResponde.isError) {
      showErrorToast({
          text1:"Ocorreu um erro ao processar sua solicitação.",
          text2: JSON.stringify(apiResponde.error)
      })
      
    }
  
  }, [apiResponde])
  
  const [trucks, setTrucks] = useState<IServicoAvaliable[]>([]);

  const filteredTrucks = trucks.filter(truck =>
    truck.motorista.Usuario.nome.toLowerCase().includes(searchQuery.toLowerCase()),
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
