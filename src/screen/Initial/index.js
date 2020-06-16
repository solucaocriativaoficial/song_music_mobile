import React,{useState, useEffect} from 'react';
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
import Logo from '../../assets/icon-logo.png';
import iconSearch from "../../assets/icon-search.png";
import ModalSyncStatus from '../../Components/Modals/SyncStatus';
import {SongCompleteController, SearchSong} from '../../Components/database/controllers/SongCompleteController';
import Favoritar from '../../Components/Favorite';

export default function Initial({navigation}){
    const [songs,setSongs] = useState([]);
    const [messageMain, setMessageMain] = useState('Carregando');
    const [syncData, setSyncData] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        async function getList(){
            try {
                const {_array} = await SongCompleteController();
                setSongs(_array)

                if(!_array.length)
                setMessageMain('Nenhum Song encontrado!')
            } catch (error) {
                console.log(error)
            }
        }

        async function getSearch(){
            const {count,_array} = await SearchSong(search);
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
                <View style={Style.containerLogo}>
                    <Image source={Logo} alt="SONG" style={Style.imgLogo}/>
                </View>
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
                            <Favoritar item={item}/>
                        </View>
                    )}
                    keyExtractor={item => item.song_id}
                />
            }
        </View>
        <ModalSyncStatus show={syncData} close={() => setSyncData(false)}/>
        </>
    )
}