import React, { useState, useEffect } from 'react'
import { StyleSheet, View, ActivityIndicator, Text, ScrollView, TouchableOpacity, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import { ScanBarcode } from '../components'
import { API_URL } from "@env"
import axios from "axios"
import { connect } from 'react-redux';
import { GetProducts, SetEditProduct } from '../Stores/actions'

const AddProduct = ({ navigation, GetProducts, SetEditProduct, dataUser, dataEdit }) => {
    const [productCode, setProductCode] = useState('');
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [capitalPrice, setCapitalPrice] = useState('')
    const [stock, setStock] = useState('')
    const [minimalStock, setMinimalStock] = useState('')
    const [brand, setBrand] = useState('')
    const [type, setType] = useState('')
    const [viewScan, setViewScan] = useState(false)
    const [loading, setLoading] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const showToast = (message) => {
        ToastAndroid.showWithGravity(message, ToastAndroid.SHORT, ToastAndroid.TOP);
    };

    useEffect(() => {
        console.log('data edit', dataEdit)
        if (dataEdit) {
            setName(dataEdit.name)
            setPrice(`${dataEdit.price}`)
            setCapitalPrice(`${dataEdit.capitalPrice}`)
            setProductCode(dataEdit.productCode)
            setStock(`${dataEdit.stock}`)
            setMinimalStock(`${dataEdit.minimalStock}`)
            setBrand(dataEdit.brand)
            setType(dataEdit.type)
            setEditMode(true)
        }
    }, [dataEdit])

    const onSubmitProduct = async () => {
        const payload = {
            name,
            productCode,
            stock,
            minimalStock,
            price: price.replace(/\./g, ''),
            capitalPrice: capitalPrice.replace(/\./g, ''),
            brand,
            type
        }

        // price.replace(/\./g, '')

        setLoading(true)
        console.log(payload, 'data pr')
        try {
            const result = await axios({
                method: editMode ? "put" : "post",
                url: editMode ? `${API_URL}/product/${dataEdit.id}` : `${API_URL}/product`,
                data: payload,
                headers: {
                    Authorization: `Bearer ${dataUser.token}`
                }
            })
            if (result) {
                setLoading(false)
                GetProducts(dataUser)
                navigation.navigate('Product')
                if (editMode) {
                    showToast(`Sukses Edit Produk`)
                    setEditMode(false)
                    SetEditProduct("")
                } else {
                    showToast(`Sukses Tambah Produk`)
                }
            }
        } catch (e) {
            console.log('data error', e)
            let data = e.response.data
            if (data) {
                return showToast(data.message)
            } else {
                editMode ? showToast(`Gagal Edit Produk`) : showToast(`Gagal Tambah Produk`)
            }
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <View style={{ flex: 1, padding: 5, flexDirection: "row", justifyContent: "center" }}>
                <ActivityIndicator size="large" color="#B89AD3" />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {
                viewScan ? <ScanBarcode onSubmit={(data) => {
                    setProductCode(data)
                    setViewScan(false)
                }} /> :
                    <ScrollView>
                        <View style={styles.header}>
                            <Text style={styles.textSubmit}>{editMode ? "Edit Produk" : "Tambah Produk"}</Text>
                        </View>
                        <View style={styles.layoutRow}>
                            <FloatingLabelInput
                                label="Kode Produk"
                                value={productCode}
                                containerStyles={styles.layoutInput}
                                customLabelStyles={stylesCustom.customLabelStyles}
                                labelStyles={stylesCustom.labelStyles}
                                inputStyles={{
                                    color: 'black',
                                    paddingHorizontal: 10,
                                }}
                                onChangeText={(value) => {
                                    setProductCode(value);
                                }}
                                rightComponent={
                                    <Icon
                                        name='barcode'
                                        size={40} color="#000"
                                        active
                                        type="FontAwesome"
                                        onPress={() => setViewScan(true)}
                                    />
                                }
                            />
                        </View>

                        <View style={styles.layoutRow}>
                            <FloatingLabelInput
                                label="Nama"
                                value={name}
                                containerStyles={styles.layoutInput}
                                customLabelStyles={styles.customLabelStyles}
                                labelStyles={stylesCustom.labelStyles}
                                inputStyles={{
                                    color: 'black',
                                    paddingHorizontal: 10,
                                }}
                                onChangeText={(value) => {
                                    setName(value);
                                }}
                            />
                        </View>

                        <View style={styles.layoutRow}>
                            <FloatingLabelInput
                                label="Harga Beli"
                                value={capitalPrice}
                                maskType="currency"
                                currencyDivider="."
                                keyboardType="numeric"
                                containerStyles={styles.layoutInput}
                                customLabelStyles={styles.customLabelStyles}
                                labelStyles={stylesCustom.labelStyles}
                                inputStyles={{
                                    color: 'black',
                                    paddingHorizontal: 10,
                                }}
                                onChangeText={(value) => {

                                    setCapitalPrice(value);
                                }}
                                leftComponent={
                                    <Text>Rp</Text>
                                }
                            />
                        </View>

                        <View style={styles.layoutRow}>
                            <FloatingLabelInput
                                label="Harga Jual"
                                value={price}
                                maskType="currency"
                                currencyDivider="."
                                keyboardType="numeric"
                                containerStyles={styles.layoutInput}
                                customLabelStyles={styles.customLabelStyles}
                                labelStyles={stylesCustom.labelStyles}
                                inputStyles={{
                                    color: 'black',
                                    paddingHorizontal: 10,
                                }}
                                onChangeText={(value) => {
                                    setPrice(value);
                                }}
                                leftComponent={
                                    <Text>Rp</Text>
                                }
                            />
                        </View>

                        <View style={styles.layoutRow}>
                            <FloatingLabelInput
                                label="Stok"
                                value={stock}
                                keyboardType="numeric"
                                containerStyles={styles.layoutInput}
                                customLabelStyles={styles.customLabelStyles}
                                labelStyles={stylesCustom.labelStyles}
                                inputStyles={{
                                    color: 'black',
                                    paddingHorizontal: 10,
                                }}
                                onChangeText={(value) => {
                                    setStock(value);
                                }}
                            />
                        </View>

                        <View style={styles.layoutRow}>
                            <FloatingLabelInput
                                label="Minimal Stok"
                                value={minimalStock}
                                maskType="currency"
                                currencyDivider="."
                                keyboardType="numeric"
                                containerStyles={styles.layoutInput}
                                customLabelStyles={styles.customLabelStyles}
                                labelStyles={stylesCustom.labelStyles}
                                inputStyles={{
                                    color: 'black',
                                    paddingHorizontal: 10,
                                }}
                                onChangeText={(value) => {
                                    setMinimalStock(value);
                                }}
                            />
                        </View>

                        <View style={styles.layoutRow}>
                            <FloatingLabelInput
                                label="Merek"
                                value={brand}
                                containerStyles={styles.layoutInput}
                                customLabelStyles={styles.customLabelStyles}
                                labelStyles={stylesCustom.labelStyles}
                                inputStyles={{
                                    color: 'black',
                                    paddingHorizontal: 10,
                                }}
                                onChangeText={(value) => {
                                    setBrand(value);
                                }}
                            />
                        </View>

                        {/* <View style={styles.layoutRowSelect}>
                            <Text style={{
                                backgroundColor: '#fff',
                                paddingHorizontal: 10,
                                height: 20,
                                width: 70,
                                color: '#B89AD3',
                                position: 'relative',
                                top: -2,
                                fontSize: 12,
                            }}>Kategori</Text>
                            <RNPickerSelect
                                value={kategori}
                                placeholder={{ label: "Pilih Kategori", value: null }}
                                onValueChange={(value) => setKategori(value)}
                                style={{
                                    inputAndroid: {
                                        backgroundColor: 'transparent',
                                        color: 'black'
                                    },
                                    iconContainer: {
                                        top: 5,
                                        right: 15,
                                    },
                                    placeholder: {
                                        color: 'black',
                                        fontSize: 12,
                                        fontWeight: 'bold',
                                    },
                                }}
                                items={[
                                    { label: 'Football', value: 'football' },
                                    { label: 'Baseball', value: 'baseball' },
                                    { label: 'Hockey', value: 'hockey' },
                                ]}
                            />
                        </View> */}
                        <View style={styles.layoutRow}>
                            <FloatingLabelInput
                                label="Jenis"
                                value={type}
                                containerStyles={styles.layoutInput}
                                customLabelStyles={styles.customLabelStyles}
                                labelStyles={stylesCustom.labelStyles}
                                inputStyles={{
                                    color: 'black',
                                    paddingHorizontal: 10,
                                }}
                                onChangeText={(value) => {
                                    setType(value);
                                }}
                            />
                        </View>
                        <View style={styles.layoutSubmit}>
                            <TouchableOpacity style={styles.buttonSubmit}
                                onPress={onSubmitProduct}
                            >
                                <Text style={styles.textSubmit}> Submit </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
            }
        </View>
    )
}

const stylesCustom = {
    customLabelStyles: {
        colorFocused: '#B89AD3',
        fontSizeFocused: 14,
    },
    labelStyles: {
        backgroundColor: '#fff',
        paddingHorizontal: 5,
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        backgroundColor: "#B89AD3",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 5,
        width: "30%",
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10
    },
    layoutRow: {
        display: "flex",
        justifyContent: "flex-start",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        marginVertical: 5,
        paddingBottom: 5,
        borderRadius: 2
    },
    layoutRowSelect: {
        marginVertical: 5,
        borderWidth: 2,
        paddingHorizontal: 10,
        marginHorizontal: 10,
        backgroundColor: '#fff',
        borderColor: 'blue',
        borderRadius: 8,
        color: '#000',
        fontSize: 16,
    },
    layoutInput: {
        marginVertical: 5,
        borderWidth: 2,
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderColor: '#000',
        borderRadius: 8,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    textSubmit: {
        fontWeight: "bold"
    },
    buttonSubmit: {
        backgroundColor: "#B89AD3",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 5,
        borderRadius: 5,
        padding: 10,
        marginHorizontal: 10,
        marginBottom: 10
    },
});


const mapStateToProps = state => {
    const { user, product } = state;
    return {
        dataUser: user.data,
        dataProducts: product.data,
        dataEdit: product.dataEdit,
    };
}
const mapDispatchToProps = {
    GetProducts, SetEditProduct
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
