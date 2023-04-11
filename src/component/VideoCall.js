
// import { View, Text, TouchableOpacity, TextInput } from 'react-native';
// import { ZegoExpressEngine } from 'zego-express-engine-react-native';

// const App = () => {
//   const [userID, setUserID] = useState('');
//   const [userName, setUserName] = useState('');
//   const [roomID, setRoomID] = useState('');
//   const [remoteUserID, setRemoteUserID] = useState('');
//   const [engine, setEngine] = useState(null);
//   const [isMicEnabled, setIsMicEnabled] = useState(true);
//   const [isSpeakerEnabled, setIsSpeakerEnabled] = useState(true);

//   const joinRoom = async () => {
//     const engine = await ZegoExpressEngine.createEngine(appID, appSign, true, { logLevel: 'verbose' });
//     await engine.loginRoom(roomID, { userID, userName });
//     setEngine(engine);
//   };

//   const leaveRoom = async () => {
//     await engine.logoutRoom(roomID);
//     await engine.destroyEngine();
//     setEngine(null);
//   };

//   const makePhoneCall = async () => {
//     await engine.startPlayingStream(remoteUserID);
//     await engine.startPublishingStream(userID);
//   };

//   const endPhoneCall = async () => {
//     await engine.stopPlayingStream(remoteUserID);
//     await engine.stopPublishingStream(userID);
//   };

//   const toggleMic = () => {
//     setIsMicEnabled(!isMicEnabled);
//     engine.muteMicrophone(!isMicEnabled);
//   };

//   const toggleSpeaker = () => {
//     setIsSpeakerEnabled(!isSpeakerEnabled);
//     engine.muteSpeaker(!isSpeakerEnabled);
//   };

//   return (
//     <View>
//       <TextInput
//         value={userID}
//         onChangeText={setUserID}
//         placeholder="User ID"
//       />
//       <TextInput
//         value={userName}
//         onChangeText={setUserName}
//         placeholder="User Name"
//       />
//       <TextInput
//         value={roomID}
//         onChangeText={setRoomID}
//         placeholder="Room ID"
//       />
//       <TextInput
//         value={remoteUserID}
//         onChangeText={setRemoteUserID}
//         placeholder="Remote User ID"
//       />
//       <TouchableOpacity onPress={joinRoom}>
//         <Text>Join Room</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={leaveRoom}>
//         <Text>Leave Room</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={makePhoneCall}>
//         <Text>Make Phone Call</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={endPhoneCall}>
//         <Text>End Phone Call</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={toggleMic}>
//         <Text>Toggle Mic</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={toggleSpeaker}>
//         <Text>Toggle Speaker</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default App;
