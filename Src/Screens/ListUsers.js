import React, { useState, useEffect } from 'react'
import { View, ActivityIndicator, StyleSheet, } from 'react-native'
import { API_URL } from "@env"
import axios from "axios"
import { connect } from 'react-redux';
import { SearchBar, ListUsers, AddUser } from '../components'

const ListUsersScreen = (props) => {
    const { dataUser } = props
    const [listUsers, setListUsers] = useState([])
    const [filterData, setFilterData] = useState([])
    const [query, setQuery] = useState("")
    const [loading, setLoading] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const [currentUser, setCurrentUser] = useState([])

    useEffect(() => {
        GetListUsers()
    }, [modalVisible])

    useEffect(() => {
        let newQuery = query.toLowerCase()
        const newList = listUsers.filter((item) => item.username.toLowerCase().includes(newQuery))
        setFilterData(newList)
    }, [query])

    const GetListUsers = async () => {
        setLoading(true)
        const { token } = dataUser
        try {
            const { data } = await axios.get(`${API_URL}/allusers`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(data, 'dari get list users')
            if (data) {
                setListUsers(data.data)
            }
        } catch (e) {
            setListUsers([])
        } finally {
            setLoading(false)
        }
    }

    const onPress = (data) => {
        console.log(data)
        setCurrentUser(data)
        setModalVisible(true)

    }

    if (loading) {
        return (
            <View style={{ flex: 1, padding: 5, flexDirection: "row", justifyContent: "center" }}>
                <ActivityIndicator size="small" color="#B89AD3" />
            </View>
        )
    }

    return (
        <>
            <View style={styles.container}>
                <View style={styles.viewSearch}>
                    <SearchBar
                        placeholder="Cari User"
                        query={query}
                        setQuery={setQuery}
                    />
                </View>
                <View>
                    <ListUsers data={filterData.length > 0 && query ? filterData : listUsers} onPress={onPress} />
                </View>
            </View>
            <AddUser modalVisible={modalVisible} setModalVisible={setModalVisible} dataUser={dataUser} currentUser={currentUser} />
        </>
    )
}

const mapStateToProps = state => {
    const { user } = state;
    const { data } = user
    return {
        dataUser: data,
    };
}

export default connect(mapStateToProps)(ListUsersScreen);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        flexDirection: "column",
        alignContent: "flex-start",
        alignItems: "center",
        // backgroundColor: "red",
    },
    viewSearch: {
        // flex: 1,
        paddingTop: 10,
        marginVertical: 5,
        justifyContent: "center",
        display: "flex",
        alignContent: "center",
        alignItems: "center",
    },
})