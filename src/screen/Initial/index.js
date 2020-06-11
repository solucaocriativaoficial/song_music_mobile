import React,{useState, useEffect} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    FlatList,
    StatusBar,
}from 'react-native';
import Style from './Style';
import Logo from '../../assets/icon-logo.png';
import iconSearch from "../../assets/icon-search.png";
import iconFavoriteOn from '../../assets/icon-favorite-on.png';
import iconFavoriteOff from '../../assets/icon-favorite-off.png';
import ModalSyncStatus from '../../Components/Modals/SyncStatus';
import {SongCompleteController} from '../../Components/database/controllers/SongCompleteController';

export default function Initial({navigation}){
    const [songs,setSongs] = useState([]);
    const [messageMain, setMessageMain] = useState('Carregando');
    const [syncData, setSyncData] = useState(true);

    useEffect(() => {
        async function getList(){
            const {_array} = await SongCompleteController();
            setSongs(_array)
        }
        getList();
    },[syncData])

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
                            }}>
                                <Text style={Style.nameSong}>{item.song_name}</Text>
                                <Text style={Style.cd}>{`${item.cd_name} - ${item.year}`}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={Style.btnFavorite}>
                                <Image source={item.favorite ? iconFavoriteOn : iconFavoriteOff} alt="Favoritar" style={Style.iconFavorite}/>
                            </TouchableOpacity>
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