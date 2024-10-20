// HomeScreen.js
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';

const data = [
  { id: 1, name: 'Mecânica 1', rating: 4.9, specs: ['Especificações', 'Especificações'], logo: 'https://via.placeholder.com/50' },
  { id: 2, name: 'Mecânica 2', rating: 4.7, specs: ['Especificações', 'Especificações'], logo: 'https://via.placeholder.com/50' },
  { id: 3, name: 'Mecânica', rating: 4.7, specs: ['Especificações', 'Especificações'], logo: 'https://via.placeholder.com/50' },
  // Adicione mais dados conforme necessário
];

const HomeScreen = () => {
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
          <View style={styles.card}>
            <Image source={{ uri: item.logo }} style={styles.logo} />
            <View style={styles.details}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.specs}>- {item.specs[0]}</Text>
              <Text style={styles.specs}>- {item.specs[1]}</Text>
            </View>
            <View style={styles.ratingContainer}>
              <Text style={styles.rating}>{item.rating}</Text>
              <Text style={styles.star}>★</Text>
            </View>
          </View>
        )}
      />

     
      <Text style={styles.recentlyVisitedText}>Visitados Recentemente</Text>
      <FlatList
        data={data}
        horizontal={true}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.smallCard}>
            <Image source={{ uri: item.logo }} style={styles.smallLogo} />
            <View style={styles.details}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.specs}>- {item.specs[0]}</Text>
              <Text style={styles.specs}>- {item.specs[1]}</Text>
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
  specs: {
    fontSize: 14,
    color: '#555',
  },
  ratingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  rating: {
    fontSize: 16,
    fontWeight: 'bold',
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
    backgroundColor: '#f0f0f0',
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
});

export default HomeScreen;
