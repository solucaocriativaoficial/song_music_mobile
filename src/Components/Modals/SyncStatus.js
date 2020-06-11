import React, {useRef, useState, useEffect} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import StylePattern from '../../styles/StylesPattern';
import isConnected from '../isConnected';
import SyncCd from '../database/SyncCd';
import SyncSong from '../database/SyncSong';
import SyncLetter from '../database/SyncLetter';
import {addCurrentTime} from '../database/controllers/Access_devicesController';
import {currentTime} from '../generatorDate';

export default function SyncStatus({show, close = () => {}}){
    const animationViewUp = useRef(new Animated.Value(0)).current;
    const [textMessage, setTextMessage] = useState('Verificando a internet');

    useEffect(() => {
        async function getConnection(){
            const connectionNetwork = await isConnected();
            if(connectionNetwork !== null & connectionNetwork)
            {
                setTextMessage("Buscando dados online");
                const responseSyncCd = await SyncCd();
                setTextMessage(responseSyncCd.message);

                const responseSyncSong = await SyncSong();
                setTextMessage(responseSyncSong.message);

                const responseSyncLetter = await SyncLetter();
                setTextMessage(responseSyncLetter.message);

                await addCurrentTime(currentTime());
                
                setTimeout(() => close(), 500);
            }

            if(connectionNetwork !== null & !connectionNetwork)
            {
                setTextMessage("Você desconectado da rede");
                setTimeout(() => close(), 1000);
            }
        }

        if(show)
        getConnection();
    }, [isConnected])

    if(show)
    Animated.spring(animationViewUp, {
        toValue: -50,
        speed: 20,
        bounciness: 5,
        useNativeDriver: true
    }).start()

    else
    Animated.spring(animationViewUp, {
        toValue: 0,
        speed: 10,
        bounciness: 5,
        useNativeDriver: true
    }).start()


    return(
        <Animated.View style={[style.containerMain,{
            transform: [{translateY: animationViewUp}],
        }]}>
            <View style={style.containerText}>
                <Text style={style.titleProgress}>{textMessage}</Text>
            </View>
        </Animated.View>
    )
}


const style = StyleSheet.create({
    containerMain:{
        width: '100%',
        height: 0,
        backgroundColor: StylePattern.color_light,        
    },
    containerText:{
        width: '100%',
        height: 125,
        padding: 10,
        borderRadius: 50,
        backgroundColor: StylePattern.color_primary,
        alignItems: "center"
    },
    titleProgress:{
        fontSize: 15,
        fontWeight: "bold",
        color: StylePattern.color_light,
    }
})