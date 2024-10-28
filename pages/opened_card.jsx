import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import Location from '@/components/Location';
import ServicesCompany from '@/components/services_company_card';
import Whatsappbutton from '@/components/whatsapp_btn';
import {BASE_URL} from '@env';

const CardOpened = ({ route }) => {
  const { companyId } = route.params; 
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCompanyDetails = async () => {
    try {
      const response = await fetch(`${BASE_URL}/company/all_companies?id=${companyId}`);
      const json = await response.json();
      console.log("DADOS EMPRESA CARD ABERTO:",response);
      
      console.log("LOGANDO ID DA EMPRESA NO CARD ABERTO",companyId);
      
      if (json.length > 0) {
        const item = json[0]; 
        
        
        const base64String = convertArrayBufferToBase64(item.image.data);
        item.image = `data:image/jpeg;base64,${base64String}`;

        setCompany(item); 
      }
    } catch (error) {
      console.error('Erro ao buscar detalhes da empresa:', error);
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
    fetchCompanyDetails();
  }, [companyId]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!company) {
    return <Text>Empresa não encontrada</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.contaier_image_name}>
      <Image source={{ uri: company.image }} style={styles.logo} />
      <Text style={styles.name}>{company.name}</Text>
      </View>
      <Whatsappbutton phoneNumber={company.phone}/>
      <Text>{company.description}</Text>
      <Text>{company.location}</Text>
      <Location address={company.address}/>
      <ServicesCompany companyId={companyId}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,

  },
  contaier_image_name:{
    flexDirection: 'row', // Alinha a imagem e o nome da empresa horizontalmente
    alignItems: 'center', // Centraliza verticalmente os itens
    marginBottom: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  
});











export default CardOpened