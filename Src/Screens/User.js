import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, StatusBar, TouchableOpacity } from 'react-native';
import CardMenu from "../components/cardMenu"
import { SetUser } from "../Stores/actions"
import { connect } from 'react-redux';


const UserScreen = (props) => {
    const { navigation, SetUser, dataUser } = props
    return (<>
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.buttonLogout}
                onPress={() => SetUser('')}
            >
                <Text style={styles.textHalo}>Logout</Text>
            </TouchableOpacity>
            <Text>
                {JSON.stringify(dataUser)}
            </Text>
        </View>
    </>)
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        flexDirection: "column",
        alignContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"
    },
    textHalo: {
        fontWeight: "bold",
        fontSize: 18
    },
    buttonLogout: {
        backgroundColor: 'red',
        height: 50,
        width: 300,
        alignItems: "center",
        justifyContent: 'center',
        paddingVertical: 5,
        paddingHorizontal: 5,
        margin: 10,
        borderRadius: 20
    },

});

const mapStateToProps = state => {
    const { user } = state;
    const { data, loading } = user

    return {
        dataUser: data,
        loading
    };
}
const mapDispatchToProps = {
    SetUser,
    // SetLoading
}

export default connect(mapStateToProps, mapDispatchToProps)(UserScreen);