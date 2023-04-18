import React, { useEffect, useState } from "react";
import Dashboard from "../tampilan/staff umum/Dashboard";
import ListChat from "../tampilan/ChatAdmin";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Entypo from '@expo/vector-icons';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { firebase } from '../config/firebase';
import { TabBarIcon } from 'react-native-elements';
import PengajuanKeluhan from "../tampilan/staff umum/PengajuanKeluhan";
import ReminderKeluhan from "../tampilan/it/ReminderKeluhan";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PengajuanBarang from "../tampilan/it/PengajuanBarang";

const Tab = createMaterialTopTabNavigator();

const TabKeluhan = () => {
    const [user, setUser] = useState([]);
    useEffect(() => {
        firebase.firestore().collection('staff').doc(firebase.auth().currentUser.uid).onSnapshot((snapshots) => {
            setUser([snapshots.data()]);
        })
    }, [])
    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: '#fff',
                inactiveTintColor: '#dfe6e2',
                style: { backgroundColor: '#108EE9' }
            }}
        >
            <Tab.Screen name="ReminderKeluhan" component={ReminderKeluhan} options={{
                headerShown: false, tabBarLabel: 'Tugas'
            }}>
            </Tab.Screen>
            <Tab.Screen name="PengajuanBarang" component={PengajuanBarang} options={{
                tabBarLabel: 'Barang'
            }}>
            </Tab.Screen>
        </Tab.Navigator>

    )
}

export default TabKeluhan;