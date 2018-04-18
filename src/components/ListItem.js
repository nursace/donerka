import React, {Component} from 'react';
import ReactNative, {Dimensions,Platform,TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements'
import {Actions} from 'react-native-router-flux'
import firebase from 'firebase'
import {Spinner} from './common'
import Image from 'react-native-image-progress'


const {View, TouchableHighlight, Text} = ReactNative;
class ListItem extends Component {
  constructor(props){
    super(props)
    this.state = {
      role : '',
      image : null
    }
    
  }
  componentWillMount(){
    if(firebase.auth().currentUser.email){
    let s = ''
    let email1 = firebase.auth().currentUser.email
    for(let i = 0; i < email1.length; i++) {
      if (email1.charAt(i) === '@') break;
      if(email1.charAt(i)===`'`)
      s+='='
      else if(email1.charAt(i)==='.')
      s+='+'
      else
    s += email1.charAt(i)
    }

    let d = ''
email1 = this.props.item.email
    for(let i = 0; i < email1.length; i++) {
      if (email1.charAt(i) === '@') break;
      if(email1.charAt(i)===`'`)
      d+='='
      else if(email1.charAt(i)==='.')
      d+='+'
      else
    d += email1.charAt(i)
    }
    var that = this
    firebase.database().ref(`users/${s}`).once('value',function(snapshot){
       if(snapshot.val().role==='donor'){
         that.setState({role : 'donor'})

        }
       
     })
     .then(()=>{
       firebase.database().ref(`users/${d}`).once('value', snapshot => {
         if(snapshot.hasChild('avatar')){
           that.setState({image : snapshot.val().avatar})
            
          }
       })
     })
    }
  }
  render() {
      return (
      <TouchableOpacity onPress={()=>{
        const {item} = this.props
        Actions.push('profileView',{item})
      }} style={styles.li}>
      <View style={styles.image}>
      {this.state.image ?  <Image            indicator={Spinner}
      source={{uri :this.state.image}} style={[styles.image,{marginRight : 20,borderRadius:55*55}]} imageStyle={{width: 55,height: 55,borderRadius: 55*55,resizeMode:'stretch'}} />
   :     <Icon type='ionicon' color='#E39291' style={{backgroundColor:'transparent'}} size={50} name='ios-camera-outline' /> 
  } 
        </View>
<View style={{height : 50,}}>
<View style={{flex : 1}}>
          <Text style={styles.title}>{this.props.item.firstName} {this.props.item.lastName}</Text>
          
</View>
<View style={{flex : 1,margin : 10}}>
{this.state.role!=='donor'  ?
<Text style={{  fontSize: 14,
color: '#d3d3d3',
marginLeft: 5,
fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null}}>Сдал вам кровь !</Text> :

<Text style={{  fontSize: 14,
  color: '#d3d3d3',
  marginLeft: 5,
  fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null}}>Нужна помощь !</Text>
}
</View>
</View>
        </TouchableOpacity>

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
    marginLeft: 15,
    fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null
    },

}
export default ListItem