import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    FlatList,
    TouchableOpacity,
    TextInput, Image
} from 'react-native';
import ScanBarcode from './scanBarcode'
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Searchbar({ query, setQuery, setViewScan, style }) {

    // const [query, setQuery] = useState();
    const [error, setError] = useState()
    return (
        <>
            <View style={[styles.container, style]}>
                <View style={styles.searchContainer}>
                    {/* <View style={styles.vwSearch}> */}
                    {/* <Icon name='search'
                        size={20} color="#000"
                        active
                        type="FontAwesome" /> */}
                    {/* </View> */}

                    <TextInput
                        value={query}
                        placeholder="Cari nama atau kode produk"
                        style={styles.textInput}
                        onChangeText={(text) => {
                            setQuery(text)
                        }}
                    />
                    {
                        query ?
                            <TouchableOpacity
                                onPress={() => setQuery('')}
                                style={styles.vwClear}>
                                <Icon name='close'
                                    size={20} color="#000"
                                    active
                                    type="FontAwesome" />
                            </TouchableOpacity>
                            : <TouchableOpacity
                                onPress={() => {
                                    setViewScan(true)
                                }}
                                style={styles.vwClear}>
                                <Icon name='barcode'
                                    size={20} color="#000"
                                    active
                                    type="FontAwesome" />
                            </TouchableOpacity>
                    }

                </View>
                {
                    error &&
                    <Text style={styles.txtError}>
                        {error}
                    </Text>
                }
            </View >
        </>
    )
}
const styles = StyleSheet.create({
    txtError: {
        marginTop: '2%',
        width: '89%',
        color: 'white',

    },
    vwClear: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        // backgroundColor: 'green',
        flex: 1,
    },

    vwSearch: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        // width: 40,
        // backgroundColor: 'red'
    },
    icSearch: {
        height: 18, width: 18
    },
    searchContainer:
    {
        backgroundColor: 'white',
        width: '90%',
        height: 60,
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 5,

    },
    container: {
        height: 50,
        alignItems: 'center',
        // height: '100%', width: '100%' 
    },
});