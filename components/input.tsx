import {
    StyleSheet,
    TextInput,
} from "react-native"
import React from 'react'

export const Input = (props: any) => {

    return (
        <TextInput
            style={[styles.input, props.styles]}
            placeholder={props.placeholder}
            placeholderTextColor="#635C5C"
            value={props.value}
            secureTextEntry={props.secure}
            onChangeText={props.change}
        />
    )
}


const styles = StyleSheet.create({
    input: {
        height: 60,
        borderColor: '#887E7E',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 12,
        width: '100%',
        marginTop: 18,
    },
})