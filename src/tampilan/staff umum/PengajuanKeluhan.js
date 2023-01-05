import React, { Component, useEffect, useState } from "react";
import { Text, TextInput, StyleSheet, TouchableHighlight, Image, View, Linking, ImageBackground } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Firestore, doc, getDoc, addDoc, updateDoc, deleteDoc, setDoc, collection, getFirestore, getDocs, query, where, Query, orderBy } from 'firebase/firestore';
import db from "../../config/db";
import { async } from "@firebase/util";
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Ionicons from "react-native-vector-icons/Ionicons";
import { firebase } from '../../config/firebase';
import { FloatingAction } from "react-native-floating-action";

const PengajuanKeluhan = ({ navigation }) => {
    // getDocs(collection(db, 'keluhan')).then(docSnap => {
    //     docSnap.forEach((doc) => {
    //         keluhan.push({ ...doc.data(), id: doc.id })
    //     });
    //     console.log("document data:", keluhan);
    // })
    let namaStaff;
    let [keluhan, setKeluhan] = useState([]);
    let [dataStaff, setDataStaff] = useState([]);

    const test = (pencarian) => {
        (async () => {
            const colRef = query(collection(db, 'keluhan'), where(('idStaffIT', '==', firebase.auth().currentUser.uid, '&&', 'judulKeluhan', '==', pencarian)));
            const snapshots = await getDocs(colRef);

            const docsKeluhan = snapshots.docs.map((doc) => {
                const data = doc.data()
                data.id = doc.id
                // console.log(data.idStaffUmum);
                return data;
            })

            setKeluhan(docsKeluhan);
        })();

        keluhan.map((item, index) => {
            console.log(item.idStaffUmum);
            (async () => {
                const colRefStaff = query(collection(db, 'staff'), where('idUser', '==', item.idStaffUmum), orderBy('createdDate', 'desc'));
                const snapshotsStaff = await getDocs(colRefStaff);

                const getDocStaff = snapshotsStaff.docs.map((docStaff) => {
                    const resultStaff = docStaff.data()
                    resultStaff.id = docStaff.id;
                    // console.log(data.idStaffUmum);
                    return resultStaff;
                })
                setDataStaff([...dataStaff, getDocStaff]);
            })();
        });
    }

    useEffect(() => {
        ; (async () => {
            const colRef = query(collection(db, 'keluhan'), where('idStaffIT', '==', firebase.auth().currentUser.uid));
            const snapshots = await getDocs(colRef);

            const docsKeluhan = snapshots.docs.map((doc) => {
                const data = doc.data()
                data.id = doc.id
                // console.log(data.idStaffUmum);
                return data;
            })

            setKeluhan(docsKeluhan);
        })();

        console.log(keluhan);

        keluhan.map((item, index) => {
            console.log(item.idStaffUmum);
            (async () => {
                const colRefStaff = query(collection(db, 'staff'), where('idUser', '==', item.idStaffUmum));
                const snapshotsStaff = await getDocs(colRefStaff);

                const getDocStaff = snapshotsStaff.docs.map((docStaff) => {
                    const resultStaff = docStaff.data()
                    resultStaff.id = docStaff.id;
                    // console.log(data.idStaffUmum);
                    return resultStaff;
                })
                setDataStaff([...dataStaff, getDocStaff]);
                console.log(dataStaff);
            })();
        });

    }, [])




    return (
        <View style={{ height: "100%" }}>
            {/* <ImageBackground source={require('../../../assets/images/background-login.jpg')} resizeMode="cover" style={[styles.background, { width: '100%', height: '100%' }]}> */}
            <TextInput style={[styles.search, { borderColor: "#00000", borderWidth: 4, marginBottom: 10, marginTop: 10 }]} placeholder="Search" onChangeText={search => test(search)} />
            {keluhan.length == 0 ?
                <View>
                    <Text style={{ textAlign: "center" }}>Data Keluhan Kosong</Text>
                </View>
                :
                <SafeAreaView>
                    <ScrollView>
                        {
                            keluhan.map((item, index) => {
                                return (
                                    <>
                                        <View style={[{ flexDirection: "row", borderColor: "#000000", borderWidth: 1, }]}>
                                            <TouchableHighlight key={item.id} onPress={() => navigation.navigate('Detail', { data: keluhan[index] })} style={{ width: '80%' }}>
                                                <View style={[{ flexDirection: "row", }]}>
                                                    <Image source={{ uri: 'https://i1.rgstatic.net/ii/profile.image/1083598790766599-1635361492906_Q512/Unggul-Prayuda.jpg' }} style={{ width: 70, height: 70 }} />
                                                    <View style={{ flexDirection: "column", marginLeft: 15 }}>
                                                        <Text style={{ fontWeight: "bold" }}>{item.judulKeluhan}</Text>
                                                        <Text>Status : {item.keluhan}</Text>
                                                    </View>

                                                </View>
                                            </TouchableHighlight>
                                            <TouchableHighlight onPress={() => { Linking.openURL(`tel:${item.noTelpStaffIT}`) }}><FontAwesome name="phone" style={[styles.icon, { color: "green", fontSize: 20 }]}></FontAwesome></TouchableHighlight>
                                            <TouchableHighlight onPress={() => navigation.navigate('Chat', { title: item.noTelpStaffIT })} style={{ marginLeft: '2%' }}><Ionicons name="chatbubble-ellipses-outline" style={[styles.icon, { color: 'green', fontSize: 25, fontWeight: 'bold' }]}></Ionicons></TouchableHighlight>
                                        </View>
                                    </>
                                    // <TouchableHighlight key={item.id} onPress={() => navigation.navigate('Detail', { data: keluhan[index] })} style={{ width: '80%' }}>

                                )
                            }
                            )
                        }
                    </ScrollView>
                </SafeAreaView>
            }
            <TouchableHighlight onPress={() => navigation.navigate("BuatKeluhan")} style={[styles.floatButton, styles.positionFloatButton]}>
                <FontAwesome name="plus" size={30} color="white"></FontAwesome>
            </TouchableHighlight>
        </View >
    )
}

export default PengajuanKeluhan;

const styles = StyleSheet.create({
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