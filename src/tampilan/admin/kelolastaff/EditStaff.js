import { async } from "@firebase/util";
import react, { useEffect, useState } from "react";
import { TouchableHighlight, TouchableOpacity, View, ImageBackground, Pressable } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { SelectList } from "react-native-dropdown-select-list";
import { StyleSheet, Text } from "react-native";
import { addDoc, collection, getDoc, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import db from "../../../config/db";
import { firebase } from '../../../config/firebase';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Camera from "../../../component/Camera";
import CountdownTimer from "../../../component/CountdownTimer";


const EditStaff = ({ route, navigation }) => {
    console.log(route.params.data);
    let seconds = route.params.data.createdDate.seconds;
    let nanoseconds = route.params.data.createdDate.nanoseconds;
    const milliseconds = seconds * 1000 + nanoseconds / 1000000; // Calculate total milliseconds
    const date = new Date(milliseconds); // Convert to Date object
    console.log(date); // Output the date object to the console
    // let timeString = date.toLocaleTimeString();
    let [nama, setNama] = useState(route.params.data.nama);
    let dataRole = ['Staff Admin', 'Staff Umum', 'Staff IT'];
    let [role, setRole] = useState(route.params.data.role);
    let [noTelp, setNoTelp] = useState(route.params.data.noTelp);
    let [alamat, setAlamat] = useState(route.params.data.alamat);

    const { EmailAuthProvider } = firebase.auth;
    const emailAuthProvider = new EmailAuthProvider();

    const updatePassword = () => {
        let user = firebase.auth().currentUser;
        // const credential = firebase.auth()
    }

    return (
        <ImageBackground source={require('../../../../assets/images/background-grey.jpeg')} resizeMode="cover" style={[styles.background, { width: '100%', height: '100%' }]}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                {/* <Text>{}</Text> */}
                {/* <Text>{timeString}</Text> */}
                <CountdownTimer initialTime={20} />
                {/* <Pressable onPress={() => navigation.navigate('VideoCall')}>
                    <Text>VideoCall</Text>
                </Pressable> */}
                <Camera />
                <View style={styles.container}>
                    <TextInput style={[styles.input, styles.border1, { fontSize: 16 }]} placeholder="Nama User" value={route.params.data.nama} onChangeText={(nama) => setNama(nama)}></TextInput>
                    <SelectList
                        data={dataRole}
                        setSelected={setRole}
                        boxStyles={[styles.input, { backgroundColor: "#fff", borderRadius: 100 }]}
                        inputStyles={{ fontSize: 16, }}
                    />
                    <TextInput style={[styles.input, styles.border1, { fontSize: 16 }]} placeholder="No Telp" value={route.params.data.noTelp} onChangeText={(noTelp) => setNoTelp(noTelp)}></TextInput>
                    <TextInput style={[styles.textInput, styles.border1]} placeholder="Alamat" value={route.params.data.alamat} onChangeText={(alamat) => setAlamat(alamat)}></TextInput>
                    <View style={[{ marginTop: 20, }]}>
                        <TouchableHighlight style={[styles.button, { backgroundColor: "#FE1919", width: "80%", marginLeft: "10%" }]}><Text style={[styles.textCenter, { fontSize: 22, color: "#ffffff", padding: 5 }]}><FontAwesome name="plus" size={22} style={{ marginRight: 10 }}></FontAwesome>Edit Staff</Text></TouchableHighlight>
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
    )
}

export default EditStaff;

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