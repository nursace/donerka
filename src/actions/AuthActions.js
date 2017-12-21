import firebase from 'firebase'
import { Actions } from 'react-native-router-flux'
import { EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  REGISTER_USER_FAIL,
  ROLE_CHANGED,
  DATASOURCE_CHANGED
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
export const registerUser = ({email,password}) => {
    return dispatch => {
        dispatch({ type: LOGIN_USER})
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => { 
            firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => loginUserSuccess(dispatch,user))
            .catch(() => {
                loginUserFail(dispatch)
            })
        })
        .catch(()=>{
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
    
    Actions.fillingDoner()

}

export const roleChanged = role => {
    let s=''
    for(let i;i<firebase.auth().currentUser.email.length;i++){
        if(firebase.auth().currentUser.email.charAt(i)==='@')break
        s+=firebase.auth().currentUser.email.charAt(i)
    }
    firebase.database().ref(`/users/${s}`).update({role : role})
  
    return {
        type: ROLE_CHANGED,
        payload: role,
    }
}

export const dataSourceChanged = data => {
    let dataSource = new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })

      dataSource = dataSource.cloneWithRows(data)
      
    return {
        type: DATASOURCE_CHANGED,
        payload: dataSource,
    }
}

