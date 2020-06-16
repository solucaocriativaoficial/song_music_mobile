import {StyleSheet, Dimensions} from 'react-native';
import StylePattern from '../../styles/StylesPattern';

const heightScreen = Dimensions.get("screen").height;
const widthScreen = Dimensions.get("screen").width;
const heightLetter = heightScreen - 100;

const Style = StyleSheet.create({
    containerMain:{
        backgroundColor: StylePattern.color_black,
        flex: 1,
    },
    header:{
        height: 50,
        width: widthScreen,
        flexDirection: "row",
        paddingHorizontal: 5,
        alignItems: "center",
        marginBottom: 10,
    },
    containerGoBack:{
        width: 35,
        height: "100%",
        alignItems: "flex-start",
        justifyContent: "center",
    },
    imgGoBack:{
        width: 27,
        height: 27,
    },
    containerName:{
        flex: 1,
        justifyContent: "space-between",
    },
    nameSong:{
        fontSize: 16,
        fontWeight: "bold",
        color: StylePattern.color_primary,
    },
    cd:{
        fontSize: 12,
        color: StylePattern.color_light,
    },
    action:{
        flexDirection: "row",
        width: 60,
        justifyContent: "space-between",
    },
    iconsActions: {
        width: 24,
        height: 24,
    },
    containerLetter:{
        height: '100%',
    },
    containerMessageEmpty:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    textMessageEmpty:{
        color: StylePattern.color_primary,
        fontSize: 16,
        fontWeight: "bold",
    }
})

export default Style;