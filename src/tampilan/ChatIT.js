import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import firebase from "firebase/compat";
import { collection, query } from "firebase/firestore";
import { TouchableOpacity } from "react-native-gesture-handler";


const ChatAdmin = ({ navigation }) => {
    const [listIT, setListIT] = useState([]);
    const [lastChat, setLastChat] = useState([]);
    let chatKirim = [];
    let chatTerima = [];

    useEffect(() => {
        firebase.firestore().collection('staff').where('idUser', '!=', firebase.auth().currentUser.uid).where('role', '==', 2).onSnapshot((snapshots) => {
            const IT = [];
            snapshots.forEach((doc) => {
                const data = doc.data()
                data.id = doc.id

                IT.push(data);
            })
            setListIT(IT);
        });
    }, [])


    useEffect(() => {
        // setAllChatTerima([]);
        // setAllChatKirim([]);

        listIT.map((item, index) => {
            chatKirim = [];
            chatTerima = [];
            firebase.firestore().collection('chat').where('idPengirim', '==', firebase.auth().currentUser.uid).where('idPenerima', '==', item.idUser).orderBy('createdDate', 'desc').limit(1).onSnapshot((snapshots) => {
                snapshots.forEach((doc) => {
                    const data = doc.data()
                    data.id = doc.id
                    if (chatKirim.filter((msg) => msg.id === data.id).length < 1) {
                        console.log("chat kirim : ", index, chatKirim);
                        chatKirim.push(data);
                    }
                })
            })
            firebase.firestore().collection('chat').where('idPengirim', '==', item.idUser).where('idPenerima', '==', firebase.auth().currentUser.uid).orderBy('createdDate', 'desc').limit(1).onSnapshot((snapshots) => {
                snapshots.forEach((doc) => {
                    const data = doc.data()
                    data.id = doc.id
                    if (chatTerima.filter((msg) => msg.id === data.id).length < 1) {
                        console.log("chat terima : ", index, chatTerima);
                        chatTerima.push(data);
                    }
                })
            })
        })
    }, [listIT])

    useEffect(() => {
        console.log("all chat wkwk terima : ", chatKirim);
        console.log("all chat kirim : ", chatTerima);

    }, [chatKirim, chatTerima])

    return (
        <View>
            {listIT.map((item, index) => {
                return (
                    <TouchableOpacity onPress={() => { navigation.navigate('Chat', { idKontak: item.idUser }) }}>
                        <View style={[{ flexDirection: 'row', marginLeft: 10, marginTop: 2 }]} >
                            <Image source={{ uri: 'https://i1.rgstatic.net/ii/profile.image/1083598790766599-1635361492906_Q512/Unggul-Prayuda.jpg' }} style={{ width: 50, height: 50, borderRadius: 100 }} />
                            <View style={{ flexDirection: 'column', marginLeft: 10, marginTop: 2 }}>
                                <Text style={{ fontWeight: 'bold' }}>{item.nama}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

export default ChatAdmin;