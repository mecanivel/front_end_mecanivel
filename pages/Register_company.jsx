import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import FormCompany from '@/components/formregisterCompany';

export default function RegisterCompany({ route }) {
    const { company_id } = route.params;
    const [formVisible, setFormVisible] = useState(false);


    
    useEffect(() => {
       console.log("LOGANDO O ID DA EMPRESA",company_id);
       
    }, [company_id]); // Dependência company_id para verificar sempre que ele mudar

    const handleShowForm = () => {
        setFormVisible(true);
    };


    return (
        <View style={styles.container}>
            {company_id !== null || undefined ? (
                <Text>Empresa</Text>
            ) : formVisible ? (
                <FormCompany />
            ) : (
                <TouchableOpacity style={styles.button} onPress={handleShowForm}>
                    <Text style={styles.buttonText}>Cadastrar empresa</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding:0
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
