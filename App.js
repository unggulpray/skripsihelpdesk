import React, { useEffect, useState } from "react";
import { firebase } from './src/config/firebase';
import 'react-native-gesture-handler';
import Login from "./src/tampilan/Login";
import CustomDrawer from "./src/component/CustomDrawer";
import Dashboard from "./src/tampilan/staff umum/Dashboard";
import DetailKeluhan from "./src/tampilan/staff umum/DetailKeluhan";
import PengajuanKeluhan from "./src/tampilan/staff umum/PengajuanKeluhan";
import BuatKeluhan from "./src/tampilan/staff umum/BuatKeluhan";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import Chat from "./src/tampilan/staff umum/Chat";
import { collection, limit, query, where } from "firebase/firestore";
import BuatPermintaan from "./src/tampilan/it/BuatPermintaan";
import KeluhanStaff from "./src/tampilan/it/KeluhanStaff";
import { getDocs } from "firebase/firestore";
import { async } from "@firebase/util";
import KelolaStaff from "./src/tampilan/admin/kelolastaff/KelolaStaff";
import TambahStaff from "./src/tampilan/admin/kelolastaff/TambahStaff";
import EditStaff from "./src/tampilan/admin/kelolastaff/EditStaff";
import StockBarang from "./src/tampilan/admin/kelolabarang/StockBarang";
import db from "./src/config/db";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [userSession, setUserSession] = useState([]);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
    firebase.firestore().collection('staff').where('idUser', '==', user.uid).limit(1).onSnapshot((snapshots) => {
      const staff = [];
      snapshots.forEach((doc) => {
        const data = doc.data();
        staff.push(data);
      });
      setUserSession(staff);
    });
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    console.log(initializing);
    return subscriber;

  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      </Stack.Navigator>
    );
  } else {
    return (
      userSession.map((item) => {
        if (item.role == 1) {
          return (
            <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />} screenOptions={{
              drawerActiveBackgroundColor: '#aa18ea',
              drawerActiveTintColor: '#fff',
              drawerLabelStyle: {
                marginLeft: -20,
                fontSize: 15
              }
            }} initialRouteName="Dashboard">
              <Drawer.Screen name="Dashboard" component={Dashboard} options={{
                headerShown: false, drawerIcon: ({ color }) => (
                  <FontAwesome name="dashboard" size={22} color={color} />
                )
              }} />
              <Drawer.Screen name="Management Staff" component={KelolaStaff} options={{
                headerStyle: {
                  backgroundColor: "#212529",
                },
                headerTintColor: "white",
                drawerIcon: ({ color }) => (
                  <Fontisto name="person" size={22} color={color} />
                )
              }} />
              <Drawer.Screen name="TambahStaff" component={TambahStaff} options={{ drawerItemStyle: { display: "none" }, headerStyle: { backgroundColor: "#212529" }, headerTintColor: "white" }}></Drawer.Screen>
              <Drawer.Screen name="EditStaff" component={EditStaff} options={{ drawerItemStyle: { display: "none" }, headerStyle: { backgroundColor: "#212529" }, headerTintColor: "white" }}></Drawer.Screen>
              <Drawer.Screen name="Management Barang" component={StockBarang} options={{
                headerStyle: { backgroundColor: "#212529" }, headerTintColor: "white", drawerIcon: ({ color }) => (
                  <Feather name="box" size={22} color={color} />
                )
              }}></Drawer.Screen>
            </Drawer.Navigator >
          )
        } else if (item.role == 2) {
          return (
            <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />} screenOptions={{
              drawerActiveBackgroundColor: '#aa18ea',
              drawerActiveTintColor: '#fff',
              drawerLabelStyle: {
                marginLeft: -20,
                fontSize: 15
              }
            }} initialRouteName="Dashboard">
              <Drawer.Screen name="Dashboard" component={Dashboard} options={{
                headerShown: false, drawerIcon: ({ color }) => (
                  <FontAwesome name="dashboard" size={22} color={color} />
                )
              }} />
              <Drawer.Screen name="Reminder Keluhan" component={PengajuanKeluhan} options={{
                headerStyle: {
                  backgroundColor: "#212529",
                },
                headerTintColor: "white",
                drawerIcon: ({ color }) => (
                  <FontAwesome name="ticket" size={22} color={color} />
                )
              }} />
              <Drawer.Screen name="Pengajuan Barang" component={PengajuanKeluhan} options={{
                headerStyle: {
                  backgroundColor: "#212529",
                },
                headerTintColor: "white",
                drawerIcon: ({ color }) => (
                  <FontAwesome name="ticket" size={22} color={color} />
                )
              }} />
              <Drawer.Screen name="Laporan" component={PengajuanKeluhan} options={{
                headerStyle: {
                  backgroundColor: "#212529",
                },
                headerTintColor: "white",
                drawerIcon: ({ color }) => (
                  <FontAwesome name="ticket" size={22} color={color} />
                )
              }} />
            </Drawer.Navigator >
          )
        }
      })
    );
  }
}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
}