import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet,Dimensions} from 'react-native'

const InputLogin = props =>  {
    const { inputStyle, labelStyle, containerStyle }  = styles
    const { value, label, onChangeText, placeholder, secureTextEntry } = props
    return(
      <View style={containerStyle}>
        <TextInput
          placeholder={placeholder}
          autoCorrect={false}
          value={value}
          placeholderTextColor='#d0d0d0'
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
      color: '#fff',
      fontSize: 14,
      paddingBottom : 5,  
      borderBottomWidth: 0.4,
      borderRadius: 5,
      borderColor: '#fff',
      width: Dimensions.get('window').width*0.77,
      marginLeft:Dimensions.get('window').width/9.7,
      textAlign: 'center',
    },
    labelStyle: {
      color: '#fff',
      fontSize: 18,
      flex: 1,
    },
    containerStyle: {
      height: 40,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom : 20
    },
})

export { InputLogin }