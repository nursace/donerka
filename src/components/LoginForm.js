import React, { Component } from 'react'
import { Text,Image,ImageBackground,Animated,Easing, View,Dimensions, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { emailChanged, passwordChanged, loginUser } from '../actions'
import { InputIcon, Spinner } from './common'
import firebase from 'firebase'
import { Actions } from 'react-native-router-flux'
import {Icon} from 'react-native-elements'

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      logo : null,
      background : null,
      loadingComponent : true,
      opacityValue: new Animated.Value(1),
    };
  }
  onEmailChange(text) {
    this.props.emailChanged(text);
  }
  onPasswordChange(text) {
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
          alignSelf:'center',
          marginRight: 150,
          borderRadius: 15,
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
          <InputIcon
            label="ios-contact-outline"
            placeholder="Email"
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
            size={40}
          />
          <InputIcon
            secureTextEntry
            label="ios-lock-outline"
            placeholder="Password"
            size={44}
            marL={1}
            pad1L={2}
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
      </ImageBackground>
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
    opacity:0.6,
    backgroundColor:'#FE3562',
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
