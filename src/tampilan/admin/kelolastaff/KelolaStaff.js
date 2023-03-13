import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Text, TextInput, StyleSheet, TouchableHighlight, Image, View, Linking, ImageBackground } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunity from "react-native-vector-icons/MaterialCommunityIcons";
import { firebase } from "../../../config/firebase";
import db from "../../../config/db";

const deleteStaff = async (email) => {
    try {
        const user = await firebase.auth().signInWithEmailAndPassword(email);
        await user.delete();
        console.log('user delete successfully');
    } catch (error) {
        console.error(error);
    }
}

const KelolaStaff = ({ navigation }) => {
    const [staff, setStaff] = useState([]);
    useEffect(() => {
        firebase.firestore().collection('staff').onSnapshot((querySnapshot) => {
            const docsStaff = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data()
                data.id = doc.id
                docsStaff.push(data)
            });
            setStaff(docsStaff);
        });
        // ; (async () => {
        //     const snapshots = await getDocs(collection(db, "staff"));
        //     const getStaff = snapshots.docs.map((doc) => {
        //         const data = doc.data()
        //         data.id = doc.id
        //         return data;
        //     })
        //     setStaff(getStaff);
        // })();
    }, [])
    return (
        <View>
            <ImageBackground source={require('../../../../assets/images/background-list.jpg')} resizeMode="cover" style={[styles.background, { width: '100%', height: '100%' }]}>
                <View>
                    {/* <ImageBackground source={require('../../../assets/images/background-login.jpg')} resizeMode="cover" style={[styles.background, { width: '100%', height: '100%' }]}> */}
                    <TextInput style={[styles.search, { borderColor: "#00000", borderWidth: 4, marginBottom: 10, marginTop: 10 }]} placeholder="Search" onChangeText={search => test(search)} />
                    <ScrollView>
                        {
                            staff.map((item, index) => {
                                return (
                                    <View key={item.id} style={[styles.listKeluhan, { flexDirection: "row", borderColor: "#000000", borderWidth: 1, }]}>
                                        <TouchableHighlight onPress={() => navigation.navigate('EditStaff', { data: staff[index] })} style={{ width: '80%' }}>
                                            <View style={[{ flexDirection: "row", }]}>
                                                <Image source={{ uri: 'https://i1.rgstatic.net/ii/profile.image/1083598790766599-1635361492906_Q512/Unggul-Prayuda.jpg' }} style={{ width: 50, height: 50, marginLeft: 4 }} />
                                                <View style={{ flexDirection: "column", marginLeft: 15 }}>
                                                    <Text style={{ fontWeight: "bold" }}>{item.nama}</Text>
                                                    <Text>Status : {item.noTelp}</Text>
                                                </View>
                                            </View>
                                        </TouchableHighlight>
                                        <View style={[{ flexDirection: "row" }]}>
                                            <TouchableHighlight onPress={() => navigation.navigate('EditStaff', { data: staff[index] })} style={styles.center}><FontAwesome name="edit" style={[styles.icon, { color: "green", fontSize: 20 }]}></FontAwesome></TouchableHighlight>
                                            <TouchableHighlight onPress={deleteStaff(item.email)} style={{ marginLeft: '2%' }}><MaterialCommunity name="delete-outline" style={[styles.icon, { color: 'green', fontSize: 25, fontWeight: 'bold' }]}></MaterialCommunity></TouchableHighlight>
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </ScrollView>
                </View>
                <TouchableHighlight onPress={() => navigation.navigate("TambahStaff")} style={[styles.floatButton, styles.positionFloatButton]}>
                    <Ionicons name="person-add" size={30} color="white" />
                </TouchableHighlight>
            </ImageBackground>
        </View >
    )
}

export default KelolaStaff;

const styles = StyleSheet.create({
    center: {
        justifyContent: "center",
        alignItems: "center"
    },
    listKeluhan: {
        width: "90%",
        marginLeft: "5%",
        borderRadius: 8,
        marginBottom: 4
    },
    floatButton: {
        width: 70,
        height: 70,
        borderRadius: 100,
        backgroundColor: "blue",
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        right: 10,
        bottom: 10
    },

    search: {
        width: "90%",
        marginLeft: "5%",
        padding: 10,
        border: 2,
        borderRadius: 100,
        borderColor: "#000000",
        backgroundColor: '#ffffff',
    },
    icon: {
        alignItems: 'center', //Centered vertically
        flex: 1, marginTop: 20
    }
});