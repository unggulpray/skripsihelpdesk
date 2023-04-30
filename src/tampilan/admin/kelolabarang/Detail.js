import React, { useEffect, useState } from "react";
import { ScrollView, View, Image, Text, TouchableOpacity } from "react-native";
import {firebase} from "../../../config/firebase";

const Detail=({route, navigation}) =>{
    const [masukan, setMasukan] = useState([]);
    const [barang, setBarang]= useState([]);
    const [admin, setAdmin] = useState([]);
    const [ITPenerima, setITPenerima] = useState([]);
    const [pengaju, setPengaju] = useState([]);
    const [keluhan, setKeluhan] = useState([]);
    useEffect(()=>{
        if(route.params.tipe == "masuk"){
            const getDetail = [];
            firebase.firestore().collection("barangMasuk").doc(route.params.id).onSnapshot((snapshots)=>{
                const data = snapshots.data();
                data.id = snapshots.id;

                getDetail.push(data);
                setMasukan([...getDetail]);
            })
        }else if(route.params.tipe == "keluar"){
            const getDetail = [];
            firebase.firestore().collection("barangKeluar").doc(route.params.id).onSnapshot((snapshots)=>{
                const data = snapshots.data();
                data.id = snapshots.id;

                getDetail.push(data);
                setMasukan([...getDetail]);
            })
        }
    },[route.params.id, route.params.tipe])

    useEffect(()=>{
        if(route.params.tipe == "keluar"){
            if(masukan[0] != undefined){
                const getBarang =[];
                const getAdmin =[];
                const getKeluhan = [];
                firebase.firestore().collection("stockBarang").doc(masukan[0].idBarang).onSnapshot((snapshots)=>{
                    const data = snapshots.data();
                    data.id = snapshots.id

                    getBarang.push(data);
                    setBarang([...getBarang]);
                })

                firebase.firestore().collection("staff").doc(masukan[0].idAdmin).onSnapshot((snapshots)=>{
                    const data = snapshots.data();
                    data.id = snapshots.id

                    getAdmin.push(data);
                    setAdmin([...getAdmin]);
                })

                firebase.firestore().collection("keluhan").doc(masukan[0].idKeluhan).onSnapshot((snapshots)=>{
                    const data = snapshots.data();
                    data.id = snapshots.id

                    getKeluhan.push(data);
                    setKeluhan([...getKeluhan]);
                })
            }
        }else if(route.params.tipe == "masuk"){
                    if(masukan[0] != undefined){
                    const getBarang =[];
                    const getAdmin =[];
                    firebase.firestore().collection("stockBarang").doc(masukan[0].idBarang).onSnapshot((snapshots)=>{
                        const data = snapshots.data();
                        data.id = snapshots.id

                        getBarang.push(data);
                        setBarang([...getBarang]);
                    })

                    firebase.firestore().collection("staff").doc(masukan[0].idAdmin).onSnapshot((snapshots)=>{
                        const data = snapshots.data();
                        data.id = snapshots.id

                        getAdmin.push(data);
                        setAdmin([...getAdmin]);
                    })
                }
            }

    },[masukan])

    useEffect(()=>{
        if(keluhan[0] != undefined){
            firebase.firestore().collection("staff").where("idUser","==",keluhan[0].idStaffIT).onSnapshot((snapshots)=>{
            const getITPengaju = [];
            snapshots.forEach((doc)=>{
                const data = doc.data()
                data.id = doc.id

                getITPengaju.push(data)
            })
            setITPenerima([...getITPengaju]);
            })

            firebase.firestore().collection("staff").where("idUser","==",keluhan[0].idStaffUmum).onSnapshot((snapshots)=>{
                const getStaffUmum = [];
                snapshots.forEach((doc)=>{
                    const data = doc.data()
                    data.id = doc.id

                    getStaffUmum.push(data)
                })
                setPengaju([...getStaffUmum]);
            })
        }else{
            setITPenerima([]);
            setPengaju([]);
        }
    },[keluhan])
    return(
        <View style={{backgroundColor:"white", width:"100%", height:"100%"}}>
            <Image source={{ uri: 'https://sekawantriasa.com/wp-content/uploads/2021/08/Esa-Unggul-Tangerang.jpg' }} style={{ width: '100%', height: 200, top: 0 }} />
            <ScrollView style={{padding:20}}>
                {masukan.map((item, index)=>{
                    const tanggalDibuat = new Date(item.tanggal.seconds * 1000);
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
                   if(barang[0] != undefined && admin[0] != undefined){
                    if(route.params.tipe == "masuk"){
                        return(
                            <View style={{flexDirection:"column"}}>
                                <View style={[{flexDirection:"row", justifyContent:"flex-start"}]}>
                                    <View style={{backgroundColor:"green", padding:5, borderRadius:10}}>
                                        <Text style={{fontWeight:"bold", color:"white"}}>Detail Barang</Text>
                                    </View>
                                </View>
                                <View style={{width:"100%", borderColor:"#000", borderWidth:1, marginTop:5}}></View>
                                <View style={[{flexDirection:"row", justifyContent:"space-between", marginTop:10}]}>
                                    <View style={{flexDirection:"row"}}>    
                                        <Image source={{uri:`${barang[0].foto}`}} style={{width:50, height:50, marginRight:15}}></Image>
                                        <View style={{alignSelf:"center"}}>
                                            <Text>{barang[0].namaBarang}</Text>
                                        </View>
                                    </View>
                                    <View style={{alignSelf:"center"}}>
                                        <Text>x{item.jumlah}</Text>
                                    </View>
                                </View>
                                <View style={[{flexDirection:"row", justifyContent:"flex-start",marginTop:20}]}>
                                    <View style={{backgroundColor:"green", padding:5, borderRadius:10}}>
                                        <Text style={{fontWeight:"bold", color:"white"}}>Penginput</Text>
                                    </View>
                                </View>
                                <View style={{width:"100%", borderColor:"#000", borderWidth:1, marginTop:5}}></View>
                                <View style={[{flexDirection:"row", justifyContent:"space-between", marginTop:10}]}>
                                   <Text>Nama : </Text>
                                   <Text>{admin[0].nama}</Text>
                                </View>
                                <View style={[{flexDirection:"row", justifyContent:"space-between"}]}>
                                    <Text>Email : </Text>
                                    <Text>{admin[0].email}</Text>
                                </View>
                                <View style={[{flexDirection:"row", justifyContent:"space-between"}]}>
                                    <Text>No Telp : </Text>
                                    <Text>{admin[0].noTelp}</Text>
                                </View>
                                <View style={[{flexDirection:"row", justifyContent:"space-between"}]}>
                                    <Text>Diinput tanggal : </Text>
                                    <Text>{tanggal+" "+BulanString+" "+tahun+", "+waktu}</Text>
                                </View>
                                <View style={{flexDirection:"row", justifyContent:"flex-end",marginTop:30,marginBottom:40}}>
                        <TouchableOpacity style={{backgroundColor:"green", marginRight:5, padding:10, borderRadius:10}}>
                            <Text style={{color:"white"}}>Tunda</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{backgroundColor:"#108EE9", padding:10, borderRadius:10,}}>
                            <Text style={{color:"white"}}>Kerjakan</Text>
                        </TouchableOpacity>
                    </View>
                            </View>
                            
                        )
                    }else if(route.params.tipe == "keluar"){
                       if(keluhan[0] != undefined && ITPenerima[0] != undefined && pengaju[0] !=undefined){
                         return(
                                <View style={{flexDirection:"column"}}>
                                    <View style={[{flexDirection:"row", justifyContent:"flex-start"}]}>
                                        <View style={{backgroundColor:"green", padding:5, borderRadius:10}}>
                                            <Text style={{fontWeight:"bold", color:"white"}}>Detail Barang</Text>
                                        </View>
                                    </View>
                                    <View style={{width:"100%", borderColor:"#000", borderWidth:1, marginTop:5}}></View>
                                    <View style={[{flexDirection:"row", justifyContent:"space-between", marginTop:10}]}>
                                        <View style={{flexDirection:"row"}}>    
                                            <Image source={{uri:`${barang[0].foto}`}} style={{width:50, height:50, marginRight:15}}></Image>
                                            <View style={{alignSelf:"center"}}>
                                                <Text>{barang[0].namaBarang}</Text>
                                            </View>
                                        </View>
                                        <View style={{alignSelf:"center"}}>
                                            <Text>x{item.jumlah}</Text>
                                        </View>
                                    </View>
                                    <View style={[{flexDirection:"row", justifyContent:"flex-start",marginTop:20}]}>
                                        <View style={{backgroundColor:"green", padding:5, borderRadius:10}}>
                                            <Text style={{fontWeight:"bold", color:"white"}}>Pemberi Barang</Text>
                                        </View>
                                    </View>
                                    <View style={{width:"100%", borderColor:"#000", borderWidth:1, marginTop:5}}></View>
                                    <View style={[{flexDirection:"row", justifyContent:"space-between", marginTop:10}]}>
                                    <Text>Nama : </Text>
                                    <Text>{admin[0].nama}</Text>
                                    </View>
                                    <View style={[{flexDirection:"row", justifyContent:"space-between"}]}>
                                        <Text>Email : </Text>
                                        <Text>{admin[0].email}</Text>
                                    </View>
                                    <View style={[{flexDirection:"row", justifyContent:"space-between"}]}>
                                        <Text>No Telp : </Text>
                                        <Text>{admin[0].noTelp}</Text>
                                    </View>
                                    <View style={[{flexDirection:"row", justifyContent:"flex-start",marginTop:20}]}>
                                        <View style={{backgroundColor:"green", padding:5, borderRadius:10}}>
                                            <Text style={{fontWeight:"bold", color:"white"}}>Penerima Barang</Text>
                                        </View>
                                    </View>
                                    <View style={{width:"100%", borderColor:"#000", borderWidth:1, marginTop:5}}></View>
                                    <View style={[{flexDirection:"row", justifyContent:"space-between", marginTop:10}]}>
                                    <Text>Nama : </Text>
                                    <Text>{ITPenerima[0].nama}</Text>
                                    </View>
                                    <View style={[{flexDirection:"row", justifyContent:"space-between"}]}>
                                        <Text>Email : </Text>
                                        <Text>{ITPenerima[0].email}</Text>
                                    </View>
                                    <View style={[{flexDirection:"row", justifyContent:"space-between"}]}>
                                        <Text>No Telp : </Text>
                                        <Text>{ITPenerima[0].noTelp}</Text>
                                    </View>
                                    <View style={[{flexDirection:"row", justifyContent:"space-between"}]}>
                                        <Text>Diterima tanggal : </Text>
                                        <Text>{tanggal+" "+BulanString+" "+tahun+", "+waktu}</Text>
                                    </View>
                                    <View style={[{flexDirection:"row", justifyContent:"flex-start",marginTop:20}]}>
                                        <View style={{backgroundColor:"green", padding:5, borderRadius:10}}>
                                            <Text style={{fontWeight:"bold", color:"white"}}>Keluhan</Text>
                                        </View>
                                    </View>
                                    <View style={{width:"100%", borderColor:"#000", borderWidth:1, marginTop:5}}></View>
                                    <Text style={{marginBottom:40}}>{keluhan[0].keluhan}</Text>
                                </View>
                                
                            )
                       }
                    }
                   }
                })}
            </ScrollView>
        </View>
    )
}

export default Detail;