import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import FormCompany from '@/components/formregisterCompany';
import CardOpened from "./opened_card";
export default function RegisterCompany({ route }) {
    const { company_id } = route.params;
    const [formVisible, setFormVisible] = useState(false);

    useEffect(() => {
       
    }, [company_id]); 

    const handleShowForm = () => {
        setFormVisible(true);
       
    };

    return (
        <View style={styles.container}>
           
            {company_id !== null && company_id !== undefined ? (
                 <CardOpened route={{ params: { companyId: company_id } }}/>
               
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
        padding: 0
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
