import 'react-native-gesture-handler';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabs from './MainTabs';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '@/pages/Login_page';
import RegisterScreen from '@/pages/register_page';
import { Stack } from 'expo-router';


const App = () => {
  const Stack = createNativeStackNavigator();
  return (
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
  );
};

export default App;
