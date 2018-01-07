import React, { Component } from 'react'
import { Scene, Router, Actions } from 'react-native-router-flux'
import LanguageForm from './components/LanguageForm'
import LoginForm from './components/LoginForm'
import RegistrationForm from './components/RegistrationForm'
import ChoosingRoleForm from './components/ChoosingRoleForm'
import UrgentSearch from './components/UrgentSearch'
import FillingDoner from './components/FillingDoner'
import CandidatesRec from './components/CandidatesRec'
import firebase from 'firebase'
import SpinnerSupport from './components/SpinnerSupport'
class RouterComponent extends Component {
  constructor(props){
    super(props)
    this.state = {
      user : false

  }
}
  componentDidMount(){
  /*firebase.auth().onAuthStateChanged((user)=> {
    if (user) {
      this.setState({user : true})
    Actions.fillingDoner()
    }
    else {
      this.setState({user : false})
      Actions.lang()
    }
  })  
*/
  }
  render() {    
    console.log(this.state.user)
    console.log(firebase.auth().currentUser)
    return (
      <Router>
        <Scene key='root' hideNavBar={true}>
        <Scene key='login'  component={LoginForm} />
        <Scene key='register' component={RegistrationForm} />
        <Scene key='choosingRoleForm' component={ChoosingRoleForm} />
        <Scene key='urgentSearch'  component= {UrgentSearch} />
        <Scene key='lang' component={LanguageForm} />
        <Scene key='fillingDoner' component= {FillingDoner} />
        <Scene key='candidatesRec'   component= {CandidatesRec} />
        <Scene key='spin' initial component = {SpinnerSupport} /> 
      
        
        </Scene>
      </Router>
    )
  }
}

export default RouterComponent
