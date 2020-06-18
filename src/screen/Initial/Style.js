import {StyleSheet, Dimensions} from 'react-native';
import StylePattern from '../../styles/StylesPattern';

const heightScreen = Dimensions.get("screen").height;
const widthScreen = Dimensions.get("screen").width;

const Style = StyleSheet.create({
    containerMain:{
        backgroundColor: StylePattern.color_light,
        flex: 1,
    },
    header:{
        height: 45,
        width: widthScreen,
        flexDirection: "row",
        paddingHorizontal: 5,
        justifyContent: "space-between",
        marginBottom: 10,
    },
    containerLogo:{
        marginRight: 10,
    },
    imgLogo:{
        width:  45,
        height: 45,
    },
    containerInput:{
        flex: 1,
        flexDirection: "row",
        borderWidth: 2,
        borderColor: StylePattern.color_primary,
        borderRadius: 50,
        alignItems: "center",
    },
    imgSearch:{
        marginHorizontal: 10,
        height: 20,
        width: 20,
    },
    input:{
        flex: 1,
    },
    contentSongs:{
        flex: 0.8,
        paddingHorizontal: 5,
    },
    containerSong:{
        width: "100%",
        flexDirection: "row",
        borderBottomWidth: 1,
        alignItems: "center",
        borderColor: StylePattern.border,
        marginVertical: 2,
        paddingVertical: 5,
    },
    containerName:{
        flex: 1,
        justifyContent: "space-between",
        paddingLeft: 3,
    },
    nameSong:{
        fontSize: 16,
        fontWeight: "bold",
        color: StylePattern.color_primary,
    },
    cd:{
        fontSize: 14,
        fontWeight: "bold",
        color: StylePattern.color_black,
    },
    btnFavorite:{
        width: 50,
        alignItems: "center"
    },
    iconFavorite: {
        width: 24,
        height: 24,
    },
})

export default Style;