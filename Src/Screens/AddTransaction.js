import React, { useState, useEffect } from 'react'
import {
    Text,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    RefreshControl,
    TouchableOpacity,
    View,
    Keyboard, Modal, ToastAndroid, Pressable
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { API_URL } from "@env"
import axios from "axios"
import { connect } from 'react-redux';
import { GetProducts, GetProductsFilter, GetTransactions } from '../Stores/actions'
import { ListProducts, SearchBar, ScanBarcode, Carts, SelectPicker } from '../components'
import { DatePicker, } from 'react-native-woodpicker'
import moment from 'moment'

function formatRupiah(angka) {
    if (!angka) return
    var reverse = angka.toString().split('').reverse().join(''),
        ribuan = reverse.match(/\d{1,3}/g);
    ribuan = ribuan.join('.').split('').reverse().join('');
    return `Rp ${ribuan} ,-`;
}

const AddTransaction = ({ navigation,
    GetProducts, dataUser, dataProducts, loading, dataFilter, GetProductsFilter, GetTransactions }) => {
    const [query, setQuery] = useState('')
    const [viewScan, setViewScan] = useState(false)
    const [carts, setCarts] = useState([])
    const [countItem, setCountItem] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const [modalVisible, setModalVisible] = useState(false);
    const [transactionType, setTransactionType] = useState("")
    const [paymentType, setPaymentType] = useState("")
    const [loadingSave, setLoadingSave] = useState(false)
    const [createdAt, setCreatedAt] = useState(new Date())

    let periode = {
        startDate: new Date(),
        endDate: new Date(),
    }

    const handleText = (pickedDate) => pickedDate
        ? pickedDate.toDateString()
        : "No value Selected";

    const showToast = (message) => {
        ToastAndroid.showWithGravity(message, ToastAndroid.SHORT, ToastAndroid.CENTER);
    };

    useEffect(() => {
        GetProducts(dataUser)
    }, [])

    useEffect(() => {
        GetProductsFilter(query)
    }, [query])

    useEffect(() => {
        const getTotalItems = () => {
            let quantity = 0
            let totalPrice = 0
            carts.map((item) => {
                quantity += item.quantity
                totalPrice += Number(item.price) * item.quantity
            })
            setCountItem(quantity)
            setTotalPrice(totalPrice)
        }
        getTotalItems()
    }, [carts, totalPrice])

    const saveTransaction = async () => {
        console.log('masuk save ....')
        if (!transactionType || !paymentType || !countItem) return showToast("Harap Lengkapi Transaksi")

        const items = carts.map((item) => {
            return {
                product: item.id,
                dealPrice: Number(item.price),
                quantity: Number(item.quantity)
            }
        })

        const payload = {
            paymentType,
            transactionType,
            items,
            createdAt: moment(createdAt).format('YYYY-MM-DD HH:mm:ss')
        }
        console.log('items', payload)


        try {
            setLoadingSave(true)
            const result = await axios({
                method: "post",
                url: `${API_URL}/transaction`,
                data: payload,
                headers: {
                    Authorization: `Bearer ${dataUser.token}`
                }
            })
            if (result) {
                setModalVisible(false)
                showToast(`Sukses Tambah Transaksi`)
                setCarts([])
                GetTransactions(periode, dataUser)
                navigation.navigate('Transaction')
            }
        } catch (e) {
            console.log('data error', e)
            let data = e.response.data
            if (data) {
                return showToast(data.message)
            } else {
                showToast(`Gagal Tambah Transaksi`)
            }
        } finally {
            setLoadingSave(false)
        }
    }

    if (loading || loadingSave) {
        return (
            <View style={{ flex: 1, padding: 5, flexDirection: "row", justifyContent: "center" }}>
                <ActivityIndicator size="small" color="#B89AD3" />
            </View>
        )
    }

    if (!dataProducts.length > 0) {
        return (
            <ScrollView
                style={{ flex: 1, padding: 5 }}
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={() => GetProducts(dataUser)}
                    />
                }
            >
                <View style={{ flex: 1, padding: 5, flexDirection: "row", justifyContent: "center" }}>
                    <Text>Tarik untuk refresh</Text>
                </View>
            </ScrollView>
        )
    }


    return (
        <>
            <View style={styles.container}>
                <View style={styles.viewSearch}>
                    <SearchBar
                        scan={true}
                        placeholder="Cari Produk ..."
                        query={query}
                        setQuery={setQuery}
                        setViewScan={() => {
                            Keyboard.dismiss();
                            setViewScan(true)
                        }
                        } />
                </View>
                <View style={styles.viewProducts}>
                    <ListProducts
                        dataProducts={query ? dataFilter : dataProducts}
                        onPress={(product) => {
                            let item = product
                            const isCart = carts.find((item) => item.id === product.id)
                            if (product.stock <= 0) return showToast("Stok Tidak Cukup")
                            if (isCart) {
                                if (isCart.stock <= 0 || isCart.stock <= isCart.quantity) return showToast("Stok Tidak Cukup")
                                let newCarts = carts.map((item) => {
                                    item.id === product.id ? item.quantity += 1 : ""
                                    return item
                                })
                                setCarts(newCarts)
                            } else {
                                item.quantity = 1
                                setCarts([...carts, item])
                            }
                        }}
                    />
                </View>

                {
                    viewScan ?
                        <View style={{ position: 'absolute', flex: 1, height: '100%', width: "100%" }}>
                            <ScanBarcode onSubmit={(value) => {
                                setQuery(value)
                                setViewScan(false)
                            }} />
                        </View> :
                        <TouchableOpacity
                            style={styles.cartIcon}
                            onPress={() => {
                                setModalVisible(true)
                            }}
                        >
                            <Icon name='shopping-cart'
                                size={40} color="#fff"
                                active
                                type="FontAwesome" />
                            <Text style={styles.totalCart}>{countItem}</Text>
                        </TouchableOpacity>
                }
            </View>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.headerModal}>
                            <Text style={styles.headerModalText}>Items Transaksi</Text>
                        </View>
                        <View style={styles.bodyModal}>
                            <Carts
                                dataProducts={carts}
                                setCarts={setCarts}
                                setModalVisible={setModalVisible}
                            />
                        </View>
                        <View style={styles.summaryCarts}>
                            <View style={styles.summaryFlex}>
                                <Text style={styles.textSummary}>Total Harga: </Text>
                                <Text style={styles.textSummary}>{formatRupiah(totalPrice)}</Text>
                            </View>
                            <View style={styles.summaryFlex}>
                                <Text style={styles.textSummary}>Total Item:</Text>
                                <Text style={styles.textSummary}> {countItem}</Text>
                            </View>
                        </View>
                        <View style={styles.typeTransaction}>
                            <DatePicker
                                value={createdAt}
                                onDateChange={(date) => setCreatedAt(date)}
                                title="Date Picker"
                                text={handleText(createdAt)}
                                isNullable
                                style={styles.pickerStyle}
                                androidDisplay="calendar"
                                backdropAnimation={{ opactity: 0 }}
                                locale="id-ID"
                            />
                            <SelectPicker
                                title={"Tipe Pembayaran"}
                                value={paymentType}
                                onValueChange={(value) => setPaymentType(value)}
                                options={[
                                    {
                                        value: "cash", label: "cash"
                                    },
                                    {
                                        value: "transfer", label: "transfer"
                                    }
                                ]}
                            />
                            <SelectPicker
                                title={"Tipe Transaksi"}
                                value={transactionType}
                                onValueChange={(value) => setTransactionType(value)}
                                options={[
                                    {
                                        value: "shopee", label: "shopee"
                                    },
                                    {
                                        value: "tokopedia", label: "tokopedia"
                                    },
                                    {
                                        value: "lazada", label: "lazada"
                                    },
                                    {
                                        value: "toko", label: "toko"
                                    }
                                ]}
                            />
                        </View>
                        <View style={styles.footerModal}>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.textStyle}>Kembali</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonEdit]}
                                onPress={saveTransaction}
                            >
                                <Text style={styles.textStyle}>Simpan Transaksi</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
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
        backgroundColor: "#fff",
    },
    viewSearch: {
        flex: 1,
        paddingTop: 10,
        marginVertical: 5,
        justifyContent: "center",
        display: "flex",
        alignContent: "center",
        alignItems: "center",
    },
    viewProducts: {
        flex: 9,
        padding: 5,
        width: '100%',
    },
    totalCart: {
        position: 'absolute',
        bottom: 30, right: 25,
        color: "red",
        fontWeight: "bold"
    },
    cartIcon: {
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
    centeredView: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    modalView: {
        width: "100%",
        height: "100%",
        margin: 20,
        backgroundColor: "white",

        paddingTop: 0,
        paddingBottom: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2
    },
    buttonClose: {
        backgroundColor: "#fff",
    },
    buttonEdit: {
        backgroundColor: "#B89AD3",
    },
    textStyle: {
        color: "#000",
        fontWeight: "bold",
        textAlign: "center"
    },
    textSummary: {
        color: "#000",
        fontWeight: "bold",
        textAlign: "left"
    },
    modalText: {
        marginBottom: 5,
        textAlign: "left"
    },
    headerModalText: {
        fontWeight: "bold",
        marginBottom: 15,
        textAlign: "center",
        color: "#fff",
    },
    headerModal: {
        width: "100%",
        // borderTopStartRadius: 20,
        // borderTopEndRadius: 20,
        paddingTop: 5,
        width: "100%",
        backgroundColor: "#292b2c",
        height: 50,
        justifyContent: "center",
    },
    bodyModal: {
        width: "100%",
        padding: 20,
        height: "55%",
        justifyContent: "flex-start",
        borderEndWidth: 2,
        marginBottom: 5
    },
    summaryCarts: {
        borderTopWidth: 2,
        paddingTop: 10,
        width: "80%",
    },
    typeTransaction: {
        paddingVertical: 5,
        width: "80%",
        marginBottom: 10
    },
    summaryFlex: {
        flexDirection: "row", justifyContent: "space-between"
    },
    footerModal: {
        borderTopWidth: 2,
        marginVertical: 10,
        paddingVertical: 10,
        width: "80%",
        flexDirection: "row",
        justifyContent: "space-around"
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

})

const mapStateToProps = state => {
    const { user, product } = state;
    return {
        dataUser: user.data,
        dataProducts: product.data,
        dataFilter: product.dataFilter,
        dataEdit: product.dataEdit,
    };
}
const mapDispatchToProps = {
    GetProducts, GetProductsFilter, GetTransactions
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTransaction);