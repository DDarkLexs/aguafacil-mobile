import * as React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Text, Appbar, Card, Button } from 'react-native-paper';

type Order = {
  id: string;
  driverName: string;
  date: string;
  status: string;
};

const orders: Order[] = [
  { id: '1', driverName: 'Carlos Silva', date: '2024-07-20', status: 'Delivered' },
  { id: '2', driverName: 'Ana Oliveira', date: '2024-07-19', status: 'Pending' },
  { id: '3', driverName: 'Pedro Souza', date: '2024-07-18', status: 'Cancelled' },
  // Adicione mais pedidos conforme necessário
];

const HistoricoScreen: React.FC = () => {
  const renderItem = ({ item }: { item: Order }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.title}>Pedido #{item.id}</Text>
        <Text>Motorista: {item.driverName}</Text>
        <Text>Data: {item.date}</Text>
        <Text>Status: {item.status}</Text>
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => console.log(`Ver detalhes do pedido ${item.id}`)}>Ver Detalhes</Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Histórico de Pedidos" />
      </Appbar.Header>
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HistoricoScreen;
