import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, FlatList, Modal, Button } from 'react-native';
import Location from '@/components/Location';
import ServicesCompany from '@/components/services_company_card';
import Whatsappbutton from '@/components/whatsapp_btn';
import ButtonCreateReview from '@/components/btn_create_review';
import ReviewContainer from '@/components/reviews_container';
import { decode } from 'react-native-pure-jwt';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const CardOpened = ({ route }) => {
  const { companyId } = route.params;
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState('');
  const [userRole, setUserrole] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [services , setServices] = useState(null);
  const { getItem } = useAsyncStorage('token');
  const [selectedServices, setSelectedServices] = useState([]);
  const [userCompany , setUsercompany] = useState(null);
  const [users , setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const encryptedToken = await getItem();
        if (encryptedToken) {
          const decodedToken = parseJwt(encryptedToken);
          (decodedToken);
          
          setUserId(decodedToken ? decodedToken.id : null);
          setUserrole(decodedToken ? decodedToken.role : null);
          ("LOGANDO ID USER ", userId);
          
        }
      } catch (error) {
        console.error("Erro ao recuperar o token:", error);
      }
    };
    fecthServices();
    fetchToken();
    fetchCustomersDetails();
  }, [getItem]);


  const fecthServices = async () => {
     try {
        const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/services/all_services`)
        
        const dataServices = response.data;

        setServices(dataServices);
        ("DATA SERVICES CARD OPENED", services);
     } catch (error) {
      
     }
  }

  const fetchCustomersDetails = async () => {
    (userRole);
    
    if(userRole === 'customer'){
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/customers/all_customers?id=${userId}`);
            if (response.ok) {
                const customerData = await response.json();

                setUsers(customerData);

                ("CUSTOMER DATA CLIENTE",users);
                
            } else {
               
            }
        } catch (error) {
           
        }
    }if (userRole  === 'mechanic_b2b') {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/mechanics_b2b/all_mechanics_b2b?id=${userId}`);
            if (response.ok) {
                const customerData = await response.json();
                setUsers(customerData);
                
                if (customerData.length > 0) {
                    setUsercompany(customerData[0].company_id);
                    console.log("EMPRESA TELA servicos", customerData[0].company_id);
                } else {
                    console.warn("Dados de cliente estão vazios.");
                }
            
            } else {
                
            }
        } catch (error) {
            
        }
    }
    
};


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

  const handleServiceSelect = (serviceId) => {
    setSelectedServices((prevSelected) => {
      if (prevSelected.includes(serviceId)) {
        return prevSelected.filter(id => id !== serviceId); 
      } else {
        return [...prevSelected, serviceId]; 
      }
    });
  };

  const renderServiceItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleServiceSelect(item.id)}>
      <View style={styles.serviceItem}>
        <View style={styles.radioContainer}>
          <FontAwesome
            name={selectedServices.includes(item.id) ? "dot-circle-o" : "circle-o"}
            size={20}
            color="#fff"
            style={styles.radioIcon}
          />
          <Text style={styles.descriptionServicesmodal}>{item.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );




  const handleSaveServices = async () => {
    try {
      const payload = {
        id_company: companyId, 
        description: "Alinhamento e Balanceamento", 
        company_name: company.name,
      };
  
      for (const serviceId of selectedServices) {
        (payload);
        
        
        await axios.patch(`${process.env.EXPO_PUBLIC_API_URL}/services/update_service/${serviceId}`, payload);
      }
      
      alert("Serviços atualizados com sucesso!");
      setModalVisible(false);
      setSelectedServices([]); 
    } catch (error) {
      console.error("Erro ao atualizar serviços:", error);
    }
  };
  

  const handleEditClick = () => {
    setIsModalOpen(true);
  };




  const renderContent = () => (
    <View style={styles.contentContainer}>
      <View style={styles.containerImageName}>
        <Image source={{ uri: company.image }} style={styles.logo} />
        <Text style={styles.name}>{company.name}</Text>
        <Text style={styles.text_grade}><Text style={styles.star}>★</Text>{company.reviews_note}</Text>
      </View>
      <Whatsappbutton phoneNumber={company.phone}/>
      <Text>{company.description}</Text>
      <Text>{company.location}</Text>
      <Location address={company.address}/>
      <ServicesCompany companyId={companyId}/>
      <ReviewContainer companyId={companyId}/>
      <View style={styles.btnaddservicescontainer}>

   { userRole === 'mechanic_b2b' && companyId === userCompany && userCompany !== null ?   ( <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.btnaddservices}>
                     <Text style={styles.textbtnaddservices}>Adicionar Serviços <AntDesign name="plus" size={24} style={styles.shareIcon} /></Text>  
      </TouchableOpacity>): 
       userRole === 'customer' ? (
        <ButtonCreateReview companyId={companyId} customerId={userId} />
       ): null }

{companyId === userCompany && (
       <TouchableOpacity onPress={handleEditClick} style={styles.btneditcompany}>
          <Text style={styles.textbtnaddservices}>Editar Empresa</Text>
       </TouchableOpacity>
      )}
</View> 
     


   
<Modal
  visible={modalVisible}
  animationType="slide"
  transparent={true}
  onRequestClose={() => setModalVisible(false)}
>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Registrar Serviços</Text>
      <FlatList
        data={services}
        renderItem={renderServiceItem}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.modalButtons}>
        <Button title="Cancelar" onPress={() => setModalVisible(false)} />
        <Button title="Salvar Serviço" onPress={handleSaveServices} />
      </View>
    </View>
  </View>
</Modal>

    </View>
  );

  return (
    <FlatList
      data={[{}]} 
      renderItem={renderContent}
      keyExtractor={() => "unique_key"}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  btneditcompany:{
    backgroundColor:'#3c4c64',
    width:160,
    height:40,
    borderRadius:20,
    alignItems:'center',
    display:'flex',
    justifyContent:'center'
  },
  descriptionServicesmodal:{
    color:'#fff',
    marginLeft:4
  },
  serviceItem: {
    padding: 10,
    backgroundColor: '#3c4c64',
    borderRadius: 5,
    marginBottom: 10,
    color:'#fff',

},
radioContainer: {
  flexDirection: 'row',
  alignItems: 'center',
},
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
},
modalContent: {
    height: '30%', 
    backgroundColor: '#3c4c64',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
},
modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
},
  textbtnaddservices:{
    color:'#fff',
    
  },
  btnaddservicescontainer:{
   display:'flex',
   alignItems:'center'
  },
    btnaddservices:{
    justifyContent:'center',
    backgroundColor:"#607D8B",
    width:"55%",
    height:"33%",
    alignItems:'center',
    padding:5,
    borderRadius:20
  },
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
    color: 'rgba(0, 0, 0, 1)',
  },
  text_grade: {
    position: 'absolute',
    marginLeft: 325,
    top: 5,
    color: '#ffd700',
  }, 
  star: { 
    fontSize: 16,
    color: '#ffd700',
  },
});

export default CardOpened;
