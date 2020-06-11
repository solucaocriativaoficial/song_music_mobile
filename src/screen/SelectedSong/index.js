import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Animated,
    Image,
    TextInput,
    FlatList,
    StatusBar,
}from 'react-native';

import Style from './style';
import StylePattern from '../../styles/StylesPattern';
import iconGoBack from '../../assets/icon-goBack.png';
import iconFavoriteOn from '../../assets/icon-favorite-on.png';
import iconFavoriteOff from '../../assets/icon-favorite-off.png';
import iconPlay from '../../assets/icon-play.png';

const data = {
    urlMusic: "",
    strofes:[
        {
            strofe: "Restaura, meu ser (2x)\nRestaura, meu viver\nRestaura,minha desilusão\nRestaura,meu quebrantado coração",
            repeat: 0,
        },
        {
            strofe: "Restaura, meu sonhos\nRestaura, os meu planos senhor\nRestaura, minha vida por completo\nPra que todos saibam que tu és meu deus",
            repeat: 0,
        }
    ],
}

export default function SelectedSong({route, navigation}){
    const {song_name, cd, year} = route.params;
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
                {data.strofes.map((strofe, index) => (
                    <View style={{marginVertical: 20, alignItems: "center"}} key={index}>
                        <Text style={{textAlign: "center", fontSize: 18, color: "#fff", lineHeight: 25,}}>{strofe.strofe}</Text>
                    </View>
                ))}
            </View>
        </View>
        </>
    )
}