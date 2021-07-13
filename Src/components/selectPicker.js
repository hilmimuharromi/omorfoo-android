import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';

const SelectPicker = (props) => {
    const { options, onValueChange, title, value } = props
    return (
        <RNPickerSelect
            value={value}
            placeholder={{ label: `Pilih ${title}`, value: null }}
            onValueChange={onValueChange}
            style={{
                inputAndroid: {
                    color: 'black',
                    height: 30,
                    marginVertical: 5,
                },
                placeholder: {
                    color: 'black',
                    fontSize: 12,
                    fontWeight: 'bold',
                },
            }}
            items={options}
        />
    )
}

export default SelectPicker