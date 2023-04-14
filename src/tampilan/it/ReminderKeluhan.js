import React, { Component, useCallback, useEffect, useState } from "react";
import { Text, TextInput, StyleSheet, TouchableHighlight, Image, View, Linking, ImageBackground } from "react-native";
import { FlatList, ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Firestore, doc, getDoc, addDoc, updateDoc, deleteDoc, setDoc, collection, getFirestore, getDocs, query, where, Query, orderBy, QuerySnapshot } from 'firebase/firestore';
import db from "../../config/db";
import { async } from "@firebase/util";
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Ionicons from "react-native-vector-icons/Ionicons";
import { firebase } from '../../config/firebase';
import { FloatingAction } from "react-native-floating-action";

const ReminderKeluhan = ({ navigation }) => {
    let [keluhan, setKeluhan] = useState([]);
    let [dataStaff, setDataStaff] = useState([]);

    useEffect(() => {
        console.log(firebase.auth().currentUser.uid);
        firebase.firestore().collection('keluhan').where('idStaffIT', '==', firebase.auth().currentUser.uid).orderBy('createdAt', 'desc').onSnapshot((querySnapshot) => {
            const docsKeluhan = [];
            let currentDay = null;
            let currentArray = null;

            querySnapshot.forEach((doc) => {
                const date = doc.data().createdAt.toDate().toLocaleDateString();
                const data = doc.data()
                data.id = doc.id
                if (date !== currentDay) {
                    currentDay = date;
                    currentArray = { date, data: [] };
                    docsKeluhan.push(currentArray)
                }
                currentArray.data.push(data);
            });
            setKeluhan(docsKeluhan);
        });

        // keluhan.map((item, index) => {
        //     console.log(item.idStaffIT);
        //     (async () => {
        //         const colRefStaff = query(collection(db, 'staff'), where('idUser', '==', item.idStaffIT));
        //         const snapshotsStaff = await getDocs(colRefStaff);

        //         const getDocStaff = snapshotsStaff.docs.map((docStaff) => {
        //             const resultStaff = docStaff.data()
        //             resultStaff.id = docStaff.id;

        //             return resultStaff;
        //         })
        //         setDataStaff([...dataStaff, getDocStaff]);
        //         console.log(dataStaff);
        //     })();
        // });

    }, [])

    useEffect(() => {
        console.log("keluhan", keluhan);
    }, [keluhan])


    return (
        <View>
            <ImageBackground source={require('../../../assets/images/background-list.jpg')} resizeMode="cover" style={[styles.background, { width: '100%', height: '100%' }]}>
                <View>
                    {/* <ImageBackground source={require('../../../assets/images/background-login.jpg')} resizeMode="cover" style={[styles.background, { width: '100%', height: '100%' }]}> */}
                    <TextInput style={[styles.search, { borderColor: "#00000", borderWidth: 4, marginBottom: 10, marginTop: 10 }]} placeholder="Search" onChangeText={search => test(search)} />
                    {keluhan.length == 0 ?
                        <View style={{ width: "100%" }}>
                            <Text style={{ textAlign: "center", marginLeft: "5%", width: "90%" }}>Data Keluhan Kosong</Text>
                        </View>
                        :
                        <ScrollView>
                            {
                                keluhan.map((item, index) => {
                                    return (
                                        <View style={{ marginTop: 5 }}>
                                            <Text style={{ fontWeight: 'bold', marginLeft: "5%" }}>{item.date}</Text>
                                            {item.data.map((isi, indexisi) => {
                                                return (
                                                    <View key={isi.id} style={[styles.listKeluhan, { flexDirection: "row", borderColor: "#000000", borderWidth: 1, }]}>
                                                        <TouchableHighlight onPress={() => navigation.navigate('Detail', { data: keluhan[index] })} style={{ width: '80%' }}>
                                                            <View style={[{ flexDirection: "row", }]}>
                                                                <Image source={{ uri: 'https://i1.rgstatic.net/ii/profile.image/1083598790766599-1635361492906_Q512/Unggul-Prayuda.jpg' }} style={{ width: 50, height: 50, margin: 1 }} />
                                                                <View style={{ flexDirection: "column", marginLeft: 15 }}>
                                                                    <Text style={{ fontWeight: "bold" }}>{isi.judulKeluhan}</Text>
                                                                    <Text>{isi.keluhan}</Text>
                                                                    <Text>Status : {item.date}</Text>
                                                                </View>
                                                            </View>
                                                        </TouchableHighlight>
                                                        <View style={[{ flexDirection: "row" }]}>
                                                            <TouchableHighlight onPress={() => navigation.navigate('VideoCall', { noTelpTujuan: item.noTelpStaffIT })} style={{ marginLeft: '2%' }}><Ionicons name="chatbubble-ellipses-outline" style={[styles.icon, { color: 'green', fontSize: 25, fontWeight: 'bold' }]}></Ionicons></TouchableHighlight>
                                                            <TouchableHighlight onPress={() => navigation.navigate('Chat', { title: item.noTelpStaffIT, idKontak: item.idStaffUmum })} style={{ marginLeft: '2%' }}><Ionicons name="chatbubble-ellipses-outline" style={[styles.icon, { color: 'green', fontSize: 25, fontWeight: 'bold' }]}></Ionicons></TouchableHighlight>
                                                        </View>
                                                    </View>
                                                )
                                            })}
                                        </View>
                                    )
                                }
                                )
                            }
                        </ScrollView>
                    }
                </View>
                <TouchableHighlight onPress={() => navigation.navigate("BuatKeluhan")} style={[styles.floatButton, styles.positionFloatButton]}>
                    <FontAwesome name="plus" size={30} color="white"></FontAwesome>
                </TouchableHighlight>
            </ImageBackground>
        </View >
    )
}

export default ReminderKeluhan;

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
        flex: 1,
        marginTop: 20
    }
});