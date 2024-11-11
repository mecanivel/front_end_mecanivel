import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button, Image, StyleSheet, ScrollView, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Dropdown } from 'react-native-element-dropdown';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from 'expo-router';

const CarRegistrationScreen = ({ route }) => {
    const [carName, setCarName] = useState('');
    const [kmsDriven, setKmsDriven] = useState('');
    const [pneuStatus, setPneuStatus] = useState('BOM');
    const [oilStatus, setOilStatus] = useState('BOM');
    const [brakePadsStatus, setBrakePadsStatus] = useState('BOM');
    const [image, setImage] = useState(null);
    const { customer_id } = route.params;
    const navigation = useNavigation();

    const pickImage = async ()  => {
       try {
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.Images,
            allowsEditing:true,
            aspect:[1,1],
            quality:1,
        })

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
       } catch (error) {
         ("erro escolhendo imagem da galeria", error);
         
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
            }catch (error) {
            ("Erro ao tirar foto:", error);
        }
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('car_name', carName);
        formData.append('kms_driven', kmsDriven);
        formData.append('pneu_status', pneuStatus);
        formData.append('oil_status', oilStatus);
        formData.append('brake_pads_status', brakePadsStatus);
        formData.append('customer_id', customer_id);

        if (image) {
            formData.append('image', {
                uri: image,
                type: 'image/png',
                name: 'car_image.png',
                size: 300
            });
        }

        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/cars/create_car`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                ('Carro criado com sucesso:', data);

                

                setCarName('');
                setKmsDriven('');
                setPneuStatus('BOM');
                setOilStatus('BOM');
                setBrakePadsStatus('BOM');
                setImage(null);

              
                Alert.alert(
                    'Sucesso',
                    'Carro criado com sucesso!',
                    [
                        {
                            text: 'OK',
                            onPress: () => navigation.navigate('CarPage', { customer_id })
                        }
                    ]
                );
            } else {
                console.error('Erro ao criar o carro:', response);
                Alert.alert('Erro', 'Não foi possível criar o carro. Tente novamente.');
            }
        } catch (error) {
            console.error('Erro de conexão:', error.message);
            Alert.alert('Erro', 'Ocorreu um erro de conexão. Verifique sua conexão com a internet.');
        }
    };

    const dropdownData = [
        { label: 'BOM', value: 'BOM' },
        { label: 'ESTÁVEL', value: 'ESTÁVEL' },
        { label: 'RUIM', value: 'RUIM' },
    ];

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>Registro de Carro</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nome do Carro"
                    value={carName}
                    onChangeText={setCarName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Quilômetros Rodados"
                    value={kmsDriven}
                    onChangeText={setKmsDriven}
                    keyboardType="numeric"
                />

                <Text style={styles.label}>Status dos Pneus</Text>
                <Dropdown
                    style={styles.dropdown}
                    data={dropdownData}
                    labelField="label"
                    valueField="value"
                    placeholder="Selecione o status"
                    value={pneuStatus}
                    onChange={item => setPneuStatus(item.value)}
                />

                <Text style={styles.label}>Status do Óleo</Text>
                <Dropdown
                    style={styles.dropdown}
                    data={dropdownData}
                    labelField="label"
                    valueField="value"
                    placeholder="Selecione o status"
                    value={oilStatus}
                    onChange={item => setOilStatus(item.value)}
                />

                <Text style={styles.label}>Status das Pastilhas de Freio</Text>
                <Dropdown
                    style={styles.dropdown}
                    data={dropdownData}
                    labelField="label"
                    valueField="value"
                    placeholder="Selecione o status"
                    value={brakePadsStatus}
                    onChange={item => setBrakePadsStatus(item.value)}
                />

                <View style={styles.imagePickerContainer}>
                    <Button title="Selecionar Imagem" onPress={pickImage} />
                    <Button title="Tirar Foto" onPress={takePhoto} />
                </View>
                {image && <Image source={{ uri: image }} style={styles.image} />}

                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>Cadastrar Carro</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default CarRegistrationScreen;

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
        paddingVertical: 20,
        backgroundColor: '#fff',
    },
    container: {
        width: '90%',
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    label: {
        alignSelf: 'flex-start',
        marginBottom: 5,
        fontSize: 16,
        color: '#333',
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 15,
    },
    dropdown: {
        width: '100%',
        height: 50,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    imagePickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: 10,
    },
    image: {
        width: 200,
        height: 200,
        marginVertical: 10,
    },
    submitButton: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
