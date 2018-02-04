import firebase from 'firebase'
import { Actions } from 'react-native-router-flux'
import { EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  REGISTER_USER_FAIL,
  ROLE_CHANGED,
  LOGOUT_USER,
  ERROR_SHOWED,
  MESSAGE,
  NOTVERIFIED
} from './types'
import {AsyncStorage,Alert} from 'react-native'
/*import { Permissions, Notifications } from 'expo';
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
  */
export const emailChanged = text => {
    return {
        type: EMAIL_CHANGED,
        payload: text,
    }
}

export const passwordChanged = text => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    }
}

export const loginUser = ({ email, password }) => {
    return dispatch => {
        dispatch({ type: LOGIN_USER})
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => {
                AsyncStorage.getItem("LoggedInWithEmail").then(LoggedInWithEmail => {
                    if(LoggedInWithEmail === email){        
                    }
                    else{
                        AsyncStorage.setItem('LoggedInWithEmail', email);
                    }
                }
            ).then(()=>{    
                if(firebase.auth().currentUser.emailVerified)
                 loginUserSuccess(dispatch, user)
                 else{
                        firebase.auth().signOut().then(()=>{
                            Alert.alert(
                                'Verify your account',
                                'Please confirm your email address',
                                [
                                  {text: 'Ok'},
                                ]
                              )
                              dispatch({type: NOTVERIFIED})
                            })
                 }
            })
        
            })
                .catch(() => {
                     loginUserFail(dispatch)
            })
    }
}
export const registerUser = ({email,password,firstName,phone,lastName,patronymic}) => {
    return dispatch => {
        dispatch({ type: LOGIN_USER})
    firebase.auth().createUserWithEmailAndPassword(email.toLowerCase(), password)
        .then((user) => {
            let s = ''
            let email1 = email
            
            for(let i = 0; i < email1.length; i++) {
              if (email1.charAt(i) === '@') break;
              if(email1.charAt(i)===`'`)
                s+='='
                else if(email1.charAt(i)==='.')
                s+='+'
                else
              s += email1.charAt(i)
            }
            let str1 = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase()
            let str2 = lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase()
            let str3 = patronymic.charAt(0).toUpperCase() + patronymic.slice(1).toLowerCase()

            firebase.database().ref(`/users/`).child(s.toLowerCase()).set({
                firstName: str1,
                lastName: str2,
                patronymic: str3,
                phone: phone,   
                email : email.toLowerCase(),
                rescue_count : 0,
            
              }).then(()=>{
                AsyncStorage.getItem("LoggedInWithEmail").then(LoggedInWithEmail => {
                    if(LoggedInWithEmail === email){        
                    }
                    else{
                        AsyncStorage.setItem('LoggedInWithEmail', email);
                    }
                    firebase.auth().currentUser.sendEmailVerification().then(()=>{
                        dispatch({ type: MESSAGE })                        
                    }).catch(()=>{
                        console.log('do something if email sending has been failed')
                    })
                }
            )
        })
    })
        .catch((error)=>{
            console.log(error)
            Alert.alert(
                'Try Again!',
                'Wrong inputs',
                [
                  {text: 'Ok'},
                ]
              )
            registerUserFail(dispatch)
        })
    }
}
const loginUserFail = (dispatch) => {
    dispatch({ type: LOGIN_USER_FAIL })
}
const registerUserFail = (dispatch) => {
    dispatch({ type: REGISTER_USER_FAIL })
}
const loginUserSuccess = (dispatch, user) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    })
    Actions.secondMain()
    
}
export const errorShowed = () =>{
    return {
        type: ERROR_SHOWED
    }}

export const roleChanged = role => {
    let s = ''
    let email1 = firebase.auth().currentUser.email
    
    for(let i = 0; i < email1.length; i++) {
      if (email1.charAt(i) === '@') break;
      s += email1.charAt(i)
    }
    firebase.database().ref(`/users/${s}`).update({currentRole : role})
  
    return {
        type: ROLE_CHANGED,
        payload: role,
    }
}


export const logoutUser = () => {
    return dispatch => {
        
        firebase
        .auth()
        .signOut()
        .then(()=>{            
            dispatch({type: LOGOUT_USER})
            Actions.login({loading  :false})            
        })
    }}