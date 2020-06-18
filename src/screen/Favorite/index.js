import React,{useState, useEffect} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    FlatList,
    StatusBar,
    Keyboard
}from 'react-native';
import Style from './Style';
import {SongCompleteController} from '../../Components/database/controllers/SongCompleteController';
import Favoritar from '../../Components/Favorite';
import Footer from '../../Components/Footer';

export default function Initial({navigation}){
    const [songs,setSongs] = useState([]);
    const [messageMain, setMessageMain] = useState('Carregando');

    useEffect(() => {
        async function getList(){
            try {
                const {_array} = await SongCompleteController(true);
                setSongs(_array)

                if(!_array.length)
                setMessageMain('Nenhum Song encontrado!')
            } catch (error) {
                console.log(error)
            }
        }

        getList();
    },[])

    const handleFavorite = (id) => {
        setSongs((prevList) => {
            setMessageMain('Nenhum Song favorito!')
            return prevList.filter(song => song.song_id != id)
        })
    }

    return(
        <>
        <StatusBar barStyle="dark-content" backgroundColor="#fff"/>
        <View style={Style.containerMain}>
            <View style={Style.header}>
                <Text style={Style.headerTitle}>Songs favoritos</Text>
            </View>
            {
                !songs.length ? <Text style={Style.message}>{messageMain}</Text> :
                <FlatList
                    style={Style.contentSongs}
                    data={songs}
                    renderItem={({item}) => (
                        <View style={Style.containerSong}>
                            <TouchableOpacity style={Style.containerName} onPress={()=>{
                                navigation.navigate("SelectedSong",{
                                    song_id: item.song_id,
                                    song_name: item.song_name,
                                    cd: item.cd_name,
                                    year: item.year
                                })

                                Keyboard.dismiss()
                            }}>
                                <Text style={Style.nameSong}>{item.song_name}</Text>
                                <Text style={Style.cd}>{`${item.cd_name} - ${item.year}`}</Text>
                            </TouchableOpacity>
                            <Favoritar item={item} removeSongFavoriteList={handleFavorite}/>
                        </View>
                    )}
                    keyExtractor={item => item.song_id}
                />
            }
        </View>
        <Footer navigation={navigation}/>
        </>
    )
}