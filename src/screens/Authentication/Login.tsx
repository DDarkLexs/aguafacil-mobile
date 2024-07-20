// Importações necessárias
import {useAppDispatch} from 'app/hooks/useRedux';
import Font from 'app/styles/Font';
import Layout from 'app/styles/Layout';
import React, {useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Button, Divider, Text, TextInput, useTheme} from 'react-native-paper';
// import fontawesome from "react-native-vector-icons/FontAwesome"

// import { useAppToast } from '../../hooks/useToast';
// import { useAuthenticateMutation } from '../../store/api/auth';
// import { setAuthBiometric, setUsuario } from '../../store/features/auth';

// Componente da página de login
const LoginScreen: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const [passwordVisible, setPasswordVisible] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const handleLogin = async () => {
    try {
      // Lógica de autenticação
    } catch (error) {
      // Tratamento de erro
    }
  };

  return (
    <View style={styles.container}>
      <View style={{position: 'relative', bottom: 10}}>
        <Image
          source={require('../../assets/images/tank-truck.png')}
          style={{width: 150, height: 150}}
        />

        {/* Título e subtítulo */}
        <Text style={styles.title}>Entrada</Text>
        <Text style={styles.subtitle}>
          Faça a entrada com seu número de telefone
        </Text>
      </View>

      <Text style={styles.title}></Text>
      <TextInput
        label="Número de Telefone"
        value={phoneNumber}
        mode="outlined"
        onChangeText={text => setPhoneNumber(text)}
        keyboardType="phone-pad"
        style={styles.input}
      />
      <TextInput
        label="Palavra-passe"
        mode="outlined"
        value={senha}
        onChangeText={text => setSenha(text)}
        secureTextEntry={passwordVisible}
        // right={
        //   // <fontawesome  />
        // //   // <TextInput.Icon
        // //   //   icon={"eye"}
        // //   //   // icon={passwordVisible ? 'eye-off' : 'eye'}
        // //   //   // onPress={() => setPasswordVisible(!passwordVisible)}
        // //   // />
        // }
        style={styles.input}
      />
      <Button mode="contained" 
      onPress={handleLogin} 
      style={styles.button}>
        Entrada
      </Button>
      <Divider style={styles.divider} />
      
      <Button
        mode="text"
        onPress={() => console.log('Criar conta')}
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
    fontFamily: Font.bold.fontFamily
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
