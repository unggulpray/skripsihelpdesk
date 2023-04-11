import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { min } from 'react-native-reanimated';

const CountdownTimer = ({ initialTime }) => {
    const [timeRemaining, setTimeRemaining] = useState(initialTime);
    let stop = initialTime;

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeRemaining(prevTime => prevTime - 1);
            stop--;
            if (stop < 1) {
                clearInterval(interval);
                console.log('Interval stopped.');
            }
        }, 1000);

    }, []);

    const formatTime = (time) => {
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;
        if (stop < 1) {
            minutes = 0;
            seconds = 0;
            return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        } else {
            return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    };

    return (
        <View>
            <Text style={[{ color: "#F23C3C", fontSize: 20 }]}>{formatTime(timeRemaining)}</Text>
        </View>
    );
};

export default CountdownTimer;
