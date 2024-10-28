import React from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native';

const WhatsAppButton = ({ phoneNumber}) => {

  const message = "Olá, gostaria de saber mais sobre seus serviços";

  const openWhatsApp = () => {
    console.log(phoneNumber);
    
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    Linking.openURL(url).catch(() => {
      alert("Não foi possível abrir o WhatsApp");
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={openWhatsApp}>
        <Text style={styles.buttonText}>Entrar em Contato</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#607D8B', 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WhatsAppButton;
