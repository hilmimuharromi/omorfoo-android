import React, { useState, } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Searchbar({ query, setQuery, setViewScan, style, scan, placeholder }) {
    const [error, setError] = useState()
    return (
        <>
            <View style={[styles.container, style]}>
                <View style={styles.searchContainer}>
                    <TextInput
                        value={query}
                        placeholder={placeholder}
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
                            : scan && <TouchableOpacity
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