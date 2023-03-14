import React from "react";
import { View } from "react-native";
import ZegoUIKitPrebuiltCall, { GROUP_VOICE_CALL_CONFIG } from '@zegocloud/zego-uikit-prebuilt-call-rn';

const VideoCall = (props) => {
    randomUserID = String(Math.floor(Math.random() * 100000))
    return (
        <View style={{ flex: 1 }}>
            <ZegoUIKitPrebuiltCall
                appID={846643446}
                appSign='9ba949097f9f6dbf75d4302f1fcd2c3d5c28a877f0fa0e3138b062ade206974a'
                userID={randomUserID}
                userName={'user_' + randomUserID}

                config={{
                    ...GROUP_VOICE_CALL_CONFIG,
                    onHangUp: () => { props.navigation.navigate('Dashboard') },
                }}
            />
        </View>
    )
}

export default VideoCall;