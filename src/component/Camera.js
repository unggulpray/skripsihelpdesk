import React from "react";
import { View, StyleSheet } from "react-native";
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

const CameraComponent = () => {
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [image, setImage] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
    const cameraRef = useRef(null);

    useEffect(() => {
        (async () => {
            MediaLibrary.requestPermissionsAsync();
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted');
        })();
    }, [])
    return (
        <View>
            <Camera
                style={styles.camera}
                type={type}
                flashMode={flash}
                ref={cameraRef}
            >
                <Text>Hello~</Text>
            </Camera>
        </View>
    )
}

const styles = StyleSheet.create({
    camera: {
        flex: 1,
        borderRadius: 20,
    }
})

export default CameraComponent;