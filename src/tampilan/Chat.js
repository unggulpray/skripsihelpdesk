import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableHighlight, TouchableOpacity } from "react-native";
import firebase from "firebase/compat";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

import AntDesign from 'react-native-vector-icons/AntDesign';

export default function Chat({ route, navigation }) {

    const [chatPenerima, setChatPenerima] = useState([]);
    const [chatPengirim, setChatPengirim] = useState([]);
    const [chat, setChat] = useState([]);

    const [pesan, setPesan] = useState('');
    const [resultChat, setResultChat] = useState([]);
    const [endResultChat, setEndResultChat] = useState([]);

    const pesanRef = useRef(null);

    useEffect(() => {
        console.log("idKontak : ", route.params.idKontak);
        const getPengirim = firebase.firestore().collection('chat').where('idPengirim', '==', firebase.auth().currentUser.uid).where('idPenerima', '==', route.params.idKontak).orderBy('createdDate', 'asc').onSnapshot((snapshots) => {
            const kiriman = [];
            let currentDay = null;
            let currentArray = null;

            snapshots.forEach((doc) => {
                const date = doc.data().createdDate.toDate().toLocaleDateString();
                const data = doc.data()
                data.id = doc.id
                data.tipe = 'pengirim'

                if (date !== currentDay) {
                    currentDay = date;
                    currentArray = { date, data: [] }
                    kiriman.push(currentArray)
                }
                currentArray.data.push(data);
            })
            setChatPengirim(kiriman);
        });

        const getPenerima = firebase.firestore().collection('chat').where('idPenerima', '==', firebase.auth().currentUser.uid).where('idPengirim', '==', route.params.idKontak).orderBy('createdDate', 'asc').onSnapshot((snapshots) => {
            const chatPenerima = [];
            let currentDay = null;
            let currentArray = null;

            snapshots.forEach((doc) => {
                const date = doc.data().createdDate.toDate().toLocaleDateString();
                const data = doc.data()
                data.id = doc.id
                data.tipe = 'penerima'

                if (date !== currentDay) {
                    currentDay = date;
                    currentArray = { date, data: [] }
                    chatPenerima.push(currentArray)
                }
                currentArray.data.push(data);
            })
            setChatPenerima(chatPenerima);
        });

        return () => {
            getPengirim();
            getPenerima();
        };

    }, [route.params.idKontak]);

    useEffect(() => {
        setChat([...chatPenerima, ...chatPengirim].sort((a, b) => a.date - b.date));
    }, [chatPenerima, chatPengirim]);

    useEffect(() => {
        const joinChatByDate = chat.reduce((acc, obj) => {
            const { date, data } = obj;
            if (acc[date]) {
                acc[date] = [...acc[date], ...data];
            } else {
                acc[date] = [...data];
            }
            return acc;
        }, {});

        const newArray = Object.keys(joinChatByDate).map(date => {
            return {
                date,
                data: joinChatByDate[date]
            };
        });

        setResultChat(newArray);
    }, chat)

    useEffect(() => {
        function compareByDate(a, b) {
            const DateA = new Date(a.date);
            const DateB = new Date(b.date);
            return DateA - DateB;
        }
        resultChat.sort(compareByDate);
        setEndResultChat(resultChat);
    }, [resultChat])

    useEffect(() => {
        console.log("end result : ", endResultChat);
    }, [endResultChat])


    const kirim = () => {
        if (pesan != '') {
            firebase.firestore().collection('chat').doc().set({
                createdDate: firebase.firestore.Timestamp.now(),
                idPengirim: firebase.auth().currentUser.uid,
                idPenerima: route.params.idKontak,
                pesan: pesan
            }).then(() => {
                pesanRef.current.clear();
            })
        }
    }

    const hapusPesan = async (idPesan) => {
        try {
            const docRef = firebase.firestore().collection('chat').doc(idPesan);
            await docRef.delete();
        } catch (error) {
            alert(error);
        }

    }

    const scrollViewRef = useRef(null);
    const [isAtEnd, setIsAtEnd] = useState(false);

    const handleScroll = (event) => {
        const scrollPosition = event.nativeEvent.contentOffset.y;
        const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;
        const contentHeight = event.nativeEvent.contentSize.height;
        const isAtEnd = scrollPosition + scrollViewHeight >= contentHeight;
        setIsAtEnd(isAtEnd);
    };

    const handleContentSizeChange = () => {
        scrollViewRef.current.scrollToEnd({ animated: true });
    };

    return (
        <SafeAreaView style={{ backgroundColor: '#85BFA1' }}>
            <View style={[style.container]}>
                <View style={[{ height: "90%" }]}>
                    <ScrollView ref={scrollViewRef} onContentSizeChange={handleContentSizeChange} onScroll={handleScroll}>
                        {
                            endResultChat.map((item, index) => {
                                const now = firebase.firestore.Timestamp.now().toDate().toLocaleDateString();
                                const nowDate = new Date();
                                let tanggal = item.date;

                                // Get the date and time for 24 hours ago
                                const yesterday = new Date(nowDate.getTime() - (24 * 60 * 60 * 1000));

                                // Format the date as a string
                                const yesterdayString = yesterday.toLocaleDateString();

                                console.log(yesterday);
                                if (item.date == now) {
                                    tanggal = "Today";
                                } else if (item.date == yesterdayString) {
                                    tanggal = "Yesterday";
                                }
                                return (
                                    <>
                                        <View style={[{ marginTop: 20, alignItems: "center" }]}>
                                            <View style={[{ backgroundColor: "white", maxWidth: 200, borderRadius: 100 }]}>
                                                <Text style={{ paddingLeft: 8, paddingRight: 8, }}>{tanggal}</Text>
                                            </View>
                                        </View>
                                        {
                                            item.data.map((itemData, indexData) => {
                                                if (itemData.tipe == 'penerima') {
                                                    return (
                                                        <View style={{ width: "100%", alignItems: "flex-start" }}>
                                                            <TouchableHighlight style={[style.boxPenerima, style.box]}>
                                                                <View key={itemData.id} >
                                                                    <Text style={[style.textStyle, { color: "#000", paddingBottom: 15, marginRight: 30, marginBottom: 10 }]}>{itemData.pesan}</Text>
                                                                    <Text style={[style.timePosition]}>{new Date(itemData.createdDate.seconds * 1000).getHours()}:{new Date(itemData.createdDate.seconds * 1000).getMinutes()}</Text>
                                                                </View>
                                                            </TouchableHighlight>
                                                        </View>
                                                    )
                                                } else {
                                                    return (
                                                        <View style={[{ width: "100%", alignItems: "flex-end" }]}>
                                                            <TouchableHighlight style={[style.boxPengirim, style.box]}>
                                                                <View key={itemData.id}>
                                                                    <Text style={[style.textStyle, { color: "#fff", paddingBottom: 15, marginRight: 30, marginBottom: 10 }]}>{itemData.pesan}</Text>
                                                                    <Text style={[style.timePosition]}>{new Date(itemData.createdDate.seconds * 1000).getHours()}:{new Date(itemData.createdDate.seconds * 1000).getMinutes()}</Text>
                                                                </View>
                                                            </TouchableHighlight>
                                                        </View>
                                                    )
                                                }
                                            })
                                        }
                                    </>
                                )
                            })}
                    </ScrollView>
                    {!isAtEnd && (
                        <View style={{ alignItems: "flex-end" }}>
                            <TouchableOpacity onPress={handleContentSizeChange} style={[style.buttonScroll]}>
                                <FontAwesome5Icon name="angle-double-down" color="black" size={20}></FontAwesome5Icon>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
                <TextInput ref={pesanRef} style={[style.inputPesan]} placeholder="Masukkan Pesan"
                    value={pesan}
                    multiline={true}
                    numberOfLines={2}
                    onChangeText={(pesan) => { setPesan(pesan) }}
                />
                {/* <Button title="😀" onPress={() => setShowEmojiPicker(true)} />
                {showEmojiPicker && (
                    <EmojiSelector onEmojiSelected={handleEmojiSelect} />
                )} */}
                <TouchableHighlight style={style.sendButton} onPress={kirim}>
                    <FontAwesome name="send" size={20} color="white"></FontAwesome>
                </TouchableHighlight>
            </View>
        </SafeAreaView>
    )
}

Chat.navigationOption = ({ navigation }) => ({
    headerLeft: () => {
        <TouchableOpacity onPress={() => { navigation.goBack() }}>
            <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
    }
})

const style = StyleSheet.create({
    buttonScroll: {
        position: "absolute",
        backgroundColor: '#05584F',
        bottom: 0,
        width: 30,
        height: 30,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center"
    },
    textStyle: {
        fontSize: 17,
        padding: 5,
    },
    timePosition: {
        position: 'absolute',
        bottom: 0,
        right: 10,
    },
    boxPengirim: {
        backgroundColor: "#32a852",
        borderTopLeftRadius: 8,
    },
    boxPenerima: {
        backgroundColor: "#fff",
        borderTopRightRadius: 8,
    },
    box: {
        maxWidth: "80%",
        marginTop: 10,
        borderBottomEndRadius: 8,
        borderBottomLeftRadius: 8,
    },
    container: {
        width: "96%",
        height: "100%",
        marginLeft: "2%"
    },
    inputPesan: {
        borderRadius: 25,
        borderColor: "#000",
        backgroundColor: "#fff",
        position: "absolute",
        width: "100%",
        flex: 1,
        height: 50,
        paddingLeft: 20,
        paddingRight: 70,
        bottom: 10
    },
    sendButton: {
        backgroundColor: '#05584F',
        position: "absolute",
        height: 40,
        width: 40,
        borderRadius: 100,
        paddingHorizontal: 10,
        paddingVertical: 10,
        bottom: 15,
        right: 10
    },
})
