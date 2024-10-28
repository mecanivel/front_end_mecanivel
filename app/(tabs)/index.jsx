import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '@/pages/HomeScreen';
import CardOpened from '@/pages/opened_card';
import LoginScreen from '@/pages/Login_page';


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{title: 'Welcome'}}
        />
      <Stack.Screen name='CardOpened' component={CardOpened}/>
      <Stack.Screen name='LoginScreen' component={LoginScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;