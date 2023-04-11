import React from "react";
import Dashboard from "../tampilan/staff umum/Dashboard";
import ListChat from "../tampilan/ChatAdmin";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Entypo from '@expo/vector-icons';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { TabBarIcon } from 'react-native-elements';

const Tab = createBottomTabNavigator();

const TabBottom = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Dashboard" component={Dashboard} options={{
                headerShown: false, tabBarLabel: 'Home', tabBarIcon: ({ color, size }) => (
                    <IonIcons name="home-outline" color={color} size={size}></IonIcons>
                ),
            }}>
            </Tab.Screen>
            <Tab.Screen name="ListChat" component={ListChat} options={{
                tabBarLabel: 'Chat', tabBarIcon: ({ color, size }) => (
                    <IonIcons name="chatbubble-ellipses-outline" color={color} size={size}></IonIcons>
                ),
            }}></Tab.Screen>
        </Tab.Navigator>
    )
}

export default TabBottom;