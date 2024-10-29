import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, ActivityIndicator } from "react-native";

export default function ProfileInformation() {
    const { getItem } = useAsyncStorage('token');
    const [userId, setUserId] = useState(null);
    const [customers , setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const encryptedToken = await getItem();
                if (encryptedToken) {
                    console.log("logando token tela info user", encryptedToken);
                    
                    const decodedToken = parseJwt(encryptedToken);
                    setUserId(decodedToken ? decodedToken.id : null);
                }
            } catch (error) {
                console.error("Erro ao recuperar o token:", error);
            }
        };
        fetchToken();
    }, [getItem]);

    const parseJwt = (token) => {
        try {
            let base64Url = token.split('.')[1];
            if (!base64Url) throw new Error("Token inválido: não possui payload.");
    
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
    
    const fectCustomersDetails = async () => {
        if (!userId) return;
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/customers/all_customers?id=${userId}`);
            if (response.ok) {
                const customerData = await response.json();
                console.log(customerData);
                
                setCustomers(customerData);
            } else {
                console.error("Erro ao buscar detalhes do cliente:", response.status);
            }
        } catch (error) {
            console.error("Erro ao buscar detalhes da empresa:", error);
        } finally {
            setLoading(false);
        }
    };

      useEffect(() => {
        if(userId) fectCustomersDetails();

      },[userId])

      if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Informações do Usuário</Text>
            {customers.length > 0 ? (
                customers.map(customer => (
                    <Text key={customer.id} style={styles.namecustomer}>{customer.name}</Text>
                ))
            ) : (
                <Text>Informações do cliente não encontradas.</Text>
            )}

            <View style={styles.menuOptions}>
                <Button title="Tornar-se Mecânico" onPress={() => { /* Lógica do botão */ }} />
                <Button title="Serviços Solicitados" onPress={() => { /* Lógica do botão */ }} />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    namecustomer:{
        color:"#00000"
    },

    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f4f4f4',
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    menuOptions: {
        marginTop: 20,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});