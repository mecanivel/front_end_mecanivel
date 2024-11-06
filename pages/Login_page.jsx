import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from 'expo-router';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {

    try {
        const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/auth`, {
          username,
          password
        });
        if(response.data.token){
          await AsyncStorage.setItem('token', response.data.token);
          navigation.navigate('MainTabs');
          
        }else {
          Alert.alert('erro', 'Credenciais inválidas');
        }
    } catch (error) {
      Alert.alert('Erro', 'Credenciais inválidas');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/logo_mecanivel.jpg')} 
        style={styles.logo}
      />
      <TextInput
        style={styles.input}
        placeholder="Login"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <View style={styles.linksContainer}>
        <TouchableOpacity>
          <Text style={styles.linkText}>Cadastrar-se</Text>
        </TouchableOpacity>
      </View>
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
    marginBottom: 40,
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
    backgroundColor: 'gray',
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
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  linkText: {
    color: '#007BFF',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});