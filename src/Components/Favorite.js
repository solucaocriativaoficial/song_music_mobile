import React, {useState, useEffect} from 'react';
import {
    TouchableOpacity,
    Image,
    StyleSheet
} from 'react-native';
import iconFavoriteOn from '../assets/icon-favorite-on.png';
import iconFavoriteOff from '../assets/icon-favorite-off.png';
import {favorite, findByIdSong} from './database/controllers/songController';

export default function Favorite({item}){
    const [stateFavorite, setStateFavorite] = useState(0);

    useEffect(() => {
        async function getFavorite(){
            const responseSongFavorite =  await findByIdSong(item.song_id);
            const {favorite: dataFavorite} = responseSongFavorite._array[0];
            setStateFavorite(dataFavorite)
        }
        getFavorite()
    },[])

    async function handleFavorite(song_id){
        const handleIfTrueFavorite = stateFavorite ? 0 : 1;
        await favorite(song_id, handleIfTrueFavorite)
        setStateFavorite(handleIfTrueFavorite);
    }

    return(
        <TouchableOpacity style={Style.btnFavorite} onPress={() => handleFavorite(item.song_id)}>
            <Image source={stateFavorite ? iconFavoriteOn : iconFavoriteOff} alt="Favoritar" style={Style.iconFavorite}/>
        </TouchableOpacity>
    )
}

const Style = StyleSheet.create({
    btnFavorite:{
        width: 50,
        alignItems: "center"
    },
    iconFavorite: {
        width: 24,
        height: 24,
    }
})