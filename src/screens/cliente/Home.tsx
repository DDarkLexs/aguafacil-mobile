import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Card, Text, useTheme} from 'react-native-paper';

// Exemplo de dados para a lista
const DATA = [
  {id: '1', title: 'Item 1', description: 'Descrição do Item 1'},
  {id: '2', title: 'Item 2', description: 'Descrição do Item 2'},
  {id: '3', title: 'Item 3', description: 'Descrição do Item 3'},
];

// Item da lista
const ListItem = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="headlineSmall">{title}</Text>
        <Text>{description}</Text>
      </Card.Content>
    </Card>
  );
};

const HomeScreen: React.FC = () => {
  const theme = useTheme();

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <FlatList
        data={DATA}
        renderItem={({item}) => (
          <ListItem title={item.title} description={item.description} />
        )}
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
});

export default HomeScreen;
