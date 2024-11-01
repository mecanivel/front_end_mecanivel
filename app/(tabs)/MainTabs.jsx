import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from '../../pages/HomeScreen';
import ProfileInformation from '../../pages/ProfileInformation';
import OpenedCard from '../../pages/opened_card';
import RegisterPage from '../../pages/register_page';
import LoginPage from '../../pages/Login_page';
import {Ionicons} from '@expo/vector-icons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Tab = createBottomTabNavigator();


function MainTabs(){
    return (
        <Tab.Navigator initialRouteName="HomeScreen"
         screenOptions={{
            tabBarShowLabel:false,
            tabBarStyle:{
                position:'absolute',
                borderColor:'#00000',
                borderWidth:1,
                bottom:20,
                left:14,
                right:14,
                elevation:0,
                borderRadius:20,
                height:60
            }
         }}>
            <Tab.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    headerShown:false,
                    tabBarIcon:({color,size,focused}) => {
                        if(focused){
                            return <Ionicons name="home" size={size} color={color}/>
                        }
                        return <Ionicons name="home-outline" size={size} color={color} />
                    }
                }}
            />
            <Tab.Screen
                name="ProfileInformation"
                component={ProfileInformation}
                options={{
                    headerShown:false,
                    tabBarIcon:({color,size,focused}) => {
                        
                            return <AntDesign name="user" size={size} color={color}/>
                        
                        
                    }
                }}
            />
        </Tab.Navigator>
    )
}

export default MainTabs;