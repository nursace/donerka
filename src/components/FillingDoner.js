import React, { Component } from 'react'
import { Text, View, Image,TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { emailChanged, passwordChanged, loginUser } from '../actions'
import { Card, CardSection, Input, Button, Spinner } from './common'
import { Dropdown } from 'react-native-material-dropdown';
import firebase from 'firebase'
import {Actions} from 'react-native-router-flux'
class FillingDoner extends Component {
    constructor(props){
        super(props)
        this.state={
            blood:'',
            positive: ''
        }
    }
    render() {
        let data = [{
          value: '1',
        }, {
          value: '2',
        }, {
          value: '3',
        },
    {
        value: '4'
    }
    ];
    let data1 = [{
      value: '1',
    }, {
      value: '2',
    },
];
    return (
      <View style={styles.mainView}>
    
          <View style={styles.imageView}>
            <Image source={require('../../assets/logo.png')}
                   style={{alignSelf: 'center',  height: 110, width: 285}}
                   resizeMode='stretch'
              />
          </View>
          <Text style={{fontSize: 20,marginLeft: 80,marginTop: 0, color: '#BF4747', width: 300,fontWeight: 'bold'}}>Какого типа у вас кровь ?</Text>
         
          <View style = {{flex:1,marginBottom:200}}>
          <Dropdown
    baseColor='red'
          fontSize ={25}
        label='Группа крови'
       data = {data}
       onChangeText = {() => this.setState({blood : this.value})}
       value = {this.state.blood}
      /><View style={{marginTop:20}}>
      <Dropdown
    baseColor='red'
          fontSize ={25}
        label='Резус-Фактор'
        data={data1}
        onChangeText = {()=>{this.setState({positive : this.value})}}
        value = {this.state.positive}
      />
      </View>
          </View>
          
          <TouchableOpacity
        onPress={() => {
            let s =''
            let email = firebase.auth().currentUser.email()
            for(let i=0;i<email.length;i++){
               if(email.charAt(i)==='@') break;
               s+=email.charAt(i)
            }
            firebase.database().ref('/users/').child(s).set({blood: this.state.blood,factor: this.state.positive})
            .then(()=>{
                Actions.candidatesRec({})
            })
        }}
        style={{width: 150,borderRadius:25,backgroundColor:'#BF4747',height:50,alignItems:'center',marginLeft: 150,marginTop:50}}>
          <Text style={styles.textStyle}>
            Отправить
          </Text>
      </TouchableOpacity>
      </View>
    )
  } 
}

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,

},
buttonStyle: {
  
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5,
},
  mainView: {
    flex: 1,
    alignContent: 'center',
    paddingTop: 70,
    backgroundColor:'#fff'
  },
  subView2: {
    flex: 1,
    alignItems: 'center',
  },
  flagsView: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 20,
  },
  flagImage: {margin: 5, width: 50, height: 50},
  imageView:{
    flex: 1,
    
  },
  textView:{
    flex: 3,
    backgroundColor: 'yellow',
  },

  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },

}

export default FillingDoner
