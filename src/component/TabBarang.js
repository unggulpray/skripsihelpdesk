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
import StockBarang from "../tampilan/admin/kelolabarang/StockBarang";
import BarangMasuk from "../tampilan/admin/kelolabarang/BarangMasuk";
import BarangKeluar from "../tampilan/admin/kelolabarang/BarangKeluar";

const Tab = createMaterialTopTabNavigator();

const TabBarang = () => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: '#fff',
                inactiveTintColor: '#dfe6e2',
                style: { backgroundColor: '#212529' }
            }}
        >
            <Tab.Screen name="Stok" component={StockBarang} options={{
                headerShown: false, tabBarLabel: 'Stok'
            }}></Tab.Screen>
            <Tab.Screen name="BarangMasuk" component={BarangMasuk} options={{
                headerShown: false, tabBarLabel: 'Barang Masuk'
            }}></Tab.Screen>
            <Tab.Screen name="BarangKeluar" component={BarangKeluar} options={{
                headerShown: false, tabBarLabel: 'Barang Keluar'
            }}></Tab.Screen>
        </Tab.Navigator>

    )
}

export default TabBarang;