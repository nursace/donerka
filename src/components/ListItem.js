import React, { Component } from 'react'
import { Text, View, ListView, TouchableOpacity } from 'react-native'

export default class ListItem extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <View style={{ flex: 1,
        flexDirection: 'row',
        margin: 5, height: 80, backgroundColor: '#3B3836',
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 10,
      }}>
        <View style={{ flex: 3,  alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{color: '#fff', fontSize: 20}}>{ this.props.text }</Text>
          <Text style={{color: '#fff', fontSize: 20}}>{ this.props.date}</Text>
        </View>
        <TouchableOpacity style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#A0F47D',
          borderWidth: 1,
          borderColor: '#fff',
          borderRadius: 10,
        }}
          onPress={() => console.log('tap')}
        >
          <Text style={{fontSize: 20, fontWeight: 'bold', color: '#fff'}}>Донат</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
