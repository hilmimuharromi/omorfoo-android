import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, StatusBar, Dimensions, PermissionsAndroid, ActivityIndicator } from 'react-native';
import { SetUser, GetTransactions } from "../Stores/actions"
import { connect } from 'react-redux';
import { DatePicker, Picker } from 'react-native-woodpicker'
import { AllReport, BrandReport, TypeTransactionsReport, Periode } from '../components'
const windowWidth = Dimensions.get('window').width;
const wp = (percent) => {
    return windowWidth * percent / 100
}

const LaporanScreen = (props) => {
    const { navigation, dataUser, dataTransactions, loading, GetTransactions } = props
    const [menuActive, setMenuActive] = useState({
        label: "Semua Transaksi",
        value: "all"
    })
    const [start, setStart] = useState(new Date())
    const [end, setEnd] = useState(new Date())

    const requestStoragePermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: "Cool Photo App Camera Permission",
                    message:
                        "Cool Photo App needs access to your camera " +
                        "so you can take awesome pictures.",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            console.log(granted)
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the camera");
            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };

    useEffect(() => {
        let payload = {
            startDate: start,
            endDate: end
        }
        console.log('get transactions', payload, dataUser)
        GetTransactions(payload, dataUser)
        requestStoragePermission()

    }, [start, end])

    const listMenu = [
        {
            label: "Semua Transaksi",
            value: "all"
        }, {

            label: "Top Merek",
            value: "brand"
        },
        {
            label: "Jenis Transaksi",
            value: "type"
        },
    ]




    const ViewMenu = () => {
        if (loading) {
            return (
                <View style={{ flex: 1, padding: 5, flexDirection: "row", justifyContent: "center" }}>
                    <ActivityIndicator size="small" color="#B89AD3" />
                </View>
            )
        }

        if (menuActive.value === "brand") {
            return (
                <BrandReport data={dataTransactions} startDate={start} endDate={end} />
            )
        }
        if (menuActive.value === "type") {
            return (
                <TypeTransactionsReport data={dataTransactions} startDate={start} endDate={end} />
            )
        }

        if (menuActive.value === "all") {
            return (
                <AllReport data={dataTransactions} startDate={start} endDate={end} />
            )
        }
    }

    return (
        <>
            <StatusBar backgroundColor="#fff" barStyle={"dark-content"} />
            <View style={styles.container}>
                <View style={styles.header}>
                    <Periode
                        start={start}
                        setStart={setStart}
                        end={end}
                        setEnd={setEnd}
                    />
                    <View style={styles.typeContainer}>
                        <Text style={styles.headerText}>Laporan :</Text>
                        <Picker
                            style={styles.pickerStyle}
                            item={menuActive}
                            items={listMenu}
                            onItemChange={(item) => {
                                console.log(item, 'item menu')
                                setMenuActive(item)
                            }}
                            placeholder="Select Menu"
                            value={menuActive} />
                    </View>
                </View>

                <View style={styles.body}>
                    {
                        menuActive &&
                        <ViewMenu />
                    }
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
    header: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderBottomWidth: 1
    },

    typeContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: wp(100),
        paddingHorizontal: 5,
        height: 50
    },
    body: {
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
    pickerStyle: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'blue',
        borderRadius: 5,
        alignItems: 'center',
        paddingHorizontal: 4,
        paddingVertical: 8,
        marginHorizontal: 5,
        marginVertical: 8,
        height: 40,
    },

});



const mapStateToProps = state => {
    const { user, transaction } = state;
    const { data } = user

    return {
        dataUser: data,
        dataTransactions: transaction.data,
        loading: transaction.loading
    };
}
const mapDispatchToProps = {
    SetUser,
    GetTransactions
    // SetLoading
}

export default connect(mapStateToProps, mapDispatchToProps)(LaporanScreen);