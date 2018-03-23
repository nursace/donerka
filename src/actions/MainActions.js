import firebase from 'firebase'
import {
    USER_FETCH,
    USER_FETCH_SUCCESS,
    USER_FILLING,
    USER_FILLING_FORM,
    SUBMIT_BLOOD,
    SUBMIT_BLOOD_SUCCESS
} from './types'
import { Actions } from 'react-native-router-flux'
import RNFetchBlob from 'react-native-fetch-blob'
import {AsyncStorage,Alert} from 'react-native'


export const userDataFetching = ()=>{
    return (dispatch) =>{
        if(firebase.auth().currentUser){
        dispatch({type : USER_FETCH})
        let s = '';
        let email = firebase.auth().currentUser.email;
        for (let i = 0; i < email.length; i++) {
          if (email.charAt(i) === '@') break;
          if(email.charAt(i)===`'`)
          s+='='
          else if(email.charAt(i)==='.')
          s+='+'
          else
        s += email.charAt(i)
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
          if(email.charAt(i)===`'`)
          s+='='
          else if(email.charAt(i)==='.')
          s+='+'
          else
        s += email.charAt(i)  
      }
        firebase.database().ref(`/users/${s}`).update({blood,role,factor})
        .then(()=>{
            dispatch({type : USER_FILLING_FORM , blood,role,factor,filled:true})
        })
    }
    }
}


export const sumbitBlood = ({s,d,imagePath}) => {
    return (dispatch) => {
        const Blob = RNFetchBlob.polyfill.Blob
        const fs = RNFetchBlob.fs
        window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
        window.Blob = Blob
        let uploadBlob = null

        const imageRef = firebase.storage().ref(`users/${d}/sentBlood/${s}`).child("blood.jpg")

        let mime = 'image/jpg'
        fs.readFile(imagePath, 'base64')

        .then((data) => {
            //console.log(data);
            return Blob.build(data, { type: `${mime};BASE64` })
        })
        .then((blob) => {
            uploadBlob = blob
            return imageRef.put(blob, { contentType: mime })
          })
          .then(() => {
            uploadBlob.close()
            return imageRef.getDownloadURL()
          })
          .then((url) => {

            let userData = {}
            //userData[dpNo] = url
            //firebase.database().ref('users').child(uid).update({ ...userData})

          })

          .then(()=>{
                firebase.storage().ref(`users/${d}/sentBlood/${s}/blood.jpg`).getDownloadURL()
                .then((url)=>{
                    firebase.database().ref(`users/${d}/sentBlood`).child(`${s}`).update({
                        image : url,
                    })
                })
        })
            .catch((error) => {
                console.log(error)
              })
       
                  
            const imageRef1 = firebase.storage().ref(`users/${s}/obtainedBlood/${d}`).child("blood.jpg")
      
              let mime1 = 'image/jpg'
              fs.readFile(imagePath, 'base64')
      
              .then((data) => {
                  //console.log(data);
                  return Blob.build(data, { type: `${mime1};BASE64` })
              })
              .then((blob) => {
                  uploadBlob = blob
                  return imageRef1.put(blob, { contentType: mime1 })
                })
                .then(() => {
                  uploadBlob.close()
                  return imageRef1.getDownloadURL()
                })
                .then((url) => {
      
                  let userData = {}
                  //userData[dpNo] = url
                  //firebase.database().ref('users').child(uid).update({ ...userData})
      
                })
      
                .then(()=>{
                      firebase.storage().ref(`users/${s}/obtainedBlood/${d}/blood.jpg`).getDownloadURL()
                      .then((url)=>{
                          firebase.database().ref(`users/${d}/obtainedBlood`).child(`${s}`).update({
                              image : url,
                          })
                      })
              })
                  .catch((error) => {
                      console.log(error)
                    })
             

            }

}
