import React from 'react'
import { Text, StyleSheet, FlatList, Dimensions, TouchableOpacity, View } from 'react-native';
import moment from 'moment';
const windowWidth = Dimensions.get('window').width;
const wp = (percent) => {
    return windowWidth * percent / 100
}

const primaryColor = "#B89AD3"
const secondaryColor = "#a2dfd9"

const ListUsers = (props) => {
    const { data, onPress } = props

    function formatDate(date) {
        return moment(date).format('DD-MM-YYYY HH:mm:ss')
    }


    const CardUser = (props) => {
        const { username, role, createdAt, id } = props.data
        return (
            <TouchableOpacity
                onPress={() => onPress(props.data)}
                style={styles.containerCard}>
                <View style={styles.topCard}>
                    <Text style={styles.textName}>
                        {username}
                    </Text>
                </View>
                <View style={styles.bottomCard}>
                    <Text style={styles.textCard}>
                        Role :  {role}
                    </Text>
                    <Text style={styles.textPrice}>Join : {formatDate(createdAt)}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <FlatList
            styles={styles.container}
            contentContainerStyle={{ justifyContent: 'flex-start', display: 'flex', alignItems: 'flex-start', padding: 5 }}
            data={data}
            horizontal={false}
            numColumns={2}
            renderItem={({ item }) => <CardUser key={item.id} data={item}
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
        // justifyContent: "space-between",
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
    topCard: {
        justifyContent: "flex-start",
        alignItems: "flex-start",
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: "#fff",
        width: "100%"

    },
    bottomCard: {
        width: "100%",
        flexDirection: "column",
        alignItems: "flex-start",
        marginTop: 10

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

export default ListUsers