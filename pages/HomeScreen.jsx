import { useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native';
import {BASE_URL} from '@env';
const HomeScreen = () => {
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const navigation = useNavigation();

  
  const fetchMecanicas = async () => {
    try {
      const response = await fetch(`${BASE_URL}/company/all_companies`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      }); 
      const json = await response.json();
      console.log(json);
      
      const updatedData = await Promise.all(
        json.map(async (item) => {
          
          const base64String = convertArrayBufferToBase64(item.image.data);
          return {
            ...item,
            image: `data:image/jpeg;base64,${base64String}`
          };
        })
      );
  
      setData(updatedData);
    } catch (error) {
      console.error('Erro ao buscar dados da API:', error);
    } finally {
      setLoading(false); 
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

  useEffect(() => {
    fetchMecanicas();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput style={styles.searchInput} placeholder="Buscar" />
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Filtros</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sortButton}>
          <Text style={styles.sortText}>Ordenar Por</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity 
          onPress={()=> navigation.navigate('CardOpened', {companyId:item.id})}
          style={styles.card}>
        
            <Image source={{ uri: item.image }} style={styles.logo} />
            <View style={styles.details}>
              <Text style={styles.name}>{item.name}</Text>
            </View>
            <View style={styles.ratingContainer}>
              <Text style={styles.rating}>{item.reviews_note.toFixed(1)}</Text>
              <Text style={styles.star}>★</Text>
            </View>
        
          </TouchableOpacity>
        )}
      />


      <Text style={styles.recentlyVisitedText}>Visitados Recentemente</Text>
      <FlatList
        data={data}
        horizontal={true}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.smallCard}>
            <Image source={{ uri: item.image }} style={styles.smallLogo} />
            <View style={styles.details}>
              <Text style={styles.name}>{item.name}</Text>
            </View>
            <View style={styles.ratingContainer}>
              <Text style={styles.rating}>{item.rating}</Text>
              <Text style={styles.star}>★</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchBar: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
    marginRight: 10,
  },
  filterButton: {
    justifyContent: 'center',
    padding: 10,
  },
  filterText: {
    fontWeight: 'bold',
  },
  sortButton: {
    justifyContent: 'center',
    padding: 10,
  },
  sortText: {
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#546474',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  details: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  ratingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  rating: {
    fontSize: 16,
    fontWeight: 'bold',
    color:'white',
  },
  star: { 
    fontSize: 16,
    color: '#ffd700',
  },
  recentlyVisitedText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  smallCard: {
    flexDirection: 'row',
    padding: 10,
    marginRight: 10,
    backgroundColor: '#546474',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  smallLogo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
