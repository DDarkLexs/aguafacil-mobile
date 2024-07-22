import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Avatar, Button, Card, Text, TextInput } from 'react-native-paper';

interface Truck {
  name: string;
  type: string;
  capacity: number; // Capacidade do tanque
  distance: string;
  time: string;
  image: string;
}

const TruckCard: React.FC<{ truck: Truck }> = ({ truck }) => (
  <Card style={styles.card}>
    <Card.Title
      title={truck.name}
      subtitle={`${truck.type} | Capacidade: ${truck.capacity}L`}
      left={(props) => <Avatar.Image {...props} source={{ uri: truck.image }} />}
    />
    <Card.Content>
      <Text>{`${truck.distance} (${truck.time})`}</Text>
    </Card.Content>
    <Card.Actions>
  {/*     <Button mode="outlined" onPress={() => console.log('Agendar')}>
        Agendar
      </Button> */}
      <Button mode="contained"  onPress={() => console.log('Chamar Agora')}>
        Chamar Agora
      </Button>
    </Card.Actions>
  </Card>
);

const HomeScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [trucks, setTrucks] = useState<Truck[]>([
    {
      name: 'Caminhão de Água A',
      type: 'Automático',
      capacity: 10000, // Capacidade em litros
      distance: '500m',
      time: '3 mins',
      image: 'https://example.com/caminhao-a.jpg', // URL da imagem do caminhão
    },
    {
      name: 'Caminhão de Água B',
      type: 'Manual',
      capacity: 15000,
      distance: '1km',
      time: '5 mins',
      image: 'https://example.com/caminhao-b.jpg', // URL da imagem do caminhão
    },
    // Adicione mais caminhões aqui
  ]);

  const filteredTrucks = trucks.filter((truck) =>
    truck.name.toLowerCase().includes(searchQuery.toLowerCase())
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
      <Text style={styles.subtitle}>{filteredTrucks.length} caminhões encontrados</Text>
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
