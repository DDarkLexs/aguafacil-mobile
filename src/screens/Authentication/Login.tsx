// Importações necessárias
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Routes, UsuarioEnum} from 'app/constants/enums';
import {useAuth} from 'app/hooks/useAuth';
import {useAppDispatch} from 'app/hooks/useRedux';
import {useAppToast} from 'app/hooks/useToast';
import {
  useAuthClienteMutation,
  useAuthMotoristaMutation,
} from 'app/store/api/auth';
import {setCliente, setMotorista} from 'app/store/features/auth';
import Font from 'app/styles/Font';
import Layout from 'app/styles/Layout';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {
  Button,
  Divider,
  Icon,
  SegmentedButtons,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
// import fontawesome from "react-native-vector-icons/FontAwesome"

// import { useAppToast } from '../../hooks/useToast';
// import { useAuthenticateMutation } from '../../store/api/auth';
// import { setAuthBiometric, setUsuario } from '../../store/features/auth';

// Componente da página de login
const LoginScreen: React.FC<
  NativeStackScreenProps<StackScreen, Routes.LOGIN>
> = ({navigation, route}): React.JSX.Element => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const [passwordVisible, setPasswordVisible] = useState<boolean>(true);
  const {showPrimaryToast, showErrorToast} = useAppToast();
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<string>(UsuarioEnum.CLIENTE);
  const auth = useAuth();

  const [usuario, setUsuario] = useState({
    telefone: '',
    senha: '',
  });
  const theme = useTheme();
  const [authUserApiC, responseC] = useAuthClienteMutation();
  const [authUserApiM, responseM] = useAuthMotoristaMutation();

  // Combine o estado de carregamento de ambos os hooks
  const loading = responseC.isLoading || responseM.isLoading;
  const handleLogin = () => {
    switch (value) {
      case UsuarioEnum.CLIENTE:
        authUserApiC(usuario);
        break;
      case UsuarioEnum.MOTORISTA:
        authUserApiM(usuario);
        break;

      default:
        showErrorToast({
          text1: 'Seleção necessária',
          text2: 'Por favor, selecione uma entidade para prosseguir.',
        });
        break;
    }
  };
  useEffect(() => {
    if (responseC.isSuccess) {
      const {token, ...data} = responseC.data;

      dispatch(
        setCliente({
          data,
          token,
        }),
      );
    }
    if (responseC.isError) {
      showPrimaryToast({
        text1: 'Autenticação falhou.',
        text2: JSON.stringify(responseC.error),
      });
      console.log(responseC.error);
    }
  }, [responseC]);

  useEffect(() => {
    if (responseM.isSuccess) {
      const {token, ...data} = responseM.data;

      dispatch(
        setMotorista({
          data,
          token,
        }),
      );
    }

    if (responseM.isError) {
      showErrorToast({
        text1: 'Autenticação falhou.',
        text2: JSON.stringify(responseM.error),
      });
      console.log(responseM.error);
    }
  }, [responseM]);
  return (
    <View style={styles.container}>
      <View style={{position: 'relative', bottom: 10}}>
        <Image
          source={require('app/assets/images/icon.png')}
          style={{width: 150, height: 150}}
        />

        {/* Título e subtítulo */}
        <Text style={styles.title}>Entrada</Text>
        <Text style={styles.subtitle}>
          Faça a entrada com seu número de telefone
        </Text>
        <SegmentedButtons
          style={styles.segmentButton}
          value={value}
          density="medium"
          onValueChange={setValue}
          buttons={[
            {
              value: UsuarioEnum.MOTORISTA,
              icon: 'badge-account',
              label: 'Motorista',
              disabled: loading,
              style: {
                borderRadius: Layout.radius,
              },

              // checkedColor: theme.colors.primary
            },
            {
              icon: 'account',
              label: 'Cliente',
              value: UsuarioEnum.CLIENTE,
              disabled: loading,
              style: {
                borderRadius: Layout.radius,
              },
            },
          ]}
        />
      </View>
      <TextInput
        label="Número de Telefone"
        value={usuario.telefone}
        mode="outlined"
        disabled={loading}
        onChangeText={telefone => setUsuario({...usuario, telefone})}
        keyboardType="phone-pad"
        style={styles.input}
      />
      <TextInput
        label="Palavra-passe"
        mode="outlined"
        disabled={loading}
        value={usuario.senha}
        onChangeText={senha => setUsuario({...usuario, senha})}
        secureTextEntry={passwordVisible}
        right={
          <Icon source={passwordVisible ? 'eye-off' : 'eye'} size={10} />

          // <TextInput.Icon
          //   // icon={'eye'}
          //   icon={passwordVisible ? 'eye-off' : 'eye'}
          //   onPress={() => setPasswordVisible(!passwordVisible)}
          // />
        }
        style={styles.input}
      />
      {/* <Text>
        {JSON.stringify(auth)}
      </Text> */}
      <Button
        loading={loading}
        disabled={loading}
        mode="contained"
        onPress={handleLogin}
        style={styles.button}>
        Entrar
      </Button>
      <Divider style={styles.divider} />

      <Button
        mode="text"
        loading={loading}
        disabled={loading}
        onPress={() =>
          navigation.navigate(Routes.REGISTER, {telefone: phoneNumber})
        }
        style={styles.link}>
        Criar conta
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
    // fontWeight: 'bold',
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

export default LoginScreen;
