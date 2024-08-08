import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Routes } from 'app/constants/enums';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button, Divider, Text } from 'react-native-paper';
import { Avatar } from 'react-native-paper';

const LocationConfirmScreen: React.FC<
NativeStackScreenProps<StackScreen, Routes.CLIENT_SERVICE_CONFIRMED>
> = ({navigation, route}): React.JSX.Element => {
  return (
    <View style={styles.container}>
      {/* Texto no topo */}
      <Text style={styles.headerText}>Seu caminhão de água chega em 10:20</Text>

      {/* Card com informações do motorista */}
      <Card style={styles.card}>
        <Card.Title
          title="Nome do Motorista"
          left={() => <Avatar.Image size={48} source={{ uri: 'https://via.placeholder.com/48' }} />}
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
        <Text style={styles.valueText}>20.000,00 Kz</Text>
      </View>
      
      {/* Botões de ação */}
      <View style={styles.buttonContainer}>
        <Button mode="contained" style={styles.button}>Chamar</Button>
        <Button mode="contained" style={styles.button}>Mensagem</Button>
      </View>

      {/* Botão de cancelar */}
      <Button mode="text" style={styles.cancelButton}>Cancelar</Button>
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
    alignSelf: 'center',
  },
});

export default LocationConfirmScreen;
