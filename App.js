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
import Chat from "./src/tampilan/staff umum/Chat";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
//         <Stack.Screen name="Detail" component={DetailKeluhan} options={{ headerShown: false }} />
//         <Stack.Screen name="Pengajuan Keluhan" component={PengajuanKeluhan} />
//         <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   )
// }

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();


  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
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
        <Drawer.Screen name="Chat" component={Chat} options={({ route }) => ({ title: route.params?.title || 'wkkw', drawerItemStyle: { display: "none" } })} />
        <Drawer.Screen name="Detail" component={DetailKeluhan} options={{ headerShown: false, drawerItemStyle: { display: "none" } }} />
        <Drawer.Screen name="BuatKeluhan" component={BuatKeluhan} options={{ drawerItemStyle: { display: "none" } }} />
        <Drawer.Screen name="PengajuanKeluhan" component={PengajuanKeluhan} options={{
          headerStyle: {
            backgroundColor: "blue",
          },
          headerTintColor: "white",
          drawerIcon: ({ color }) => (
            <FontAwesome name="ticket" size={22} color={color} />
          )
        }} />
        {/* <Drawer.Screen name="Logout" component={Login} options={{
          headerShown: false, drawerIcon: ({ color }) => (
            <MaterialCommunityIcons name="logout" size={22} color={color} />
          )
        }} /> */}
      </Drawer.Navigator>
      // <Stack.Navigator initialRouteName="Dashboard">
      //   <Stack.Screen name="Dashboard" component={Dashboard} />
      //   <Stack.Screen name="Pengajuan" component={PengajuanKeluhan} />
      //   <Stack.Screen name="Detail" component={DetailKeluhan} />
      // </Stack.Navigator>
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

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />} screenOptions={{
//         drawerActiveBackgroundColor: '#aa18ea',
//         drawerActiveTintColor: '#fff',
//         drawerLabelStyle: {
//           marginLeft: -20,
//           fontSize: 15
//         }
//       }} initialRouteName="Login">
//         <Drawer.Screen name="Dashboard" component={Dashboard} options={{
//           headerShown: false, drawerIcon: ({ color }) => (
//             <FontAwesome name="dashboard" size={22} color={color} />
//           )
//         }} />
//         <Drawer.Screen name="Pengajuan Keluhan" component={PengajuanKeluhan} options={{
//           drawerIcon: ({ color }) => (
//             <FontAwesome name="ticket" size={22} color={color} />
//           )
//         }} />
//         <Drawer.Screen name="Logout" component={Login} options={{
//           headerShown: false, drawerIcon: ({ color }) => (
//             <MaterialCommunityIcons name="logout" size={22} color={color} />
//           )
//         }} />
//       </Drawer.Navigator>
//     </NavigationContainer >
//   )
// }

// export default App;