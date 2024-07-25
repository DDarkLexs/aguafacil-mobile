import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Title, Paragraph, Avatar, Card } from 'react-native-paper';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Routes } from 'app/constants/enums';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { convertDateToString, convertToCurrency, convertToLitro } from 'app/utils';


const ServicoDetailScreen: React.FC<
  NativeStackScreenProps<StackScreen, Routes.HISTORIC_CLIENT_SINGLE>
> = ({navigation, route}): React.JSX.Element => {
  const servico = route.params;

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title={servico.titulo} />
        <Card.Content>
          <View style={styles.row}>
            <Avatar.Image
              size={64}
              source={{uri: servico.motorista.fotoPerfil}}
            />
            <View style={{marginLeft: 10}}>
              <Title>{servico.motorista.usuario.nome}</Title>
              <Paragraph>{servico.motorista.localizacao}</Paragraph>
            </View>
          </View>
          <Paragraph>Status: {servico.status}</Paragraph>
          <Paragraph>Data de Conclusão: {convertDateToString(servico.dataConclusao)}</Paragraph>
          <Paragraph>Descrição: {servico.descricao || 'Nenhuma descrição disponível'}</Paragraph>
          <Paragraph>Preço: {convertToCurrency(servico.preco)}</Paragraph>
          <Paragraph>Litros de Água: {convertToLitro(servico.litroAgua)}</Paragraph>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  card: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ServicoDetailScreen;
