import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet, FlatList } from "react-native";


export default function ReviewsContainer({ companyId }) {
    const [reviews, setReviews] = useState([]);
    const [customers, setCustomers] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/reviews/all_reviews?companyId=${companyId}`);
                const reviewData = response.data;
                setReviews(reviewData);

                const customerIds = reviewData.map(review => review.customerId);
                fetchCustomers(customerIds);
            } catch (error) {
                console.error("Erro ao buscar reviews:", error);
                setLoading(false);
            }
        };

        const fetchCustomers = async (customerIds) => {
            try {
                const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/customer/all?id=${customerIds.join(',')}`);
                const customerData = response.data;

                const customerMap = {};
                customerData.forEach(customer => {
                    customerMap[customer.id] = customer;
                });

                setCustomers(customerMap);
                setLoading(false);
            } catch (error) {
                console.error("Erro ao buscar detalhes dos clientes:", error);
                setLoading(false);
            }
        };

        fetchReviews();
    }, [companyId]);

    const renderReviewCard = ({ item }) => {
        const customer = customers[item.customerId];
        
        return (
            <View style={styles.card}>
                <Text style={styles.name}>{customer ? customer.name : "Nome não disponível"}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.rating}>Nota: {item.rating}</Text>
            </View>
        );
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={reviews}
                renderItem={renderReviewCard}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        margin: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
    },
    description: {
        fontSize: 16,
        marginVertical: 10,
    },
    rating: {
        fontSize: 14,
        color: "#888",
    },
});
