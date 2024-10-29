import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import Location from '@/components/Location';
import ServicesCompany from '@/components/services_company_card';
import Whatsappbutton from '@/components/whatsapp_btn';
import ButtonCreateReview from '@/components/btn_create_review';
import ReviewContainer from '@/components/reviews_container';
import { decode } from 'react-native-pure-jwt';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

const CardOpened = ({ route }) => {
  const { companyId } = route.params;
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState('');
  const { getItem } = useAsyncStorage('token');

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const encryptedToken = await getItem();
        if (encryptedToken) {
          const decodedToken = parseJwt(encryptedToken);
          console.log(decodedToken);
          
          setUserId(decodedToken ? decodedToken.id : null);
          console.log("LOGANDO ID USER ", userId);
          
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

  const fetchCompanyDetails = async () => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/company/all_companies?id=${companyId}`);
      const json = await response.json();

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
  }, []);

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

  const renderContent = () => (
    <View style={styles.contentContainer}>
      <View style={styles.containerImageName}>
        <Image source={{ uri: company.image }} style={styles.logo} />
        <Text style={styles.name}>{company.name}</Text>
      </View>
      <Whatsappbutton phoneNumber={company.phone}/>
      <Text>{company.description}</Text>
      <Text>{company.location}</Text>
      <Location address={company.address}/>
      <ServicesCompany companyId={companyId}/>
      <ReviewContainer companyId={companyId}/>
      <ButtonCreateReview companyId={companyId} customerId={userId} />
    </View>
  );

  return (
    <FlatList
      data={[{}]} // Dummy data para renderizar uma única vez
      renderItem={renderContent}
      keyExtractor={() => "unique_key"}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  containerImageName: {
    flexDirection: 'row',
    alignItems: 'center',
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

export default CardOpened;
