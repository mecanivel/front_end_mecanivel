import { useNavigation } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [Cpf, setCpf] = useState('');
  const [phone, setphone] = useState('');
  const [username, setusername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleRegister = async () => {
    if (name === '' || Cpf === '' || phone === '' || username === '' || email === '' || password === '') {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    const apiUrl = `${process.env.EXPO_PUBLIC_API_URL}/mechanics_b2b/create_mechanic_b2b`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          cpf: Cpf,
          phone,
          username,
          email,
          password,
        }),
      });

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        
        if (response.ok) {
          Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
          navigation.navigate('HomeScreen');
        } else {
          Alert.alert('Erro', data.message || 'Ocorreu um erro ao cadastrar.');
        }
      } else {
        // Exibe erro se a resposta não for JSON
        Alert.alert('Erro', 'Resposta inesperada do servidor.');
      }
    } catch (error) {
      console.log(error);
      
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
    
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/logo_mecanivel.jpg')} // Substitua pelo caminho correto da sua imagem
        style={styles.logo}
      />

      <Text style={styles.title}>Cadastre-se</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="CPF"
        value={Cpf}
        onChangeText={setCpf}
      />

      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={phone}
        onChangeText={setphone}
      />

      <TextInput
        style={styles.input}
        placeholder="Usuario"
        value={username}
        onChangeText={setusername}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrar-se</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 24,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007BFF', // Mudança para melhor visibilidade
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
