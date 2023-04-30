import { onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import {Card} from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import {firebase} from "../../../config/firebase";

const BarangMasuk =({navigation}) =>{
    const [Keluaran, setKeluaran] = useState([]);
    const [barang, setBarang] = useState([]);
    const [admin, setAdmin] = useState([]);
    useEffect(()=>{
        firebase.firestore().collection("barangKeluar").onSnapshot((snapshots)=>{
            const dataKeluaran = [];
            let currentDay = null;
            let currentArray = null;

            snapshots.forEach((doc)=>{
                const date = doc.data().tanggal.toDate().toLocaleDateString();
                const data = doc.data()
                data.id = doc.id

                if (date !== currentDay) {
                    currentDay = date;
                    currentArray = { date, data: [] };
                    dataKeluaran.push(currentArray)
                }
                currentArray.data.push(data);
            })
            console.log("data Keluaran : ", dataKeluaran);
            setKeluaran([...dataKeluaran]);
        })
    },[])

    useEffect(()=>{
        let getBarang =[];
        let getAdmin = [];
        Keluaran.map((item, index)=>{
            item.data.map((isi, indexIsi)=>{
                firebase.firestore().collection("stockBarang").doc(isi.idBarang).onSnapshot((snapshots)=>{
                    const data = snapshots.data();
                    data.id = snapshots.id;

                    getBarang.push(data);
                    setBarang([...getBarang]);
                })
    
                firebase.firestore().collection("staff").doc(isi.idAdmin).onSnapshot((snapshots)=>{
                    const data = snapshots.data();
                    data.id = snapshots.id;

                    getAdmin.push(data);
                    setAdmin([...getAdmin]);
                })
            })
        })
    },[Keluaran])

    return(
        <View>
            {Keluaran.map((item, index)=>{
                 const tanggalKeluar = new Date(item.date);
                 const tanggal = tanggalKeluar.getDate();
                 const bulan = tanggalKeluar.getMonth();
                 const tahun = tanggalKeluar.getFullYear();
                 let BulanString ='';
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
                return(
                    <View>
                        <Text style={{marginLeft:"5%", marginTop:15, marginBottom:-10}}>{tanggal+" "+BulanString+" "+tahun}</Text>
                        {item.data.map((isi,indexIsi)=>{
                        const getDataBarang = barang.find(obj => obj.id == isi.idBarang);
                        const getDataAdmin = admin.find(obj => obj.id == isi.idAdmin);

                        if(getDataAdmin != undefined && getDataBarang != undefined){
                            return(
                                <TouchableOpacity onPress={()=>{navigation.navigate("detailBarang", {id: isi.id, tipe:"keluar"})}}>
                                    <Card>
                                        <View style={{flexDirection:"row"}}>
                                            <Image source={{uri: `${barang[indexIsi].foto}`}} style={{width:50, height:50, marginRight:15}}></Image>
                                            <View>
                                                <Text style={{fontWeight:"bold"}}>{barang[indexIsi].namaBarang}</Text>
                                                <Text>Jumlah : {isi.jumlah}</Text>
                                            </View>
                                        </View>
                                        <View style={{flexDirection:"row"}}>
                                            <Text>Pemberi : {getDataAdmin.nama}</Text>
                                        </View>
                                    </Card>
                                </TouchableOpacity>
                            )
                        }
                    })}
                    </View>
                )
            })}
        </View>
    )
}

export default BarangMasuk;