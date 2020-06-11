import React,{useEffect, useState} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    StatusBar,
}from 'react-native';

import Style from './style';
import StylePattern from '../../styles/StylesPattern';
import iconGoBack from '../../assets/icon-goBack.png';
import iconFavoriteOn from '../../assets/icon-favorite-on.png';
import iconFavoriteOff from '../../assets/icon-favorite-off.png';
import iconPlay from '../../assets/icon-play.png';
import {findById} from '../../Components/database/controllers/letterController';

export default function SelectedSong({route, navigation}){
    const {song_name, cd, song_id, year} = route.params;
    const [dataLetter, setDataLetter] = useState([]);
    const [message, setMessage] = useState('Carregando letra');

    useEffect(() => {
        async function getLetter(){
            const {length, _array} = await findById(song_id);
            if(length)
            setDataLetter(_array)

            else
            setMessage('Esta música não tem letra ainda!')
        }

        getLetter();
    },[])

    return(
        <>
        <StatusBar barStyle="light-content" backgroundColor={StylePattern.color_black} animated={true}/>
        <View style={Style.containerMain}>
            <View style={Style.header}>
                <TouchableOpacity style={Style.containerGoBack} onPress={() => navigation.goBack()}>
                    <Image source={iconGoBack} alt="" style={Style.imgGoBack}/>
                </TouchableOpacity>
                <View style={Style.containerName}>
                    <Text style={Style.nameSong}>{song_name}</Text>
                    <Text style={Style.cd}>{`${cd} - ${year}`}</Text>
                </View>
                <View style={Style.action}>
                    <TouchableOpacity>
                        <Image source={iconPlay} alt="" style={Style.iconsActions}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={iconFavoriteOff} alt="" style={Style.iconsActions}/>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                {
                    !dataLetter.length ? <Text>{message}</Text>:
                    dataLetter.map((letter, index) => (
                        <View style={{marginVertical: 20, alignItems: "center"}} key={index}>
                            <Text style={{textAlign: "center", fontSize: 18, color: "#fff", lineHeight: 25,}}>{letter.strofe}</Text>
                        </View>
                    ))
                }
            </View>
        </View>
        </>
    )
}