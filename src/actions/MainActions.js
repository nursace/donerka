import firebase from 'firebase'
import {
    USER_FETCH,
    USER_FETCH_SUCCESS
} from './types'
import { Actions } from 'react-native-router-flux'

export const userDataFetching = ()=>{
    return (dispatch) =>{
        dispatch({type : USER_FETCH})
        let s = '';
        let email = firebase.auth().currentUser.email;
        for (let i = 0; i < email.length; i++) {
          if (email.charAt(i) === '@') break;
          s += email.charAt(i);
        }
        firebase.database().ref(`/users/${s}`).once('value',function(snapshot){
            if(snapshot.hasChild('blood')&&snapshot.hasChild('currentRole')){
                dispatch({type:USER_FETCH_SUCCESS,currentRole : snapshot.val().currentRole,blood: snapshot.val().blood,factor : snapshot.val().factor,filled: true})
            }
            else 
        dispatch({type:USER_FETCH_SUCCESS})
        })
    }
}
