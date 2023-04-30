import react, { useEffect, useState } from "react";
import { SafeAreaView, Image, StyleSheet, View, Text, TouchableHighlight, ImageBackground, TouchableOpacity } from "react-native";
import { firebase } from '../../config/firebase';
import CountdownTimer from "../../component/CountdownTimer";
import { Card } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

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
                <Text style={[{ color: "#F23C3C", fontSize: 15 }]}>{formatTime(timeRemaining)}</Text>
            </View>
        );
    };

    useEffect(() => {
        firebase.firestore().collection('keluhan').doc(route.params.id).onSnapshot((snapshots) => {
            setKeluhan([snapshots.data()]);
            console.log(snapshots.data());
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
        <View style={{backgroundColor:"white", width:"100%", height:"100%"}}>
                <Image source={{ uri: 'https://sekawantriasa.com/wp-content/uploads/2021/08/Esa-Unggul-Tangerang.jpg' }} style={{ width: '100%', height: 200, top: 0 }} />
                <ScrollView style={{padding:20}}>
    {keluhan.map((item, index)=>{
        const tanggalDibuat = new Date(item.createdAt.seconds * 1000);
        const waktu = tanggalDibuat.getHours()+":"+tanggalDibuat.getMinutes()+":"+tanggalDibuat.getSeconds();
        const tanggal = tanggalDibuat.getDate();
        const bulan = tanggalDibuat.getMonth();
        let BulanString = '';
        switch (bulan) {
            case 0:
                BulanString = "January";
                break;
            case 1:
                BulanString = "Febuary";
                break;
            case 2:
                BulanString = "Maret";
                break;
            case 3:
                BulanString = "April";
                break;
            case 4:
                BulanString = "Mei";
                break;
            case 5:
                BulanString = "Juni";
                break;
            case 6:
                BulanString = "Juli";
                break;
            case 7:
                BulanString = "Agustus";
                break;
            case 8:
                BulanString = "September";
                break;
            case 9:
                BulanString = "Oktober";
                break;
            case 10:
                BulanString = "November";
                break;
            case 11:
                BulanString = "Desember";
                break;
        }
        const tahun = tanggalDibuat.getFullYear();

        const tanggalDeadline = new Date(item.deadline.seconds * 1000);
        const waktuDeadline = tanggalDeadline.getHours()+":"+tanggalDeadline.getMinutes()+":"+tanggalDeadline.getSeconds();
        const tanggalD = tanggalDeadline.getDate();
        const bulanDeadline = tanggalDeadline.getMonth();
        let BulanStringDeadline = '';
        switch (bulanDeadline) {
            case 0:
                BulanStringDeadline = "January";
                break;
            case 1:
                BulanStringDeadline = "Febuary";
                break;
            case 2:
                BulanStringDeadline = "Maret";
                break;
            case 3:
                BulanStringDeadline = "April";
                break;
            case 4:
                BulanStringDeadline = "Mei";
                break;
            case 5:
                BulanStringDeadline = "Juni";
                break;
            case 6:
                BulanStringDeadline = "Juli";
                break;
            case 7:
                BulanStringDeadline = "Agustus";
                break;
            case 8:
                BulanStringDeadline = "September";
                break;
            case 9:
                BulanStringDeadline = "Oktober";
                break;
            case 10:
                BulanStringDeadline = "November";
                break;
            case 11:
                BulanStringDeadline = "Desember";
                break;
        }
        const tahunDeadline = tanggalDeadline.getFullYear();

          return(
            <View style={{flexDirection:"column"}}>
                <View style={[{flexDirection:"row", justifyContent:"space-between"}]}>
                    <View style={{backgroundColor:"green", padding:5, borderRadius:10}}>
                        <Text style={{fontWeight:"bold", color:"white"}}>{item.judulKeluhan}</Text>
                    </View>
                    <Text><CountdownTimer initialTime={waktuDibuat - timestamp} /></Text>
                </View>
                <View style={{width:"100%", borderColor:"#000", borderWidth:1, marginTop:5}}></View>
                <View style={[{flexDirection:"row", justifyContent:"space-between", marginTop:10}]}>
                    <Text>Pengaju : </Text>
                    <Text>{nama}</Text>
                </View>
                <View style={[{flexDirection:"row", justifyContent:"space-between"}]}>
                    <Text>Diajukan Pada tanggal : </Text>
                    <Text>{tanggal+" "+BulanString+" "+tahun+", "+waktu}</Text>
                </View>
                <View style={[{flexDirection:"row", justifyContent:"space-between"}]}>
                    <Text>Deadline : </Text>
                    <Text>{tanggalD+" "+BulanStringDeadline+" "+tahunDeadline+", "+waktuDeadline}</Text>
                </View>
                <View style={[{flexDirection:"row", justifyContent:"space-between"}]}>
                    <Text>Status : </Text>
                    <Text>{item.status}</Text>
                </View>
                <View style={[{flexDirection:"row", justifyContent:"space-between", marginTop:30}]}>
                    <View style={{backgroundColor:"green", padding:5, borderRadius:10}}>
                        <Text style={{fontWeight:"bold", color:"white"}}>Keluhan</Text>
                    </View>
                </View>
                <View style={{width:"100%", borderColor:"#000", borderWidth:1, marginTop:5}}></View>
                <View><Text>{item.keluhan}</Text></View>
                <View style={{flexDirection:"row", justifyContent:"flex-end",marginTop:30}}>
                    <TouchableOpacity style={{backgroundColor:"green", marginRight:5, padding:10, borderRadius:10}}>
                        <Text style={{color:"white"}}>Tunda</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor:"#108EE9", padding:10, borderRadius:10,}}>
                        <Text style={{color:"white"}}>Kerjakan</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    })}
    </ScrollView>
        </View>
    )
}

export default DetailReminder;

const styles = StyleSheet.create({
    modal:{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
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