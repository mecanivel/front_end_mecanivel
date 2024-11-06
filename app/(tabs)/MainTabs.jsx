import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from '@/components/homestack';
import ProfileInformation from '../../pages/ProfileInformation';
import { Ionicons } from '@expo/vector-icons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Tab = createBottomTabNavigator();

function MainTabs() {
    return (
        <Tab.Navigator initialRouteName="Home"
            screenOptions={() => ({
                tabBarShowLabel: false,
                tabBarHideOnKeyboard:true,
                tabBarStyle: {
                    position: 'absolute',
                    borderTopColor:'#000',
                    height: 60,
                },
            })}
        >
            <Tab.Screen
                name="Home"
                component={HomeStack}
                
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons style={{marginTop:5}} name={focused ? "home" : "home-outline"} size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen
                name="ProfileInformation"
                component={ProfileInformation}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="user" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default MainTabs;

