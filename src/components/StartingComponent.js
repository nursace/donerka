import React, { Component } from 'react'
import { View,Image, ActivityIndicator,AsyncStorage } from 'react-native'
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
   AsyncStorage.getItem("alreadyLaunched").then(alreadyLaunched => {
            if(alreadyLaunched === 'true'){                                
                this.setState({firstLaunch: false});
            }
            else{
                AsyncStorage.setItem('alreadyLaunched', 'true');                
                 this.setState({firstLaunch: true});
            }
        }
    )

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
            if(this.state.firstLaunch)
            return(
       <LanguageForm />     
       ) 
       else 
       return (<LoginForm />)
      }
          else if(this.state.user === '1'){
              return (
                  <FillingDoner />
              ) 
          }
          else
          return (
            <View style ={styles.SpinnerStyle}>
            <View style ={styles.logo}>
            <Image
              source={require('../../assets/logo.png')}
              style={{ alignSelf: 'center', height: 110, width: 285 }}
              resizeMode="stretch"
            />
         </View>
         <View style = {styles.spinner}>
            <ActivityIndicator size='large' />
        </View>
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
        flexDirection : 'column',
        backgroundColor:'#fff'
    },
    logo : {
flex:2,      
justifyContent: 'center',
alignItems: 'center'
    },
    spinner : {

flex:3,
    }
}

export default StartingComponent;
