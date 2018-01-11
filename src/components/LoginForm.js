import React, { Component } from 'react'
import { Text,Image, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { emailChanged, passwordChanged, loginUser } from '../actions'
import { Input, Spinner } from './common'
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
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
    this.setState({loading:false})
  }

  renderButton() {  
    if (this.props.loading || this.state.loading) {
      return <Spinner size="large" />;
    }
    return (
      <TouchableOpacity
        style={{
          width: 170,
          borderRadius: 15,
          borderWidth: 0.6,
          borderColor: '#fff',
          backgroundColor: '#BF4747',
          height: 50,
          marginTop: 24,
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onPress={this.onButtonPress.bind(this)}
      >
        <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>
          Войти
        </Text>
      </TouchableOpacity>
    );
  }
  render() {
    return (
      <View style={styles.mainView}>
        <View style={{ marginTop: 100 }}>
          <Image
            source={require('../../assets/logo.png')}
            style={{ alignSelf: 'center', height: 110, width: 285 }}
            resizeMode="stretch"
          />
        </View>
        <View
          style={{
            marginTop: 60,
            flex: 1,
            alignItems: 'center'
          }}
        >
          <Input
            label="Email"
            placeholder="Email"
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
          
          />
          <Input
            secureTextEntry
            label="Password"
            placeholder="password"
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
          />
          <Text style={styles.errorTextStyle}>{this.props.error}</Text>
          <View style={{ marginTop: 10 }}>{this.renderButton()}</View>

          <TouchableOpacity
            style={{
              width: 200,
              height: 40,
              borderRadius: 19,
              borderWidth: 0.6,
              borderColor: '#fff',
              backgroundColor: '#fff',
              height: 50,
              marginTop: 0,
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onPress={Actions.register}
          >
            <Text style={{ color: 'red', fontSize: 15, fontWeight: 'bold' }}>
              Зарегистрироваться
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    color: 'red',
    alignSelf: 'center'
  },
  mainView: {
    marginTop: 20,
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
