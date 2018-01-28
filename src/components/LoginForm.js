import React, { Component } from 'react'
import { Text,Image,ImageBackground,Animated,Easing, View,Dimensions,AsyncStorage, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { emailChanged, passwordChanged, loginUser } from '../actions'
import { InputLogin, Spinner } from './common'
import firebase from 'firebase'
import { Actions } from 'react-native-router-flux'
import {Icon} from 'react-native-elements'

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      logo : null,
      email : '',
      password : '',
      background : null,
      loadingComponent : true,
      opacityValue: new Animated.Value(1),
    };
  }
  onEmailChange(text) {
    this.setState({email:text})
    this.props.emailChanged(text);
  }
  onPasswordChange(text) {

    this.setState({password:text})
    this.props.passwordChanged(text);
  }
  onButtonPress() {
    const { email, password,error } = this.props;
    this.props.loginUser({ email, password });
    this.setState({loading:false})
  }


  renderButton() {  
    if (this.props.loading || this.state.loading) {
      return <View style={{marginTop:20,height:40,marginRight: 150}}><Spinner size="large" /></View>;
    }
    return (
      <TouchableOpacity
        style={{
          width: 170,
          borderRadius: 30,
          borderWidth: 0.6,
          borderColor: '#FE3562',
          backgroundColor: '#fff',
          height: 40,
          marginTop: 20,
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onPress={this.onButtonPress.bind(this)}
      >
        <Icon name='sign-in' type='font-awesome' color='#FE3562' size={20} />
      </TouchableOpacity>
    );
  }
  render() {
    return (
      <Animated.View style={{flex:1,opacity: this.state.opacityValue,}}>
        <View style={styles.mainView} />
        <Image source={require('../../assets/logo.png')} style={{marginTop: Dimensions.get('window').height*0.2,alignSelf:'center',width: Dimensions.get('window').width*0.8,height: Dimensions.get('window').height/9}}></Image>
        <View
          style={{
            flex: 12,
            backgroundColor:'transparent'
          }}
        >
          <View style={{marginTop:80}}>
          <InputLogin
          placeholder='Email address'
          onChangeText={this.onEmailChange.bind(this)}
          value={this.props.email}
        />
        <InputLogin
          secureTextEntry
          placeholder='Password'
          onChangeText={this.onPasswordChange.bind(this)}
          value={this.props.password}
        />
          </View>
          <View style={{alignSelf:'center'}}>{this.renderButton()}</View>
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
      </Animated.View>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    color: '#FE3562',
    alignSelf: 'center'
  },
  mainView: {
    height:Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    opacity:1,
    backgroundColor:'#F65352',
    position:'absolute',  
  }
};

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;
  return { email, password, error, loading };
};

export default connect(mapStateToProps, {
  emailChanged,
  passwordChanged,
  loginUser,
})(LoginForm);
