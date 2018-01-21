import React, { Component } from 'react'
import { Text, View,Button,Image,Animated,Easing, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { emailChanged, passwordChanged, registerUser } from '../actions'
import { Input, Spinner } from './common'
import firebase from 'firebase'
import { Actions } from 'react-native-router-flux'
import {Icon} from 'react-native-elements'
import {ImagePicker} from 'expo'
import b64 from 'base64-js'

class RegistrationForm extends Component {
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
      <Animated.View style={{flex:1,opacity: this.state.opacityValue}}>
       <ImageBackground   source={require('../../assets/back.png')} style={{height:Dimensions.get('window').height,width: Dimensions.get('window').width*1.3,position:'absolute'}} resizeMode='stretch'>
        <View style={styles.mainView} />
       <View
          style={{
            marginLeft:Dimensions.get('window').width*0.2,
            justifyContent:'center',
            flex: 12,
            backgroundColor:'transparent'
          }}
        >
        <Image source={require('../../assets/testf.png')} style={{marginTop: 80,alignSelf:'flex-start',marginLeft:20}}></Image>
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
          placeholder='password'row3
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
                  Actions.replace('register')
                });
              }}>
            <Text style={{   color:'#fff', textDecorationLine: "underline",}}>Sign Up</Text></TouchableOpacity>
      
        </View>
      </ImageBackground>
     
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
    marginTop: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
}

const mapStateToProps = ({ auth }) => {
    const { email, password, error, loading } = auth
    return {email, password, error, loading }
}

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, registerUser,
})(RegistrationForm)
/*

      <View style={styles.mainView}>
      <View style= {{flexDirection : 'row',marginLeft: 20,marginTop:10}}>
      <TouchableOpacity onPress= {()=>{Actions.replace('login')}} style={{height:20,width:20}} >
<Icon name = 'reply' style={{height : 100,width: 100}} />
       </TouchableOpacity>
       </View>
       <View style={{marginTop : 50}}>
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
          label='Username'
          placeholder='username'
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
          placeholder='password'row3
          onChangeText={this.onPasswordChange.bind(this)}
          value={this.props.password}
        />
        <Text style={styles.errorTextStyle}>
          {this.props.error}
        </Text>
        <View style={{marginTop:10}}>
        {this.renderButton()}
        </View></View>
      </View>


      */