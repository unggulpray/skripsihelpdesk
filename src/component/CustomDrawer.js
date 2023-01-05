import react from "react";
import { ImageBackground, View, Image, Text, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { firebase } from '../config/firebase';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomDrawer = props => {
    return (
        <View style={{ flex: 1, top: -40 }}>
            <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: '#fff' }}>
                <View>
                    <ImageBackground source={{ uri: 'https://sekawantriasa.com/wp-content/uploads/2021/08/Esa-Unggul-Tangerang.jpg' }} style={{ width: '100%', height: 200, }} />
                    <View style={[styles.backgroundText, styles.absolute, { bottom: 5 }]}><Text></Text></View>
                    <View style={[styles.absolute, { bottom: 5, flexDirection: 'row', marginLeft: 10 }]}>
                        <Image source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/mobilehelpdesk-ba63a.appspot.com/o/Unggul-Prayuda.jpg?alt=media&token=85d167b9-eccf-453d-9b2e-4ba9d438fafd' }} style={{ width: 70, height: 70, borderRadius: 100, }} />
                        <View style={{ flexDirection: 'column', marginTop: 20, marginLeft: 10 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#F27022' }}>Unggul Prayuda</Text>
                            <Text style={{ color: '#ffffff', fontSize: 16 }}>Staff Administrator</Text>
                        </View>
                    </View>
                </View>
                <DrawerItemList {...props} />
                <DrawerItem label="Logout" onPress={() => { firebase.auth().signOut() }}>
                </DrawerItem>
            </DrawerContentScrollView>
        </View>
    );
}
export default CustomDrawer;

const styles = StyleSheet.create({
    absolute: {
        position: 'absolute',
    },
    backgroundText: {
        color: "white",
        width: "80%",
        marginLeft: "10%",
        fontSize: 42,
        opacity: 0.8,
        lineHeight: 200,
        height: 50,
        fontWeight: "bold",
        backgroundColor: "#949191",
    }
});