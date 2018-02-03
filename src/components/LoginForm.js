import React, { Component } from 'react'
import { Text,Image,ImageBackground,Platform,Animated,Easing,Alert, View,Dimensions,AsyncStorage, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { emailChanged, passwordChanged, loginUser,errorShowed } from '../actions'
import { InputLogin, Spinner } from './common'
import firebase from 'firebase'
import { Actions } from 'react-native-router-flux'

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
      disabled : false
    };
  }
  onEmailChange(text) {
    this.setState({email:text})
    this.props.emailChanged(text);

  if(this.props.email===''||this.props.password===''|| text ===''){
    this.setState({disabled:true})
  }
  else this.setState({disabled: false})
  }
  onPasswordChange(text) {
    this.setState({password:text})
    this.props.passwordChanged(text);

    if(this.props.email===''||this.props.password===''||text===''){
      this.setState({disabled:true})
    }
    else this.setState({disabled: false})

  }
  onButtonPress() {
    const { email, password,error } = this.props;
    this.props.loginUser({ email, password });
    this.setState({loading:false})
  }
componentWillMount(){
  //async storage fetch email
  AsyncStorage.getItem("LoggedInWithEmail").then(LoggedInWithEmail => {    
  this.setState({email:LoggedInWithEmail})
  this.props.emailChanged(LoggedInWithEmail);
  })
}
componentDidMount(){
let that = this
  if(that.props.email===''||that.props.password===''){
    that.setState({disabled:true})
  }
  else that.setState({disabled: false})
}
getBackColor(){
  if(this.state.disabled)
  return '#E39291'
  else
  return '#fff'
}

  renderButton() {  
    if (this.props.loading || this.state.loading) {
      return <View style={{marginTop:30,height:40}}><Spinner size="large" /></View>;
    }
    return (
      <TouchableOpacity
        style={{
          width: Dimensions.get('window').width*0.75,
          borderRadius: 30,
          borderWidth: 0.6,
          borderColor: '#FE3562',
          backgroundColor: this.getBackColor(),
          height: Dimensions.get('window').height/13,
          marginTop: 20,
          alignItems: 'center',
          justifyContent: 'center'
        }}
        disabled={this.state.disabled}
        onPress={this.onButtonPress.bind(this)}
      >
        <Text style={{fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null,fontSize: 20 , color :'#F65352'}}>Log In</Text>
      </TouchableOpacity>
    );
  }
  render() {
if(this.props.error){
  Alert.alert(
    'Try Again!',
    'Wrong email or password',
    [
      {text: 'Ok'},
    ]
  )
  this.props.errorShowed()
  if(this.props.email===''||this.props.password===''){
    this.setState({disabled:true})
  }
  else this.setState({disabled: false})
} 
   return (
      <Animated.View style={{flex:1,opacity: this.state.opacityValue,}}>
        <View style={styles.mainView} />
        <Image source={require('../../assets/logo.png')} style={{marginTop: Dimensions.get('window').height*0.2,alignSelf:'center',width: Dimensions.get('window').width*0.8,height: Dimensions.get('window').height/9}}></Image>
        <View
          style={{
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
        <View style={{marginTop:60,justifyContent:'center',alignItems:'center',backgroundColor:'transparent',flex:1}}> 
<View style={{flex:1}}>
        <Text style={{color:'#fff',fontSize:13,fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null}}>Forget password? </Text>
      </View>      
      <View style={{flex:2,flexDirection:'row',justifyContent:'center',alignItems:'center',}}>
      <View style={{height:1,marginRight:10,width:90,borderBottomWidth:1,borderColor:'#d0d0d0'}} />
      <Text style={{color:'#d0d0d0',fontSize:13,fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null}}>or</Text>
      <View style={{height:1,marginLeft:10,width:90,borderBottomWidth:1,borderColor:'#d0d0d0'}} />
        </View>
         <View style={{flex : 1,marginBottom:40,flexDirection:'row',justifyContent:'center',alignItems:'center',}}>
            <Text style={{color:'#d0d0d0',fontSize:13,fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null}}>Don't have an account? </Text>
            
            <TouchableOpacity style={{width : 60,height:20}} onPress={()=>{
                Animated.timing(this.state.opacityValue, {
                  toValue: 0,
                  duration:300, 
                  easing: Easing.bezier(0.0, 0.0, 0.2, 1),
                  
              }).start(() => {
                  Actions.register()
                });
              }}>
            <Text style={{   color:'#fff',fontSize:15, fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null,textDecorationLine: "underline",}}>Sign Up</Text></TouchableOpacity>
      </View>
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
  errorShowed
})(LoginForm);
