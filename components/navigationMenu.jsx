import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '@/pages/HomeScreen';
import ProfileInformation from '@/components/profile_information';
import { FontAwesome } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';



function ProfileDrawer() {
    const Drawer = createDrawerNavigator();
    return (
      <Drawer.Navigator
        screenOptions={{
          drawerPosition: 'right', 
          drawerType: 'slide', 
          overlayColor: "rgba(0, 0, 0, 0.2)", 
          headerShown: false,
        }}
      >
        <Drawer.Screen 
          name="ProfileInformation" 
          component={ProfileInformation} 
          options={{ title: 'Perfil' }} 
        />
      </Drawer.Navigator>
    );
  }


export default function MainMenu() {
    const Tab = createBottomTabNavigator();
    const Stack = createNativeStackNavigator();

    return (
        <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Profile') iconName = 'user';
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: '#ffffff' },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ headerShown: false }} 
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileDrawer} 
        options={{ headerShown: false }} 
      />
    </Tab.Navigator>
    )

 
}