import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import axios from 'axios';
<<<<<<< HEAD
import { BASE_URL } from '@env';
=======

>>>>>>> 76303614b4a3c8ffe57a292134f4c97b71e57d1d


const ServicesCardCompany = ({ companyId }) => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
   

<<<<<<< HEAD
=======
    console.log(EXPO_PUBLIC_API_URL);
    
>>>>>>> 76303614b4a3c8ffe57a292134f4c97b71e57d1d
    useEffect(() => {
        const fetchServiceIds = async () => {
            try {
                const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/services/filter_services_by_companies?companyId=${companyId}`);
                const serviceIds = response.data.map(service => service.serviceId);
                
                fetchServiceDetails(serviceIds);
            } catch (error) {
                console.error("Erro ao buscar IDs dos serviços:", error);
            }
        };

        const fetchServiceDetails = async (serviceIds) => {
            try {
<<<<<<< HEAD
                console.log("LOGANDO IDS DOS SERVIÇOS", `${serviceIds.join(',')}`);
                const response = await axios.get(`${BASE_URL}/services/all_services?id=${serviceIds.join(',')}`);
=======
                console.log("LOGANDO IDS DOS SERVICOS", `${serviceIds.join(',')}`);
                const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/services/all_services?id=${serviceIds.join(',')}`);
>>>>>>> 76303614b4a3c8ffe57a292134f4c97b71e57d1d

                if (response.data.length > 0) {
                    const servicesData = response.data.map(item => {
                        const base64String = convertArrayBufferToBase64(item.image.data);
                        item.image = `data:image/jpeg;base64,${base64String}`;
                        return item;
                    });

                    setServices(servicesData);
                }

                setLoading(false);
            } catch (error) {
                console.error("Erro ao buscar detalhes dos serviços:", error);
                setLoading(false);
            }
        };

        fetchServiceIds();
    }, [companyId]);

    const convertArrayBufferToBase64 = (buffer) => {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
    };

    const renderItem = ({ item }) => (
        <View style={styles.serviceItem}>
            <Image source={{ uri: item.image }} style={styles.serviceImage} />
            <Text style={styles.serviceName}>{item.description}</Text>
        </View>
    );

    if (loading) {
        return <Text>Carregando serviços...</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Serviços Prestados</Text>
            <FlatList
                data={services}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
        paddingHorizontal: 16,
    },
    serviceItem: {
        alignItems: 'center',
        marginHorizontal: 10,
    },
    serviceImage: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginBottom: 5,
    },
    serviceName: {
        fontSize: 14,
        color: '#555',
    },
});

export default ServicesCardCompany;
