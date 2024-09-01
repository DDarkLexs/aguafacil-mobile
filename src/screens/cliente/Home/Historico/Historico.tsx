import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Routes} from 'app/constants/enums';
import {useAppDispatch, useAppSelector} from 'app/hooks/useRedux';
import {useAppToast} from 'app/hooks/useToast';
import {useHistoricServiceQuery} from '../../../../store/api/cliente/servico';
import {setServico} from '../../../../store/features/cliente/servico';
import {convertDateToString} from 'app/utils';
import * as React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Appbar, Button, Card, Text} from 'react-native-paper';

const HistoricoScreen: React.FC<
  NativeStackScreenProps<StackScreen, Routes.HISTORIC_CLIENT>
> = ({navigation, route}): React.JSX.Element => {
  const apiQuery = useHistoricServiceQuery();
  const dispatch = useAppDispatch();
  const {showErrorToast} = useAppToast();
  const data = useAppSelector(state => state.clientServico.servico);

  React.useEffect(() => {
    if (apiQuery.isSuccess) {
      dispatch(setServico(apiQuery.data));
    }

    if (apiQuery.isError) {
      showErrorToast({
        text1: 'Ocorreu um erro ao processar os histórico.',
        text2: JSON.stringify(apiQuery.error),
      });
    }
  }, [apiQuery]);

  const renderItem = ({item}: {item: IServicoArchive}) => (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.title}>Pedido #{item.id}</Text>
        <Text>Motorista: {item.motorista.usuario.nome}</Text>
        <Text>
          Data da conclusão: {convertDateToString(item.dataConclusao)}
        </Text>
        <Text>Status: {item.status}</Text>
      </Card.Content>
      <Card.Actions>
        <Button
          onPress={() =>
            navigation.navigate(Routes.HISTORIC_CLIENT_SINGLE, item)
          }>
          Ver Detalhes
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Histórico de Pedidos" />
      </Appbar.Header>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
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
