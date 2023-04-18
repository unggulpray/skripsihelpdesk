// import { async } from "@firebase/util";
// import React, { useState } from "react";
// import { Pressable, Text, PermissionsAndroid, TouchableOpacity, View } from "react-native";
// import { launchCamera } from "react-native-image-picker";
// import { SafeAreaView } from "react-native-safe-area-context";
// import AntDesign from 'react-native-vector-icons/AntDesign';

// const Camera = () => {
//     const [imageCamera, setImageCamera] = useState(null);
//     const [response, setResponse] = useState(null);

//     const openGallery = async () => {

//     }

//     const openCamera = () => {
//         const granted = PermissionsAndroid.request(
//             PermissionsAndroid.PERMISSIONS.CAMERA,
//         );

//         let option = {
//             saveToPhotos: true,
//             mediaType: 'photo',
//         };

//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//             console.log("sampai sini");
//             launchCamera(option, (res) => {
//                 setResponse(res.assets);
//                 console.log("wkwk")
//             }).catch((error) => {
//                 console.log(error)
//                 console.log(error)
//             })


//             // console.log(result.assets[0].uri);

//         }

//         // launchCamera(option, (res) => {
//         //     if (res.didCancel) {
//         //         console.log("User Cancelled image picker");
//         //     } else if (res.errorMessage) {
//         //         console.log(res.errorMessage);
//         //     } else {
//         //         const data = res.assets
//         //         console.log(data);
//         //     }
//         // })
//     }

//     return (
//         <SafeAreaView>
//             <View style={[{ justifyContent: "center", alignItems: "center" }]}>
//                 <TouchableOpacity onPress={openCamera} style={[{ backgroundColor: 'grey', padding: 10, marginTop: 10 }]}><AntDesign name="camera" size={60}></AntDesign></TouchableOpacity>
//                 <TouchableOpacity onPress={openGallery} style={[{ backgroundColor: 'grey', marginTop: 10 }]}><Text style={{ fontSize: 16, padding: 5 }}>Choose Photo</Text></TouchableOpacity>
//             </View>
//         </SafeAreaView>
//     )
// }

// export default Camera;