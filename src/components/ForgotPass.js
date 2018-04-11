import React, { Component } from 'react'
import { ScrollView,Text,Alert, View,Button,KeyboardAvoidingView,Image,Platform,ImageBackgrounds,Dimensions,Animated,Easing, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import ImagePicker from 'react-native-image-crop-picker'
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
      opacityValue: new Animated.Value(1),
      timeLineTop: null,
    }
  }   
  onEmailChange(email) {
    this.setState({email})
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

if(firstName===''||lastName===''||phone===''||patronymic===''||email===''||password==='')
Alert.alert(
  'Ошибка ввода',
  'Пожалуйста заполните все поля',
  [
    {text: 'Ok'},
  ]
)
else  
    this.props.registerUser({email, password,firstName,phone,lastName,patronymic})

this.setState({loading:false})
    
    
  }
  renderButton() {
    if (this.props.loading||this.state.loading) {
      return <Spinner style={{alignSelf:'center',color:"#fff" }} size='large' />
    }
    return (
    <TouchableOpacity style={{
      alignSelf:'center',
      alignItems:'center',
      justifyContent: 'center',
      marginTop: 10
    }}
    onPress={() => {
      if(firebase.auth().currentUser.emailVerified){
        Alert.alert(
          'Подтвердите ваш аккаунт',
          'Подтвердите ваш почтовый адрес',
          [
            {text: 'Ok'},
          ]
        )
      }
      else firebase.auth().sendPasswordResetEmail(firebase.auth().currentUser.email).then(()=>{
        Alert.alert(
          'Поменяйте пароль',
          'Проверьте ваш почтовый адрес',
          [
            {text: 'Ok'},
          ]
        )
      }).then(()=>{
        Actions.login()
      })
    }}>
      <Text style={{color: '#fff', fontSize:20, fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null}}>
        Отправить
      </Text>
    </TouchableOpacity>
    )
  }
  renderPost(){
    firebase.auth().signOut().then(()=>{
    Actions.pop()
  }).catch(()=>{
    console.log('sign out failed')
  })
  }
  render() {
    return(
     
 <Animated.View style={{flex:1,opacity: this.state.opacityValue,}}>
       <KeyboardAvoidingView behavior='padding'> 
        <View style={styles.mainView}>
        <InputLogin
        style={{marginRight: 15,marginTop : 300}}
        label='Email'
          placeholder='Email адрес'
          onChangeText={this.onEmailChange.bind(this)}
          value={this.state.email}
        />
        {this.renderButton()}
      </View>
      </KeyboardAvoidingView>
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
    backgroundColor:'#F65352',
  },
  defaultImage: {
    borderWidth: 0.2,
    borderRadius: 150/2,
    width: 100,
    height: 100,
    resizeMode : 'stretch',
    alignSelf:'center'
  },
}

const mapStateToProps = ({ auth }) => {
    const { email, password, error, loading,sent } = auth
    return {email, password, error, loading,sent }
}

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, registerUser,
})(Register)