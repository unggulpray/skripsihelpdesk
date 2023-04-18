import react, { useEffect, useState } from "react";
import { SafeAreaView, Image, StyleSheet, View, Text, TouchableHighlight, ImageBackground } from "react-native";
import { firebase } from '../../config/firebase';
import CountdownTimer from "../../component/CountdownTimer";

const DetailReminder = ({ route, navigation }) => {
    const [keluhan, setKeluhan] = useState([]);
    const [nama, setNama] = useState('');
    const [waktuDibuat, setWaktuDibuat] = useState(0);
    const [timestamp, setTimestamp] = useState([]);

    const CountdownTimer = ({ initialTime }) => {
        const [timeRemaining, setTimeRemaining] = useState(initialTime);
        let stop = initialTime;

        useEffect(() => {
            const interval = setInterval(() => {
                setTimeRemaining(prevTime => prevTime - 1);
                stop--;
                if (stop < 1) {
                    clearInterval(interval);
                    console.log('Interval stopped.');
                }
            }, 1000);

        }, []);

        const formatTime = (time) => {
            let hours = Math.floor((time / 60) / 60)
            let minutes = Math.floor(time / 60);
            let seconds = time % 60;
            if (stop < 1) {
                minutes = 0;
                seconds = 0;
                return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            } else {
                if (minutes < 60) {
                    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                } else {
                    minutes = Math.floor((time / 60) - (60 * hours));
                    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                }
            }
        };

        return (
            <View>
                <Text style={[{ color: "#F23C3C", fontSize: 20 }]}>{formatTime(timeRemaining)}</Text>
            </View>
        );
    };

    useEffect(() => {
        firebase.firestore().collection('keluhan').doc(route.params.id).onSnapshot((snapshots) => {
            setKeluhan([snapshots.data()]);
        })
    }, [route.params.id])

    useEffect(() => {
        if (keluhan[0] != undefined) {
            firebase.firestore().collection('staff').where('idUser', '==', keluhan[0].idStaffUmum).onSnapshot((snapshots) => {
                snapshots.forEach((doc) => {
                    setNama(doc.data().nama);
                })
            });
            setWaktuDibuat(keluhan[0].deadline.seconds);
            setTimestamp(firebase.firestore.Timestamp.now().seconds)
        }
    }, [keluhan])

    useEffect(() => {
        console.log("waktu dibuat : ", waktuDibuat);
        console.log("timestamp : ", timestamp);
    }, [waktuDibuat, timestamp])

    const batalkan = () => {
        const docRef = firebase.firestore().collection('keluhan').doc(route.params.id);

        docRef.update({
            status: 'dibatalkan'
        }).then(
            alert("Keluhan telah dibatalkan"),
            navigation.navigate("Detail")
        )
    }

    return (
        <View>
            <ImageBackground source={require('../../../assets/images/background-detail.jpg')} resizeMode="cover" style={[styles.background, { width: '100%', height: '100%' }]}>
                <View style={[{ position: "absolute", width: "100%" }]}>
                    <Image source={{ uri: 'https://sekawantriasa.com/wp-content/uploads/2021/08/Esa-Unggul-Tangerang.jpg' }} style={{ width: '100%', height: '50%', top: 0 }} />
                    {keluhan.map((item, index) => {
                        return (
                            <>
                                <View style={[styles.backgroundWhite, styles.container, { marginTop: 20, borderRadius: 23 }]}>
                                    <Text style={[styles.bold, styles.textCenter, { color: "#F23C3C", fontSize: 30 }]}>{item.judulKeluhan}</Text>
                                    <Text style={[styles.bold, styles.textCenter]}><CountdownTimer initialTime={waktuDibuat - timestamp} /></Text>
                                </View>
                                <View style={[styles.backgroundWhite, styles.container, { marginTop: 20, marginBottom: 30 }]}>
                                    <View style={{ padding: 20 }}>
                                        <Text style={[styles.bold, styles.sizeLaporan]}>Detail Laporan</Text>
                                        <Text style={styles.sizeLaporan}>Nama    : {nama}</Text>
                                        <Text style={styles.sizeLaporan}>Tanggal : 25-08-2022</Text>
                                        <Text style={styles.sizeLaporan}>Status  : {item.status}</Text>
                                        <Text style={styles.sizeLaporan}>Keluhan : {item.keluhan}</Text>
                                    </View>
                                </View>
                            </>
                        )
                    })}
                    <TouchableHighlight onPress={batalkan} style={[styles.button, styles.container, { backgroundColor: "#FE1919", paddingTop: 10, paddingBottom: 10, width: "60%", marginLeft: "20%" }]}><Text style={[styles.textCenter, { fontSize: 22, color: "#ffffff" }]}>Batalkan</Text></TouchableHighlight>
                </View>
            </ImageBackground>
        </View>
    )
}

export default DetailReminder;

const styles = StyleSheet.create({
    sizeLaporan: {
        fontSize: 20
    },
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