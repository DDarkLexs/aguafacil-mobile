import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Routes} from 'app/constants/enums';
import {useAuth} from 'app/hooks/useAuth';
import React from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {Button, Card, List, Text, useTheme} from 'react-native-paper';

const ProfileScreen: React.FC<
  NativeStackScreenProps<StackScreen, Routes.CLIENT_VIEW_USER>
> = ({navigation, route}): React.JSX.Element => {
  const theme = useTheme();
  const {cliente} = useAuth();
  const {logOutAccount} = useAuth();
  const handleLogout = () => {
    logOutAccount();
    // Implementar lógica de logout
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image
          source={{uri: cliente?.cliente.fotoPerfil}} // Substituir pela URL da foto de perfil
          style={styles.profileImage}
        />
        <Text style={styles.name}>{cliente?.usuario.nome}</Text>
        <Text style={styles.phone}>{cliente?.usuario.telefone}</Text>
        <Text style={styles.rating}>5.0 ★</Text>
      </View>
      <Card style={styles.card}>
        <Card.Title title="Roadway Cash" subtitle="Npr. 3,000" />
      </Card>
      <List.Section>
        <List.Item
          title="Alterar Utilizador"
          left={() => <List.Icon icon="account" />}
          onPress={() => navigation.navigate(Routes.CLIENT_EDIT_USER)}
        />
        <List.Item
          title="Definição"
          left={() => <List.Icon icon="cog" />}
          onPress={() => {}}
        />
        <List.Item
          title="Trips details"
          left={() => <List.Icon icon="history" />}
          onPress={() => {}}
        />
      </List.Section>
      <Button
        mode="contained"
        onPress={() => handleLogout()}
        style={[{...styles.button, borderRadius: theme.roundness}]}>
        Terminar sessão
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  name: {
    marginTop: 8,
    fontSize: 24,
    fontWeight: 'bold',
  },
  phone: {
    fontSize: 16,
    color: 'gray',
  },
  rating: {
    marginTop: 4,
    fontSize: 16,
    color: 'green',
  },
  card: {
    marginBottom: 24,
  },
  button: {
    marginTop: 24,
  },
});

export default ProfileScreen;
