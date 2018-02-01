import React, {Component} from 'react';
import ReactNative, {Image,Dimensions,TouchableOpacity} from 'react-native';
import { Font } from 'expo';
import {Ionicons} from '@expo/vector-icons'
import {Actions} from 'react-native-router-flux'

const {View, TouchableHighlight, Text} = ReactNative;
class ListItem extends Component {
  
  render() {
    console.log(this.props.item)
    return (
      <View style={styles.li}>
      <View style={styles.image}> 
        <Ionicons color='#E39291' style={{backgroundColor:'transparent'}} size={50} name='ios-camera-outline' /> 
        </View>
        <TouchableOpacity onPress={()=>{
          const { item } = this.props
        Actions.profileView({item: item})
        }} style={{flex : 1,flexDirection:'row'}}>
<View>
<View style={{flex : 1,margin: 10,marginTop : 0}}>
          <Text style={styles.title}>{this.props.item.firstName} {this.props.item.lastName}</Text>
          
</View>
<View style={{flex : 1,margin : 10}}>
{this.props.item.role!==null  ?
<Text style={{  fontSize: 14,
color: '#d3d3d3',
marginLeft: 5,
fontFamily : 'AvenirNext-DemiBold'}}>Submitted blood to you !</Text> :

<Text style={{  fontSize: 14,
  color: '#d3d3d3',
  marginLeft: 5,
  fontFamily : 'AvenirNext-DemiBold'}}>Need help !</Text>
}
</View>
</View>
      <Ionicons style={{backgroundColor:'transparent',marginTop: 10,marginLeft : Dimensions.get('window').width/2.7}} name='ios-arrow-forward-outline' color='#9C9C9C' size={33} />
      
        </TouchableOpacity>
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

}
export default ListItem