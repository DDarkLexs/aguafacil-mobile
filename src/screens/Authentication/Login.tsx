// Importações necessárias
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Button, Checkbox, Text, TextInput, useTheme} from 'react-native-paper';
import Layout from 'app/styles/Layout';
import {useAppDispatch, useAppSelector} from 'app/hooks/useRedux';
// import {useAppToast} from '../../hooks/useToast';
// import {useAuthenticateMutation} from '../../store/api/auth';
// import {setAuthBiometric, setUsuario} from '../../store/features/auth';

// Componente da página de login
const LoginScreen: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  // const isLoading = false

//   const loading = useAppSelector(state => state.app.loading);
//   const {authBiometrico} = useAppSelector(state => state.auth);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(true);
//   const [authenticate, {isLoading, isSuccess, data, isError, error}] =
//     useAuthenticateMutation();
  const dispatch = useAppDispatch();
  // const toast = useAppToast();
  const theme = useTheme();
  const handleLogin = async () => {
    try {

     } catch (error) {

     }
  };



  return (
    <View style={styles.container}>
      {/* Ícone no canto superior esquerdo */}
      <View style={{position: 'relative', bottom: 10}}>
      {/*   <Image
          source={require('../../assets/icon/icon.png')}
          style={{width: 150, height: 150}}
        /> */}

        {/* Título e subtítulo */}
        <Text style={styles.title}>Entrada</Text>
        <Text style={styles.subtitle}>
          Bem-vindo! Por favor, faça o login para acessar sua conta.
        </Text>
      </View>

      {/* Input de número de telefone */}
      <TextInput
        // disabled={isLoading}
        label="Número de Telefone"
        value={phoneNumber}
        mode="outlined"
        left={
          <TextInput.Icon
            // disabled={isLoading}
            // loading={isLoading}
            icon={'account'}
            size={20}
          />
        }
        onChangeText={text => setPhoneNumber(text)}
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        label="Palavra-passe"
        // disabled={isLoading}
        right={
          <TextInput.Icon
            onPress={() => setPasswordVisible(state => !state)}
            icon={passwordVisible ? 'eye' : 'eye-off'}
          />
        }
        secureTextEntry={passwordVisible}
        value={senha}
        mode="outlined"
        left={
          <TextInput.Icon
            // disabled={isLoading}
            // loading={isLoading}
            icon={'lock'}
            size={20}
          />
        }
        onChangeText={text => setSenha(text)}
        style={styles.input}
      />

      {/* Checkbox para lembrar de autenticar pela próxima vez */}
      <View style={styles.checkboxContainer}>
        <Checkbox
          // disabled={isLoading}
          status={true ? 'checked' : 'unchecked'}
          // onPress={() => dispatch(setAuthBiometric(!authBiometrico))}
        />
        <Text 
        // disabled={loading}
         style={styles.checkboxLabel}>
          autenticar com biométrico
        </Text>
      </View>

      {/* Botão de entrada */}
      <Button
        mode="contained"
        // disabled={isLoading}
        // loading={isLoading}
        style={{borderRadius: theme.roundness}}
        onPress={handleLogin}>
        Entrar
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
  },
  icon: {
    // position: 'absolute',
    // top: 10,
    // left: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    marginTop: 5,
    marginBottom: 20,
    // fontFamily: 'Mulish-SemiBold',
    color: '#808080',
  },
  input: {
    marginBottom: 12,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkboxLabel: {
    marginLeft: 10,
  },
  button: {
    marginTop: 10,
  },
});

export default LoginScreen;
