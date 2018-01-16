import React, { Component } from 'react'
import { Text, View, TextInput,Dimensions, StyleSheet} from 'react-native'
import {Icon} from 'react-native-elements'
const InputIcon = props =>  {
    const { inputStyle, labelStyle, containerStyle }  = styles
    const { value,size, label, onChangeText,marL,pad1L, placeholder, secureTextEntry } = props
    return(
      <View style={{
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop:10,
        }}>
        <Icon
        iconStyle={{margin : 15,paddingLeft:pad1L}}
        color = '#fff'
        name={label}
        type='ionicon'
        size = {size}
        />
        <TextInput
          placeholder={placeholder}
          placeholderTextColor='#fff'
          autoCorrect={false}
          value={value}
          secureTextEntry={secureTextEntry}
          onChangeText={onChangeText}
          style={[inputStyle,{marginLeft:marL}]}
          underlineColorAndroid='transparent'
          selectionColor='#fff'
        />
      </View>
    )
}

const styles = StyleSheet.create({
    inputStyle: {
      color: '#fff',
      paddingRight: 5,
      paddingLeft: 5,
      marginBottom: 25,
      fontSize: 20,
      lineHeight: 23,
      height: 30,
      width: Dimensions.get('window').width*0.5,
      borderBottomWidth: 0.4,
      borderRadius: 5,
      borderColor: '#fff',
      flex: 2,
    },
    containerStyle: {
      height: 40,
      flexDirection: 'row',
      alignItems: 'center',
    },
})

export { InputIcon }