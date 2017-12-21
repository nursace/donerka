import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { emailChanged, passwordChanged, registerUser } from '../actions'
import { Input, Spinner } from './common'
import firebase from 'firebase'
import { Actions } from 'react-native-router-flux'
import {Icon} from 'react-native-elements'

class RegistrationForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fullname: 'ijoji',
      phone: '38274438',
      username: 'fdfeunfe',
      loading: false
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
    const {email,password, role } = this.props
    let s = ''
    let email1 = email
    
    for(let i = 0; i < email1.length; i++) {
      if (email1.charAt(i) === '@') break;
      s += email1.charAt(i)
    }
   firebase.database().ref(`/users/`).child(s).set({
      fullname: fullname,
      phone: phone,
      username: username,
      role: role,
      email : email
    }).then(() => {
  this.setState({loading:false})
      this.props.registerUser({ email, password, role})
    }).then(() => {
      Actions.fillingDoner()
   })
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
  render() {

    return(
      <View style={styles.mainView}>
      <View style= {{flexDirection : 'row',marginLeft: 20,marginTop:10}}>
      <TouchableOpacity onPress= {()=>{Actions.pop({key: 'login'})}} style={{height:20,width:20}} >
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