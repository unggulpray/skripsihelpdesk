import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, StyleSheet, ImageBackground, Image } from "react-native";
import { firebase } from "../../../config/firebase";

const StockBarang = () => {
    const [barang, setBarang] = useState([]);
    const [jmlBarangMasuk, setJmlBarangMasuk] = useState([]);
    const [jmlBarangKeluar, setJmlBarangKeluar] = useState([]);
    const [updateMasuk, setUpdateMasuk] = useState([]);
    const [updateKeluar, setUpdateKeluar] = useState([]);

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
        barang.map((item, index) => {
            firebase.firestore().collection('barangMasuk').where('idBarang', '==', item.id).onSnapshot((snapshots) => {
                const brgMasuk = [];
                snapshots.forEach((doc) => {
                    const data = doc.data()
                    data.id = doc.id

                    brgMasuk.push(data);
                });
                const cariBarang = jmlBarangMasuk.find(barang => barang.idBarang === item.id);
                if (cariBarang) {

                }

                if (brgMasuk.length == 0) {
                    const data = { jumlah: 0, idBarang: item.id };
                    brgMasuk.push(data);
                    // console.log("test barang masuk : ", testBarangMasuk);
                }
                setJmlBarangMasuk([...jmlBarangMasuk, brgMasuk]);
            });
        })
    }, [updateMasuk, updateKeluar])

    useEffect(() => {
        console.log("jml barang masuk : ", jmlBarangMasuk);
    }, [jmlBarangMasuk])

    return (
        <ScrollView>
            <View style={[styles.container]}>
                {
                    barang.map((item, index) => {
                        return (
                            <View key={item.id} style={[styles.card]}>
                                <Image source={{ uri: `${item.foto}` }} style={[styles.borderImage, { width: "100%", height: 30 }]}></Image>
                                <View style={[styles.backgroundText]}>
                                    <Text style={[styles.textCenter, { color: "#F27022", fontWeight: "bold" }]}>{item.namaBarang}</Text>
                                    {/* <Text style={[styles.textCenter, { color: "#F27022", fontWeight: "bold" }]}>{ }</Text> */}
                                </View>
                            </View>
                        )
                    })
                }
            </View>
        </ScrollView>
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