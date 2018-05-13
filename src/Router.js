import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import {StatusBar,View, Image,Text,Easing, ActivityIndicator,Platform,Animated,TouchableWithoutFeedback, AsyncStorage} from 'react-native'
import {Icon} from 'react-native-elements'
import MapComponent from './components/MapComponent'
import EditProfile from './components/EditProfile'
import LanguageForm from './components/LanguageForm'
import LoginForm from './components/LoginForm'
import PrivatePolicy from './components/PrivatePolicy'
import Register4 from './components/Register4'
import ForgotPass from './components/ForgotPass'
import ProfileView from './components/ProfileView'
import firebase from 'firebase'
import FirstMain from './components/FirstMain'
import SecondMain from './components/SecondMain'
import ThirdMain from './components/ThirdMain'
import ModalScreen from './ModalScreen'
import History from './components/History';
import Ads from './components/Ads';


class TabIconDonor extends Component {
  constructor(props){
    super(props)
    const maxOpacity=0.12
    this.state = {
        maxOpacity,
        scaleValue: new Animated.Value(0.01),
        opacityValue: new Animated.Value(maxOpacity),
    }
    this.renderRippleView = this.renderRippleView.bind(this);
    this.onPressedIn = this.onPressedIn.bind(this);
    this.onPressedOut = this.onPressedOut.bind(this);
}
onPressedIn() {
  Animated.timing(this.state.scaleValue, {
      toValue: 1,
      duration: 50,
      easing: Easing.bezier(0.0, 0.0, 0.2, 1),
  }).start();
}
onPressedOut() {
  Animated.timing(this.state.opacityValue, {
      toValue: 0,
      duration:1,
  }).start(() => {
      this.state.scaleValue.setValue(0.01);
      this.state.opacityValue.setValue(this.state.maxOpacity);
  });
}
getPaddingLeft(){
  if(this.props.name==='md-list-box')
  return 7
  else if(this.props.name === 'md-beaker')
  return -1
  else
  return 5
}
getWidth(){
  if(this.props.name === 'ios-cog')
{
  return 55
}}
renderRippleView() {
  const { scaleValue, opacityValue } = this.state;

  return (
      <Animated.View
          style={{
              position: 'absolute',
              top: -10,
              left:-5,
              width: this.props.size*2+10,
              height: this.props.size*2+10,
              borderRadius: this.props.size*2,
              transform: [{ scale: scaleValue }],
              opacity: opacityValue,
              backgroundColor: '#F65352',
          }}
      />
  )
}

 render(){
    const size = this.props.size
    return(
<View onPressIn={this.onPressedIn} onPressOut={this.onPressedOut}>
<View style={{paddingBottom:8,marginTop : 10,justifyContent:'center',alignItems:'center',height:2*size,width:2*size}}>
{this.renderRippleView()}
<View >
  <Icon type='ionicon' name={this.props.name} color={this.props.focused?'#F65352': '#9C9495'} style={{backgroundColor:'transparent',paddingLeft:this.getPaddingLeft()}} size={size} />
  <Text style={{fontSize : 10,width : this.getWidth(),fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null,backgroundColor:'transparent',color:this.props.focused?'#F65352': '#9C9495',alignSelf:'center'}}>{this.props.text}</Text>
  </View>
  </View>
   </View>
  )
}
}

const TabIcon = ({ selected, title }) => {
  return (
    <Text style={{color: selected ? 'red' :'black'}}>{title}</Text>
  );
}
class RouterComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '0',
      firstLaunch: null,
      loading : true
    }
    let that = this
    AsyncStorage.getItem("alreadyLaunched").then(alreadyLaunched => {
        if (alreadyLaunched === 'true') {
          that.setState({firstLaunch: false});
        }
        else {
          AsyncStorage.setItem('alreadyLaunched', 'true');
          that.setState({firstLaunch: true});
        }
      }
    ).then(()=>{
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            that.setState({user: '1',loading : false})
        }
        else {
          that.setState({user: '0',loading : false})
        }
      })})
  }

  componentDidMount(){
    StatusBar.setHidden(true);

  }

  render() {
    if(this.state.loading) {
      return null  //splash screen or something
    }
    return (
    <Router>
      <Scene key="root" hideNavBar>

      <Scene key='editProfile' component={EditProfile} />


      <Scene key='ads' component={Ads} hideNavBar={false} title='Реклама' />

      <Scene key='history' component={History} hideNavBar={false} title='История' />

        <Scene key='login' initial={this.state.user==='0'} component={LoginForm} />
        <Scene key='register' component={Register4} />
        <Scene key='profileView' component={ProfileView} />
        <Scene key='lang' component={LanguageForm} />
        <Scene key='forgotPass' component= {ForgotPass} />
        <Scene key='privatePolicy' component={PrivatePolicy} />
        <Scene
          key="tabbar"
          tabs={true}
          swipeEnabled={false}
          initial={this.state.user === '1'}
          showLabel={false}
          tabBarStyle={{ backgroundColor: '#fff' }}
          tabBarPosition='bottom'
        >

          <Scene key="osu" hideNavBar text="Топ" name='md-list-box' size={25} icon={TabIconDonor}>

          <Scene
          key="firstMain"
          component={FirstMain}

        />
          </Scene>

          <Scene key="um" hideNavBar text="Главная" name='md-beaker' size={25} icon={TabIconDonor}>
            <Scene
              key="secondMain"
              component={SecondMain}

            />
          </Scene>

          <Scene key="vu" hideNavBar text="Настройки" name='ios-cog' size={25} icon={TabIconDonor}>
          <Scene
          key="thirdMain"
          component={ThirdMain}

        />
          </Scene>
        </Scene>

        <Scene
          key="modal"
          component={ModalScreen}
          title="Modal"
        />
      </Scene>
    </Router>
    )
  }
}

export default RouterComponent
