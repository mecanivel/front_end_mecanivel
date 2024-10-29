import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '@/pages/HomeScreen';
import CardOpened from '@/pages/opened_card';
import LoginScreen from '@/pages/Login_page';
import MainMenu from '@/components/navigationMenu';


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer independent={true} >
      <Stack.Navigator initialRouteName='MainMenu'>
        
        <Stack.Screen 
        name="MainMenu"
        component={MainMenu} 
        options={{ headerShown: false }}
        />
      <Stack.Screen name='CardOpened' component={CardOpened}/>
      <Stack.Screen name='LoginScreen' component={LoginScreen}/>


      </Stack.Navigator>

     
    </NavigationContainer>
  );
};

export default App;