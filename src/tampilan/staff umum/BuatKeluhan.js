import { async } from "@firebase/util";
import react, { useState } from "react";
import { TouchableHighlight, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SelectList } from "react-native-dropdown-select-list";
import { StyleSheet, Text } from "react-native";
import { addDoc, collection, getDoc, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import db from "../../config/db";
import { firebase } from '../../config/firebase';

const BuatKeluhan = ({ navigation }) => {
    const [judul, setJudul] = useState('');
    const [namaStaffIT, setNamaStaffIT] = useState('');
    const [keluhan, setKeluhan] = useState('');
    const [ruang, setRuang] = useState('');
    const dataRuang = ['201', '202', '203', '204', '205', '301', '302', '303', '304', '305', '401', '402', '403', '404', '405', '501', '502', '503', '504', '505'];
    const AddData = async () => {
        console.log(judul);
        console.log(keluhan);
        console.log(ruang);
        try {
            const docref = await getDocs(query(collection(db, 'staff'), orderBy('totalKerja', 'asc'), where('role', '==', 1), limit(1),));
            docref.docs.map((doc) => {
                addDoc(collection(db, "keluhan"), {
                    idStaffUmum: firebase.auth().currentUser.uid,
                    idStaffIT: doc.data().idUser,
                    judulKeluhan: judul,
                    keluhan: keluhan,
                    ruang: ruang,
                    status: 'pengajuan'
                }).then(
                    alert("Data keluhan ditambahkan"),
                    navigation.navigate('PengajuanKeluhan')
                );
                // console.log(doc.data().idUser);
            })
        } catch (e) {
            console.error(e)
        }
    }
    return (
        <View>
            <TouchableOpacity style={{ width: 80 }}><Text>Choose Photo</Text></TouchableOpacity>
            <View style={styles.container}>
                <TextInput style={styles.input} placeholder="Judul Keluhan" onChangeText={(judul) => setJudul(judul)}></TextInput>
                <SelectList
                    data={dataRuang}
                    setSelected={setRuang}
                    boxStyles={{ backgroundColor: "#fff" }}
                />
                <TextInput style={{ backgroundColor: "#fff", height: 200, marginTop: 10 }} placeholder="Masukkan Keluhan" onChangeText={(keluhan) => setKeluhan(keluhan)}></TextInput>
                <View style={{ flexDirection: "row" }}>
                    <TouchableHighlight onPress={AddData} style={[styles.button, { backgroundColor: "#FE1919", marginLeft: '10%' }]}><Text style={[styles.textCenter, { fontSize: 22, color: "#ffffff" }]}>Buat Keluhan</Text></TouchableHighlight>
                    <TouchableHighlight style={[styles.button, { backgroundColor: "#948E8E" }]}><Text style={[styles.textCenter, { fontSize: 22, color: "#ffffff" }]}>Tunda</Text></TouchableHighlight>
                </View>
            </View>
        </View >
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
    input: {
        backgroundColor: '#ffffff',
        height: 40,
        margin: 5,
        padding: 10,
        color: '#000000',
        borderRadius: 100,
    },
    container: {
        width: "90%",
        marginLeft: "5%"
    },
});

export default BuatKeluhan;