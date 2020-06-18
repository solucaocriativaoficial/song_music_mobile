import React,{useState, useEffect} from 'react';
import {} from '@react-navigation/native';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    FlatList,
    StatusBar,
    Keyboard
}from 'react-native';
import Style from './Style';
import iconSearch from "../../assets/icon-search.png";
import ModalSyncStatus from '../../Components/Modals/SyncStatus';
import {SongCompleteController, SearchSong, songSearchFavorite} from '../../Components/database/controllers/SongCompleteController';
import Favoritar from '../../Components/Favorite';
import Footer from '../../Components/Footer';

export default function Initial({navigation}){
    const [songs,setSongs] = useState([]);
    const [messageMain, setMessageMain] = useState('Carregando');
    const [syncData, setSyncData] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        async function getList(){
            try {
                const {_array} = await SongCompleteController(false);
                setSongs(_array)

                if(!_array.length)
                setMessageMain('Nenhum Song encontrado!')
            } catch (error) {
                console.log(error)
            }
        }

        async function getSearch(){
            const {count,_array} = await SearchSong(search, false);
            setSongs(_array)
            if(!count)
            setMessageMain('Nenhum Song encontrado')
        }

        if(search !== '')
        getSearch()

        else
        getList();
    },[syncData, search])

    return(
        <>
        <StatusBar barStyle="dark-content" backgroundColor="#fff"/>
        <View style={Style.containerMain}>
            <View style={Style.header}>
                <View style={Style.containerInput}>
                    <Image source={iconSearch} alt="" style={Style.imgSearch}/>
                    <TextInput
                        style={Style.input}
                        placeholder="Digite o nome de um song"
                        value={search}
                        onChangeText={content => setSearch(content)}
                    />
                </View>
            </View>
            {
                !songs.length ? <Text>{messageMain}</Text> :
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
                            {/* <Favoritar item={item}/> */}
                        </View>
                    )}
                    keyExtractor={item => item.song_id}
                />
            }
        </View>
        <Footer navigation={navigation}/>
        <ModalSyncStatus show={syncData} close={() => setSyncData(false)}/>
        </>
    )
}