import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import firebase from "firebase/compat";
import { collection, query } from "firebase/firestore";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";


const ChatAdmin = ({ navigation }) => {
    const [listStaffUmum, setlistStaffUmum] = useState([]);
    const [lastChat, setLastChat] = useState([]);
    const [chatKirim, setChatKirim] = useState([]);
    const [chatTerima, setChatTerima] = useState([]);

    useEffect(() => {
        firebase.firestore().collection('staff').where('idUser', '!=', firebase.auth().currentUser.uid).where('role', '==', 3).onSnapshot((snapshots) => {
            const IT = [];
            snapshots.forEach((doc) => {
                const data = doc.data()
                data.id = doc.id

                IT.push(data);
            })
            setlistStaffUmum(IT);
        });
    }, [])


    useEffect(() => {
        const arrayChatKirim = [];
        const arrayChatTerima = [];
        listStaffUmum.map((item, index) => {
            firebase.firestore().collection('chat').where('idPengirim', '==', firebase.auth().currentUser.uid).where('idPenerima', '==', item.idUser).orderBy('createdDate', 'desc').limit(1).onSnapshot((snapshots) => {
                let chatLooping = [];
                snapshots.forEach((doc) => {
                    const data = doc.data()
                    data.id = doc.id
                    data.tipe = "pengirim"

                    chatLooping.push(data);
                    arrayChatKirim.push(data);
                    setChatKirim([...arrayChatKirim]);
                });

                if (chatLooping.length < 1) {
                    const data = {};
                    arrayChatKirim.push(data);

                    setChatKirim([...arrayChatKirim]);
                }
            })
            firebase.firestore().collection('chat').where('idPengirim', '==', item.idUser).where('idPenerima', '==', firebase.auth().currentUser.uid).orderBy('createdDate', 'desc').limit(1).onSnapshot((snapshots) => {
                let chatLooping = [];
                snapshots.forEach((doc) => {
                    const data = doc.data()
                    data.id = doc.id
                    data.tipe = "penerima"

                    chatLooping.push(data);
                    arrayChatTerima.push(data)
                    setChatTerima([...arrayChatTerima]);
                })

                if (chatLooping.length < 1) {
                    const data = {};
                    arrayChatTerima.push(data);

                    setChatTerima([...arrayChatTerima]);
                }
            })
        })
    }, [listStaffUmum])

    useEffect(() => {
        console.log("chat kirim : ", chatKirim);
        console.log("chat terima : ", chatTerima);
        const saringChat = [];
        listStaffUmum.map((item, index) => {
            if (chatKirim[index] == undefined || chatTerima[index] == undefined) {
                setLastChat([]);
            } else {
                if (chatKirim[index].createdDate == undefined && chatTerima[index].createdDate == undefined) {
                    const data = { tipe: "tidakada" }
                    saringChat.push(data);
                    setLastChat([...saringChat]);
                } else if (chatKirim[index].createdDate != undefined && chatTerima[index].createdDate == undefined) {
                    saringChat.push(chatKirim[index]);
                    setLastChat([...saringChat]);
                } else if (chatKirim[index].createdDate == undefined && chatTerima[index].createdDate != undefined) {
                    saringChat.push(chatTerima[index]);
                    setLastChat([...saringChat]);
                } else {
                    if (chatKirim[index].createdDate.seconds > chatTerima[index].createdDate.seconds) {
                        saringChat.push(chatKirim[index]);
                        setLastChat([...saringChat]);
                    } else {
                        saringChat.push(chatTerima[index]);
                        setLastChat([...saringChat]);
                    }
                }
            }
        })

    }, [chatKirim, chatTerima])

    useEffect(() => {
        console.log("ini last chat : ", lastChat);
    }, [lastChat])

    return (
        <ScrollView>
            {listStaffUmum.map((item, index) => {
                if (lastChat[index] != undefined) {
                    if (lastChat[index].tipe == "penerima") {
                        return (
                            <TouchableOpacity onPress={() => { navigation.navigate('Chat', { idKontak: item.idUser }) }}>
                                <View style={[{ flexDirection: 'row', marginLeft: 10, marginTop: 2 }]} >
                                    <Image source={{ uri: 'https://i1.rgstatic.net/ii/profile.image/1083598790766599-1635361492906_Q512/Unggul-Prayuda.jpg' }} style={{ width: 50, height: 50, borderRadius: 100 }} />
                                    <View style={{ flexDirection: 'column', marginLeft: 10, marginTop: 2 }}>
                                        <Text style={{ fontWeight: 'bold' }}>{item.nama}</Text>
                                        <Text>{lastChat[index].pesan}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    } else if (lastChat[index].tipe == "pengirim") {
                        return (
                            <TouchableOpacity onPress={() => { navigation.navigate('Chat', { idKontak: item.idUser }) }}>
                                <View style={[{ flexDirection: 'row', marginLeft: 10, marginTop: 2 }]} >
                                    <Image source={{ uri: 'https://i1.rgstatic.net/ii/profile.image/1083598790766599-1635361492906_Q512/Unggul-Prayuda.jpg' }} style={{ width: 50, height: 50, borderRadius: 100 }} />
                                    <View style={{ flexDirection: 'column', marginLeft: 10, marginTop: 2 }}>
                                        <Text style={{ fontWeight: 'bold' }}>{item.nama}</Text>
                                        <Text>Anda : {lastChat[index].pesan}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    } else {
                        return (
                            <TouchableOpacity onPress={() => { navigation.navigate('Chat', { idKontak: item.idUser }) }}>
                                <View style={[{ flexDirection: 'row', marginLeft: 10, marginTop: 2 }]} >
                                    <Image source={{ uri: 'https://i1.rgstatic.net/ii/profile.image/1083598790766599-1635361492906_Q512/Unggul-Prayuda.jpg' }} style={{ width: 50, height: 50, borderRadius: 100 }} />
                                    <View style={{ flexDirection: 'column', marginLeft: 10, marginTop: 2 }}>
                                        <Text style={{ fontWeight: 'bold' }}>{item.nama}</Text>
                                        <Text>wkwk</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }
                }
            })}
        </ScrollView>
    )
}

export default ChatAdmin;