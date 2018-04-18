import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet,Dimensions} from 'react-native'

const InputLogin1 = props =>  {
    const { inputStyle, labelStyle, containerStyle }  = styles
    const { value, label, onChangeText, placeholder, secureTextEntry } = props
    return(
      <View style={containerStyle}>
      {label==='Подтвердите пароль' ? <View>
      <Text style={labelStyle}>Подтвердите</Text>
      <Text style={labelStyle}>Пароль</Text>
      
        </View>
         :<Text style={labelStyle}>{label}</Text>  }
        <TextInput
          placeholder={placeholder}
          autoCorrect={false}
          value={value}
          placeholderTextColor='#ffffff85'
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
      fontSize: 15,
      fontFamily: 'AvenirNext-DemiBold',
      paddingBottom : 5,  
backgroundColor: '#00000015',

      borderColor: '#fff',
      width: Dimensions.get('window').width*0.63,
      marginLeft:Dimensions.get('window').width/18.7-20,
      marginBottom : 1,
      textAlign: 'center',
    },
    labelStyle: {
      color: '#fff',
      marginLeft : 20,
      fontSize: 17,
    width: 120,
    
    },
    containerStyle: {
      height: 40,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom : 30
    },
})

export { InputLogin1 }