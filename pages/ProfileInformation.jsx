import AsyncStorage, { useAsyncStorage } from "@react-native-async-storage/async-storage";
import React, { useEffect, useState, useCallback } from "react";
import { View, Text, Button, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { CommonActions } from "@react-navigation/native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function ProfileInformation({ navigation }) {
    const { getItem } = useAsyncStorage('token');
    const [userId, setUserId] = useState(null);
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userRole, setUserrole] = useState(null); 
    const [userCompany , setUsercompany] = useState(null);

    const fetchToken = async () => {
        try {
            const encryptedToken = await getItem();
           

            if (encryptedToken) {
                const decodedToken = parseJwt(encryptedToken);
              
                const userIdfromtoken = decodedToken.id;

                setUserId(userIdfromtoken);
                setUserrole(decodedToken.role);
               

                
                
            }
            setLoading(false);
        } catch (error) {
            console.error("Erro ao recuperar o token:", error);
            setLoading(false);
        }
        
    };

    useFocusEffect(
    useCallback(() => {
        const initialize = async () => {
            await fetchToken();
            fetchCustomersDetails();
        };
        
        initialize();
    }, [])
);

useEffect(() => {
    if (userId && userRole) {
        fetchCustomersDetails();
    }
}, [userId, userRole]);



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
                index: 0,
                routes: [{ name: 'LoginScreen' }],
            })
        );
    };

    

    const fetchCustomersDetails = async () => {
        (userRole);
        
        if(userRole === 'customer'){
            try {
                const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/customers/all_customers?id=${userId}`);
                if (response.ok) {
                    const customerData = await response.json();

                    setUsers(customerData);

                    ("CUSTOMER DATA CLIENTE",users);
                    
                } else {
                    console.error("Erro ao buscar detalhes do cliente:", response.status);
                }
            } catch (error) {
                console.error("Erro ao buscar detalhes da empresa:", error);
            }
        }if (userRole  === 'mechanic_b2b') {
            try {
                const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/mechanics_b2b/all_mechanics_b2b?id=${userId}`);
                if (response.ok) {
                    const customerData = await response.json();
                    setUsers(customerData);
                    
                    if (customerData.length > 0) {
                        setUsercompany(customerData[0].company_id);
                        ("EMPRESA TELA PERFIL", customerData[0].company_id);
                    } else {
                        console.warn("Dados de cliente estão vazios.");
                    }
                
                } else {
                    console.error("Erro ao buscar detalhes do cliente:", response.status);
                }
            } catch (error) {
                console.error("Erro ao buscar detalhes da empresa:", error);
            }
        }
        
    };

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    
    

    const UserHeader = ({ users, handleLogOut }) => (
        
        <>
            {users !== null ? (
                users.map(user => (
                    <View style={styles.userContainer} key={user.id}>
                        <FontAwesome style={styles.iconUser} name="user" size={40} color="white" />
                        <Text style={styles.nameCustomer}>{user.name}</Text>
                        <TouchableOpacity style={styles.button_log_out} onPress={handleLogOut}>
                            <FontAwesome name="sign-out" size={35} color="blue" style={styles.icon_logout} />
                        </TouchableOpacity>
                    </View>
                ))
            ): <Text>Não está logado</Text>}
        </>
    );

    const MenuOptions = ({ userRole, userId, userCompany, navigation }) => (
        <View style={styles.menuOptions}>
            {userRole !== 'mechanic_b2b' && (
                <TouchableOpacity style={styles.button}>
                    <FontAwesome name="clipboard" size={20} color="blue" style={styles.icon} />
                    <Text style={styles.buttonText}>Serviços Solicitados</Text>
                </TouchableOpacity>
            )}

            { userRole !== 'mechanic_b2b' && ( <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CarPage', { customer_id: userId })}>
                <FontAwesome name="car" size={20} color="blue" style={styles.icon} />
                <Text style={styles.buttonText}>Meus Carros</Text>
            </TouchableOpacity>)}

            {userRole !== 'customer' && (
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CompanyRegister', { customer_id: userId, company_id: userCompany })}>
                    <FontAwesome name="bank" size={20} color="blue" style={styles.icon} />
                    <Text style={styles.buttonText}>Minha empresa</Text>
                </TouchableOpacity>
            )}
        </View>
    );

    const AuthContainer = ({ navigation }) => (
        <View style={styles.authContainer}>
            <Text style={styles.text_inform_logout}>
                Você não está logado <MaterialIcons style={styles.icon_inform_logout} name="block" />
            </Text>
            
            <TouchableOpacity style={styles.authButton} onPress={() => navigation.navigate('LoginScreen')}>
                <FontAwesome name="sign-in" size={20} color="white" />
                <Text style={styles.authButtonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.authButton} onPress={() => navigation.navigate('RegisterScreen')}>
                <FontAwesome name="user-plus" size={20} color="white" />
                <Text style={styles.authButtonText}>Cadastrar</Text>
            </TouchableOpacity>
        </View>
    );
    

   
    return (
        <View style={styles.container}>
        {userId !== null ? (
            <View>
                
                <UserHeader users={users} handleLogOut={handleLogOut} />

                <MenuOptions userRole={userRole} userId={userId} userCompany={userCompany} navigation={navigation} />
            </View>
        ) : (
            <AuthContainer navigation={navigation} />
        )}
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    },
    icon_inform_logout: {
        color: "#dc143c",
        fontSize: 20
    },
    text_inform_logout: {
        fontSize: 20,
        marginBottom: 30,
        alignItems: 'center',
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
        justifyContent: 'flex-end',
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
