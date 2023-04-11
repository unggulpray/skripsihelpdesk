import { async } from "@firebase/util";
import react, { useEffect, useRef, useState } from "react";
import { TouchableHighlight, TouchableOpacity, View, ImageBackground } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { SelectList } from "react-native-dropdown-select-list";
import { StyleSheet, Text } from "react-native";
import { addDoc, collection, getDoc, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import db from "../../config/db";
import { firebase } from '../../config/firebase';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from "react-native-safe-area-context";

const BuatKeluhan = ({ navigation }) => {
    const [judul, setJudul] = useState('');
    const [keluhan, setKeluhan] = useState('');
    const [ruang, setRuang] = useState('');
    const dataRuang = ['201', '202', '203', '204', '205', '301', '302', '303', '304', '305', '401', '402', '403', '404', '405', '501', '502', '503', '504', '505'];

    const judulRef = useRef(null);
    const ruangRef = useRef(null);
    const keluhanRef = useRef(null);

    const AddData = async () => {
        try {
            const docref = await getDocs(query(collection(db, 'staff'), orderBy('totalKerja', 'asc'), where('role', '==', 2), limit(1),));
            const timestamp = firebase.firestore.Timestamp.now().toDate();
            const deadline = new Date(timestamp.setMinutes(timestamp.getMinutes() + 10));
            const deadlineTimestamp = firebase.firestore.Timestamp.fromDate(deadline);

            docref.docs.map((doc) => {
                addDoc(collection(db, "keluhan"), {
                    idStaffUmum: firebase.auth().currentUser.uid,
                    idStaffIT: doc.data().idUser,
                    judulKeluhan: judul,
                    keluhan: keluhan,
                    noTelpStaffIT: doc.data().noTelp,
                    ruang: ruang,
                    status: 'pengajuan',
                    createdAt: firebase.firestore.Timestamp.now(),
                    deadline: deadlineTimestamp
                }).then(
                    judulRef.current.clear(),
                    ruangRef.current.clear(),
                    keluhanRef.current.clear(),
                    alert("Data keluhan ditambahkan"),
                    navigation.navigate("PengajuanKeluhan")
                );
            })
        } catch (e) {
            console.error(e)
        }
    }
    return (
        <ImageBackground source={require('../../../assets/images/background-grey.jpeg')} resizeMode="cover" style={[styles.background, { width: '100%', height: '100%' }]}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.itemCenter}>
                    <TouchableOpacity style={[styles.buttonPhoto, { padding: 10, marginTop: 10 }]}><AntDesign name="camera" size={60}></AntDesign></TouchableOpacity>
                    <TouchableOpacity style={[styles.buttonPhoto, { marginTop: 10 }]}><Text style={{ fontSize: 16, padding: 5 }}>Choose Photo</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.buttonPhoto, { marginTop: 10, marginBottom: 10 }]}><Text style={{ fontSize: 16, padding: 5 }}><AntDesign name="camera" size={20}></AntDesign>Take Photo</Text></TouchableOpacity>
                </View>
                <View style={styles.container}>
                    <TextInput ref={judulRef} style={[styles.input, styles.border1, { fontSize: 16 }]} placeholder="Judul Keluhan" onChangeText={(judul) => setJudul(judul)}></TextInput>
                    <SelectList
                        ref={ruangRef}
                        data={dataRuang}
                        setSelected={setRuang}
                        boxStyles={[{ backgroundColor: "#fff", borderRadius: 100 }]}
                        inputStyles={{ fontSize: 16, }}
                    />
                    <TextInput ref={keluhanRef} style={[styles.textInput, styles.border1]} placeholder="Masukkan Keluhan" onChangeText={(keluhan) => setKeluhan(keluhan)}></TextInput>
                    <View style={[{ marginTop: 20, }]}>
                        <TouchableHighlight onPress={AddData} style={[styles.button, { backgroundColor: "#FE1919", width: "80%", marginLeft: "10%" }]}><Text style={[styles.textCenter, { fontSize: 22, color: "#ffffff", padding: 5 }]}><FontAwesome name="plus" size={22} style={{ marginRight: 10 }}></FontAwesome>Buat Keluhan</Text></TouchableHighlight>
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    border1: {
        borderColor: "#000",
        borderWidth: 1,
    },
    textInput: {
        borderRadius: 8,
        margin: 5,
        padding: 10,
        backgroundColor: "#fff",
        height: 120,
        marginTop: 10,
        textAlignVertical: "top",
        fontSize: 16
    },
    buttonPhoto: {
        backgroundColor: 'grey',
    },
    itemCenter: {
        justifyContent: "center",
        alignItems: "center"
    },
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