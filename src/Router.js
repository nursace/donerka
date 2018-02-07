import React, {Component} from 'react';
import {Router, Scene} from 'react-native-router-flux';
import {
  View,
  Image,
  Text,
  Easing,
  ActivityIndicator,
  Platform,
  Animated,
  TouchableWithoutFeedback,
  AsyncStorage
} from 'react-native'
import {Icon} from 'react-native-elements'

import GrayScreen from './GrayScreen';
import BlueScreen from './BlueScreen';
import MaizeScreen from './MaizeScreen';
import GoldScreen from './GoldScreen';
import BlackScreen from './BlackScreen';
import ModalScreen from './ModalScreen';
import LanguageForm from './components/LanguageForm'
import LoginForm from './components/LoginForm'
import Register from './components/Register'
import ProfileView from './components/ProfileView'
import firebase from 'firebase'
import FirstMain from './components/FirstMain'
import SecondMain from './components/SecondMain'
import ThirdMain from './components/ThirdMain'
import EditProfile from './components/EditProfile'

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
  );
}

 render(){
    const size = this.props.size
    return(
<View onPressIn={this.onPressedIn} onPressOut={this.onPressedOut}>
<View style={{paddingBottom:8,justifyContent:'center',alignItems:'center',height:2*size,width:2*size}}>
{this.renderRippleView()}
<View >
  <Icon type='ionicon' name={this.props.name} color={this.props.focused?'#F65352': '#9C9495'} style={{backgroundColor:'transparent',paddingLeft:this.getPaddingLeft()}} size={size} />
  <Text style={{fontSize : 10,fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null,backgroundColor:'transparent',color:this.props.focused?'#F65352': '#9C9495',alignSelf:'center'}}>{this.props.text}</Text>
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


  render() {
    if(this.state.loading) { //splash screen or something here
      return null
    } 
    return (
      <Router>
        <Scene key="root" hideNavBar>
          <Scene key='editProfile' component={EditProfile} />
          <Scene key='register' component={Register}/>
          <Scene key='profileView' component={ProfileView}/>
          <Scene key='lang' component={LanguageForm}/>
          <Scene key='login' initial={this.state.user === '0'} component={LoginForm}/>
          <Scene
            key="tabbar"
            tabs={true}
            initial={this.state.user === '1'}
            showLabel={false}
            tabBarStyle={{backgroundColor: '#fff'}}
            tabBarPosition='bottom'
          >
            <Scene key="osu" hideNavBar text="Albums" name='md-list-box' size={30} icon={TabIconDonor}>

              <Scene
                key="firstMain"
                component={FirstMain}

              />
            </Scene>
    <Router>
      <Scene key="root" hideNavBar>


        <Scene key='register' component={Register} />
        <Scene key='profileView' component={ProfileView} />
        <Scene key='lang' component={LanguageForm} />

        <Scene key='login' initial={this.state.user==='0'}  component={LoginForm} />

        <Scene
          key="tabbar"
          tabs={true}
          initial = {this.state.user==='1'}
          showLabel={false}
          tabBarStyle={{ backgroundColor: '#fff' }}
          tabBarPosition='bottom'
          swipeEnabled
        >

          <Scene key="osu" hideNavBar text="Albums" name='md-list-box' size={30} icon={TabIconDonor}>

          <Scene
          key="firstMain"
          component={FirstMain}

        />
          </Scene>

          <Scene key="um" hideNavBar text="Main" name='md-beaker' size={30} icon={TabIconDonor} initial>
            <Scene
              key="secondMain"
              component={SecondMain}
            
            />
          </Scene>

          <Scene key="vu" hideNavBar text="Settings" name='ios-cog' size={30} icon={TabIconDonor}>
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