import React, { Component } from 'react'
import { Text, View,Button,KeyboardAvoidingView,Image,Platform,ImageBackgrounds,Dimensions,Animated,Easing, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { emailChanged, passwordChanged, registerUser } from '../actions'
import { Input, Spinner,InputLogin } from './common'
import firebase from 'firebase'
import { Actions } from 'react-native-router-flux'
import {Icon} from 'react-native-elements'
class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName : '',
      patronymic : '',
      phone: '',
      email : '',
      password : '',
      loading: false,
      image : null,
      opacityValue: new Animated.Value(0.12),
      timeLineTop: null
    }
  }
  onEmailChange(text) {
    this.props.emailChanged(text)
  }
  onPasswordChange(text) {
    this.props.passwordChanged(text)
  }
  onFirstNameChange(firstName) {
    this.setState({firstName})
  }
  onPhoneChange(phone) {
    this.setState({phone})
  }
  onPatronymicChange(patronymic) {
    this.setState({patronymic})
  }
  onLastNameChange(lastName) {
    this.setState({lastName})
  }
  onButtonPress() {
    const { email, password } = this.props
    this.props.registerUser({ email, password })
  }

  submitToFirebase() {

this.setState({loading : true})
    const {firstName,phone,lastName,patronymic } = this.state
    const {email,password } = this.props

    this.props.registerUser({ email, password,firstName,phone,lastName,patronymic})

this.setState({loading:false})
    
    
  }
  renderButton() {
    if (this.props.loading||this.state.loading) {
      return <Spinner style={{marginRight : 35  , }} size='large' />
    }
    return (
    <TouchableOpacity style={{width: 170,
      backgroundColor:'transparent',
      height:50,
      alignItems:'center',
      justifyContent: 'center',
    }}
    onPress={this.submitToFirebase.bind(this)}>
      <Text style={{color: '#fff', fontSize:20, fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null}}>
        Create an account
      </Text>
    </TouchableOpacity>
    )
  }
  renderPost(){
    firebase.auth().signOut().then(()=>{
    Actions.Login()
  }).catch(()=>{
    console.log('sign out failed')
  })
  }
  render() {
    return(
        <View style={{flex:1,backgroundColor: '#F65352'}}>
    {!this.props.sent ?
      <View style={{flex : 1}}>
      <View style={{flex : 2, }}>
    <View style={{flex : 5,justifyContent: 'center',alignItems:'center',backgroundColor:'transparent'}}>
    <Text style={{fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null,fontSize: 25 , color :'#fff'}}>Sign up</Text>

      </View>  
        </View>
       
     <View
        style={{
          justifyContent:'center',
          flex: 12,
          alignItems : 'center',
          marginRight : 40,
          marginTop : 10
        }}
      >
        <InputLogin
        label='First Name'
        placeholder='first name'
        onChangeText={this.onFirstNameChange.bind(this)}
        value={this.state.firstName}
      />
      <InputLogin
      label='Last Name'
      placeholder='last name'
      onChangeText={this.onLastNameChange.bind(this)}
      value={this.state.lastName}
    />  
     <InputLogin
        label='Patronymic'
        placeholder='patronymic'
        onChangeText={this.onPatronymicChange.bind(this)}
        value={this.state.patronymic}
      />
      <InputLogin
        label='Phone Number'
        placeholder='555-555-555'
        onChangeText={this.onPhoneChange.bind(this)}
        value={this.state.phone}
      />
      <InputLogin
        label='Email'
        placeholder='Email'
        onChangeText={this.onEmailChange.bind(this)}
        value={this.props.email}
      />
      <InputLogin
        secureTextEntry
        label='Password'
        placeholder='password'
        onChangeText={this.onPasswordChange.bind(this)}
        value={this.props.password}
      />

      </View>

        <View style={{position : 'absolute',marginTop:Dimensions.get('window').height/1.18,marginLeft : Dimensions.get('window').width/4.9}}>
      <View style={{ flex: 1,marginBottom : 25,alignItems: 'center' }}>
      {this.renderButton()}
      </View>

      <View style={{justifyContent:'center',backgroundColor:'transparent',flexDirection:'row',alignItems:'center',flex:1}}> 
          
          <Text style={{color:'#fff'}}>Already have an account? </Text>
          
          <TouchableOpacity style={{width : 60,height:20}} onPress={()=>{
              Animated.timing(this.state.opacityValue, {
                toValue: 0,
                duration:300, 
                easing: Easing.bezier(0.0, 0.0, 0.2, 1),
            }).start(() => {
                Actions.pop()
              });
            }}>
          <Text style={{   color:'#fff', textDecorationLine: "underline",}}>Sign in</Text></TouchableOpacity>
    
      </View>
      </View>
      </View>
      : 
      this.renderPost()
      }
      </View>
    )
  }

}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    color: 'red',
    alignSelf: 'center',
  },
  mainView: {
    height:Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor:'#F65352',
    position:'absolute',  
  }
}

const mapStateToProps = ({ auth }) => {
    const { email, password, error, loading,sent } = auth
    return {email, password, error, loading,sent }
}

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, registerUser,
})(Register)
