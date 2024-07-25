// Importações necessárias
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Routes, UsuarioEnum} from 'app/constants/enums';
import {useAppDispatch} from 'app/hooks/useRedux';
import {useAppToast} from 'app/hooks/useToast';
import {useSinUpClienteMutation} from 'app/store/api/auth';
import Font from 'app/styles/Font';
import Layout from 'app/styles/Layout';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Button, Divider, Text, TextInput, useTheme} from 'react-native-paper';

// Componente da página de registro
const RegisterScreen: React.FC<
  NativeStackScreenProps<StackScreen, Routes.REGISTER>
> = ({navigation, route}): React.JSX.Element => {
  const [confirmSenha, setConfirmSenha] = useState<string>('');
  const [passwordVisible, setPasswordVisible] = useState<boolean>(true);
  const {showPrimaryToast, showErrorToast} = useAppToast();
  const dispatch = useAppDispatch();

  const [usuario, setUsuario] = useState<IUserSignUp>({
    nome: '',
    senha: '',
    // email: "",
    telefone: route.params.telefone,
    tipo: UsuarioEnum.CLIENTE,
  });
  const theme = useTheme();
  const [signUpApi, response] = useSinUpClienteMutation();
  useEffect(() => {
    if (response.isSuccess) {
      showPrimaryToast({
        img: require('app/assets/images/checked.png'),
        text1: 'Sucesso!',
        text2: 'Sua conta foi registrada com sucesso.',
      });
    }
    if (response.isError) {
      showPrimaryToast({
        img: require('../../assets/images/close.png'), // Certifique-se de que esta imagem existe
        text1: 'Erro',
        text2: `${response.error}`,
      });
    }
  }, [response]);
  // Combine o estado de carregamento de ambos os hooks
  //   const [loading, setLoading] = useState<boolean>(false);
  //   useEffect(())
  const handleRegister = () => {
    if (usuario.senha !== confirmSenha) {
      showErrorToast({
        text1: 'Erro de validação',
        text2: 'As senhas não coincidem.',
      });
      return;
    }

    signUpApi(usuario);
  };

  return (
    <View style={styles.container}>
      <View style={{position: 'relative', bottom: 10}}>
        <Image
          source={require('app/assets/images/adduser.png')}
          style={{width: 100, height: 100}}
        />

        {/* Título e subtítulo */}
        <Text style={styles.title}>Registro do cliente</Text>
        <Text style={styles.subtitle}>
          Crie uma conta como cliente com seu número de telefone
        </Text>
      </View>
      <TextInput
        label="Nome"
        value={usuario.nome}
        mode="outlined"
        disabled={response.isLoading}
        onChangeText={nome => setUsuario({...usuario, nome})}
        style={styles.input}
      />
      <TextInput
        label="Número de Telefone"
        value={usuario.telefone}
        mode="outlined"
        disabled={response.isLoading}
        onChangeText={telefone => setUsuario({...usuario, telefone})}
        keyboardType="phone-pad"
        style={styles.input}
      />
      <TextInput
        label="Palavra-passe"
        mode="outlined"
        disabled={response.isLoading}
        value={usuario.senha}
        onChangeText={senha => setUsuario({...usuario, senha})}
        secureTextEntry={passwordVisible}
        right={
          <TextInput.Icon
            icon={passwordVisible ? 'eye-off' : 'eye'}
            onPress={() => setPasswordVisible(!passwordVisible)}
          />
        }
        style={styles.input}
      />
      <TextInput
        label="Confirmar Palavra-passe"
        mode="outlined"
        disabled={response.isLoading}
        value={confirmSenha}
        onChangeText={senha => setConfirmSenha(senha)}
        secureTextEntry={passwordVisible}
        right={
          <TextInput.Icon
            icon={passwordVisible ? 'eye-off' : 'eye'}
            onPress={() => setPasswordVisible(!passwordVisible)}
          />
        }
        style={styles.input}
      />
      <Button
        loading={response.isLoading}
        disabled={response.isLoading}
        mode="contained"
        onPress={handleRegister}
        style={styles.button}>
        Registrar
      </Button>
      <Divider style={styles.divider} />
      <Button
        mode="text"
        loading={response.isLoading}
        disabled={response.isLoading}
        onPress={() => navigation.goBack()}
        style={styles.link}>
        Voltar para login
      </Button>
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    ...Layout.screenLayout,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: Font.bold.fontFamily,
  },
  segmentButton: {
    borderRadius: Layout.radius,
  },
  title: {
    fontFamily: Font.bold.fontFamily,
    fontSize: 24,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    marginTop: 5,
    marginBottom: 20,
    fontFamily: Font.bold.fontFamily,
  },
  input: {
    width: '100%',
    marginBottom: 12,
  },
  button: {
    width: '100%',
    marginTop: 10,
    borderRadius: Layout.radius,
  },
  divider: {
    width: '100%',
    marginVertical: 20,
  },
  link: {
    width: '100%',
    borderRadius: Layout.radius,
  },
});

export default RegisterScreen;
