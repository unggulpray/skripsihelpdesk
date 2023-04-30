import { StatusBar } from 'expo-status-bar';
import { FloatingAction } from 'react-native-floating-action';
import { Image, Button, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { useState, useEffect } from 'react';
import { collection, getDocs, limit, query, QuerySnapshot, where } from "firebase/firestore";
import db from '../../config/db';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { ScrollView } from 'react-native-gesture-handler';
import { firebase } from '../../config/firebase';
import { SafeAreaView } from 'react-native-safe-area-context';

const Dashboard = ({ navigation }) => {
    const [userSession, setUserSession] = useState([]);
    const [allAdmin, setAllAdmin] = useState([]);
    const [allStaffIT, setAllStaffIT] = useState([]);
    const [allStaffUmum, setAllStaffUmum] = useState([]);
    useEffect(() => {
        ; (async () => {
            const colRef = await getDocs(query(collection(db, "staff"), where("idUser", "==", firebase.auth().currentUser.uid), limit(1)));

            const docUser = colRef.docs.map((doc) => {
                const data = doc.data();
                data.id = doc.id;

                return data;
            })
            setUserSession(docUser);


            firebase.firestore().collection('staff').where('role', '==', 1).onSnapshot((querysnapshots) => {
                const admin = [];
                querysnapshots.forEach((doc) => {
                    const dataAdmin = doc.data();
                    admin.push(dataAdmin);
                })
                setAllAdmin(admin);
            })

            firebase.firestore().collection('staff').where('role', '==', 2).onSnapshot((querysnapshots) => {
                const IT = [];
                querysnapshots.forEach((doc) => {
                    const dataIT = doc.data();
                    IT.push(dataIT);
                })
                setAllStaffIT(IT);
            })

            firebase.firestore().collection('staff').where('role', '==', 3).onSnapshot((querysnapshots) => {
                const staffUmum = [];
                querysnapshots.forEach((doc) => {
                    const dataStaffUmum = doc.data();
                    staffUmum.push(dataStaffUmum);
                })
                setAllStaffUmum(staffUmum);
            })
        })();
    }, [])

    return (
        userSession.map((item, index) => {
            if (item.role == 1) {
                return (
                    <SafeAreaView>
                        <ScrollView style={{ backgroundColor: "#4796F3", height: "100%" }}>
                            <View>
                                <Image source={{ uri: 'https://sekawantriasa.com/wp-content/uploads/2021/08/Esa-Unggul-Tangerang.jpg' }} style={{ width: '100%', height: 250, top: 0 }} />
                                <View style={styles.title_position}>
                                    <Text style={[styles.title, styles.white]}>Hai, {item.nama}</Text>
                                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                        <TouchableHighlight onPress={() => navigation.navigate('PengajuanKeluhan')} style={[styles.buttonRadius,]}><Text style={[styles.textCenter, styles.white, styles.buttonTextSlider]}><Entypo name='eye' size={22} color="white" style={{ marginRight: 10, marginTop: 10 }}></Entypo>Lihat Keluhan</Text></TouchableHighlight>
                                        <TouchableHighlight onPress={() => navigation.navigate('BuatKeluhan')} style={[styles.buttonRadius, { marginLeft: 5 }]}><Text style={[styles.textCenter, styles.white, styles.buttonTextSlider]}><MaterialIcon name='library-add' size={22} color="white" style={{ marginRight: 10, marginTop: 10 }} />Lihat Permintaan Barang</Text></TouchableHighlight>
                                        <TouchableHighlight onPress={() => navigation.navigate('Management Staff')} style={[styles.buttonRadius, { marginLeft: 5 }]}><Text style={[styles.textCenter, styles.white, styles.buttonTextSlider]}><MaterialIcon name='library-add' size={22} color="white" style={{ marginRight: 10, marginTop: 10 }} />Kelola Staff</Text></TouchableHighlight>
                                    </ScrollView>
                                </View>
                                <View style={[styles.containerItem, { backgroundColor: '#fff', paddingTop: 15, paddingBottom: 15, marginTop: -50, flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10, borderRadius: 8 }]}>
                                    <View style={{ flexDirection: "column" }}>
                                        <Image source={require('../../../assets/images/admin.png')} style={{ width: 70, height: 60 }} />
                                        <Text style={[styles.textCenter, styles.bold]}>{allAdmin.length}</Text>
                                        <Text style={styles.bold}>Admin</Text>
                                    </View>
                                    <View style={{ flexDirection: "column" }}>
                                        <Image source={require('../../../assets/images/staffumum.png')} style={{ width: 100, height: 60, }} />
                                        <Text style={[styles.textCenter, styles.bold]}>{allStaffUmum.length}</Text>
                                        <Text style={styles.bold}>Staff Umum</Text>
                                    </View>
                                    <View style={{ flexDirection: "column" }}>
                                        <Image source={require('../../../assets/images/staffIT.png')} style={{ width: 70, height: 60 }} />
                                        <Text style={[styles.textCenter, styles.bold]}>{allStaffIT.length}</Text>
                                        <Text style={styles.bold}>Staff IT</Text>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                        <View style={styles.paperBottom}>
                            <View><Text style={[styles.title, styles.containerItem]}>Log Panggilan</Text></View>
                            <View style={[styles.containerItem, { flexDirection: 'row', }]}>
                                <Image source={{ uri: 'https://i1.rgstatic.net/ii/profile.image/1083598790766599-1635361492906_Q512/Unggul-Prayuda.jpg' }} style={{ width: 80, height: 80, borderRadius: 100, }} />
                                <View style={{ flexDirection: 'column', marginLeft: 15 }}>
                                    <Text style={[styles.bold]}>Unggul Prayuda</Text>
                                    <Text>25-08-2022</Text>
                                </View>
                            </View>
                            <View style={[styles.containerItem, { flexDirection: 'row', }]}>
                                <Image source={{ uri: 'https://i1.rgstatic.net/ii/profile.image/1083598790766599-1635361492906_Q512/Unggul-Prayuda.jpg' }} style={{ width: 80, height: 80, borderRadius: 100, }} />
                                <View style={{ flexDirection: 'column', marginLeft: 15 }}>
                                    <Text style={[styles.bold]}>Unggul Prayuda</Text>
                                    <Text>25-08-2022</Text>
                                </View>
                            </View>
                        </View>
                    </SafeAreaView>
                );
            } else if (item.role == 2) {
                console.log("user role = ", item.role);
                return (
                    <SafeAreaView>
                        <ScrollView style={{ backgroundColor: "#4796F3", height: "100%" }}>
                            <View>
                                <Image source={{ uri: 'https://sekawantriasa.com/wp-content/uploads/2021/08/Esa-Unggul-Tangerang.jpg' }} style={{ width: '100%', height: 250, top: 0 }} />
                                <View style={styles.title_position}>
                                    <Text style={[styles.title, styles.white]}>Hai, {item.nama}</Text>
                                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                        <TouchableHighlight onPress={() => navigation.navigate('PengajuanKeluhan')} style={[styles.buttonRadius]}>
                                            <View style={{flexDirection:"row"}}>
                                                <Entypo name='eye' size={22} color="white" style={{ marginRight: 5}}></Entypo>
                                                <Text style={[styles.textCenter, styles.white, styles.buttonTextSlider]}>Lihat Keluhan Saya</Text>
                                            </View>
                                        </TouchableHighlight>
                                        <TouchableHighlight onPress={() => navigation.navigate('BuatKeluhan')} style={[styles.buttonRadius, { marginLeft: 5 }]}>
                                            <View style={{flexDirection:"row"}}>
                                                <MaterialIcon name='library-add' size={22} color="white" style={{ marginRight: 5, }} />
                                                <Text style={[styles.textCenter, styles.white, styles.buttonTextSlider]}>Buat Keluhan Baru</Text>
                                            </View>
                                        </TouchableHighlight>
                                    </ScrollView>
                                </View>
                                <View style={[styles.containerItem, { backgroundColor: '#fff', paddingTop: 15, paddingBottom: 15, marginTop: -50, flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10, borderRadius: 8 }]}>
                                    <View style={{ flexDirection: "column" }}>
                                        <Image source={require('../../../assets/images/keluhan.jpeg')} style={{ width: 70, height: 60 }} />
                                        <Text style={[styles.textCenter, styles.bold]}>3</Text>
                                        <Text style={styles.bold}>Data Keluhan</Text>
                                    </View>
                                    <View style={{ flexDirection: "column" }}>
                                        <Image source={require('../../../assets/images/tertunda.jpeg')} style={{ width: 100, height: 60, }} />
                                        <Text style={[styles.textCenter, styles.bold]}>3</Text>
                                        <Text style={styles.bold}>Belum Dikerjakan</Text>
                                    </View>
                                    <View style={{ flexDirection: "column" }}>
                                        <Image source={require('../../../assets/images/complete.jpeg')} style={{ width: 70, height: 60 }} />
                                        <Text style={[styles.textCenter, styles.bold]}>3</Text>
                                        <Text style={styles.bold}>Diselesaikan</Text>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                        <View style={styles.paperBottom}>
                            <View><Text style={[styles.title, styles.containerItem]}>Log Panggilan</Text></View>
                            <View style={[styles.containerItem, { flexDirection: 'row', }]}>
                                <Image source={{ uri: 'https://i1.rgstatic.net/ii/profile.image/1083598790766599-1635361492906_Q512/Unggul-Prayuda.jpg' }} style={{ width: 80, height: 80, borderRadius: 100, }} />
                                <View style={{ flexDirection: 'column', marginLeft: 15 }}>
                                    <Text style={[styles.bold]}>Unggul Prayuda</Text>
                                    <Text>25-08-2022</Text>
                                </View>
                            </View>
                            <View style={[styles.containerItem, { flexDirection: 'row', }]}>
                                <Image source={{ uri: 'https://i1.rgstatic.net/ii/profile.image/1083598790766599-1635361492906_Q512/Unggul-Prayuda.jpg' }} style={{ width: 80, height: 80, borderRadius: 100, }} />
                                <View style={{ flexDirection: 'column', marginLeft: 15 }}>
                                    <Text style={[styles.bold]}>Unggul Prayuda</Text>
                                    <Text>25-08-2022</Text>
                                </View>
                            </View>
                        </View>
                    </SafeAreaView>
                );
            } else {
                return (
                    <SafeAreaView>
                        <ScrollView style={{ backgroundColor: "#4796F3", height: "100%" }}>
                            <View>
                                <Image source={{ uri: 'https://sekawantriasa.com/wp-content/uploads/2021/08/Esa-Unggul-Tangerang.jpg' }} style={{ width: '100%', height: 250, top: 0 }} />
                                <View style={styles.title_position}>
                                    <Text style={[styles.title, styles.white]}>Hai, {item.nama}</Text>
                                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                        <TouchableHighlight onPress={() => navigation.navigate('PengajuanKeluhan')} style={[styles.buttonRadius,]}><Text style={[styles.textCenter, styles.white, styles.buttonTextSlider]}><Entypo name='eye' size={22} color="white" style={{ marginRight: 10, marginTop: 10 }}></Entypo>Lihat Keluhan Saya</Text></TouchableHighlight>
                                        <TouchableHighlight onPress={() => navigation.navigate('BuatKeluhan')} style={[styles.buttonRadius, { marginLeft: 5 }]}><Text style={[styles.textCenter, styles.white, styles.buttonTextSlider]}><MaterialIcon name='library-add' size={22} color="white" style={{ marginRight: 10, marginTop: 10 }} />Buat Keluhan Baru</Text></TouchableHighlight>
                                    </ScrollView>
                                </View>
                                <View style={[styles.containerItem, { backgroundColor: '#fff', paddingTop: 15, paddingBottom: 15, marginTop: -50, flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10, borderRadius: 8 }]}>
                                    <View style={{ flexDirection: "column" }}>
                                        <Image source={require('../../../assets/images/keluhan.jpeg')} style={{ width: 70, height: 60 }} />
                                        <Text style={[styles.textCenter, styles.bold]}>3</Text>
                                        <Text style={styles.bold}>Data Keluhan</Text>
                                    </View>
                                    <View style={{ flexDirection: "column" }}>
                                        <Image source={require('../../../assets/images/tertunda.jpeg')} style={{ width: 100, height: 60, }} />
                                        <Text style={[styles.textCenter, styles.bold]}>3</Text>
                                        <Text style={styles.bold}>Belum Dikerjakan</Text>
                                    </View>
                                    <View style={{ flexDirection: "column" }}>
                                        <Image source={require('../../../assets/images/complete.jpeg')} style={{ width: 70, height: 60 }} />
                                        <Text style={[styles.textCenter, styles.bold]}>3</Text>
                                        <Text style={styles.bold}>Diselesaikan</Text>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                        <View style={styles.paperBottom}>
                            <View><Text style={[styles.title, styles.containerItem]}>Log Panggilan</Text></View>
                            <View style={[styles.containerItem, { flexDirection: 'row', }]}>
                                <Image source={{ uri: 'https://i1.rgstatic.net/ii/profile.image/1083598790766599-1635361492906_Q512/Unggul-Prayuda.jpg' }} style={{ width: 80, height: 80, borderRadius: 100, }} />
                                <View style={{ flexDirection: 'column', marginLeft: 15 }}>
                                    <Text style={[styles.bold]}>Unggul Prayuda</Text>
                                    <Text>25-08-2022</Text>
                                </View>
                            </View>
                            <View style={[styles.containerItem, { flexDirection: 'row', }]}>
                                <Image source={{ uri: 'https://i1.rgstatic.net/ii/profile.image/1083598790766599-1635361492906_Q512/Unggul-Prayuda.jpg' }} style={{ width: 80, height: 80, borderRadius: 100, }} />
                                <View style={{ flexDirection: 'column', marginLeft: 15 }}>
                                    <Text style={[styles.bold]}>Unggul Prayuda</Text>
                                    <Text>25-08-2022</Text>
                                </View>
                            </View>
                        </View>
                    </SafeAreaView>
                );
            }
        })
    );
}

export default Dashboard;


const styles = StyleSheet.create({
    paperBottom: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: "100%",
        bottom: 0,
        right: 0,
        height: "50%",
        position: 'absolute',
    },
    title_position: {
        position: 'absolute',
        top: '10%',
        left: 10,
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    white: {
        color: '#ffffff',
    },

    textCenter: {
        textAlign: 'center',
    },

    bold: {
        fontWeight: 'bold',
    },

    buttonTextSlider: {
        fontSize: 18,
    },

    buttonRadius: {
        borderRadius: 100,
        backgroundColor: '#E0A040',
        padding: 8,
    },

    containerItem: {
        width: '90%',
        marginLeft: '5%'
    },

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
