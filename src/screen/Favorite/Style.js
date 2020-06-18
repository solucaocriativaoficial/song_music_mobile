import {StyleSheet, Dimensions} from 'react-native';
import StylePattern from '../../styles/StylesPattern';

const widthScreen = Dimensions.get("screen").width;

const Style = StyleSheet.create({
    containerMain:{
        backgroundColor: StylePattern.color_light,
        flex: 1,
    },
    header:{
        height: 40,
        width: widthScreen,
        flexDirection: "row",
        paddingHorizontal: 5,
        alignItems: "center",
        marginBottom: 5,
    },
    headerTitle:{
        fontSize: 18,
        color: StylePattern.color_primary,
        fontWeight: "bold"
    },
    contentSongs:{
        flex: 0.9,
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
    message:{
        fontWeight: "bold",
        marginLeft: 10,
    }
})

export default Style;