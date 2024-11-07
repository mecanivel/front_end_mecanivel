import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Image, Modal, TouchableOpacity, FlatList, Button, ActivityIndicator } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import axios from 'axios';
import { useFocusEffect, useNavigation } from 'expo-router';

const CarsPage = ({ route }) => {
    const [cars, setCars] = useState([]); 
    const [selectedCar, setSelectedCar] = useState(null); 
    const [modalVisible, setModalVisible] = useState(false); 
    const [loading, setLoading] = useState(true);
    const { customer_id } = route.params;
    const navigation = useNavigation();

    const fetchCars = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/cars/get_all_cars?customer_id=${customer_id}`);
            const carsWithImages = response.data.map((car) => {
                if (car.image && car.image.data) {
                    car.image = `data:image/jpeg;base64,${convertArrayBufferToBase64(car.image.data)}`;
                }
                return car;
            });
            setCars(carsWithImages);
            if (!selectedCar && carsWithImages.length > 0) setSelectedCar(carsWithImages[0]);
        } catch (error) {
            console.error("Erro ao buscar os carros:", error);
        } finally {
            setLoading(false);
        }
    };


    useFocusEffect(
        useCallback(() => {
            fetchCars();
        }, [])
    );
    
    const getStatusColor = (status) => {
        console.log("STATUS", status);
        
        switch (status) {
            case 'BOM':
                return '#54fa04';
            case 'ESTÁVEL':
                return 'yellow';
            case 'RUIM':
                return 'red';
            default:
                return 'gray';
        }
    };

  

   
    const convertArrayBufferToBase64 = (buffer) => {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
    };

    const renderCarItem = ({ item }) => (
        <TouchableOpacity onPress={() => { setSelectedCar(item); setModalVisible(false); }}>
        <View style={styles.carItem}>
            <View style={styles.radioContainer}>
                <FontAwesome
                    name={selectedCar?.id === item.id ? "dot-circle-o" : "circle-o"}
                    size={20}
                    color="#fff"
                    style={styles.radioIcon}
                />
                <Text style={styles.carname_filter}>{item.car_name}</Text>
            </View>
        </View>
    </TouchableOpacity>
    );

   
    return (
        <View style={styles.container}>

            { loading ? ( <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#3c4c64" />
                </View>):(
            selectedCar && (
                <>
                    <View style={styles.header}>
                        <Image
                            source={{ uri: selectedCar.image }}
                            style={styles.carImage}
                        />
                        <View style={styles.carInfo}>
                            <Text style={styles.carTitle}>{selectedCar.car_name}</Text>

                        </View>

                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                            <AntDesign name="swap" size={24} style={styles.shareIcon} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.statusContainer}>

                        <View  style={styles.statusboxbig}>
                        <Text style={[styles.statusTitle,]}> Kilometragem </Text>
                            <View style={styles.statusBox}>
                           
                                <View style={[styles.statusboxmenor,{ borderTopColor: "#fff", borderTopWidth:2}]}>
                                    
                                        <Text style={styles.statusSubtext} > {selectedCar.kms_driven}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.statusboxbig}>
                        <Text style={[styles.statusTitle]}> Pneu </Text>
                            <View style={styles.statusBox}>
                            <FontAwesome name="circle"  size={15} style={styles.statusIcon} color={getStatusColor(selectedCar.pneu_status)} />
                            <View style={[styles.statusboxmenor,{ borderTopColor: getStatusColor(selectedCar.pneu_status) , borderTopWidth:2}]}>
                           
                                        
                                        <Text style={styles.statusSubtext} > {selectedCar.pneu_status}</Text>
                                        </View>
                            </View>
                         </View>

                         <View  style={styles.statusboxbig}> 
                          <Text style={[styles.statusTitle ]}> Óleo  </Text>
                            <View style={[styles.statusBox]}>
                            <FontAwesome name="circle"  size={15} style={styles.statusIcon} color={getStatusColor(selectedCar.oil_status)} />
                                <View style={[styles.statusboxmenor,{ borderTopColor: getStatusColor(selectedCar.oil_status) , borderTopWidth:2}]}>
                                
                                    
                                        <Text style={styles.statusSubtext} > {selectedCar.oil_status}</Text>
                                </View>
                            </View>
                        </View>


                            <View  style={styles.statusboxbig}>
                            <Text style={[styles.statusTitle,]}> Pastilhas de freio </Text>
                            <View style={styles.statusBox}>
                            <FontAwesome name="circle"  size={15} style={styles.statusIcon} color={getStatusColor(selectedCar.brake_pads_status)} />
                            <View style={[styles.statusboxmenor,{ borderTopColor: getStatusColor(selectedCar.brake_pads_status) , borderTopWidth:2}]}>
                                
                                <Text style={styles.statusSubtext} > {selectedCar.brake_pads_status}</Text>
                            </View>
                            </View>
                            </View>
                    </View>

                    <View style={styles.btnnnewcarcontainer}>
                    <TouchableOpacity
                            style={styles.registerButton}
                            onPress={() => navigation.navigate('CarRegister' ,{customer_id:customer_id})}
                        >
                            <Text style={styles.registerButtonText}>Cadastrar Novo Carro</Text>
                        </TouchableOpacity>
                    </View>
                    
                    <Modal
                        visible={modalVisible}
                        animationType="slide"
                        transparent={true}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Trocar Carro</Text>
                            <FlatList
                                data={cars}
                                renderItem={renderCarItem}
                                keyExtractor={(item) => item.id}
                            />
                            <View style={styles.modalButtons}>
                                <Button title="Cancelar" onPress={() => setModalVisible(false)} />
                            </View>
                            </View>
                        </View>
                    </Modal>
              
              </>

              )
            )}
        </View>
    );
};

const styles = StyleSheet.create({

    btnnnewcarcontainer:{

        textAlign:'auto',
        alignItems:'center',
        marginVertical: 5, 
        justifyContent:'center',
    },
    registerButton: {
        backgroundColor: '#2f455c',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 16,
        width:200
    },
    registerButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioIcon: {
        marginRight: 10,
    },
    statusboxbig:{
        width: '40%', 
        margin: 4,
        alignItems: 'center'
    },
    statusTitle: {
        fontSize: 16,
        color: '#000',
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign:'center'
    },
    statusIcon: {
        position: 'absolute',
        top: 5,
        right: 5, 
    },
    statusboxmenor:{
        width:130,
        marginTop:10
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingBottom: 8,
    },
    carImage: {
        width: 100,
        height: 80,
        borderRadius: 8,
        marginRight: 16,
    },
    carInfo: {
        flex: 1,
    },
    carTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    shareIcon: {
        marginLeft: 8,
        color: '#666',
    },
    statusContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around', 
        paddingHorizontal: 10,
        marginTop: 10,
        
    },
    statusBox: {
        backgroundColor: '#2f455c',
        padding: 13,
        borderRadius: 10,
        marginBottom:20
    },
    statusText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        paddingTop: 8, 
    },
    
    statusSubtext: {
        fontSize: 12,
        color: '#ddd',
        textAlign: 'center',
        marginTop: 5,
    },
    dotContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        height: '30%', 
        backgroundColor: '#3c4c64',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 16,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
        textAlign: 'center',
    },
    carItem: {
        padding: 10,
        backgroundColor: '#3c4c64',
        borderRadius: 5,
        marginBottom: 10,
        color:'#fff',

    },
    modalButtons: {
        marginTop: 20,
        alignItems: 'center',
    },
    carname_filter:{
        color:'#fff'
    }
});


export default CarsPage;
