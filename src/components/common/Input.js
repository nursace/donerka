import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet} from 'react-native'

const Input = props =>  {
        const { inputStyle, labelStyle, containerStyle }  = styles
        const { value, label, onChangeText, placeholder, secureTextEntry } = props
        return(
            <View style={containerStyle}>
                <Text style={labelStyle}>{label}</Text>
                <TextInput
                    placeholder={placeholder}
                    autoCorrect={false}
                    value={value}
                    secureTextEntry={secureTextEntry}
                    onChangeText={onChangeText}
                    style={inputStyle}
                    underlineColorAndroid='transparent'
                />
            </View>
        )
}

const styles = StyleSheet.create({
    inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        height: 30,
        width: 500,
        flex: 2,
    },
    labelStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1,
    },
    containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
})

export { Input }