import React, { Component, useCallback, useEffect, useState } from "react";
import { Text, TextInput, StyleSheet, TouchableHighlight, Image, View, Linking, ImageBackground, TouchableWithoutFeedback, Modal } from "react-native";
import { FlatList, ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Firestore, doc, getDoc, addDoc, updateDoc, deleteDoc, setDoc, collection, getFirestore, getDocs, query, where, Query, orderBy, QuerySnapshot } from 'firebase/firestore';
import db from "../../config/db";
import { async } from "@firebase/util";
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Ionicons from "react-native-vector-icons/Ionicons";
import { firebase } from '../../config/firebase';
import { FloatingAction } from "react-native-floating-action";
import { Card } from "react-native-elements";

const ReminderKeluhan = ({ navigation }) => {
    let [keluhan, setKeluhan] = useState([]);
    const [barang, setBarang] = useState([]);
    const [jmlBarangMasuk, setJmlBarangMasuk] = useState([]);
    const [jmlBarangKeluar, setJmlBarangKeluar] = useState([]);
    const [updateMasuk, setUpdateMasuk] = useState([]);
    const [updateKeluar, setUpdateKeluar] = useState([]);

    //Choosen barang yang diajukan
    const [idPilihan, setIdPilihan] = useState('');
    const [idKeluhan, setIdKeluhan] = useState('');
    const [jumlahPilihan, setJumlahPilihan] = useState(0);
    const [inputJumlah, setInputJumlah] = useState(1);

    const [stok, setStok] = useState([]);
    let [dataStaff, setDataStaff] = useState([]);

    const [modalVisible, setModalVisible] = useState(false);

    function handleModalToggle() {
        setModalVisible(!modalVisible);
    }

    function setJumlah(stok, idBarang) {
        if (idPilihan == idBarang) {
            setIdPilihan(idBarang)
            setJumlahPilihan(stok);
        } else if (idPilihan != idBarang) {
            setIdPilihan(idBarang)
            setJumlahPilihan(stok);
            setInputJumlah(1);
        }
    }

    function tambah() {
        if (jumlahPilihan < inputJumlah) {
            setInputJumlah(jumlahPilihan);
        } else if (jumlahPilihan > inputJumlah) {
            setInputJumlah(inputJumlah + 1);
        }
    }

    function kurang() {
        if (inputJumlah > 1) {
            setInputJumlah(inputJumlah - 1);
        }
    }

    function bukaModal(idKeluhan) {
        setIdKeluhan(idKeluhan);
        setModalVisible(true);
    }

    function tutupModal() {
        setIdKeluhan('');
        setModalVisible(false);
    }

    function tambahBarang() {
        if (idKeluhan != '' && inputJumlah != 0 && idPilihan) {
            firebase.firestore().collection('pengajuanBarang').doc().set({
                idBarangDiajukan: idPilihan,
                idKeluhan: idKeluhan,
                idStaffIT: firebase.auth().currentUser.uid,
                jumlah: inputJumlah,
                tanggal: firebase.firestore.Timestamp.now()
            }).then(() => {
                alert("Pengajuan Barang telah ditambahkan");
            });
        }
    }

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

                if (doc.data().deadline.seconds < firebase.firestore.Timestamp.now().seconds) {
                    const docRef = firebase.firestore().collection('keluhan').doc(doc.id);

                    docRef.update({
                        status: 'Lewat Deadline'
                    })
                }

                if (date !== currentDay) {
                    currentDay = date;
                    currentArray = { date, data: [] };
                    docsKeluhan.push(currentArray)
                }
                currentArray.data.push(data);
            });
            setKeluhan(docsKeluhan);
        });

        const getBarang = firebase.firestore().collection('stockBarang').onSnapshot((snapshots) => {
            const dataBarang = [];
            snapshots.forEach((doc) => {
                const data = doc.data()
                data.id = doc.id

                dataBarang.push(data);
            });
            console.log("barang : ", dataBarang);
            setBarang(dataBarang);
        })

        const getBarangMasuk = firebase.firestore().collection('barangMasuk').onSnapshot((snapshots) => {
            const masuk = [];
            snapshots.forEach((doc) => {
                const data = doc.data()
                data.id = doc.id

                masuk.push(data);
            });
            console.log("update masuk : ", masuk);
            setUpdateMasuk(masuk);
        })

        const getBarangKeluar = firebase.firestore().collection('barangKeluar').onSnapshot((snapshots) => {
            const keluar = [];
            snapshots.forEach((doc) => {
                const data = doc.data()
                data.id = doc.id

                keluar.push(data);
            });
            console.log("update keluar : ", keluar);
            setUpdateKeluar(keluar);
        })

        return () => {
            getBarang();
            getBarangMasuk();
            getBarangKeluar();
        };

    }, [])

    useEffect(() => {
        const IT = [];
        keluhan.map((item, index) => {
            item.data.map((itemData, indexData) => {
                firebase.firestore().collection('staff').where('idUser', '==', itemData.idStaffIT).limit(1).onSnapshot((snapshots) => {
                    snapshots.forEach((doc) => {
                        const data = doc.data()
                        data.id = doc.id

                        IT.push(data);
                    })
                    setDataStaff([...IT]);
                })
            })
        });
    }, [keluhan])


    useEffect(() => {
        const masuk = [];
        const keluar = [];
        barang.map((item, index) => {
            firebase.firestore().collection('barangMasuk').where('idBarang', '==', item.id).onSnapshot((snapshots) => {
                const brgMasuk = [];
                let jumlahBarang = 0;
                snapshots.forEach((doc) => {
                    const data = doc.data();
                    data.id = doc.id;
                    brgMasuk.push(data);
                    jumlahBarang += doc.data().jumlah
                });

                if (brgMasuk.length == 0) {
                    const data = { jumlah: 0, idBarang: item.id };
                    masuk.push(data);
                    setJmlBarangMasuk([...masuk]);
                } else {
                    const data = { jumlah: jumlahBarang, idBarang: item.id }
                    masuk.push(data);
                    setJmlBarangMasuk([...masuk]);
                }
            });

            firebase.firestore().collection('barangKeluar').where('idBarang', '==', item.id).onSnapshot((snapshots) => {
                const brgKeluar = [];
                let jumlahBarang = 0;
                snapshots.forEach((doc) => {
                    const data = doc.data();
                    data.id = doc.id;
                    brgKeluar.push(data);
                    jumlahBarang += doc.data().jumlah
                });

                if (brgKeluar.length == 0) {
                    const data = { jumlah: 0, idBarang: item.id };
                    keluar.push(data);
                    setJmlBarangKeluar([...keluar]);
                } else {
                    const data = { jumlah: jumlahBarang, idBarang: item.id }
                    keluar.push(data);
                    setJmlBarangKeluar([...keluar]);
                }
            });
        })
    }, [updateMasuk, updateKeluar]);



    useEffect(() => {
        console.log("jumlah barang masuk : ", jmlBarangMasuk);
        console.log("jumlah barang keluar : ", jmlBarangKeluar);

        let jumlahStok = [];

        barang.map((item, index) => {
            const findBarangMasuk = jmlBarangMasuk.find(obj => obj.idBarang == item.id);
            const findBarangKeluar = jmlBarangKeluar.find(obj => obj.idBarang == item.id);

            if (findBarangMasuk == undefined && findBarangKeluar == undefined) {
                jumlahStok.push({ jumlah: 0, idBarang: item.id });
                setStok([...jumlahStok]);
            } else if (findBarangKeluar != undefined && findBarangMasuk == undefined) {
                jumlahStok.push({ jumlah: findBarangKeluar.jumlah, idBarang: item.id });
                setStok([...jumlahStok]);
            } else if (findBarangKeluar == undefined && findBarangMasuk != undefined) {
                jumlahStok.push({ jumlah: findBarangMasuk.jumlah, idBarang: item.id });
                setStok([...jumlahStok]);
            } else if (findBarangKeluar != undefined && findBarangMasuk != undefined) {
                jumlahStok.push({ jumlah: (findBarangMasuk.jumlah - findBarangKeluar.jumlah), idBarang: item.id });
                setStok([...jumlahStok]);
            }

            console.log("find barang masuk : ", findBarangMasuk);
            console.log("find barang keluar : ", findBarangKeluar);

        })
    }, [jmlBarangKeluar, jmlBarangMasuk])

    useEffect(() => {
        console.log("stok : ", stok);
    }, [stok])


    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleModalToggle}
            >

                <View style={styles.modal}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text>Pilih Barang</Text>
                        <TouchableHighlight onPress={tutupModal}>
                            <Text>Close</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={[{ flexDirection: "row", flexWrap: "wrap", }]}>
                        {barang.map((item, index) => {
                            const getStockByID = stok.find((obj) => obj.idBarang == item.id);
                            if (getStockByID == undefined) {
                                return (
                                    <Card>
                                        <Image source={{ uri: `${item.foto}` }} style={[{ width: 50, height: 50 }]}></Image>
                                        <Text>{item.namaBarang}</Text>
                                    </Card>
                                )
                            } else if (getStockByID != undefined) {
                                if (getStockByID.jumlah != 0) {
                                    return (
                                        <TouchableHighlight activeOpacity={0.8} onPress={() => setJumlah(getStockByID.jumlah, item.id)}>
                                            <Card>
                                                <Image source={{ uri: `${item.foto}` }} style={[{ width: 50, height: 50 }]}></Image>
                                                <Text style={{ textAlign: "center" }}>{getStockByID.jumlah}</Text>
                                                <Text style={{ textAlign: "center" }}>{item.namaBarang}</Text>
                                            </Card>
                                        </TouchableHighlight>
                                    )
                                } else {
                                    return (
                                        <Card containerStyle={{ opacity: 0.6 }}>
                                            <Image source={{ uri: `${item.foto}` }} style={[{ width: 50, height: 50 }]}></Image>
                                            <Text style={{ textAlign: "center" }}>{item.namaBarang}</Text>
                                        </Card>
                                    )
                                }
                            }
                        })}
                    </View>
                    <View style={{ flexDirection: "row", width: "90%", marginLeft: "5%", marginTop: 15 }}>
                        <View style={{ width: "10%" }}>
                            <TouchableHighlight onPress={kurang} style={[styles.buttonPlus]}><Text style={[styles.textCenter, { fontSize: 20 }]}>-</Text></TouchableHighlight>
                        </View>
                        <View style={{ width: "80%", marginLeft: 5, marginRight: 5 }}>
                            <View style={[styles.inputJumlah, { borderColor: "#000", borderWidth: 1, borderRadius: 5 }]}><Text style={[styles.textCenter]}>{inputJumlah}</Text></View>
                        </View>
                        <View style={{ width: "10%" }}>
                            <TouchableHighlight onPress={tambah} style={[styles.buttonPlus]}><Text style={[styles.textCenter, { fontSize: 20 }]}>+</Text></TouchableHighlight>
                        </View>
                    </View>
                    <TouchableHighlight onPress={tambahBarang}>
                        <Card containerStyle={[styles.buttonCustom, { width: "90%", marginLeft: "5%", backgroundColor: "#108EE9" }]}><Text style={{ textAlign: "center", fontSize: 15, fontWeight: "bold", color: "white" }}>Ajukan</Text></Card>
                    </TouchableHighlight>
                </View>
            </Modal >
            {/* <ImageBackground source={require('../../../assets/images/background-login.jpg')} resizeMode="cover" style={[styles.background, { width: '100%', height: '100%' }]}> */}
            {
                keluhan.length == 0 ?
                    <View style={{ width: "100%" }}>
                        <Text style={{ textAlign: "center", marginLeft: "5%", width: "90%" }}>Data Keluhan Kosong</Text>
                    </View>
                    :
                    <ScrollView>
                        {
                            keluhan.map((item, index) => {
                                const tanggal = new Date(item.date)
                                const date = tanggal.getDate();
                                const month = tanggal.getMonth();
                                const year = tanggal.getFullYear();
                                let BulanString = '';
                                switch (month) {
                                    case 0:
                                        BulanString = "January";
                                        break;
                                    case 1:
                                        BulanString = "Febuary";
                                        break;
                                    case 2:
                                        BulanString = "Maret";
                                        break;
                                    case 3:
                                        BulanString = "April";
                                        break;
                                    case 4:
                                        BulanString = "Mei";
                                        break;
                                    case 5:
                                        BulanString = "Juni";
                                        break;
                                    case 6:
                                        BulanString = "Juli";
                                        break;
                                    case 7:
                                        BulanString = "Agustus";
                                        break;
                                    case 8:
                                        BulanString = "September";
                                        break;
                                    case 9:
                                        BulanString = "Oktober";
                                        break;
                                    case 10:
                                        BulanString = "November";
                                        break;
                                    case 11:
                                        BulanString = "Desember";
                                        break;
                                }
                                return (
                                    <View style={{ marginTop: 5 }}>
                                        <Text style={{ fontWeight: 'bold', marginLeft: "5%" }}>{date + ' ' + BulanString + ' ' + year}</Text>
                                        {item.data.map((isi, indexisi) => {
                                            const deadline = new Date(isi.deadline.seconds * 1000);
                                            const hour = deadline.getHours();
                                            const minutes = deadline.getMinutes();
                                            return (
                                                <Card style={[styles.listKeluhan]}>
                                                    <TouchableHighlight onPress={() => navigation.navigate('Detail', { id: keluhan[index].data[indexisi].id })} style={{ width: '80%' }}>
                                                        <View style={[{ flexDirection: "row", }]}>
                                                            <Image source={{ uri: 'https://i1.rgstatic.net/ii/profile.image/1083598790766599-1635361492906_Q512/Unggul-Prayuda.jpg' }} style={{ width: 50, height: 50, margin: 1 }} />
                                                            <View style={{ flexDirection: "column", marginLeft: 15 }}>
                                                                <Text style={{ fontWeight: "bold" }}>{isi.judulKeluhan}</Text>
                                                                <Text>{isi.keluhan}</Text>
                                                                <Text>Status : {isi.status}</Text>
                                                            </View>
                                                        </View>
                                                    </TouchableHighlight>
                                                    <View style={[{ flexDirection: "row", justifyContent: "space-between" }]}>
                                                        <Text style={{ marginTop: 2 }}>Deadline : {hour + ':' + minutes}</Text>
                                                        <TouchableHighlight onPress={() => bukaModal(isi.id)}><Text>Ajukan Barang</Text></TouchableHighlight>
                                                    </View>
                                                </Card>
                                            )
                                        })}
                                    </View>
                                )
                            }
                            )
                        }
                    </ScrollView>
            }
        </View >
    )
}

export default ReminderKeluhan;

const styles = StyleSheet.create({
    buttonPlus: {
        backgroundColor: "grey",
        width: 30,
        height: 30,
        borderRadius: 5
    },
    inputJumlah: {
        backgroundColor: '#ffffff',
        width: "100%",
        height: 30,
        color: '#000000'
    },
    textCenter: {
        textAlignVertical: "center",
        textAlign: "center"
    },
    buttonCustom: {
        padding: 5,
        borderRadius: 10
    },
    center: {
        justifyContent: "center",
        alignItems: "center"
    },
    listKeluhan: {
        width: "90%",
        marginLeft: "5%",
        borderRadius: 8,
        backgroundColor: "white",
        marginBottom: 4
    },
    modal: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
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