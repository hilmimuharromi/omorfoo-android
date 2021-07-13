'use strict';
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

import { RNCamera } from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';

const styles = {
    root: {
        flex: 1,
        height: 100
    },
    upperSection: {
        flex: 5,
        marginBottom: 5
    },
    lowerSection: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    camera: {
        height: '100%',
    },
    inputBarcode: {
        backgroundColor: 'white',
        width: '90%',
        height: 60,
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: "flex-start",
        alignItems: "center",
        alignContent: "center",
        paddingHorizontal: 5
    },
    submit: {
        marginVertical: 5,
        backgroundColor: "#B89AD3",
        height: 60,
        width: 300,
        alignItems: "center",
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        borderRadius: 5,

    }
};

const ScanBarcode = (props) => {
    const [data, setData] = useState('')
    const { onSubmit } = props

    const onBarcodeRead = (result) => {
        setData(result.data)
    }
    return (
        <View style={styles.root}>
            <View style={styles.upperSection}>
                <RNCamera
                    onBarCodeRead={onBarcodeRead}
                    androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    style={{ flex: 1 }}
                    type={RNCamera.Constants.Type.back}
                >
                    <BarcodeMask
                        width={300}
                        height={300}
                        showAnimatedLine={true}
                        outerMaskOpacity={0.8}
                    />
                </RNCamera>
            </View>
            <View style={styles.lowerSection}>
                <View style={styles.inputBarcode}>
                    <Icon name='barcode'
                        size={30} color="#000"
                        active
                        type="FontAwesome" />
                    <TextInput
                        placeholder='Barcode of the item'
                        value={data}
                        onChangeText={(value) => setData(value)}
                    />
                </View>
                <View>
                    <TouchableOpacity
                        style={styles.submit}
                        onPress={() => onSubmit(data)}
                    >
                        <Text>Submit Kode</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default ScanBarcode