import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';

const LocationComponent = ({ address }) => {
  const [location, setLocation] = useState(null); 
  const [loading, setLoading] = useState(true); 



  
 
  const fetchCoordinates = async () => {
    try {
      const apiKey = 'AIzaSyAM7JH1EDYOVumsqZQ6DsHjmG7uJ-Kp6Zc'; 
      console.log(address);
      
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`
      );
     
      
      if (response.data.status === 'OK') {
        const { lat, lng } = response.data.results[0].geometry.location;
        setLocation({ latitude: lat, longitude: lng });
      } else {
        console.error('Erro ao buscar coordenadas:', response.data.status);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    } finally {
      setLoading(false); // Para o carregamento
    }
  };

  
  useEffect(() => {
    fetchCoordinates();
  }, []);

  if (loading) {

    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!location) {
   
    return <Text>Não foi possível carregar o mapa</Text>;
  }

  return (
    <View>
      <Text>Localização</Text>
      <MapView
        style={{ width: '100%', height: 200 }}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }} />
      </MapView>
      <Text>{address}</Text>
    </View>
  );
};

export default LocationComponent;
