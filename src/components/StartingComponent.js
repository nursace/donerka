import React, { Component } from 'react'
import { View, ActivityIndicator,AsyncStorage } from 'react-native'
import LanguageForm from './LanguageForm'
import LoginForm from './LoginForm'
import FillingDoner from './FillingDoner'
import CandidatesRec from './CandidatesRec'
import firebase from 'firebase'
class StartingComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
          user : '',
          firstLaunch: null
    
      }
    }
      componentDidMount(){
     /*   AsyncStorage.getItem("alreadyLaunched").then(value => {
            if(value == null){
                 AsyncStorage.setItem('alreadyLaunched', true);
                 this.setState({firstLaunch: true});
            }
            else{
                 this.setState({firstLaunch: false});
            }})
*/
      firebase.auth().onAuthStateChanged((user)=> {
        if (user) {
          this.setState({user : '1'})
        }
        else {
          this.setState({user : '0'})
        }
      })  
    
      }

      rendersmth(){
          if(this.state.user === '0'){
return(

       <LanguageForm />     
       )   }
          else if(this.state.user === '1'){
              return (
                  <FillingDoner />
              ) 
          }
          else
          return (
            <View style={styles.SpinnerStyle}>
            <ActivityIndicator size='large' />
        </View>
          )
      }
    render(){
        return(
        <View style = {{flex : 1}}>
        {this.rendersmth()}
            
        </View>
        )
    }
}

const styles = {
    SpinnerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
}

export default StartingComponent;
