import firebase from 'firebase'
import { Actions } from 'react-native-router-flux'
import { EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  REGISTER_USER_FAIL,
  ROLE_CHANGED,
  LOGOUT_USER  
} from './types'

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
            .then(user => loginUserSuccess(dispatch, user))
            .catch(() => {
                     loginUserFail(dispatch)
            })
    }
}
export const registerUser = ({email,password,fullname,phone,username}) => {
    return dispatch => {
        dispatch({ type: LOGIN_USER})
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            let s = ''
            let email1 = email
            
            for(let i = 0; i < email1.length; i++) {
              if (email1.charAt(i) === '@') break;
              s += email1.charAt(i)
            }
             firebase.database().ref(`/users/`).child(s).set({
                fullname: fullname,
                phone: phone,
                username: username,
                currentRole: '',
                email : email,
                rescue_count : 0
              }).then(()=>{
                  Actions.choosingRoleForm()
              })
        })
        .catch((error)=>{
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
    Actions.replace('secondMain')
    
}

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
            dispatch({ type: LOGOUT_USER})
        })
    }}