import { Dimensions, Platform, StyleSheet } from "react-native";
import colors from "./colors";
export const deviceHeight = Dimensions.get("window").height;
export const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFF",
        flex: 1,
        paddingBottom: 10,
    },
    styleFlatList: {
        padding: 10,
        height: deviceHeight
    },
    scrollview: {
    },
    rowCenter: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    alignCenter: {
        justifyContent: "center",
        alignItems: "center"
    },
    borderShadow: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#E2E2E2',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 4
    },
    justifyAlignCenter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rowAlignCenter: {
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
    },
    displayRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    justifySpace: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'center'
    },
    justifyAlignSpace: {
        // flexWrap: "wrap",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textTitle: {
        color: colors.black,
        fontWeight: 'bold',
        fontSize: 16
    },
    text: {
        color: colors.black
    },
    texrBlur: {
        color: "#818181"
    },
    iconLeft: {
        fontSize: 25,
        color: colors.white
    },
    iconRight: {
        fontSize: 20,
        color: colors.Blue44
    },
    marginTop20: {
        marginTop: 20
    },
    marginTop10: {
        marginTop: 10,
    },
    margin10: {
        margin: 10,
    },
    marginTop5: {
        marginTop: 5,
    },
    marginTop15: {
        marginTop: 15,
    },
    marginRight10: {
        marginRight: 10,
    },
    marginRight5: {
        marginRight: 5,
    },
    marginVertical10: {
        marginVertical: 10
    },
    marginVertical5: {
        marginVertical: 5
    },
    marginBottom5: {
        marginBottom: 5
    },
    marginBottom10: {
        marginBottom: 10
    },
    marginBottom15: {
        marginBottom: 15
    },
    marginBottom20: {
        marginBottom: 20
    },
    marginHorizontal10: {
        marginHorizontal: 10
    },
    marginHorizontal5: {
        marginHorizontal: 5
    },
    marginHorizontal20: {
        marginHorizontal: 20
    },
    marginLeft10: {
        marginLeft: 10
    },
    marginLeft15: {
        marginLeft: 15
    },
    marginLeft5: {
        marginLeft: 5
    },
    paddingVertical10: {
        paddingVertical: 10
    },
    paddingVertical15: {
        paddingVertical: 15
    },
    paddingVertical5: {
        paddingVertical: 5
    },
    paddingVertical20: {
        paddingVertical: 20
    },
    paddingHorizontal10: {
        paddingHorizontal: 10
    },
    paddingHorizontal15: {
        paddingHorizontal: 15
    },
    paddingLeft10: {
        paddingLeft: 10
    },
    paddingLeft20: {
        paddingLeft: 20
    },
    padding10: {
        padding: 10,
    },
    padding15: {
        padding: 15,
    },
    padding5: {
        padding: 5,
    },
    padding20: {
        padding: 20
    },
    paddingRight20: {
        paddingRight: 20
    },
    padding25: {
        padding: 25
    },
    paddingTop5: {
        paddingTop: 5,
    },
    paddingTop15: {
        paddingTop: 15,
    },
    paddingBottom20: {
        paddingBottom: 20
    },
    paddingBottom10: {
        paddingBottom: 10
    },
    borderDotRadius5: {
        borderStyle: "dotted",
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#707070",
    },
    fontStyle14: {
        fontSize: 14,
        color: "#2D2D2D"
    },
    imgaeAvt: {
        height: 25,
        width: 25,
        borderRadius: 20,
        marginHorizontal: 3
    },
    defaultTextSmall: {
        color: colors.black,
        fontSize: 12
    },
    defaultText: {
        color: colors.black,
    },
    defaultTextBold: {
        color: colors.black,
        fontSize: 14,
        fontWeight: "bold"
    },
    defaultText16: {
        color: colors.black,
        fontSize: 16
    },
    defaultTextBold16: {
        color: colors.black,
        fontSize: 16,
        fontWeight: "bold"
    },
    defaultTextBoldWhite: {
        color: "#FFF",
        fontSize: 14,
        fontWeight: "bold"
    },
    defaultTextBoldWhite16: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold"
    },
    icon: {
        fontSize: 26,
        color: "#FFF"
    },
})

export default styles;