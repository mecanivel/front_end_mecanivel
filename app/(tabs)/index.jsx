import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '@/pages/HomeScreen';
import CardOpened from '@/pages/opened_card';

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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;