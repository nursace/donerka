import React, { Component } from 'react'
import { Text, View, TextInput,Dimensions, StyleSheet} from 'react-native'
import {Icon} from 'react-native-elements'
const InputIcon = props =>  {
    const { inputStyle, labelStyle, containerStyle }  = styles
    const { value,size, label, onChangeText,marL, placeholder, secureTextEntry } = props
    return(
      <View style={{
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop:10,
        }}>
        <Icon
        iconStyle={{margin : 15,marginLeft:0}}
        color = '#ca1414'
        name={label}
        type='ionicon'
        size = {size}
        />
        <TextInput
          placeholder={placeholder}
          placeholderTextColor='#ca1414'
          autoCorrect={false}
          value={value}
          secureTextEntry={secureTextEntry}
          onChangeText={onChangeText}
          style={[inputStyle,{marginLeft:marL}]}
          underlineColorAndroid='transparent'
          selectionColor='#ca1414'
        />
      </View>
    )
}

const styles = StyleSheet.create({
    inputStyle: {
      color: '#ca1414',
      paddingRight: 5,
      paddingLeft: 5,
      marginBottom: 15,
      fontSize: 18,
      lineHeight: 23,
      height: 30,
      width: Dimensions.get('window').width*0.5,
      borderBottomWidth: 0.4,
      borderRadius: 5,
      borderColor: '#ca1414',
      flex: 2,
    },
    containerStyle: {
      height: 40,
      flexDirection: 'row',
      alignItems: 'center',
    },
})

export { InputIcon }