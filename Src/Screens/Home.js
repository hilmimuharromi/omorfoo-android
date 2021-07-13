import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, StatusBar, TouchableOpacity } from 'react-native';
import CardMenu from "../components/cardMenu"
import { SetUser } from "../Stores/actions"
import { connect } from 'react-redux';


const HomeScreen = (props) => {
    const { navigation, dataUser } = props

    const listMenu = [
        {
            key: 1,
            name: "Produk",
            path: "Product"
        }, {
            key: 2,
            name: "Transaksi",
            path: "Transaction"
        },
        {
            key: 3,
            name: "Laporan",
            path: "Report"

        },
        {
            key: 4,
            name: "User",
            path: "User"
        }
    ]
    return (
        <>
            <StatusBar backgroundColor="#fff" barStyle={"dark-content"} />
            <View style={styles.container}>
                <View style={styles.viewLogo}>
                    <Image
                        style={styles.imageLogo}
                        source={
                            require('../assets/logoOmorfoo.jpg')} />
                    <Text style={styles.textHalo}> Halo {dataUser.username} </Text>
                </View>
                <View style={styles.viewMenu}>
                    <FlatList
                        contentContainerStyle={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}
                        data={listMenu}
                        horizontal={false}
                        numColumns={2}
                        renderItem={({ item }) => <CardMenu key={item.key} label={item.name} path={item.path} navigation={navigation} />}
                    />
                </View>
            </View>
        </>
    )
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
    viewLogo: {
        flex: 2,
        justifyContent: "center",
        display: "flex",
        alignContent: "center",
        alignItems: "center",
    },
    viewMenu: {
        flex: 2,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        display: 'flex'
    },
    imageLogo: {
        width: 700,
        height: "50%",
        marginBottom: 0,
        resizeMode: 'center',
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);