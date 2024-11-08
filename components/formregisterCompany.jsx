import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Modal, Image, Alert } from "react-native";
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from "expo-router";

export default function FormCompanyRegister() {
    const [name, setName] = useState('');
    const [Cnpj, setCnpj] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddres] = useState('');
    const [image, setImage] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();

    const pickImage = async () => {
        try {
            await ImagePicker.requestMediaLibraryPermissionsAsync();
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            if (!result.canceled) {
                setImage(result.assets[0].uri);
            }
            setModalVisible(false);
        } catch (error) {
            console.log("Erro ao escolher imagem da galeria", error);
        }
    };

    const takePhoto = async () => {
        try {
            await ImagePicker.requestCameraPermissionsAsync();
            const result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            if (!result.canceled) {
                setImage(result.assets[0].uri);
            }
            setModalVisible(false);
        } catch (error) {
            console.log("Erro ao tirar foto:", error);
        }
    };

    const hangleSubmit = async () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('cnpj', Cnpj);
        formData.append('phone', phone);
        formData.append('address', address);

        if (image) {
            formData.append('image', {
                uri: image,
                type: 'image/png',
                name: 'company.png',
                size: 300
            });
        }

        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/company/create_company`, {
                method: 'POST',
                body: formData,
            });
            console.log(response);
            
            if (response.ok) {
                const data = await response.json();
                console.log('Carro criado com sucesso:', data);

                

                setName('');
                setCnpj('');
                setPhone('');
                setAddres('');
                setImage(null);

              
                Alert.alert(
                    'Sucesso',
                    'Carro criado com sucesso!',
                    [
                        {
                            text: 'OK',
                            onPress: () => navigation.navigate('SelectServices')
                        }
                    ]
                );
            } else {
                console.error('Erro ao criar empresa:', response);
                Alert.alert('Erro', 'Não foi possível criar a emprea. Tente novamente.');
            }
        } catch (error) {
            console.log(error);
            
        }

    }

    return (
        <View style={styles.containerForm}>
            <Text style={styles.label}>Imagem da empresa</Text>
            <TouchableOpacity style={styles.imageContainer} onPress={() => setModalVisible(true)}>
                {image ? (
                    <Image source={{ uri: image }} style={styles.image} />
                ) : (
                    <FontAwesome name="plus" size={24} color="white" />
                )}
            </TouchableOpacity>

            <Text style={styles.label}>Nome da empresa</Text>
            <TextInput
                style={styles.input}
                placeholder="Mecânica"
                value={name}
                onChangeText={setName}
            />

            <Text style={styles.label}>CNPJ da empresa</Text>
            <TextInput
                style={styles.input}
                placeholder="00.000.000/001-12"
                value={Cnpj}
                onChangeText={setCnpj}
            />

            <Text style={styles.label}>Telefone da empresa</Text>
            <TextInput
                style={styles.input}
                placeholder="(45)XXXX-XXXX"
                value={phone}
                onChangeText={setPhone}
            />

            <Text style={styles.label}>Endereço da empresa</Text>
            <TextInput
                style={styles.input}
                placeholder="Rua xxxx, 13124"
                value={address}
                onChangeText={setAddres}
            />
            
            <TouchableOpacity style={styles.submitButton} onPress={hangleSubmit}>
                <Text style={styles.submitButtonText}>Cadastrar Empresa</Text>
            </TouchableOpacity>
            
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Escolher Imagem</Text>
                        <TouchableOpacity style={styles.modalButton} onPress={takePhoto}>
                            <MaterialIcons name="camera-alt" size={24} color="white" />
                            <Text style={styles.modalButtonText}>Tirar Foto</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalButton} onPress={pickImage}>
                            <MaterialIcons name="photo-library" size={24} color="white" />
                            <Text style={styles.modalButtonText}>Selecionar da Galeria</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text style={styles.closeModalText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    submitButton: {
        backgroundColor: '#2D3E50',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
        color: "#ffff"
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    containerForm: {
        height: 800,
        padding: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    imageContainer: {
        width: '40%',
        height: 100,
        backgroundColor: '#2D3E50',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 15,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    modalButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#007bff',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        marginBottom: 10,
    },
    modalButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    closeModalText: {
        color: '#007bff',
        fontSize: 16,
        marginTop: 15,
    },
});
