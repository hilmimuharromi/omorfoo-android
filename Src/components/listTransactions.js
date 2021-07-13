import React from 'react'
import { Text, StyleSheet, FlatList, Dimensions, TouchableOpacity, View } from 'react-native';
import moment from 'moment';
const windowWidth = Dimensions.get('window').width;
const wp = (percent) => {
    return windowWidth * percent / 100
}

const primaryColor = "#B89AD3"
const secondaryColor = "#a2dfd9"

const ListTransactions = (props) => {
    const { dataTransactions, onPress } = props

    function formatRupiah(angka) {
        var reverse = angka.toString().split('').reverse().join(''),
            ribuan = reverse.match(/\d{1,3}/g);
        ribuan = ribuan.join('.').split('').reverse().join('');
        return `Rp ${ribuan} ,-`;
    }


    const CardProduct = (props) => {
        const { tr } = props
        const { paymentType, transactionType, profit, items, createdAt, totalPrice } = tr
        let totalItems = 0
        items.map((item) => {
            totalItems += item.quantity
        })
        return (
            <TouchableOpacity
                onPress={() => onPress(tr)}
                style={styles.containerCard}>
                <View style={styles.leftCard}>
                    <Text style={styles.textName}>
                        {transactionType}
                    </Text>
                    <Text style={styles.textCard}>
                        {paymentType}
                    </Text>
                </View>
                <View style={styles.rightCard}>
                    <View style={styles.rightTopCard}>
                        <View>
                            <Text style={styles.textStock}>{items.length} Produk</Text>
                            <Text style={styles.textStock}>{totalItems} Item</Text>
                        </View>
                        <View>
                            <Text style={styles.textPrice}>{formatRupiah(totalPrice)}</Text>
                        </View>
                    </View>
                    <View style={styles.rightBottomCard}>
                        <Text style={styles.textStock}>{moment(createdAt).format('DD-MM-YYYY HH:mm:ss')}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <FlatList
            styles={styles.container}
            contentContainerStyle={{ justifyContent: 'flex-start', display: 'flex', alignItems: 'center', padding: 5 }}
            data={dataTransactions}
            horizontal={false}
            numColumns={1}
            renderItem={({ item }) => <CardProduct key={item.id} tr={item}
            />}
        />
    )

}

const styles = StyleSheet.create({
    container: {
        width: wp(100),
        padding: 5,
        backgroundColor: "#fff",
        justifyContent: 'center'
    },
    viewMenu: {
        flex: 2,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        display: 'flex'
    },
    containerCard: {
        width: wp(90),
        height: 100,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        backgroundColor: secondaryColor,
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
        justifyContent: "center",
        alignItems: "center",
        borderRightColor: "#fff",
        height: "100%",
        width: "30%",
        borderRightWidth: 2

    },
    rightCard: {
        flexDirection: "column",
        width: "70%",
        padding: 5
    },
    rightTopCard: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center",
        width: "100%",
        padding: 5
    },
    rightBottomCard: {
        flexDirection: "row",
        justifyContent: 'center',
        padding: 5

    },
    textCard: {
        color: "#000",
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
        color: "#000",
        fontSize: 14,
        textAlign: "center"
    },
    textStock: {
        color: "#000",
        fontSize: 14,
        marginLeft: 10
    },

});

export default ListTransactions