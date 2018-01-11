import React, { Component } from 'react'
import { View,Image, ActivityIndicator,AsyncStorage } from 'react-native'
import LanguageForm from './LanguageForm'
import LoginForm from './LoginForm'
import FillingDoner from './FillingDoner'
import CandidatesRec from './CandidatesRec'
import firebase from 'firebase'
import FirstMain from './FirstMain'
import SecondMain from './SecondMain'
import ThirdMain from './ThirdMain'
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
                  <SecondMain />
              ) 
          }
          else
          return (
            <View style ={styles.SpinnerStyle}>
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
        backgroundColor:'#fff',
justifyContent:'center',
alignItems: 'center'
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
