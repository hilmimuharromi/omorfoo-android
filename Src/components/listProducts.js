import React from 'react'
import { Text, StyleSheet, FlatList, Dimensions, TouchableOpacity, View } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const wp = (percent) => {
    return windowWidth * percent / 100
}

const primaryColor = "#B89AD3"
const secondaryColor = "#a2dfd9"

const ListProducts = (props) => {
    const { dataProducts, onPress } = props

    function formatRupiah(angka) {
        var reverse = angka.toString().split('').reverse().join(''),
            ribuan = reverse.match(/\d{1,3}/g);
        ribuan = ribuan.join('.').split('').reverse().join('');
        return `Rp ${ribuan} ,-`;
    }


    const CardProduct = (props) => {
        const { product } = props
        const { name, stock, price, productCode, minimalStock } = product
        return (
            <TouchableOpacity
                onPress={() => onPress(product)}
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
                    <Text style={styles.textPrice}>{formatRupiah(price)}</Text>
                    <Text style={stock > minimalStock ? styles.textStock : styles.textStockWarning}>{stock} Pcs</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <FlatList
            styles={styles.container}
            contentContainerStyle={{ justifyContent: 'flex-start', display: 'flex', alignItems: 'flex-start', padding: 5 }}
            data={dataProducts}
            horizontal={false}
            numColumns={2}
            renderItem={({ item }) => <CardProduct key={item.id} product={item}
            />}
        />
    )

}

const styles = StyleSheet.create({
    container: {
        width: wp(100),
        padding: 5,
        backgroundColor: "#fff"
    },
    viewMenu: {
        flex: 2,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        display: 'flex'
    },
    containerCard: {
        width: wp(45),
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
    leftCard: {
        justifyContent: "flex-start",
        alignItems: "flex-start",
        borderBottomWidth: 1,
        borderBottomColor: "#fff",
        width: "100%"

    },
    rightCard: {
        width: "100%",
        flexDirection: "column",
        alignItems: "flex-start",

    },
    textCard: {
        color: "#fff",
        fontSize: 12,
        textAlign: "center"
    },
    textName: {
        fontWeight: "bold",
        color: "#000",
        fontSize: 13,
        textAlign: "center"
    },
    textPrice: {
        fontWeight: "bold",
        color: "#fff",
        fontSize: 12,
        textAlign: "center"
    },
    textStock: {
        alignSelf: "flex-end",
        color: "#fff",
        fontSize: 12,
        textAlign: "center"
    },
    textStockWarning: {
        alignSelf: "flex-end",
        color: "red",
        fontSize: 12,
        textAlign: "center"
    }

});

export default ListProducts