import React from 'react'
import { View, Text, StyleSheet, } from 'react-native'
import { DatePicker, } from 'react-native-woodpicker'


const Periode = (props) => {
    const { start, setStart, end, setEnd } = props

    const handleText = (pickedDate) => pickedDate
        ? pickedDate.toDateString()
        : "No value Selected";

    return (

        <View style={styles.rangeContainer}>
            <Text style={styles.headerText}>Periode :</Text>
            <DatePicker
                value={start}
                onDateChange={(date) => setStart(date)}
                title="Date Picker"
                text={handleText(start)}
                isNullable
                style={styles.pickerStyle}
                androidDisplay="calendar"
                backdropAnimation={{ opactity: 0 }}
                locale="id-ID"
            />
            <Text>-</Text>
            <DatePicker
                value={end}
                onDateChange={(date) => setEnd(date)}
                title="Date Picker"
                text={handleText(end)}
                isNullable
                style={styles.pickerStyle}
                androidDisplay="calendar"
                backdropAnimation={{ opactity: 0 }}
                locale="id-ID"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    headerText: {
        marginHorizontal: 5
    },
    rangeContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 5,
        height: 50
    },
    pickerStyle: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'blue',
        borderRadius: 5,
        alignItems: 'center',
        paddingHorizontal: 4,
        paddingVertical: 8,
        marginHorizontal: 5,
        marginVertical: 8,
        height: 40,
    },
})

export default Periode