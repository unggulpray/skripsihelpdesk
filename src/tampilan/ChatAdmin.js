import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import firebase from "firebase/compat";
import { collection, query } from "firebase/firestore";
import { TouchableOpacity } from "react-native-gesture-handler";

const ChatAdmin = ({ navigation }) => {
    const [listAdmin, setListAdmin] = useState([]);
    const [lastChat, setLastChat] = useState([]);
    useEffect(() => {
        firebase.firestore().collection('staff').where('idUser', '!=', firebase.auth().currentUser.uid).where('role', '==', 1).onSnapshot((snapshots) => {
            const admin = [];
            snapshots.forEach((doc) => {
                const data = doc.data()
                data.id = doc.id
                console.log('admin : ', data);
                admin.push(data);
            })
            setListAdmin(admin);
        });

        // listAdmin.map((item, index) => {
        //     const chatKirim = [];
        //     const chatTerima = [];
        //     firebase.firestore().collection('chat').where('idPengirim', '==', firebase.auth().currentUser.uid).where('idPenerima', '==', item.idUser).orderBy('createdDate', 'desc').limit(1).onSnapshot((snapshots) => {
        //         snapshots.forEach((doc) => {
        //             const data = doc.data()
        //             data.id = doc.id
        //             console.log('data kirim : ', data);
        //             chatKirim.push(data);
        //         })
        //     })
        //     firebase.firestore().collection('chat').where('idPengirim', '==', item.idUser).where('idPenerima', '==', firebase.auth().currentUser.uid).orderBy('createdDate', 'desc').limit(1).onSnapshot((snapshots) => {
        //         snapshots.forEach((doc) => {
        //             const data = doc.data()
        //             data.id = doc.id
        //             console.log('data terima : ', data);
        //             chatTerima.push(data);
        //         })
        //     })

        //     if (chatKirim[0].createdDate.seconds > chatTerima[0].createdDate.seconds) {
        //         console.log('last chat kirim', chatKirim);
        //         setLastChat([...lastChat, chatKirim]);
        //     } else if (chatKirim[0].createdDate.seconds < chatTerima[0].createdDate.seconds) {
        //         console.log('last chat terima : ', chatTerima);
        //         setLastChat([...lastChat, chatTerima]);
        //     }
        // })
    }, [])
    return (
        <View>
            {listAdmin.map((item, index) => {
                return (
                    <TouchableOpacity onPress={() => { navigation.navigate('Chat', { idKontak: item.idUser }) }}>
                        <View style={[{ flexDirection: 'row', marginLeft: 10, marginTop: 2 }]} >
                            <Image source={{ uri: 'https://i1.rgstatic.net/ii/profile.image/1083598790766599-1635361492906_Q512/Unggul-Prayuda.jpg' }} style={{ width: 50, height: 50, borderRadius: 100 }} />
                            <View style={{ flexDirection: 'column', marginLeft: 10, marginTop: 2 }}>
                                <Text style={{ fontWeight: 'bold' }}>{item.nama}</Text>
                                <Text>{item.nama}</Text>
                            </View>
                            {/* <Text>{lastChat[index].createdDate}</Text> */}
                        </View>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

export default ChatAdmin;