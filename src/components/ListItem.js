import React, {Component} from 'react';
import ReactNative, {Image,Dimensions,Platform,TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements'
import {Actions} from 'react-native-router-flux'
import firebase from 'firebase'
const {View, TouchableHighlight, Text} = ReactNative;
class ListItem extends Component {
  constructor(props){
    super(props)
    this.state = {
      role : '',
    }
    
  }
  componentWillMount(){
    let s = ''
    let email1 = firebase.auth().currentUser.email
    for(let i = 0; i < email1.length; i++) {
      if (email1.charAt(i) === '@') break;
      s += email1.charAt(i)
    }
    var that = this
    firebase.database().ref(`users/${s}`).on('value',function(snapshot){
       if(snapshot.val().role==='donor'){
         that.setState({role : 'donor'})
       }
     })
  }
  render() {
      return (
      <View style={styles.li}>
      <View style={styles.image}> 
        <Icon type='ionicon' color='#E39291' style={{backgroundColor:'transparent'}} size={50} name='ios-camera-outline' /> 
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
{this.state.role!=='donor'  ?
<Text style={{  fontSize: 14,
color: '#d3d3d3',
marginLeft: 5,
fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null}}>Submitted blood to you !</Text> :

<Text style={{  fontSize: 14,
  color: '#d3d3d3',
  marginLeft: 5,
  fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null}}>Need help !</Text>
}
</View>
</View>
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
    fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null
    },

}
export default ListItem