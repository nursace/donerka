import React, { Component } from 'react'
import { Text, View, Image,TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'
import {Icon} from 'react-native-elements'
import {roleChanged} from '../actions'
import firebase from 'firebase'
import {connect} from 'react-redux'

class ChoosingRoleForm extends Component {
  render() {
    return (
      <View style={styles.mainView}>
        <View style= {{flexDirection : 'row',marginLeft: 20,marginTop:10}}>
      <TouchableOpacity onPress= {()=>{Actions.login()}} style={{height:30,width:30}} >
<Icon name = 'reply' style={{height : 100,width: 100}} />
       </TouchableOpacity>
       </View>
        <View>
          <View style={styles.imageView}>
            <Image source={require('../../assets/logo.png')}
                   style={{alignSelf: 'center',  height: 110, width: 285}}
                   resizeMode='stretch'
              />
          </View>
        </View>
        
          <Text style={{fontSize: 20,marginLeft: 150,marginTop: 120, color: '#BF4747', fontWeight: 'bold'}}>Выберите роль</Text>
          <View style={{flex : 1,alignItems:'center',backgroundColor:'#fff'}}>
          
          <View style={{flex:1}}>
                </View>
                <View style={{flex:2}}>
          <Image source={require('../../assets/strelki.png')}
                   style={{alignSelf: 'center',  height: 110, width: 140,marginTop: 100}}
                   resizeMode='stretch'
              />
              </View> 
              <View style={{flex: 2}}>
          <TouchableOpacity
            onPress={() => {
              if(firebase.auth().currentUser)
                this.props.roleChanged('donator')
             else { Actions.register({role: 'donator'})}
              
                }
              }
            style={{width: 150,borderRadius:25,backgroundColor:'#BF4747',height:50,alignItems:'center',marginRight: 200,marginBottom:0,}}>
          <Text style={styles.textStyle}>
            Донор
          </Text>
      </TouchableOpacity>
      </View>
      <View>
      <TouchableOpacity
        onPress={() => {
              if(firebase.auth().currentUser)
                this.props.roleChanged('recepient')
             else { Actions.register({role: 'recepient'})}
              
                }
                }
        style={{width: 150,borderRadius:25,backgroundColor:'#BF4747',height:50,alignItems:'center',marginLeft: 200,marginBottom:10}}>
          <Text style={styles.textStyle}>
            Реципиент
          </Text>
      </TouchableOpacity>
</View>
<View style={{flex:3}}>
  </View>
      </View>
      
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
    paddingTop: 20,
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
const mapStateToProps = ({ auth }) => {
    const { email, password, error, loading } = auth
    return {email, password, error, loading }
}

export default connect(mapStateToProps, {
  roleChanged
})(ChoosingRoleForm)
