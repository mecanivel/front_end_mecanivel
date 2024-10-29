import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Ícones de estrela para a nota
import axios from 'axios';


const ButtonCreateReview = ({ companyId, customerId }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [grade, setGrade] = useState(0);
  const [description, setDescription] = useState('');

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  const handleStarPress = (rating) => {
    setGrade(rating);
  };

  const handleSubmitReview = async () => {
    if (grade === 0) {
      Alert.alert('Erro', 'Por favor, selecione uma nota.');
      return;
    }

    if (description.trim() === '') {
      Alert.alert('Erro', 'Por favor, adicione um comentário.');
      return;
    }

    const reviewData = {
      description,
      grade,
      companyId,
      customerId
    };

   
    
    try {
        console.log(reviewData);
      await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/reviews/create_review`, reviewData);
      Alert.alert('Sucesso', 'Avaliação enviada com sucesso!');
      closeModal();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível enviar a avaliação.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={openModal}>
        <Text style={styles.buttonText}>Avaliar Empresa</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Auto Repair</Text>
            <Text style={styles.modalSubtitle}>Avaliar Mecânica</Text>

            {/* Grade - Escolha de estrelas */}
            <View style={styles.starContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => handleStarPress(star)}>
                  <FontAwesome
                    name="star"
                    size={32}
                    color={star <= grade ? '#FFD700' : '#CCCCCC'}
                  />
                </TouchableOpacity>
              ))}
            </View>

            {/* Campo de comentário */}
            <TextInput
              style={styles.input}
              placeholder="Escreva seu comentário..."
              multiline={true}
              value={description}
              onChangeText={setDescription}
            />

            {/* Botão de envio */}
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmitReview}>
              <Text style={styles.submitButtonText}>Enviar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#607D8B',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
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
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#000',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  starContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 80,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 10,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  submitButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#607D8B',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ButtonCreateReview;
