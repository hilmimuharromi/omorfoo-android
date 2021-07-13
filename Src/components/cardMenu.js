import React from "react"
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const wp = (percent) => {
    return windowWidth * percent / 100
}
const primaryColor = "#B89AD3"
const secondaryColor = "#a2dfd9"
const CardMenu = (props) => {
    const { label, navigation, path } = props
    return (
        <TouchableOpacity onPress={() => {
            navigation.push(path)
        }} style={styles.container}>
            <Text style={styles.textMenu}>
                {label}
            </Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        width: wp(30),
        height: 120,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: primaryColor,
        margin: 5,
        shadowRadius: 5,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    textMenu: {
        fontWeight: "bold",
        color: "#fff",
        fontSize: 13,
        textAlign: "center"
    }

});

export default CardMenu