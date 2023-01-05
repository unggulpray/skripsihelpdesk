import react from "react";
import { SafeAreaView, Image, StyleSheet, View, Text, TouchableHighlight } from "react-native";

export default function DetailKeluhan({ route, navigation }) {
    // let [dataStaffIT,]
    console.log(route.params.data);
    return (
        <>
            <View>
                <Image source={{ uri: 'https://sekawantriasa.com/wp-content/uploads/2021/08/Esa-Unggul-Tangerang.jpg' }} style={{ width: '100%', height: '45%', top: 0 }} />
                <View style={[styles.backgroundWhite, styles.container, { marginTop: 20, borderRadius: 23 }]}>
                    <Text style={[styles.bold, styles.textCenter, { color: "#F23C3C", fontSize: 30, }]}>{route.params.data.judulKeluhan}</Text>
                </View>
                <View style={[styles.backgroundWhite, styles.container, { marginTop: 20, marginBottom: 30 }]}>
                    <Text style={styles.bold}>Detail Laporan</Text>
                    <Text>Nama    : Unggul Prayuda</Text>
                    <Text>Tanggal : 25-08-2022</Text>
                    <Text>Status  : {route.params.data.status}</Text>
                    <Text>Keluhan : {route.params.data.keluhan}</Text>
                </View>
                <View style={[styles.backgroundWhite, { bottom: 0, flexDirection: "row", borderTopLeftRadius: 15, borderTopRightRadius: 15 }]}>
                    <TouchableHighlight style={[styles.button, { backgroundColor: "#FE1919", marginLeft: '10%' }]}><Text style={[styles.textCenter, { fontSize: 22, color: "#ffffff" }]}>Perbaiki</Text></TouchableHighlight>
                    <TouchableHighlight style={[styles.button, { backgroundColor: "#948E8E" }]}><Text style={[styles.textCenter, { fontSize: 22, color: "#ffffff" }]}>Tunda</Text></TouchableHighlight>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
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