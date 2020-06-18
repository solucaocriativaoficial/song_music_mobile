import React,{useEffect, useState} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    StatusBar,
    FlatList
}from 'react-native';

import Style from './style';
import StylePattern from '../../styles/StylesPattern';
import iconGoBack from '../../assets/icon-goBack.png';
import iconFavoriteOn from '../../assets/icon-favorite-on.png';
import iconFavoriteOff from '../../assets/icon-favorite-off.png';
import {findById} from '../../Components/database/controllers/letterController';
import {findByIdSong, favorite} from '../../Components/database/controllers/songController';

export default function SelectedSong({route, navigation}){
    const {song_name, cd, song_id, year} = route.params;
    const [dataLetter, setDataLetter] = useState([]);
    const [message, setMessage] = useState('Carregando letra');
    const [actionFavorite, setActionFavorite] = useState(0);

    useEffect(() => {
        async function getLetter(){
            const {length, _array} = await findById(song_id);
            if(length)
            {
                setDataLetter(_array)
            }
            else
            setMessage('Ops! Esse song ainda não tem letra cadastrada.')
        }

        getLetter();
    },[])

    useEffect(() => {
        async function getFavorite(){
            const responseSongFavorite =  await findByIdSong(song_id);
            const {favorite: dataFavorite} = responseSongFavorite._array[0];
            setActionFavorite(dataFavorite)
        }
        getFavorite()
    },[])

    async function handleFavorite(song_id){
        const handleIfTrueFavorite = actionFavorite ? 0 : 1;
        await favorite(song_id, handleIfTrueFavorite)
        setActionFavorite(handleIfTrueFavorite);
    }

    return(
        <>
        <StatusBar barStyle="light-content" backgroundColor={StylePattern.color_black} animated={false}/>
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
                    <TouchableOpacity onPress={() => handleFavorite(song_id)}>
                        <Image source={actionFavorite ? iconFavoriteOn : iconFavoriteOff} alt="" style={Style.iconsActions}/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{flex: 1}}>
                {
                    !dataLetter.length ? 
                    <View style={Style.containerMessageEmpty}>
                        <Text style={Style.textMessageEmpty}>{message}</Text>
                    </View> :
                    <FlatList
                    style={Style.containerLetter}
                    data={dataLetter}
                    renderItem={({item: letter}) => (
                        <View style={{marginVertical: 20, alignItems: "center"}}>
                            <Text style={{textAlign: "center", fontSize: 18, color: "#fff", lineHeight: 25,}}>{letter.strofe}</Text>
                        </View>
                    )}
                    keyExtractor={item => item.id}
                    />
                }
            </View>
        </View>
        </>
    )
}