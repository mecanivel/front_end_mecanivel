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
                console.log("company ID", companyId);
                
                const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/reviews/all_reviews?companyId=${companyId}`);
                console.log("LOGANDO URL CONTAINER REVIEW", `${process.env.EXPO_PUBLIC_API_URL}/reviews/all_reviews?companyId=${companyId}`);
                
                const reviewData = response.data;
                console.log("REVIEWS",reviewData);

                
                setReviews(reviewData);

                
                const customerIds = [...new Set(reviewData.map(review => review.customerId))];
                fetchCustomers(customerIds);

            } catch (error) {
                console.error("Erro ao buscar reviews:", error);
                setLoading(false);
            }
        };

        const fetchCustomers = async (customerIds) => {
            try {
                // Busca os dados dos clientes com os IDs obtidos das reviews
                const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/customers/all_customers?id=${customerIds.join(',')}`);
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
                <Text style={styles.rating}>{item.grade} <Text style={styles.star}>★</Text></Text>
                
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
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.flatlist}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    star: { 
        fontSize: 16,
        color: '#ffd700',
      },
      
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15,
        color:'#ffffff'
    },
    flatlist:{
color:'#ffffff'
    },
    card: {
        backgroundColor: "#384c5c",
        borderRadius: 10,
        padding: 20,
        margin: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
        color:'white',
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
        color:'white',
    },
    description: {
        fontSize: 16,
        marginVertical: 10,
        color:'white',
    },
    rating: {
        fontSize: 14,
        color:'white',
    },
});
