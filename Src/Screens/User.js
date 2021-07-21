import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { SetUser } from "../Stores/actions"
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import { AddUser } from '../components'

const UserScreen = (props) => {
    const { navigation, SetUser, dataUser } = props
    const { username, role } = dataUser
    const [modalVisible, setModalVisible] = useState(false)
    return (<>
        <View style={styles.container}>
            <View style={{ flex: 1 }}>
            </View>
            <View style={styles.profileLayout}>
                <Icon name='user'
                    size={60} color="#000"
                    active
                    type="Feather" />
                <Text style={styles.profileText}>Username : {username}</Text>
                <Text style={styles.profileText}>Role : {role}</Text>
            </View>
            <View style={{ flex: 1 }}>
                {
                    dataUser.role === 'owner' &&
                    <>
                        <Pressable style={styles.buttonEdit}
                            onPress={() => {
                                // setModalVisible(true)
                                navigation.navigate('ListUsers')
                            }}
                        >
                            <Text>List User</Text>
                        </Pressable>
                        <Pressable style={styles.buttonEdit}
                            onPress={() => {
                                setModalVisible(true)
                            }}
                        >
                            <Text>Add User</Text>
                        </Pressable>
                    </>
                }
            </View>
            <View style={{ flex: 1 }}>
                <TouchableOpacity
                    style={styles.buttonLogout}
                    onPress={() => SetUser('')}
                >
                    <Text style={styles.textHalo}>Logout</Text>
                </TouchableOpacity>
            </View>
            <AddUser modalVisible={modalVisible} setModalVisible={setModalVisible} dataUser={dataUser} />
        </View>
    </>)
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
    profileLayout: {
        justifyContent: "center", flexDirection: 'column', alignItems: 'center', flex: 2, height: 50,
        width: "90%",
        margin: 5,
        shadowRadius: 5,
        borderRadius: 5,
        shadowColor: "#005",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,

    },
    profileText: {
        fontWeight: "bold",
        fontSize: 18
    },
    buttonEdit: {
        backgroundColor: "#B89AD3",
        height: 50,
        width: 300,
        alignItems: "center",
        justifyContent: 'center',
        paddingVertical: 5,
        paddingHorizontal: 5,
        margin: 10,
        borderRadius: 20

    },
    buttonLogout: {
        backgroundColor: 'red',
        height: 50,
        width: 300,
        alignItems: "center",
        justifyContent: 'center',
        paddingVertical: 5,
        paddingHorizontal: 5,
        margin: 10,
        borderRadius: 20
    },

});

const mapStateToProps = state => {
    const { user } = state;
    const { data, loading } = user

    return {
        dataUser: data,
        loading
    };
}
const mapDispatchToProps = {
    SetUser,
    // SetLoading
}

export default connect(mapStateToProps, mapDispatchToProps)(UserScreen);