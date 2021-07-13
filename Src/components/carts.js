import React, { useState } from 'react'
import { Text, StyleSheet, FlatList, Dimensions, ToastAndroid, View, Pressable, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { FloatingLabelInput } from 'react-native-floating-label-input';
const windowWidth = Dimensions.get('window').width;
const wp = (percent) => {
    return windowWidth * percent / 100
}

const primaryColor = "#B89AD3"
const secondaryColor = "#a2dfd9"

const Carts = (props) => {
    const { dataProducts, setModalVisible, setCarts } = props
    const [editCart, setEditCart] = useState(false)
    const [currentCart, setCurrentCart] = useState('')
    const [price, setPrice] = useState("")

    const showToast = (message) => {
        ToastAndroid.showWithGravity(message, ToastAndroid.SHORT, ToastAndroid.TOP);
    };

    function formatRupiah(angka) {
        if (!angka) return
        var reverse = angka.toString().split('').reverse().join(''),
            ribuan = reverse.match(/\d{1,3}/g);
        ribuan = ribuan.join('.').split('').reverse().join('');
        return `Rp ${ribuan} ,-`;
    }

    const addItem = (product) => {
        if (product.stock <= 0 || product.stock <= product.quantity) return showToast("Stok Tidak Cukup")
        let newCarts = dataProducts.map((item) => {
            item.id === product.id ? item.quantity += 1 : ""
            return item
        })
        setCarts(newCarts)
    }

    const decreaseItem = (product) => {
        let newCarts = dataProducts.map((item) => {
            item.id === product.id ? item.quantity -= 1 : ""
            return item
        })

        newCarts = newCarts.filter((item) => item.quantity > 0)
        setCarts(newCarts)
    }

    const savePrice = () => {

        let newCarts = dataProducts.map((item) => {
            item.id === currentCart.id ? item.price = currentCart.price.replace(/\./g, '') : ""
            return item
        })
        setCarts(newCarts)
        console.log(newCarts)
    }


    const CardProduct = (props) => {
        const { product } = props
        const { name, price, productCode, quantity } = product

        return (
            <View
                style={styles.containerCard}>
                <View style={styles.leftCard}>
                    <Text style={styles.textName}>
                        {name}
                    </Text>
                    <Text style={styles.textCard}>
                        {productCode}
                    </Text>
                </View>
                <View style={styles.rightCard}>

                    <View style={styles.price}>
                        <Text style={styles.textPrice}>{formatRupiah(price)}</Text>
                        <Icon
                            name='edit'
                            size={24} color="#fff"
                            active
                            type="FontAwesome"
                            onPress={() => {
                                setPrice(`${product.price}`)
                                setCurrentCart(product)
                                setEditCart(true)
                            }}
                        />
                    </View>
                    <View style={styles.quantity}>
                        <Icon
                            name='minussquare'
                            size={25} color="#fff"
                            active
                            type="FontAwesome"
                            onPress={() => {
                                decreaseItem(product)
                            }}
                        />
                        <Text style={styles.textQuantity}>{quantity} Pcs</Text>
                        <Icon
                            name='plussquare'
                            size={25} color="#fff"
                            active
                            type="FontAwesome"
                            onPress={() => {
                                addItem(product)
                            }}
                        />
                    </View>
                </View>
            </View>
        )
    }

    return (
        <>

            <FlatList
                styles={styles.listProduct}
                contentContainerStyle={{ justifyContent: 'flex-start', display: 'flex', alignItems: 'flex-start', padding: 5 }}
                data={dataProducts}
                horizontal={false}
                numColumns={1}
                renderItem={({ item }) => <CardProduct key={item.id} product={item}
                />}
            />

            <Modal
                animationType="fade"
                transparent={true}
                visible={editCart}
                onRequestClose={() => {
                    setEditCart(false)
                    setCurrentCart("")
                }}
            >
                <View style={styles.centeredViewPrice}>
                    <View style={styles.modalView}>
                        <View style={styles.headerModal}>
                            <Text style={styles.headerModalText}>{currentCart.name}</Text>
                        </View>
                        <View style={styles.editPrice}>
                            <FloatingLabelInput
                                value={`${price}`}
                                maskType="currency"
                                currencyDivider="."
                                keyboardType="numeric"
                                containerStyles={styles.layoutInput}
                                onChangeText={(value) => {
                                    setPrice(value)
                                    setCurrentCart({ ...currentCart, price: value })
                                }}
                                leftComponent={
                                    <Text>Rp</Text>
                                }
                            />
                        </View>
                        <View style={styles.footerModal}>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setEditCart(false)}
                            >
                                <Text style={styles.textStyle}>Kembali</Text>
                            </Pressable>

                            <Pressable
                                style={[styles.button, styles.buttonEdit]}
                                onPress={() => {
                                    savePrice()
                                    setCurrentCart("")
                                    setEditCart(false)
                                }}
                            >
                                <Text style={styles.textStyle}>Simpan Harga</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )

}


const styles = StyleSheet.create({
    listProduct: {
        paddingVertical: 5,
        backgroundColor: "#fff"
    },
    containerCard: {
        width: wp(85),
        height: 100,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
        backgroundColor: primaryColor,
        margin: 5,
        padding: 10,
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
    layoutInput: {
        borderWidth: 2,
        paddingHorizontal: 1,
        paddingVertical: 1,
        backgroundColor: '#fff',
        borderColor: '#000',
        borderRadius: 8,
    },
    leftCard: {
        justifyContent: "flex-start",
        alignItems: "flex-start",
        borderBottomWidth: 1,
        borderBottomColor: "#fff",
        width: "100%"

    },
    rightCard: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 5
    },
    quantity: {
        flexDirection: "row"
    },
    price: {
        flexDirection: "row",
        alignItems: "flex-end",
    },
    editPrice: {
        width: "80%",
        marginVertical: 22
    },
    textCard: {
        color: "#fff",
        fontSize: 12,
        textAlign: "center"
    },
    textName: {
        fontWeight: "bold",
        color: "#000",
        fontSize: 14,
        textAlign: "center"
    },
    textPrice: {
        fontWeight: "bold",
        color: "#fff",
        fontSize: 14,
        marginRight: 10
    },
    textQuantity: {
        alignSelf: "flex-end",
        color: "#fff",
        fontSize: 14,
        textAlign: "center",
        marginHorizontal: 5
    },
    centeredView: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    centeredViewPrice: {
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        marginTop: 200,
        paddingVertical: 10,
        height: "50%",
        width: "80%",
    },
    modalView: {
        width: "100%",
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
        height: "80%",
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

export default Carts