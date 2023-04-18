import react, { useState } from "react";
import { SafeAreaView, Image, StyleSheet, View, Text, TouchableHighlight, ImageBackground } from "react-native";
import { firebase } from '../../config/firebase';

export default function DetailKeluhan({ route, navigation }) {
    const batalkan = () => {
        const docRef = firebase.firestore().collection('keluhan').doc(route.params.data.id);

        docRef.update({
            status: 'dibatalkan'
        }).then(
            alert("Keluhan telah dibatalkan"),
            navigation.navigate("Detail")
        )
    }
    return (
        <View>
            <ImageBackground source={require('../../../assets/images/background-detail.jpg')} resizeMode="cover" style={[styles.background, { width: '100%', height: '100%' }]}>
                <View style={[{ position: "absolute", width: "100%" }]}>
                    <Image source={{ uri: 'https://sekawantriasa.com/wp-content/uploads/2021/08/Esa-Unggul-Tangerang.jpg' }} style={{ width: '100%', height: '50%', top: 0 }} />
                    <View style={[styles.backgroundWhite, styles.container, { marginTop: 20, borderRadius: 23 }]}>
                        <Text style={[styles.bold, styles.textCenter, { color: "#F23C3C", fontSize: 30, padding: 15 }]}>{route.params.data.judulKeluhan}</Text>
                    </View>
                    <View style={[styles.backgroundWhite, styles.container, { marginTop: 20, marginBottom: 30 }]}>
                        <View style={{ padding: 20 }}>
                            <Text style={[styles.bold, styles.sizeLaporan]}>Detail Laporan</Text>
                            <Text style={styles.sizeLaporan}>Nama    : Unggul Prayuda</Text>
                            <Text style={styles.sizeLaporan}>Tanggal : 25-08-2022</Text>
                            <Text style={styles.sizeLaporan}>Status  : {route.params.data.status}</Text>
                            <Text style={styles.sizeLaporan}>Keluhan : {route.params.data.keluhan}</Text>
                        </View>
                    </View>
                    <TouchableHighlight onPress={() => { navigation.navigate("Detail") }}><Text>Test</Text></TouchableHighlight>
                    <TouchableHighlight onPress={batalkan} style={[styles.button, styles.container, { backgroundColor: "#FE1919", paddingTop: 10, paddingBottom: 10, width: "60%", marginLeft: "20%" }]}><Text style={[styles.textCenter, { fontSize: 22, color: "#ffffff" }]}>Batalkan</Text></TouchableHighlight>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    sizeLaporan: {
        fontSize: 20
    },
    textCenter: {
        textAlign: "center",
    },
    button: {
        borderRadius: 10,
        width: "40%",
        marginRight: 10
    },
    gambar: {
        width: '100%',
        height: '45%',
        top: 0
    },
    bold: {
        fontWeight: 'bold'
    },

    backgroundWhite: {
        backgroundColor: "#D9D9D9",
    },
    container: {
        width: '90%',
        marginLeft: '5%'
    }

});