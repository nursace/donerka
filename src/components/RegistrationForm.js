import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { emailChanged, passwordChanged, registerUser } from '../actions'
import { Input, Spinner } from './common'
import firebase from 'firebase'
import { Actions } from 'react-native-router-flux'

class RegistrationForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fullname: '',
      phone: '',
      username: '',
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
  renderButton() {
    if (this.props.loading) {
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
    onPress={() => this.submitToFirebase()}>
      <Text style={{color: '#fff', fontSize:20, fontWeight:'bold'}}>
        Отправить
      </Text>
    </TouchableOpacity>
    )
  }
  submitToFirebase() {
    let s = ''
    let email = this.props.email
    for(let i = 0; i < email.length; i++) {
      if (email.charAt(i) === '@') break;
      s += email.charAt(i)
    }
   firebase.database().ref(`/users/`).child(s).set({
      fullname: this.state.fullname,
      phone: this.state.phone,
      username: this.state.username,
      role: this.props.role,
    }).then(() => {
      this.props.registerUser({ email: this.state.email, password: this.state.password})
    }).then(() => {
      if (this.props.role === 'donator')
        Actions.fillingDoner()
     // else
   })
  }
  render() {

    return(
      <View style={styles.mainView}>
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
          placeholder='password'
          onChangeText={this.onPasswordChange.bind(this)}
          value={this.props.password}
        />
        <Text style={styles.errorTextStyle}>
          {this.props.error}
        </Text>
        {this.renderButton()}
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
    marginTop: 20,
    backgroundColor: '#3B3836',
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