// MechanicRegisterForm.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useNavigation } from 'expo-router';

export default function MechanicRegisterForm() {
  const [name, setName] = useState('');
  const [Cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
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
        body: JSON.stringify({ name, cpf: Cpf, phone, username, email, password }),
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
        Alert.alert('Erro', 'Resposta inesperada do servidor.');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/logo_mecanivel.jpg')} style={styles.logo} />
      <Text style={styles.title}>Cadastre-se</Text>

      <TextInput style={styles.input} placeholder="Nome" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="CPF" value={Cpf} onChangeText={setCpf} />
      <TextInput style={styles.input} placeholder="Telefone" value={phone} onChangeText={setPhone} />
      <TextInput style={styles.input} placeholder="Usuario" value={username} onChangeText={setUsername} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Senha" secureTextEntry value={password} onChangeText={setPassword} />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrar-se</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonExit} onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.buttonTextExit}>Voltar ao Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF', padding: 24 },
  logo: { width: 200, height: 100, resizeMode: 'contain', marginBottom: 20 },
  title: { fontSize: 16, color: 'rgba(0, 0, 0, .5)', fontWeight: 'regular', marginRight: 240, marginBottom: 20 },
  input: { width: '100%', height: 50, backgroundColor: '#FFF', borderColor: 'rgba(0, 0, 0, 1)', borderWidth: 1, borderRadius: 2, paddingHorizontal: 16, marginBottom: 16 },
  button: { width: '100%', height: 50, backgroundColor: '#34495E', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  buttonExit: {},
  buttonTextExit: { color: '#4664FF', fontSize: 14 },
});
