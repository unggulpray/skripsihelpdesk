import React, { useState } from "react";
import { ImageBackground, Image, View, StyleSheet, Text, TextInput, TouchableOpacity, SafeAreaView, Linking, Button } from "react-native";
import { Card } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { firebase } from '../config/firebase';


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    loginUser = async (email, password) => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
        } catch (error) {
            alert('Email atau Password Salah')
        }
    }
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../assets/images/background-login.jpg')} resizeMode="cover" style={[styles.background, { width: '100%', height: '100%' }]}>
                <View style={styles.text}>
                    <Image source={require('../../assets/images/login-security.png')} style={[styles.opacityNormal, { width: 200, height: 200 }]} />
                    <View style={styles.fixPosition}>
                        <TextInput style={[styles.input]} placeholder="Email" onChangeText={(email) => setEmail(email)} />
                        <TextInput style={[styles.input]} placeholder="Password" onChangeText={(password) => setPassword(password)} secureTextEntry={true} />
                        <View style={{ flexDirection: "row", justifyContent: "space-between", margin: 8, }}>
                            <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
                                <TouchableOpacity style={styles.checkbox}></TouchableOpacity>
                                <Text style={[styles.white, styles.bold, { marginTop: -2, marginLeft: 4 }]}>Remember me</Text>
                            </View>
                            <Text style={[styles.bold, styles.white, { marginTop: -2 }]}>Forgot Password?</Text>
                        </View>
                        <TouchableOpacity onPress={() => loginUser(email, password)}>
                            <Text style={[styles.white, styles.textCenter, styles.bold, { fontSize: 25 }]}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View >
    )
}

export default Login;

const styles = StyleSheet.create({
    white: {
        color: '#ffffff',
    },

    bold: {
        fontWeight: 'bold',
    },

    textCenter: {
        textAlign: 'center',
    },
    checkbox: {
        width: 15,
        height: 15,
        borderWidth: 2,
        borderColor: '#000000',
    },
    opacityNormal: {
        marginTop: -100,
        marginLeft: '20%',
    },
    fixPosition: {
        width: '90%',
        marginLeft: '5%',
    },
    input: {
        backgroundColor: '#ffffff',
        height: 40,
        margin: 5,
        padding: 10,
        color: '#000000'
    },
    buttonRadius: {
        borderRadius: 100,
        backgroundColor: '#4F78C7',
        padding: 5,
        width: "80%",
        marginLeft: "10%",
    },
    center: {
        flex: 1,
        justifyContent: "center",
    },
    background: {
        flex: 1,
        justifyContent: "center"
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: "white",
        width: "80%",
        marginLeft: "10%",
        fontSize: 42,
        lineHeight: 200,
        fontWeight: "bold",
        backgroundColor: "#949191",
    }
});