import { useAuth } from 'app/hooks/useAuth';
import Font from 'app/styles/Font';
import Layout from 'app/styles/Layout';
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { TextInput, Button, useTheme } from 'react-native-paper';

const ProfileScreen: React.FC = () => {
  const theme = useTheme();
  const { cliente } = useAuth()
  const [name, setName] = React.useState(cliente?.usuario.nome);
  const [email, setEmail] = React.useState(cliente?.usuario.email);
  const [phone, setPhone] = React.useState(cliente?.usuario.telefone);
 

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: cliente?.cliente.fotoPerfil }} // Substituir pela URL da foto de perfil
        style={styles.profileImage}
      />
      <TextInput
        label="Nome"
        value={name}
        onChangeText={setName}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        mode="outlined"
        keyboardType="email-address"
      />
      <TextInput
        label="Telefone"
        value={phone}
        onChangeText={setPhone}
        style={styles.input}
        mode="outlined"
        keyboardType="phone-pad"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 24,
  },
  input: {
    width: '100%',
    marginBottom: 16,
  },
  logoutButton: {
    marginTop: 24,
    width: '100%',
    borderRadius: Layout.radius
  },
});

export default ProfileScreen;
