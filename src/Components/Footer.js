import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Logo from '../assets/icon-logo.png';
import iconSearch from "../assets/icon-search.png";
import iconFavorite from '../assets/icon-favorite-on.png';
import StylePattern from '../styles/StylesPattern';

export default function Footer({navigation}){
    return(
        <View style={Style.footerNav}>
            <TouchableOpacity style={Style.containerIcon} onPress={() => navigation.navigate('Initial')}>
                <Image source={iconSearch} style={Style.iconsBtn}/>
            </TouchableOpacity>
            <View style={[Style.containerIcon, Style.containerIconCenter]}>
                <Image source={Logo} style={Style.iconsBtn}/>
            </View>
            <TouchableOpacity style={Style.containerIcon} onPress={() => navigation.navigate('Favorite')}>
                <Image source={iconFavorite} style={Style.iconsBtn}/>
            </TouchableOpacity>
        </View>
    )
}

const Style = StyleSheet.create({
    footerNav:{
        height: 60,
        flex: 0.07,
        backgroundColor: StylePattern.color_light,
        borderTopWidth: 4,
        borderTopColor: StylePattern.color_primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
    },
    containerIcon:{
        flex: 0.3,
        height: "100%",
        alignItems: 'center',
        justifyContent: "center",
        marginHorizontal: 1,
    },
    containerIconCenter:{
        flex: 1,
    },
    iconsBtn: {
        width: 25,
        height: 25
    }
})