import React, { Component } from 'react'
import { Text, View,Button,Image,ImageBackground,Dimensions,Animated,Easing, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { emailChanged, passwordChanged, registerUser } from '../actions'
import { Input, Spinner,InputIcon } from './common'
import firebase from 'firebase'
import { Actions } from 'react-native-router-flux'
import {Icon} from 'react-native-elements'

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fullname: 'ijoji',
      phone: '38274438',
      username: 'fdfeunfe',
      loading: false,
      image : null,
      opacityValue: new Animated.Value(0.12),
    }
  }
  onEmailChange(text) {
    this.props.emailChanged(text)
  }
  onPasswordChange(text) {
    this.props.passwordChanged(text)
  }
  onFullnameChange(fullname) {
    this.setState({fullname})
  }
  onPhoneChange(phone) {
    this.setState({phone})
  }
  onUsernameChange(username) {
    this.setState({username})
  }
  onButtonPress() {
    const { email, password } = this.props
    this.props.registerUser({ email, password })
  }

  
  submitToFirebase() {

this.setState({loading : true})
    const {fullname,phone,username } = this.state
    const {email,password } = this.props
    let s = ''
    let email1 = email
    
    for(let i = 0; i < email1.length; i++) {
      if (email1.charAt(i) === '@') break;
      s += email1.charAt(i)
    }
    this.props.registerUser({ email, password,fullname,phone,username,email})

this.setState({loading:false})
    
    
  }
  renderButton() {
    if (this.props.loading||this.state.loading) {
      return <Spinner size='large' />
    }
    return (
    <TouchableOpacity style={{width: 170,
      borderRadius: 15,
      borderWidth: 0.6,
      borderColor: '#fff',
      backgroundColor:'#BF4747',
      height:50,
      marginLeft: 150,
      alignItems:'center',
      justifyContent: 'center',

    }}
    onPress={this.submitToFirebase.bind(this)}>
      <Text style={{color: '#fff', fontSize:20, fontWeight:'bold'}}>
        Отправить
      </Text>
    </TouchableOpacity>
    )
  }
  componentWillMount(){
    Animated.timing(this.state.opacityValue, {
      toValue: 1,
      duration: 500,
  }).start();
  }
  render() {
    return(
        <Animated.View style={{flex:1,opacity: this.state.opacityValue,}}>
        <View style={styles.mainView} />
       <View
          style={{
            marginLeft:Dimensions.get('window').width*0.2,
            justifyContent:'center',
            flex: 12,
            backgroundColor:'transparent'
          }}
        >
        <TouchableOpacity onPress={()=>{console.log('UPLOAD')}}>
        <Image source={require('../../assets/LO.png')} style={{width: 80,height: 80,marginLeft : 75,borderRadius: 40}}></Image>
          </TouchableOpacity>
          <View style={{marginTop:50}}>
          <Input
          label='ФИО'
          placeholder='ФИО'
          onChangeText={this.onFullnameChange.bind(this)}
          value={this.state.fullname}
        />
        <Input
          label='Телефон'
          placeholder='555-555-555'
          onChangeText={this.onPhoneChange.bind(this)}
          value={this.state.phone}
        />
        <Input
          label='Nickname'
          placeholder='Nickname'
          onChangeText={this.onUsernameChange.bind(this)}
          value={this.state.username}
        />
        <Input
          label='Email'
          placeholder='Email'
          onChangeText={this.onEmailChange.bind(this)}
          value={this.props.email}
        />
        <Input
          secureTextEntry
          label='Password'
          placeholder='password'
          onChangeText={this.onPasswordChange.bind(this)}
          value={this.props.password}
        />
          </View>
          <Text style={styles.errorTextStyle}>{this.props.error}</Text>
          <View style={{ marginTop: 10 }}>{this.renderButton()}</View>

        </View>
        <View style={{justifyContent:'center',backgroundColor:'transparent',flexDirection:'row',alignItems:'center',marginRight:90,flex:1}}> 
            
            <Text style={{color:'#fff'}}>Don't have an account? </Text>
            
            <TouchableOpacity style={{width : 60,height:20}} onPress={()=>{
                Animated.timing(this.state.opacityValue, {
                  toValue: 0,
                  duration:300, 
                  easing: Easing.bezier(0.0, 0.0, 0.2, 1),
              }).start(() => {
                  Actions.register()
                });
              }}>
            <Text style={{   color:'#fff', textDecorationLine: "underline",}}>Sign Up</Text></TouchableOpacity>
      
        </View>
      </Animated.View>
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
    opacity:0.6,
    backgroundColor:'#FE3562',
    position:'absolute',  
  }
}

const mapStateToProps = ({ auth }) => {
    const { email, password, error, loading } = auth
    return {email, password, error, loading }
}

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, registerUser,
})(Register)