import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '@/pages/HomeScreen';
import OpenedCard from '@/pages/opened_card';
import LoginScreen from '@/pages/Login_page';
import CarPage from '@/pages/Cars_customer';
import CarRegister from '@/pages/Register_cars';
import RegisterPage from '@/pages/register_page';
const Stack = createNativeStackNavigator();

function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="HomeScreen" 
                component={HomeScreen} 
                options={{ headerShown: false }}
            />
            <Stack.Screen 
                name="OpenedCard" 
                component={OpenedCard} 
                options={{ headerShown: false }}
            />
            <Stack.Screen 
                name="LoginPage" 
                component={LoginScreen} 
                options={{ headerShown: false }}
            />
            <Stack.Screen 
                name="CarPage" 
                component={CarPage} 
                options={{ headerShown: false }}
            />
            <Stack.Screen 
                name="RegisterPage" 
                component={RegisterPage} 
                options={{ headerShown: false }}
            />
             <Stack.Screen 
                name="CarRegister" 
                component={CarRegister} 
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export default HomeStack;
