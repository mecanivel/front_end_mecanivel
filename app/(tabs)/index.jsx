import 'react-native-gesture-handler';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabs from './MainTabs';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '@/pages/Login_page';
import RegisterScreen from '@/pages/register_page';
import HomeScreen from '@/pages/HomeScreen';
import CompanyRegister from '@/pages/Register_company';
import SelectServices from '@/pages/Select_services';

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer independent={true}>
                <Stack.Navigator>
                    <Stack.Screen
                        name="MainTabs"
                        component={MainTabs}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="LoginScreen"
                        component={LoginScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="RegisterScreen"
                        component={RegisterScreen}
                        options={{ headerShown: false }}
                    />
                   
                    
                </Stack.Navigator>
            </NavigationContainer>
        </GestureHandlerRootView>
    );
};

export default App;
