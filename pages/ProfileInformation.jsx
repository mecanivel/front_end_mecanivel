import AsyncStorage, { useAsyncStorage } from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, ActivityIndicator,TouchableOpacity } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "expo-router";
import { CommonActions } from "@react-navigation/native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


export default function ProfileInformation({ navigation }) {
    const { getItem } = useAsyncStorage('token');
    const [userId, setUserId] = useState(null);
    const [customers , setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const encryptedToken = await getItem();
                if (encryptedToken) {
                    const decodedToken = parseJwt(encryptedToken);
                    setUserId(decodedToken ? decodedToken.id : null);
                }
            } catch (error) {
                console.error("Erro ao recuperar o token:", error);
            }
            setLoading(false);
        };
        fetchToken();
    }, [getItem]);

    useEffect(() => {
        if (userId) {
            fetchCustomersDetails();
        }
    }, [userId]);

    const parseJwt = (token) => {
        try {
            let base64Url = token.split('.')[1];
            let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            if (base64.length % 4 !== 0) {
                base64 += '='.repeat(4 - (base64.length % 4));
            }
            let jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                    .join('')
            );
            return JSON.parse(jsonPayload);
        } catch (error) {
            console.error("Erro ao decodificar o JWT:", error);
            return null;
        }
    };

    const handleLogOut = () => {
        AsyncStorage.removeItem('token');
        navigation.dispatch(
            CommonActions.reset({
                index:0,
                routes:[{name:'LoginScreen'}],
            })
        )
    }
    
    const fetchCustomersDetails = async () => {
        if (!userId) return;
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/customers/all_customers?id=${userId}`);
            if (response.ok) {
                const customerData = await response.json();
                setCustomers(customerData);
            } else {
                console.error("Erro ao buscar detalhes do cliente:", response.status);
            }
        } catch (error) {
            console.error("Erro ao buscar detalhes da empresa:", error);
        }
    };

    useEffect(() => {
        if (userId) fetchCustomersDetails();
    }, [userId]);

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {userId === null ? (
                <View style={styles.authContainer}>

            
                    <Text style={styles.text_inform_logout} >Você não está logado <MaterialIcons style={styles.icon_inform_logout} name="block"/></Text>
                    <TouchableOpacity style={styles.authButton} onPress={() => navigation.navigate('LoginScreen')}>
                        <FontAwesome name="sign-in" size={20} color="white" />
                        <Text style={styles.authButtonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.authButton} onPress={() => navigation.navigate('RegisterScreen')}>
                        <FontAwesome name="user-plus" size={20} color="white" />
                        <Text style={styles.authButtonText}>Cadastrar</Text>
                    </TouchableOpacity>

                </View>
            ) : (
                <View>
                    {customers.length > 0 ? (
                        customers.map(customer => (
                            <View style={styles.userContainer} key={customer.id}>
                                <FontAwesome style={styles.iconUser} name="user" size={40} color="white" />
                                <Text style={styles.nameCustomer}>{customer.name}</Text>

                                <TouchableOpacity style={styles.button_log_out} onPress={() => handleLogOut()}>
                                    <FontAwesome name="sign-out" size={35} color="blue" style={styles.icon_logout} />
                                    
                                </TouchableOpacity>
                            </View>
                            
                        ))
                    ) : (
                        <Text>Informações do cliente não encontradas.</Text>
                    )}
                    <View style={styles.menuOptions}>
                        <TouchableOpacity style={styles.button}>
                            <FontAwesome name="clipboard" size={20} color="blue" style={styles.icon} />
                            <Text style={styles.buttonText}>Serviços Solicitados</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CarPage',{customer_id : userId})}>
                            <FontAwesome name="car" size={20} color="blue" style={styles.icon} />
                            <Text style={styles.buttonText}>Meus Carros</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    },
    icon_inform_logout:{
        color:"#dc143c",
        fontSize:20

    },
    text_inform_logout:{
        fontSize:20,
        marginBottom:30,
        alignItems:'center',
        flexDirection: 'row'
        
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    authContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    authButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
        width: 150,
        justifyContent: 'center',
    },
    authButtonText: {
        color: 'white',
        fontSize: 16,
        marginLeft: 8,
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#364c5d",
        padding: 20,
        color: '#00000',
    },
    iconUser: {
        marginRight: 20,
        color: 'white',
    },
    icon_logout: {
        marginRight: 20,
        color: '#dc143c',
    },
    nameCustomer: {
        fontSize: 16,
        color: 'white',
    },
    menuOptions: {
        marginTop: 20,
    },
    button_log_out: {
        flexDirection: 'row',
        justifyContent:'flex-end',
        alignItems: 'center',
        backgroundColor: '#364c5d',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
        marginLeft: 100,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f4f4f4',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
        marginLeft: 20,
    },
    buttonText: {
        fontSize: 16,
        color: 'black',
        marginLeft: 20,
    },
});
