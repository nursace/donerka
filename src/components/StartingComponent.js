import React, {Component} from 'react'
import {View, Image, ActivityIndicator, AsyncStorage} from 'react-native'
import LanguageForm from './LanguageForm'
import LoginForm from './LoginForm'
import FirstMain from './FirstMain'
import SecondMain from './SecondMain'
import ThirdMain from './ThirdMain'
import { Permissions, Notifications } from 'expo';
import firebase from 'firebase'
async function registerToken(user){
  let {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS)
  
  if(status!== 'granted')
  return
  
  let token=await Notifications.getExpoPushTokenAsync()
  
  let s = ''
  let email1 = firebase.auth().currentUser.email
  for(let i = 0; i < email1.length; i++) {
    if (email1.charAt(i) === '@') break;
    s += email1.charAt(i)
  }
 await firebase.database().ref(`/users/${s}`).update({token})
  
}

class StartingComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      firstLaunch: null

    }
  }

  componentDidMount() {
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
    )

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        registerToken(user).then(()=>{     
          that.setState({user: '1'})
      })        
      }
      else {
        that.setState({user: '0'})
      }
    })

  }

  rendersmth() {
    if (this.state.user === '0') {
      if (this.state.firstLaunch)
        return (
          <LoginForm />
        )
      else
        return (<LoginForm />)
    }
    else if (this.state.user === '1') {
      return (
        <SecondMain />
      )
    }
    else
      return (
        <View style={styles.SpinnerStyle}>
          <ActivityIndicator size='large'/>
        </View>
      )
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {this.rendersmth()}

      </View>
    )
  }
}

const styles = {
  SpinnerStyle: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  spinner: {

    flex: 3,
  }
}

export default StartingComponent;
