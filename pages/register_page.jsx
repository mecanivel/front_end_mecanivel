import { useNavigation } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import RegisterMechanicform from '@/components/MechanicRegisterForm';
import CustomerRegisterform from '@/components/RegisterCustomer';

export default function RegisterScreen() {
  const [selectedUserType, setSelectedUserType] = useState('Cliente'); 
  const navigation = useNavigation();

  const handleUserTypeSwitch = (type) => {
    setSelectedUserType(type);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>

      <View style={styles.logoContainer}>
        <Image source={require('../assets/images/mecanivel_logo.png')} style={styles.logo} />
      </View>
 

      
      <View style={styles.switchContainer}>
        <TouchableOpacity
          style={[styles.switchButton, selectedUserType === 'Cliente' && styles.activeSwitchButton]}
          onPress={() => handleUserTypeSwitch('Cliente')}
        >
          <Text style={selectedUserType === 'Cliente' ? styles.activeSwitchText : styles.switchText}>Cliente</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.switchButton, selectedUserType === 'Mecânica' && styles.activeSwitchButton]}
          onPress={() => handleUserTypeSwitch('Mecânica')}
        >
          <Text style={selectedUserType === 'Mecânica' ? styles.activeSwitchText : styles.switchText}>Mecânica</Text>
        </TouchableOpacity>
      </View>

   
      {selectedUserType === 'Cliente' ? (
        <CustomerRegisterform />
      ) : (
        <RegisterMechanicform />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
   
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 40, 
  },
  logo: {
    width: 150,
    height: 50,
    marginBottom: 0,
    padding: 0,
    marginLeft: 95,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: 'row',
  justifyContent:'center',
  marginTop:80,
  },
  switchButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#ffff',
    marginHorizontal: 5,
    
  },
  activeSwitchButton: {
    backgroundColor: '#2f455c',
  },
  switchText: {
    color: '#666',
  },
  activeSwitchText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
