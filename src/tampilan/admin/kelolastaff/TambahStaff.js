import { async } from "@firebase/util";
import react, { useEffect, useState } from "react";
import { TouchableHighlight, TouchableOpacity, View, ImageBackground } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { SelectList } from "react-native-dropdown-select-list";
import { StyleSheet, Text } from "react-native";
import { addDoc, collection, getDoc, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import db from "../../../config/db";
import { firebase } from '../../../config/firebase';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';



const TambahStaff = () => {
    const [nama, setNama] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const dataRole = ['Staff Admin', 'Staff Umum', 'Staff IT'];
    const [role, setRole] = useState('');
    const [noTelp, setNoTelp] = useState('');
    const [alamat, setAlamat] = useState('');
    const [roleNumber, setRoleNumber] = useState();

    const createStaff = async () => {
        console.log("Nama : ", nama);
        console.log("password : ", password);
        console.log("email : ", email);
        console.log("role : ", role);
        console.log("notelp : ", noTelp);
        console.log("alamat : ", alamat);
        role == 'Staff Admin' ? setRoleNumber(1) : role == 'Staff IT' ? setRoleNumber(2) : setRoleNumber(3);
        console.log("role angka : ", roleNumber);
        await firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
            firebase.auth().currentUser.sendEmailVerification({
                handleCodeInApp: true,
                url: 'https://mobilehelpdesk-ba63a.firebaseapp.com',
            }).then(() => {
                alert("Data staff baru telah ditambahkan");
            }).catch((error) => {
                alert(error.message);
            }).then(() => {
                const [roleNumber, setRoleNumber] = useState(0);
                role == "Staff Admin" ? setRoleNumber(1) : role == "Staff IT" ? setRoleNumber(2) : setRoleNumber(3);
                firebase.firestore().collection('staff')
                    .doc(firebase.auth().currentUser.uid)
                    .set({
                        idUser: firebase.auth().currentUser.uid,
                        nama: nama,
                        email: email,
                        password: password,
                        totalKerja: 0,
                        role: roleNumber,
                        noTelp: noTelp,
                        alamat: alamat
                    })
            }).catch((error) => {
                alert(error.message)
            })
        }).catch((error) => {
            alert(error.message)
        })
    }

    return (
        <ImageBackground source={require('../../../../assets/images/background-grey.jpeg')} resizeMode="cover" style={[styles.background, { width: '100%', height: '100%' }]}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.itemCenter}>
                    <TouchableOpacity style={[styles.buttonPhoto, { padding: 10, marginTop: 10 }]}><AntDesign name="camera" size={60}></AntDesign></TouchableOpacity>
                    <TouchableOpacity style={[styles.buttonPhoto, { marginTop: 10 }]}><Text style={{ fontSize: 16, padding: 5 }}>Choose Photo</Text></TouchableOpacity>
                </View>
                <View style={styles.container}>
                    <TextInput style={[styles.input, styles.border1, { fontSize: 16 }]} placeholder="Nama User" onChangeText={(nama) => setNama(nama)}></TextInput>
                    <TextInput style={[styles.input, styles.border1, { fontSize: 16 }]} placeholder="Email" onChangeText={(email) => setEmail(email)}></TextInput>
                    <TextInput style={[styles.input, styles.border1, { fontSize: 16 }]} placeholder="Password" onChangeText={(password) => setPassword(password)} secureTextEntry={true}></TextInput>
                    <SelectList
                        data={dataRole}
                        setSelected={setRole}
                        boxStyles={[styles.input, { backgroundColor: "#fff", borderRadius: 100 }]}
                        inputStyles={{ fontSize: 16, }}
                    />
                    <TextInput style={[styles.input, styles.border1, { fontSize: 16 }]} placeholder="No Telp" onChangeText={(noTelp) => setNoTelp(noTelp)}></TextInput>
                    <TextInput style={[styles.textInput, styles.border1]} placeholder="Alamat" onChangeText={(alamat) => setAlamat(alamat)}></TextInput>
                    <View style={[{ marginTop: 20, }]}>
                        <TouchableHighlight onPress={createStaff} style={[styles.button, { backgroundColor: "#FE1919", width: "80%", marginLeft: "10%" }]}><Text style={[styles.textCenter, { fontSize: 22, color: "#ffffff", padding: 5 }]}><FontAwesome name="plus" size={22} style={{ marginRight: 10 }}></FontAwesome>Tambah Staff</Text></TouchableHighlight>
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
    )
}

export default TambahStaff;

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