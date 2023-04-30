import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, StyleSheet, ImageBackground, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { firebase } from "../../../config/firebase";
import Feather from "react-native-vector-icons/Feather";

const StockBarang = () => {
    const [barang, setBarang] = useState([]);
    const [jmlBarangMasuk, setJmlBarangMasuk] = useState([]);
    const [jmlBarangKeluar, setJmlBarangKeluar] = useState([]);
    const [updateMasuk, setUpdateMasuk] = useState([]);
    const [updateKeluar, setUpdateKeluar] = useState([]);

    const [test, setTest] = useState([]);

    const [stok, setStok] = useState([]);

    useEffect(() => {
        const getBarang = firebase.firestore().collection('stockBarang').onSnapshot((snapshots) => {
            const dataBarang = [];
            snapshots.forEach((doc) => {
                const data = doc.data()
                data.id = doc.id

                dataBarang.push(data);
            });

            setBarang(dataBarang);
        })

        const getBarangMasuk = firebase.firestore().collection('barangMasuk').onSnapshot((snapshots) => {
            const masuk = [];
            snapshots.forEach((doc) => {
                const data = doc.data()
                data.id = doc.id

                masuk.push(data);
            });
            // console.log("update masuk : ", masuk);
            setUpdateMasuk(masuk);
        })

        const getBarangKeluar = firebase.firestore().collection('barangKeluar').onSnapshot((snapshots) => {
            const keluar = [];
            snapshots.forEach((doc) => {
                const data = doc.data()
                data.id = doc.id

                keluar.push(data);
            });
            // console.log("update keluar : ", keluar);
            setUpdateKeluar(keluar);
        })

        return () => {
            getBarang();
            getBarangMasuk();
            getBarangKeluar();
        };
    }, [])

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
        <View style={{height:"100%", width:"100%"}}>
            <ScrollView> 
                <View style={[styles.container]}>
                    {
                        barang.map((item, index) => {
                            const getStockByID = stok.find((obj) => obj.idBarang == item.id);
                            if (getStockByID == undefined) {
                                return (
                                    <View key={item.id} style={[styles.card]}>
                                        <Image source={{ uri: `${item.foto}` }} style={[styles.borderImage, { width: "100%", height: 30 }]}></Image>
                                        <View style={[styles.backgroundText]}>
                                            <Text style={[styles.textCenter, { color: "#F27022", fontWeight: "bold" }]}>{item.namaBarang}</Text>
                                            <Text style={[styles.textCenter, { color: "#F27022", fontWeight: "bold" }]}>{0}</Text>
                                        </View>
                                    </View>
                                )
                            } else if (getStockByID != undefined) {
                                return (
                                    <View key={item.id} style={[styles.card]}>
                                        <Image source={{ uri: `${item.foto}` }} style={[styles.borderImage, { width: "100%", height: 30 }]}></Image>
                                        <View style={[styles.backgroundText]}>
                                            <Text style={[styles.textCenter, { color: "#F27022", fontWeight: "bold" }]}>{item.namaBarang}</Text>
                                            <Text style={[styles.textCenter, { color: "#F27022", fontWeight: "bold" }]}>{getStockByID.jumlah}</Text>
                                        </View>
                                    </View>
                                )
                            }
                        })
                    }
                </View>
            </ScrollView>
            <View style={{justifyContent:"center", bottom:10}}>
                <TouchableOpacity  style={{backgroundColor:"orange", width:"80%", marginLeft:"10%", padding:10, borderRadius:10}}>
                    <View style={{flexDirection:"row", justifyContent:"center"}}>
                        <Feather name="box" size={22} />
                        <Text>Tambah Barang Baru</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default StockBarang;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: "row",
        width: "88%",
        marginLeft: "6%",
        justifyContent: "space-between",
        marginTop: 20,
    },
    textCenter: {
        textAlign: "center"
    },
    borderImage: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        flex: 1,
    },
    backgroundText: {
        backgroundColor: "#D9D9D9",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        position: "absolute",
        bottom: 0,
        width: "100%"
    },
    card: {
        backgroundColor: "#fff",
        height: 150,
        width: 150,
        margin: 4,
    },
});