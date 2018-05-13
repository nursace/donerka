import React, { Component } from 'react'
import { ScrollView,Text,Alert, View,Button,KeyboardAvoidingView,Image,Platform,ImageBackgrounds,Dimensions,Animated,Easing, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import ImagePicker from 'react-native-image-crop-picker'
import { emailChanged, passwordChanged, registerUser } from '../actions'
import { Input, Spinner,InputLogin1 } from './common'
import firebase from 'firebase'
import { Actions } from 'react-native-router-flux'
import {Icon} from 'react-native-elements'
class Register4 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName : '',
      patronymic : '',
      phone: '',
      email : '',
      password : '',
      confirmPassword : '',
      loading: false,
      current_step: 'null',
      opacityValue: new Animated.Value(1),
      
    }
  }   
  onConfirmPasswordChange(confirmPassword){
    this.setState({confirmPassword})
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
    const {confirmPassword,firstName,phone,lastName,patronymic } = this.state
    const {email,password } = this.props

if(firstName===''||lastName===''||phone===''||patronymic===''||email===''||password==='')
{
  Alert.alert(
  'Ошибка ввода',
  'Пожалуйста заполните все поля',
  [
    {text: 'Ok'},
  ]
)
this.setState({current_step: 'null',loading : false})
}
else if(confirmPassword!==password){
  Alert.alert(
    'Пароли не совпадают',
    'Пожалуйста заполните подтверждение пароля еще раз',
    [
      {text: 'Ok'},
    ]
  )
  this.setState({loading:false})
  
}  
else{
   
  this.props.registerUser({email, password,firstName,phone,lastName,patronymic})
  this.setState({loading:false})
  
}
    
    
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
  renderInputs(){
    if(this.state.current_step==='null'){
     return( <View style={{}}>     
      <InputLogin1
      label='Имя'
      placeholder='Данияр'
      onChangeText={this.onFirstNameChange.bind(this)}
      value={this.state.firstName}
      />
      <InputLogin1
        label='Фамилия'
        placeholder='Султанов'
        onChangeText={this.onLastNameChange.bind(this)}
        value={this.state.lastName}
        /> 
             
     <InputLogin1
     label='Отчество'
     placeholder='Султанович'
     onChangeText={this.onPatronymicChange.bind(this)}
     value={this.state.patronymic}
     />
      <TouchableOpacity style={{
      alignSelf:'center',
      alignItems:'center',
      justifyContent: 'center',
      marginTop: 10
    }}
    onPress={()=>{this.setState({current_step : '1'})}}>
      <Text style={{color: '#fff', marginTop: 10,fontSize:20, fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null}}>
        Дальше
      </Text>
    </TouchableOpacity>

      </View>
      )
    }
  
     else if(this.state.current_step==='1'){
      return( <View style={{}}>     
          <InputLogin1
          label='Телефон'
          placeholder='0778 000 000'
          onChangeText={this.onPhoneChange.bind(this)}
          value={this.state.phone}
          /> 
       <TouchableOpacity style={{
       alignSelf:'center',
       alignItems:'center',
       justifyContent: 'center',
       marginTop: 10
     }}
     onPress={()=>{this.setState({current_step : '2'})}}>
       <Text style={{color: '#fff', fontSize:20, fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null}}>
         Дальше
       </Text>
     </TouchableOpacity>
 
       </View>
       )
     }
    else
    return(
      <View>
   
      <InputLogin1
      label='Email'
      placeholder='example@gmail.com'
      onChangeText={this.onEmailChange.bind(this)}
      value={this.props.email}
      />
      <InputLogin1
      secureTextEntry
      label='Пароль'
      placeholder='Введите пароль'
      onChangeText={this.onPasswordChange.bind(this)}
      value={this.props.password}
      />      
      <InputLogin1
      secureTextEntry
      label='Подтвердите пароль'
      placeholder='Подтвердите пароль'
      onChangeText={this.onConfirmPasswordChange.bind(this)}
      value={this.state.confirmPassword}
      />
      <View style={{marginTop:50,alignSelf:'center'}}>{this.renderButton()}</View>
     </View>
    )
  }
  render() {
    return(
        <ScrollView style={{flex:1,backgroundColor: '#F65352'}}>
    {!this.props.sent ?
 <Animated.View style={{flex:1,opacity: this.state.opacityValue,}}>
        <View style={styles.mainView}>
        <KeyboardAvoidingView behavior='position'>
        <Text style={{fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null,fontSize: 25 ,alignSelf:'center',paddingTop:Dimensions.get('window').height/4.0,   color :'#fff'}}>Зарегистрироваться</Text>
        <View
          style={{
           
            marginTop: 40
          }}
        >
  
         {this.state.current_step==='5' ? <View style={{alignSelf:'center'}}>{this.renderButton()}</View> : this.renderInputs()}
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
})(Register4)