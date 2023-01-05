import react from "react";
import { FloatingAction } from 'react-native-floating-action';

export default function FloatButton() {
    <FloatingAction
        actions={actions}
        onPressItem={name => {
            console.log(`selected button: ${name}`);
        }}
    />
}

const actions = [
    {
        text: "Accessibility",
        //     icon: require("./images/ic_accessibility_white.png"),
        name: "bt_accessibility",
        position: 2
    },
    {
        text: "Language",
        //     icon: require("./images/ic_language_white.png"),
        name: "bt_language",
        position: 1
    },
    {
        text: "Location",
        //     icon: require("./images/ic_room_white.png"),
        name: "bt_room",
        position: 3
    },
    {
        text: "Video",
        //     icon: require("./images/ic_videocam_white.png"),
        name: "bt_videocam",
        position: 4
    }
];

