import React from "react";
import Dashboard from "../tampilan/staff umum/Dashboard";
import ListChat from "../tampilan/ChatAdmin";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import IonIcons from 'react-native-vector-icons/Ionicons';
import ChatAdmin from "../tampilan/ChatAdmin";
import ChatIT from "../tampilan/ChatIT";
import ChatStaffUmum from "../tampilan/ChatStaffUmum";

const TabBawah = createBottomTabNavigator();
const TabAtas = createMaterialTopTabNavigator();

const TabTop = () => {
    return (
        <TabAtas.Navigator
            tabBarOptions={{
                activeTintColor: '#fff',
                inactiveTintColor: '#dfe6e2',
                style: { backgroundColor: '#05584F' }
            }}
        >
            <TabAtas.Screen name="chatAdmin" component={ChatAdmin} options={{ tabBarLabel: 'Admin' }}></TabAtas.Screen>
            <TabAtas.Screen name="chatIT" component={ChatIT} options={{ tabBarLabel: 'IT' }}></TabAtas.Screen>
            <TabAtas.Screen name="chatStaffUmum" component={ChatStaffUmum} options={{ tabBarLabel: 'Staff Umum' }}></TabAtas.Screen>
        </TabAtas.Navigator>
    )
}

const TabBottom = () => {
    return (
        <TabBawah.Navigator>
            <TabBawah.Screen name="Dashboard" component={Dashboard} options={{
                headerShown: false, tabBarLabel: 'Home', tabBarIcon: ({ color, size }) => (
                    <IonIcons name="home-outline" color={color} size={size}></IonIcons>
                ),
            }}>
            </TabBawah.Screen>
            <TabBawah.Screen name="Contact People" component={TabTop} options={{
                headerStyle: { backgroundColor: '#05584F' },
                headerTintColor: "#fff",
                tabBarLabel: 'Chat', tabBarIcon: ({ color, size }) => (
                    <IonIcons name="chatbubble-ellipses-outline" color={color} size={size}></IonIcons>
                ),
            }}></TabBawah.Screen>
        </TabBawah.Navigator>
    )
}

export default TabBottom;