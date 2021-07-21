import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, View, Text, RefreshControl, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { GetTransactions } from "../Stores/actions"
import { connect } from 'react-redux';
import { ListTransactions, Periode } from '../components'
const primaryColor = "#B89AD3"
const TransactionScreen = ({ navigation, dataTransactions, loading, GetTransactions, dataUser }) => {

    const [start, setStart] = useState(new Date())
    const [end, setEnd] = useState(new Date())

    let payload = {
        startDate: start,
        endDate: end,
    }

    useEffect(() => {
        GetTransactions(payload, dataUser)
    }, [start, end])

    const ViewListTransactions = () => {

        if (dataTransactions.length < 1) {
            return (
                <ScrollView
                    style={{ flex: 1, padding: 5 }}
                    refreshControl={
                        <RefreshControl refreshing={loading} onRefresh={() => GetTransactions(payload, dataUser)}
                        />
                    }
                >
                    <View style={{ padding: 5, flexDirection: "column", justifyContent: "center", alignContent: 'center' }}>
                        <Text>transaksi tidak ada !!!</Text>
                        <Text>Tarik ke bawah untuk refresh / tambah transaksi</Text>
                    </View>
                </ScrollView>
            )
        }

        return (
            <ListTransactions
                dataTransactions={dataTransactions}
                onPress={(data) => console.log('Press tr', data)}
            />
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {/* <Periode
                    start={start}
                    setStart={setStart}
                    end={end}
                    setEnd={setEnd}
                /> */}
                <Text>Transaksi Hari Ini</Text>
            </View>
            <ViewListTransactions />

            <TouchableOpacity
                style={styles.addTransaction}
                onPress={() => {
                    navigation.push('AddTransaction')
                }}
            >
                <Icon name='pluscircleo'
                    size={50} color="#fff"
                    active
                    type="FontAwesome" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    addTransaction: {
        position: 'absolute',
        bottom: 50, right: 30,
        backgroundColor: "#B89AD3",
        height: 70,
        width: 70,
        justifyContent: "center",
        alignItems: "center",
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
    header: {
        backgroundColor: primaryColor,
        height: 50,
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
    },
    headerText: {
        fontSize: 14,
        fontWeight: "bold",
        color: '#fff'
    }
})


const mapStateToProps = state => {
    const { user, transaction } = state;

    return {
        dataUser: user.data,
        dataTransactions: transaction.data,
        loading: transaction.loading
    };
}
const mapDispatchToProps = {
    GetTransactions
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionScreen);
