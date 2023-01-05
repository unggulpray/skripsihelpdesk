import { StatusBar } from 'expo-status-bar';
import { FloatingAction } from 'react-native-floating-action';
import { Image, Button, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import FloatButton from '../../component/FloatButton';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { ScrollView } from 'react-native-gesture-handler';
import { firebase } from '../../config/firebase';

const Dashboard = ({ navigation }) => {
    console.log(firebase.auth().currentUser.uid);
    return (
        <View style={{ backgroundColor: "#4796F3", height: "100%" }}>
            <ScrollView>
                <View>
                    <Image source={{ uri: 'https://sekawantriasa.com/wp-content/uploads/2021/08/Esa-Unggul-Tangerang.jpg' }} style={{ width: '100%', height: 250, top: 0 }} />
                    <View style={styles.title_position}>
                        <Text style={[styles.title, styles.white]}>Hai, Unggul Prayuda</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableHighlight onPress={() => navigation.navigate('PengajuanKeluhan')} style={[styles.buttonRadius,]}><Text style={[styles.textCenter, styles.white, styles.buttonTextSlider]}><Entypo name='eye' size={22} color="white" style={{ marginRight: 10, marginTop: 10 }}></Entypo>Lihat Keluhan Saya</Text></TouchableHighlight>
                            <TouchableHighlight onPress={() => navigation.navigate('BuatKeluhan')} style={[styles.buttonRadius, { marginLeft: 5 }]}><Text style={[styles.textCenter, styles.white, styles.buttonTextSlider]}><MaterialIcon name='library-add' size={22} color="white" style={{ marginRight: 10, marginTop: 10 }} />Buat Keluhan Baru</Text></TouchableHighlight>
                        </View>
                    </View>
                    <View style={[styles.containerItem, { backgroundColor: '#fff', paddingTop: 15, paddingBottom: 15, marginTop: -50, flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 }]}>
                        <View style={{ flexDirection: "column" }}>
                            <Image source={{ uri: 'https://i1.rgstatic.net/ii/profile.image/1083598790766599-1635361492906_Q512/Unggul-Prayuda.jpg' }} style={{ width: 70, height: 70 }} />
                            <Text style={[styles.textCenter, styles.bold]}>3</Text>
                            <Text style={styles.bold}>Data Keluhan</Text>
                        </View>
                        <View style={{ flexDirection: "column" }}>
                            <Image source={{ uri: 'https://i1.rgstatic.net/ii/profile.image/1083598790766599-1635361492906_Q512/Unggul-Prayuda.jpg' }} style={{ width: 70, height: 70, }} />
                            <Text style={[styles.textCenter, styles.bold]}>3</Text>
                            <Text style={styles.bold}>Belum Dikerjakan</Text>
                        </View>
                        <View style={{ flexDirection: "column" }}>
                            <Image source={{ uri: 'https://i1.rgstatic.net/ii/profile.image/1083598790766599-1635361492906_Q512/Unggul-Prayuda.jpg' }} style={{ width: 70, height: 70 }} />
                            <Text style={[styles.textCenter, styles.bold]}>3</Text>
                            <Text style={styles.bold}>Diselesaikan</Text>
                        </View>
                    </View>
                    <View style={{ backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, height: 300 }}>
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
                </View>
            </ScrollView>
        </View>
    );
}

export default Dashboard;


const styles = StyleSheet.create({
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
