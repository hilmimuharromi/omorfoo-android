import React, { useState, useEffect } from 'react';
import { Modal, View, Text, StyleSheet, Pressable, ToastAndroid, ActivityIndicator } from 'react-native'
import { FloatingLabelInput } from 'react-native-floating-label-input';
import SelectPicker from './selectPicker'
import axios from 'axios'
import { API_URL } from "@env"

const AddUser = (props) => {
    const { setModalVisible, modalVisible, dataUser, currentUser, } = props;
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('admin')
    const [showPassword, setShowPassword] = useState(false)
    const [inputPassword, setInputPassword] = useState(true)
    const [loading, setLoading] = useState(false)
    const [editMode, setEditMode] = useState(false)

    const showToast = (message) => {
        ToastAndroid.showWithGravity(message, ToastAndroid.SHORT, ToastAndroid.TOP);
    };

    useEffect(() => {
        if (currentUser) {
            setUsername(currentUser.username)
            setRole(currentUser.role)
            setInputPassword(false)
            setEditMode(true)
        }
    }, [currentUser, modalVisible])

    const simpanUser = async () => {
        if (!username || !role) return showToast('Harap Lengkapi Data')
        if (!password && !editMode) return showToast('Harap Lengkapi Data')
        const payload = { username, password, role }

        try {
            setLoading(true)
            const { data } = await axios({
                method: editMode ? "put" : "post",
                url: editMode ? `${API_URL}/user/${currentUser.id}` : `${API_URL}/user`,
                data: payload,
                headers: {
                    Authorization: `Bearer ${dataUser.token}`
                }
            })
            if (data) {
                showToast('sukses simpan user')
                setModalVisible(false)
                setUsername('')
                setPassword('')
                setRole('admin')
            }
        } catch (err) {
            showToast(`Gagal Simpan User, message : ${err.message}`)
        } finally {
            setLoading(false)
        }
    }



    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(false);
                setInputPassword(false)
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.headerModal}>
                        <Text style={styles.headerModalText}>{editMode ? "Edit User" : "Tambah User"}</Text>
                    </View>
                    {loading ?
                        <View style={styles.bodyModal}>
                            <ActivityIndicator size="large" color="#B89AD3" />
                        </View> :
                        <View style={styles.bodyModal}>
                            <FloatingLabelInput
                                label="Username"
                                value={username}
                                containerStyles={styles.layoutInput}
                                customLabelStyles={styles.customLabelStyles}
                                labelStyles={stylesCustom.labelStyles}
                                inputStyles={{
                                    color: 'black',
                                    paddingHorizontal: 10,
                                }}
                                onChangeText={(value) => {
                                    setUsername(value);
                                }}
                            />
                            {inputPassword &&
                                <FloatingLabelInput
                                    label="Password"
                                    value={password}
                                    isPassword
                                    togglePassword={showPassword}
                                    customShowPasswordComponent={<Text>Show</Text>}
                                    customHidePasswordComponent={<Text>Hide</Text>}
                                    containerStyles={styles.layoutInput}
                                    customLabelStyles={styles.customLabelStyles}
                                    labelStyles={stylesCustom.labelStyles}
                                    inputStyles={{
                                        color: 'black',
                                        paddingHorizontal: 10,
                                    }}
                                    onChangeText={(value) => {
                                        setPassword(value);
                                    }}
                                />
                            }
                            {
                                editMode && !inputPassword && <Pressable
                                    style={[styles.button, styles.buttonEditPassword]}
                                    onPress={() => setInputPassword(true)}
                                >
                                    <Text>Edit Password</Text>
                                </Pressable>
                            }
                            <SelectPicker
                                title={"Role"}
                                value={role}
                                onValueChange={(value) => setRole(value)}
                                options={[
                                    {
                                        value: "owner", label: "owner"
                                    },
                                    {
                                        value: "admin", label: "admin"
                                    }
                                ]}
                            />
                        </View>
                    }
                    <View style={styles.footerModal}>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Cancel</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonEdit]}
                            onPress={() => {
                                simpanUser()
                            }}
                        >
                            <Text style={styles.textStyle}>Simpan User</Text>
                        </Pressable>
                    </View>
                </View>
            </View>

        </Modal>
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
    layoutInput: {
        marginVertical: 5,
        borderWidth: 2,
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderColor: '#000',
        borderRadius: 8,
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
    buttonEditPassword: {
        justifyContent: "center",
        alignItems: "center",
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
        paddingTop: 20,
        width: "80%",
        flexDirection: "row",
        justifyContent: "space-around"
    }
})

export default AddUser