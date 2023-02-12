import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, StyleSheet, ImageBackground, Image } from "react-native";
import { firebase } from "../../../config/firebase";

const StockBarang = () => {
    const [barang, setBarang] = useState([]);
    let [jmlBarangMasuk, setJmlBarangMasuk] = useState();
    let [jmlBarangKeluar, setJmlBarangKeluar] = useState();

    useEffect(() => {
        firebase.firestore().collection('stockBarang').onSnapshot((snapshots) => {
            const dataBarang = [];
            snapshots.forEach((doc) => {
                const data = doc.data()
                data.id = doc.id
                dataBarang.push(data)
            });
            setBarang(dataBarang);
            barang.map((item, index) => {
                firebase.firestore().collection('barangMasuk').where('idBarang', '==', item.id).onSnapshot((snapshots) => {
                    const dataBarangMasuk = snapshots.forEach((doc) => {
                        const jml = doc.data().jumlah
                        jml.id = doc.id
                        return jml
                    });
                    setJmlBarangMasuk(...jmlBarangMasuk, dataBarangMasuk);
                })
                firebase.firestore().collection('barangKeluar').where('idBarang', '==', item.id).onSnapshot((snapshots) => {
                    const dataBarangKeluar = snapshots.forEach((doc) => {
                        const jml = doc.data().jumlah
                        jml.id = doc.id
                        return jml
                    });
                    setJmlBarangKeluar(...jmlBarangKeluar, dataBarangKeluar);
                })
            })
        })
    }, [])
    return (
        <ScrollView>
            <View style={[{ display: "flex", flexDirection: "row", width: "90%", marginLeft: "5%", marginTop: 20, }]}>
                {
                    barang.map((item, index) => {
                        return (
                            <View key={item.id} style={[styles.card, { width: "90%" }]}>
                                <Image source={{ uri: `${item.foto}` }} style={[styles.borderImage, { width: "100%", height: 30 }]}></Image>
                                <View style={[styles.backgroundText]}>
                                    <Text style={[styles.textCenter, { color: "#F27022", fontWeight: "bold" }]}>{item.namaBarang}</Text>
                                    <Text style={[styles.textCenter]}>{item.stock}</Text>
                                </View>
                            </View>
                        )
                    })}
            </View>
        </ScrollView>
    )
}

export default StockBarang;

const styles = StyleSheet.create({
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
        height: 130,
        flex: 1
    },
});