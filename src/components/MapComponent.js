
import React, { Component } from 'react'
import { Text,Image,ImageBackground,KeyboardAvoidingView,Platform,Animated,Easing,Alert, View,Dimensions,AsyncStorage, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { emailChanged,positionChanged, passwordChanged, loginUser,errorShowed } from '../actions'
import { InputLogin, Spinner } from './common'
import firebase from 'firebase'
import MapView from 'react-native-maps';

import { Actions } from 'react-native-router-flux'

class MapComponent extends Component {
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
   
        navigator.geolocation.getCurrentPosition((position) => {
          this.props.positionChanged(position);
        });
    
    
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
if(this.props.error==='Authentication Failed'){
  Alert.alert(
    'Попробуйте еще раз!',
    'Неправильно введен email или пароль',
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
      <View style={{flex:1,justifyContent : 'center',alignItems:'center',backgroundColor : '#f5fcff'}}>
     <MapView
      style={{top : 0,bottom : 0,left : 0,right : 0,position :'absolute'}}
     initialRegion={{
       latitude: 37.78825,
       longitude: -122.4324,
       latitudeDelta: 0.0922,
       longitudeDelta: 0.0421,
     }}
   />
      </View>
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
  }
};

const mapStateToProps = ({ map }) => {
  const { position } = map;
  return { position };
};

export default connect(mapStateToProps, {
  emailChanged,
  passwordChanged,
  loginUser,
  errorShowed
})(MapComponent);

