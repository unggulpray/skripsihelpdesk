import React, { useEffect, useState } from "react";
import { Card, Text } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { firebase } from '../../config/firebase';
import { ScrollView } from "react-native-gesture-handler";
import { View, Image } from "react-native";
const PengajuanBarang = () => {
    const [dataPengajuan, setDataPengajuan] = useState([]);
    const [barangPengajuan, setBarangPengajuan] = useState([]);
    useEffect(() => {
        firebase.firestore().collection('pengajuanBarang').where('idStaffIT', '==', firebase.auth().currentUser.uid).orderBy('tanggal', 'desc').onSnapshot((snapshots) => {
            const pengajuan = [];
            let currentDay = null;
            let currentArray = null;

            snapshots.forEach((doc) => {
                const date = doc.data().tanggal.toDate().toLocaleDateString();
                const data = doc.data()
                data.id = doc.id

                if (date !== currentDay) {
                    currentDay = date;
                    currentArray = { date, data: [] };
                    pengajuan.push(currentArray)
                }
                currentArray.data.push(data);
            })
            setDataPengajuan(pengajuan);
        })
    }, [])

    useEffect(() => {
        console.log("data pengajuan : ", dataPengajuan);
        const barang = [];
        dataPengajuan.map((item, index) => {
            item.data.map((isi, indexIsi) => {
                firebase.firestore().collection('stockBarang').doc(isi.idBarangDiajukan).onSnapshot((snapshots) => {
                    barang.push(snapshots.data())
                    setBarangPengajuan([...barang]);
                })
            })
        })
    }, [dataPengajuan])

    useEffect(() => {
        console.log("barang pengajuan : ", barangPengajuan);
    }, [barangPengajuan])
    return (
        <View>
            {dataPengajuan.map((item, index) => {
                const tanggal = new Date(item.date)
                console.log("tgl:", tanggal);
                const date = tanggal.getDate();
                const month = tanggal.getMonth();
                const year = tanggal.getFullYear();
                let BulanString = '';
                switch (month) {
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
                return (
                    <View style={{ marginTop: 5 }}>
                        <Text style={{ fontWeight: 'bold', marginLeft: "5%" }}>{date + " " + BulanString + " " + year}</Text>
                        {item.data.map((isi, indexIsi) => {
                            if (barangPengajuan[indexIsi] != undefined) {
                                return (
                                    <ScrollView>
                                        <Card containerStyle={[{ borderRadius: 10 }]}>
                                            <View style={[{ flexDirection: "row" }]}>
                                                <Image source={{ uri: `${barangPengajuan[indexIsi].foto}` }} style={{ aspectRatio: 1, width: 50 }} />
                                                <View style={{ marginLeft: 20 }}>
                                                    <Text>{barangPengajuan[indexIsi].namaBarang}</Text>
                                                    <Text>Jumlah : {isi.jumlah}</Text>
                                                </View>
                                            </View>
                                        </Card>
                                    </ScrollView>
                                )
                            }
                        })}
                    </View>
                )
            })}
        </View>
    )
}

export default PengajuanBarang;