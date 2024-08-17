import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Routes} from 'app/constants/enums';
import { useAuth } from 'app/hooks/useAuth';
import Layout from 'app/styles/Layout';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  Button,
  Card,
  Paragraph,
  RadioButton,
  Text,
  Title,
} from 'react-native-paper';

const MetodoPagamentoScreen: React.FC<
  NativeStackScreenProps<StackScreen, Routes.CLIENT_PAYMENT_METHOD>
> = ({navigation, route}): React.JSX.Element => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    React.useState<string>('');
  const data = route.params;
  const {cliente} = useAuth();

  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.label}>Minha localização</Text>
        <Text style={styles.value}>
         {data.motorista.localizacao}
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Endereço de motorisa</Text>
        <Text style={styles.value}>
        {data.motorista.localizacao}
        </Text>
        <Text style={styles.distance}>1.1km</Text>
      </View>
      <View style={styles.section}>
        <Text>Tempo estimado: 2h</Text>
      </View>
      <Card style={styles.carCard}>
        <Card.Content>
          <Title>Mustang Shelby GT</Title>
          <Paragraph>4.9 (531 reviews)</Paragraph>
          <Paragraph>10000 L</Paragraph>
          <Paragraph>1000 Kz</Paragraph>
        </Card.Content>
        {/* <Card.Cover source={require('app/assets/images/icon.png')} /> */}
      </Card>

      <Text style={styles.label}>Selecione o meio de pagamento</Text>
      <RadioButton.Group
        onValueChange={value => setSelectedPaymentMethod(value)}
        value={selectedPaymentMethod}>
        <View style={styles.paymentMethod}>
          <RadioButton value="visa" />
          <Text>Multicaixa</Text>
        </View>
        <View style={styles.paymentMethod}>
          <RadioButton value="mastercard" />
          <Text>Numerário</Text>
        </View>
      </RadioButton.Group>
      <Button
        mode="contained"
        onPress={() => navigation.navigate(Routes.CLIENT_WAITING_ORDER)}
        style={[{...styles.button, borderRadius: Layout.radius}]}>
        Confirmar solicitação
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 16,
  },
  label: {
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
  },
  distance: {
    fontSize: 14,
    color: 'gray',
  },
  carCard: {
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
});

export default MetodoPagamentoScreen;
