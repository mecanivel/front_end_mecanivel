import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet, Modal, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const WhatsAppButton = ({ phoneNumber }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const message = "Olá, gostaria de saber mais sobre seus serviços";
  const navigation = useNavigation();

  const openWhatsApp = async () => {
    try {
      const token = await AsyncStorage.getItem('token'); 

      if (!token) {
        setIsModalVisible(true); 
      } else {
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        Linking.openURL(url).catch(() => {
          alert("Não foi possível abrir o WhatsApp");
        });
      }
    } catch (error) {
      console.error("Erro ao verificar token:", error);
    }
  };

  const handleLoginRedirect = () => {
    setIsModalVisible(false);
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={openWhatsApp}>
        <Text style={styles.buttonText}>Entrar em Contato</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Faça login para requisitar serviços</Text>
            <Button title="Fazer Login" onPress={handleLoginRedirect} />
          </View>
        </View>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default WhatsAppButton;
