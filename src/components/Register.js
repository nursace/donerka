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
    onPress={this.submitToFirebase.bind(this)}>
      <Text style={{color: '#fff', fontSize:20, fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null}}>
        Создать аккаунт
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
        <ScrollView style={{flex:1,backgroundColor: '#F65352'}}>
    {!this.props.sent ?
 <Animated.View style={{flex:1,opacity: this.state.opacityValue,}}>
        <View style={styles.mainView}>
        <KeyboardAvoidingView behavior='position'>
        <Text style={{fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null,fontSize: 27 ,alignSelf:'center',marginTop:20,   color :'#fff'}}>Зарегистрироваться</Text>

        <View
          style={{
            marginTop: 40
          }}
        >
        <View>       
        <InputLogin
          label='Имя'
          placeholder='Салидат'
          onChangeText={this.onFirstNameChange.bind(this)}
          value={this.state.firstName}
          />
          <InputLogin
          label='Фамилия'
          placeholder='Замирбекова'
          onChangeText={this.onLastNameChange.bind(this)}
          value={this.state.lastName}
          />  
          <InputLogin
          label='Отчество'
          placeholder='Замирбековна'
          onChangeText={this.onPatronymicChange.bind(this)}
          value={this.state.patronymic}
          />
          <InputLogin
          label='Номер телефона'
          placeholder='+(996) 778 000 000'
          onChangeText={this.onPhoneChange.bind(this)}
          value={this.state.phone}
          />
          <InputLogin
          label='Email'
          placeholder='example@gmail.com'
          onChangeText={this.onEmailChange.bind(this)}
          value={this.props.email}
          />
          <InputLogin
          secureTextEntry
          label='Пароль'
          placeholder='Введите пароль'
          onChangeText={this.onPasswordChange.bind(this)}
          value={this.props.password}
          />
          </View>
          <View style={{alignSelf:'center'}}>{this.renderButton()}</View>
        </View>
        </KeyboardAvoidingView>
        <View style={{marginTop:60,justifyContent:'center',alignItems:'center',backgroundColor:'transparent',flex:1}}> 
<View style={{flex:1}}>
      </View>      
      <View style={{flex:2,flexDirection:'row',justifyContent:'center',alignItems:'center',}}>
        </View>
         <View style={{flex : 1,marginBottom:40,flexDirection:'row',justifyContent:'center',alignItems:'center',}}>
            <Text style={{color:'#d0d0d0',fontSize:13, fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null}}>Уже есть аккаунт? </Text>
            <TouchableOpacity style={{width : 60,height:20}} onPress={()=>{
                
                  Actions.pop()
            }}     
              >
            <Text style={{   color:'#fff',fontSize:15, fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null,textDecorationLine: "underline",}}>Войти</Text></TouchableOpacity>
      </View>
        </View>
        </View>

      </Animated.View>
      : 
      this.renderPost()
      }
      </ScrollView>
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