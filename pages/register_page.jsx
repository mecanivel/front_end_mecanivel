import { useNavigation } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import RegisterMechanicform from '@/components/MechanicRegisterForm';

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
    <RegisterMechanicform/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFF',
    width: '100%',       
    height: '100%',       
  },
});
  
