import React, {Component} from 'react';
import ReactNative, {Image,Dimensions} from 'react-native';
import { Font } from 'expo';
import {Ionicons} from '@expo/vector-icons'

const {View, TouchableHighlight, Text} = ReactNative;
class ListItem extends Component {
  
  render() {
    return (
      <View style={styles.li}>
      <View style={styles.image}> 
        <Ionicons color='#E39291' style={{backgroundColor:'transparent'}} size={50} name='ios-camera-outline' /> 
        </View>
        <View style={styles.name}>
<View style={{flex : 2,flexDirection:'row',}}>
          <Text style={styles.title}>{this.props.item.firstName} {this.props.item.lastName}</Text>
          
</View>
<View style={{flex : 2}}>
          <Text style={{  fontSize: 14,
    color: '#d3d3d3',
    marginLeft: 5,
    fontFamily : 'AvenirNext-DemiBold'}}>Need help !</Text>
</View>
        </View>
        <View style={{marginLeft: 210, width: 30, height: 30}}>
          <Ionicons name='ios-arrow-forward-outline' />
        </View>
      </View>
    );
  }
}
var styles = {
  image : {
    borderRadius : 55/2,
    height: 55,
    width : 55 ,
    backgroundColor: '#EDD8D8',
    marginLeft : 20,
    alignItems : 'center',
    justifyContent : 'center',  
  },
  li: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#d0d0d0',
    borderBottomWidth: 1,
    marginTop: 15,
    height : 70,
  },
  title: {
    fontSize: 16,
    color: 'gray',
    marginLeft: 5,
    fontFamily : 'AvenirNext-DemiBold'
  },
  name: {
    margin: 8,
  },
}
export default ListItem