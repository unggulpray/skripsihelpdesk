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
import Chat from "./src/tampilan/Chat";
import KeluhanStaff from "./src/tampilan/it/ReminderKeluhan";
import KelolaStaff from "./src/tampilan/admin/kelolastaff/KelolaStaff";
import TambahStaff from "./src/tampilan/admin/kelolastaff/TambahStaff";
import EditStaff from "./src/tampilan/admin/kelolastaff/EditStaff";
import StockBarang from "./src/tampilan/admin/kelolabarang/StockBarang";
import DetailReminder from "./src/tampilan/it/DetailReminder";
// import VideoCall from "./src/component/VideoCall";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBottom from "./src/component/TabBottom";


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();



const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [userSession, setUserSession] = useState([]);

  function onAuthStateChanged(user) {
    try {
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
    } catch (e) {
      console.log(e);
    }
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
              <Drawer.Screen name="Dashboard" component={TabBottom} options={{
                headerShown: false, drawerIcon: ({ color }) => (
                  <FontAwesome name="dashboard" size={22} color={color} />
                )
              }} />
              <Drawer.Screen name="KelolaStaff" component={KelolaStaff} options={{
                headerStyle: {
                  backgroundColor: "#212529",
                },
                headerTintColor: "white",
                drawerIcon: ({ color }) => (
                  <Fontisto name="person" size={22} color={color} />
                )
              }} />
              <Drawer.Screen name="Chat" component={Chat} options={{
                headerStyle: {
                  backgroundColor: "#fff",
                },
                drawerItemStyle: {
                  display: "none"
                },
                drawerIcon: ({ color }) => (
                  <FontAwesome name="ticket" size={22} color={color} />
                )
              }} />
              {/* <Drawer.Screen name="VideoCall" component={VideoCall} options={{ drawerItemStyle: { display: "none" }, headerStyle: { backgroundColor: "#212529" }, headerTintColor: "white" }}></Drawer.Screen> */}
              <Drawer.Screen name="TambahStaff" component={TambahStaff} options={{ drawerItemStyle: { display: "none" }, headerStyle: { backgroundColor: "#212529" }, headerTintColor: "white" }}></Drawer.Screen>
              {/* <Drawer.Screen name="VideoCall" component={VideoCall} options={{ drawerItemStyle: { display: "none" }, headerStyle: { backgroundColor: "#212529" }, headerTintColor: "white" }}></Drawer.Screen> */}
              <Drawer.Screen name="EditStaff" component={EditStaff} options={{ drawerItemStyle: { display: "none" }, headerStyle: { backgroundColor: "#212529" }, headerTintColor: "white" }}></Drawer.Screen>
              <Drawer.Screen name="ManagementBarang" component={StockBarang} options={{
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
              <Drawer.Screen name="Dashboard" component={TabBottom} options={{
                headerShown: false,
                drawerIcon: ({ color }) => (
                  <FontAwesome name="ticket" size={22} color={color} />
                )
              }} />
              <Drawer.Screen name="Reminder Keluhan" component={KeluhanStaff} options={{
                headerStyle: {
                  backgroundColor: "#212529",
                },
                headerTintColor: "white",
                drawerIcon: ({ color }) => (
                  <FontAwesome name="ticket" size={22} color={color} />
                )
              }} />
              <Drawer.Screen name="Chat" component={Chat} options={{
                headerStyle: {
                  backgroundColor: "#fff",
                },
                drawerItemStyle: {
                  display: "none"
                },
                drawerIcon: ({ color }) => (
                  <FontAwesome name="ticket" size={22} color={color} />
                )
              }} />
              <Drawer.Screen name="Detail" component={DetailReminder} options={{
                headerStyle: {
                  backgroundColor: "#212529",
                },
                drawerItemStyle: {
                  display: "none"
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
        } else {
          return (
            <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />} screenOptions={{
              drawerActiveBackgroundColor: '#aa18ea',
              drawerActiveTintColor: '#fff',
              drawerLabelStyle: {
                marginLeft: -20,
                fontSize: 15
              }
            }} initialRouteName="Dashboard">
              <Drawer.Screen name="Dashboard" component={TabBottom} options={{
                headerShown: false, drawerIcon: ({ color }) => (
                  <FontAwesome name="dashboard" size={22} color={color} />
                )
              }} />
              <Drawer.Screen name="Chat" component={Chat} options={{
                headerStyle: {
                  backgroundColor: "#fff",
                },
                drawerItemStyle: {
                  display: "none"
                },
                drawerIcon: ({ color }) => (
                  <FontAwesome name="ticket" size={22} color={color} />
                )
              }} />
              <Drawer.Screen name="PengajuanKeluhan" component={PengajuanKeluhan} options={{
                headerStyle: {
                  backgroundColor: "#212529",
                },
                drawerIcon: ({ color }) => (
                  <FontAwesome name="ticket" size={22} color={color} />
                )
              }} />
              <Drawer.Screen name="BuatKeluhan" component={BuatKeluhan} options={{
                drawerItemStyle: {
                  display: "none"
                },
                headerStyle: {
                  backgroundColor: "#212529",
                },
                headerTintColor: "white",
                drawerIcon: ({ color }) => (
                  <FontAwesome name="ticket" size={22} color={color} />
                )
              }} />
              <Drawer.Screen name="Detail" component={DetailKeluhan} options={{
                headerShown: false,
                drawerItemStyle: {
                  display: "none"
                },
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