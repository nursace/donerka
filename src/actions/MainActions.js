import firebase from 'firebase'
import {
    USER_FETCH,
    USER_FETCH_SUCCESS,
    USER_FILLING,
    USER_FILLING_FORM
} from './types'
import { Actions } from 'react-native-router-flux'

export const userDataFetching = ()=>{
    return (dispatch) =>{

        if(firebase.auth().currentUser){
        dispatch({type : USER_FETCH})
        let s = '';
        let email = firebase.auth().currentUser.email;
        for (let i = 0; i < email.length; i++) {
          if (email.charAt(i) === '@') break;
          s += email.charAt(i);
        }
        firebase.database().ref(`/users/${s}`).once('value',function(snapshot){
            if(snapshot.hasChild('blood')&&snapshot.hasChild('role')){
                dispatch({type:USER_FETCH_SUCCESS,role : snapshot.val().role,blood: snapshot.val().blood,factor : snapshot.val().factor,filled: true})
            }
            else 
        dispatch({type:USER_FETCH_SUCCESS})
        })
    }
    }
}
export const userDataUpdate = ({blood,role,factor})=>{
    return (dispatch) =>{
        if(firebase.auth().currentUser){
        dispatch({type : USER_FILLING})
        let s = '';
        let email = firebase.auth().currentUser.email;
        for (let i = 0; i < email.length; i++) {
          if (email.charAt(i) === '@') break;
          s += email.charAt(i);
        }
        firebase.database().ref(`/users/${s}`).update({blood,role,factor})
        .then(()=>{
            dispatch({type : USER_FILLING_FORM , blood,role,factor,filled:true})
        })
    }
    }
}