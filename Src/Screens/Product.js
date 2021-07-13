import React, { useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar, TouchableOpacity, Text, RefreshControl, ActivityIndicator, Modal, Pressable, ScrollView } from 'react-native';
import { ListProducts, SearchBar, ScanBarcode } from "../components"
import { SetUser, GetProducts, GetProductsFilter, SetEditProduct } from "../Stores/actions"
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';


function formatRupiah(angka) {
    if (!angka) return ""
    var reverse = angka.toString().split('').reverse().join(''),
        ribuan = reverse.match(/\d{1,3}/g);
    ribuan = ribuan.join('.').split('').reverse().join('');
    return `Rp ${ribuan} ,-`;
}

const ProductScreen = (props) => {
    const { navigation, GetProducts, GetProductsFilter, dataUser, dataProducts, loading, dataFilter, SetEditProduct } = props
    const [query, setQuery] = useState('')
    const [viewScan, setViewScan] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const [currentProduct, setCurrentProduct] = useState("")

    useEffect(() => {
        GetProducts(dataUser)
    }, [])

    useEffect(() => {
        // console.log('data filter', dataFilter)
        GetProductsFilter(query)
    }, [query])

    if (loading) {
        return (
            <View style={{ flex: 1, padding: 5, flexDirection: "row", justifyContent: "center" }}>
                <ActivityIndicator size="small" color="#B89AD3" />
            </View>
        )
    }



    const ViewListProducts = () => {

        if (dataProducts.length < 1) {
            return (
                <ScrollView
                    style={{ flex: 1, padding: 5 }}
                    refreshControl={
                        <RefreshControl refreshing={loading} onRefresh={() => GetProducts(dataUser)}
                        />
                    }
                >
                    <View style={{ padding: 5, flexDirection: "column", justifyContent: "center", alignContent: 'center' }}>
                        <Text>Produk tidak ada !!!</Text>
                        <Text>Tarik untuk refresh / tambah produk dibawah</Text>
                    </View>
                </ScrollView>
            )
        }

        return (
            <View style={styles.container}>
                <View style={styles.viewSearch}>
                    <SearchBar
                        query={query}
                        setQuery={setQuery}
                        setViewScan={setViewScan} />
                </View>
                <View style={styles.viewProducts}>
                    <ListProducts
                        dataProducts={query ? dataFilter : dataProducts}
                        onPress={(product) => {
                            setCurrentProduct(product)
                            setModalVisible(true)
                        }}
                    />
                </View>
            </View>
        )
    }


    return (
        <>
            <StatusBar backgroundColor="#fff" barStyle={"dark-content"} />

            <ViewListProducts />
            {
                viewScan ?
                    <View style={{ position: 'absolute', flex: 1, height: '100%', width: "100%" }}>
                        <ScanBarcode onSubmit={(value) => {
                            setQuery(value)
                            setViewScan(false)
                        }} />
                    </View> :
                    <TouchableOpacity
                        style={styles.addProduct}
                        onPress={() => {
                            SetEditProduct("")
                            navigation.push('AddProduct')
                        }}
                    >
                        <Icon name='pluscircleo'
                            size={50} color="#fff"
                            active
                            type="FontAwesome" />
                    </TouchableOpacity>
            }

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    // Alert.alert("Modal has been closed.");
                    setCurrentProduct("")
                    setModalVisible(false);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.headerModal}>
                            <Text style={styles.headerModalText}>{currentProduct.name}</Text>
                        </View>
                        <View style={styles.bodyModal}>
                            <Text style={styles.modalText}>Kode Produk : {currentProduct.productCode}</Text>
                            <Text style={styles.modalText}>Harga Jual : {formatRupiah(currentProduct.price)}</Text>
                            <Text style={styles.modalText}>Harga Beli : {formatRupiah(currentProduct.capitalPrice)}</Text>
                            <Text style={styles.modalText}>Stok : {currentProduct.stock}</Text>
                            <Text style={styles.modalText}>Minimal Stok : {currentProduct.minimalStock}</Text>
                            <Text style={styles.modalText}>Merek : {currentProduct.brand}</Text>
                            <Text style={styles.modalText}>Jenis : {currentProduct.type}</Text>
                        </View>
                        <View style={styles.footerModal}>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.textStyle}>Hide Modal</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonEdit]}
                                onPress={() => {
                                    SetEditProduct(currentProduct)
                                    setCurrentProduct("")
                                    setModalVisible(!modalVisible)
                                    navigation.push('AddProduct')
                                }}
                            >
                                <Text style={styles.textStyle}>Edit Product</Text>
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
    addProduct: {
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
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        width: "90%",
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        paddingTop: 0,
        paddingBottom: 20,
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
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        paddingTop: 5,
        width: "100%",
        backgroundColor: "#292b2c",
        height: 50,
        justifyContent: "center",
    },
    bodyModal: {
        width: "100%",
        padding: 20,
        width: "100%",
        justifyContent: "flex-start"
    },
    footerModal: {
        borderTopWidth: 2,
        paddingTop: 10,
        width: "80%",
        flexDirection: "row",
        justifyContent: "space-around"
    }

});



const mapStateToProps = state => {
    const { user, product } = state;
    const { data } = user

    return {
        dataUser: data,
        dataProducts: product.data,
        dataFilter: product.dataFilter,
        loading: product.loading
    };
}
const mapDispatchToProps = {
    SetUser,
    GetProducts,
    GetProductsFilter,
    SetEditProduct
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductScreen);