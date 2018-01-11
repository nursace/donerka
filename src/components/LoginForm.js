import React, { Component } from 'react'
import { Text,Image, View,Dimensions, TouchableOpacity } from 'react-native'
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
      loading: false
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
      return <View style={{paddingTop:40}}><Spinner size="large" /></View>;
    }
    return (
      <TouchableOpacity
        style={{
          width: 170,
          alignSelf:'center',
          marginRight:20,
          borderRadius: 15,
          borderWidth: 0.6,
          borderColor: 'red',
          backgroundColor: '#fff',
          height: 40,
          marginTop: 24,
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onPress={this.onButtonPress.bind(this)}
      >
        <Text style={{ color: '#ca1414', fontSize: 20, fontWeight: 'bold' }}>
          Login
        </Text>
      </TouchableOpacity>
    );
  }
  render() {
    return (
      <View style={styles.mainView}>
        <View
          style={{
            marginLeft:Dimensions.get('window').width*0.1,
            marginTop: Dimensions.get('window').height/5,
            flex: 12,
          }}
        >
        <Text style={{fontSize:60,color:'#ca1414'}}>Login</Text>
          <View style={{marginTop:65,}}>
          <InputIcon
            label="ios-contact-outline"
            placeholder="Email"
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
            size={33}
          />
          <InputIcon
            secureTextEntry
            label="ios-lock-outline"
            placeholder="Password"
            size={37}
            marL={3}
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
          />
          </View>
          <Text style={styles.errorTextStyle}>{this.props.error}</Text>
          <View style={{ marginTop: 10 }}>{this.renderButton()}</View>

        </View>
        <View style={{justifyContent:'center',flexDirection:'row',alignItems:'center',flex:1}}> 
            
            <Text style={{color:'#ca1414'}}>Don't have an account? </Text>
            <TouchableOpacity style={{width : 60,height:20}} onPress={()=>{if(!firebase.auth().currentUser)Actions.replace('register')}}>
            <Text style={{   color:'#ca1414', textDecorationLine: "underline",}}>Sign Up</Text></TouchableOpacity>
      
        </View>
      </View>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    color: '#ca1414',
    alignSelf: 'center'
  },
  mainView: {
    backgroundColor: '#fff',
    flex: 1
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
