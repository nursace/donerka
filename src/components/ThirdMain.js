
import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Platform,
  Text,
  View,
  ListView,
  ScrollView
} from 'react-native';
import Image from 'react-native-image-progress'
import firebase from 'firebase'
import { userDataFetching,} from '../actions'
import {connect} from 'react-redux'
import {Spinner} from './common'
import {logoutUser} from '../actions'
import {Actions} from 'react-native-router-flux';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import RNFetchBlob from 'react-native-fetch-blob'
import ImagePicker from 'react-native-image-crop-picker'
import {Icon, Button, ListItem} from 'react-native-elements'

async function fetchData(userDataFetching){
  await userDataFetching()

 }
const window = Dimensions.get('window');
const AVATAR_SIZE = 120;

class thirdMain extends Component {
constructor(props){
  super(props)
  this.state = {
    loading : false,
    lastName: '',
    firstName : '',
    phoneNumber: '',
    email : '',
    user : {},
    avatar : null
  }
}

componentDidMount() {
  if(firebase.auth().currentUser) {
    let d = ''
    email1 = firebase.auth().currentUser.email
    for(let i = 0; i < email1.length; i++) {
      if (email1.charAt(i) === '@') break;
      if(email1.charAt(i)===`'`)
      d+='='
      else if(email1.charAt(i)==='.')
      d+='+'
      else
    d += email1.charAt(i)
    }
    var that = this
    firebase.database().ref(`users/${d}`).once('value', snapshot=>{
      const item = snapshot.val()
      that.setState({lastName:item.lastName,firstName: item.firstName,email : item.email,phoneNumber:item.phone})
    })
    fetchData(this.props.userDataFetching).then(()=>{

      firebase.database().ref(`users/${d}`).once('value', snapshot => {
        let user = snapshot.val()
        that.setState({user,avatar : user.avatar})
      })
    })
  }
}

_changeAvatar(){
  this.setState({loading: true})
  var that=this  
  ImagePicker.openPicker({
     width: 300,
     height: 300,
     cropping: true,
     mediaType: 'photo'
   }).then(image => {
  
      let d = ''
      email1 = firebase.auth().currentUser.email
      for(let i = 0; i < email1.length; i++) {
        if (email1.charAt(i) === '@') break;
        if(email1.charAt(i)===`'`)
        d+='='
        else if(email1.charAt(i)==='.')
        d+='+'
        else
      d += email1.charAt(i)
      } const Blob = RNFetchBlob.polyfill.Blob
      const fs = RNFetchBlob.fs
      window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
      window.Blob = Blob
      let uploadBlob = null
      const imageRef = firebase.storage().ref(`users/${d}/avatar/`).child("blood.jpg")

      let mime = 'image/jpg'
      fs.readFile(image.path, 'base64')
      .then((data) => {
          //console.log(data);
          return Blob.build(data, { type: `${mime};BASE64` })
      })
      .then((blob) => {
          uploadBlob = blob
          console.log('3',blob,'3')
          return imageRef.put(blob, { contentType: mime })
        })
        .then(() => {
            uploadBlob.close()
            return imageRef.getDownloadURL()
          })
        .then((url) => {
            firebase.database().ref(`users/`).child(`${d}`).update({
              avatar : url,
          })
            let userData = {}
            //userData[dpNo] = url
            //firebase.database().ref('users').child(uid).update({ ...userData})

          })
        .then(()=>{
            that.setState({loading : false})
          })
              .catch((error) => {
                  console.log(error)
                })




      })

}

  render() {
    return (
      <ScrollView
        style={{flex: 1, backgroundColor: '#fff'}}
      >
        <View style={{flex: 1}}>
          <View style={styles.headerView}>
            <Text style={styles.headerText}>Settings</Text>
          </View>

          <View style={{flexDirection:'row', justifyContent: 'space-between', paddingTop: 10}}>
            <View style={styles.bloodTypeView}>
              <Text style={styles.bloodTypeText}>
                {this.props.blood}{this.props.factor}
              </Text>
            </View>
            <View style={styles.avatarView}>
            {this.state.avatar ? 
            <Image 
            source={{ uri: this.state.avatar }} 
            indicator={Spinner} 
            imageStyle={styles.avatar}
            style={{
              width: 120, 
              height: 120, 
            }}/> : 
            <Icon type='ionicon' color='#E39291' style={{backgroundColor:'transparent',}} size={100} name='ios-camera-outline' />}
            </View>
            <View style={styles.givenBloodCountView}>
              <Text style={styles.givenBloodCountText}></Text>
            </View>
          </View>

          <View style={styles.infoAndChangeArea}>
            <View style={styles.infoArea}>
              <Text style={styles.nameText}>
                {this.state.firstName} {this.state.lastName}
              </Text>
              <Text style={styles.emailText}>
                {this.state.email}
              </Text>

              <Text style={styles.phoneNumberText}>
                {this.state.phoneNumber}
              </Text>
            </View>

            <TouchableOpacity
              onPress={()=>{Actions.editProfile({hui:this.state.user})}}
              style={styles.changeProfileButton}
            >
              <Text style={styles.changeProfileButtonText}>
                Изменить профиль
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{flex: 1, marginTop: 10}}>
          <View style={{flex:1}}>
            <TouchableOpacity onPress={() => Actions.history()} style={styles.firstSettingsView}>
              <Text style={styles.settingsText}>
                История передач
              </Text>
            </TouchableOpacity>
            <View style={styles.settingsView}>
              <Text style={styles.settingsText}>
                Язык
              </Text>
            </View>
            <TouchableOpacity onPress={() => Actions.ads()} style={styles.firstSettingsView}>
            <Text style={styles.settingsText}>
Реклама
            </Text>
          </TouchableOpacity>
            <TouchableOpacity onPress={()=>{Actions.privatePolicy()}} style={styles.settingsView}>
              <Text style={styles.settingsText}>
                Политика конфиденциальности
              </Text>
            </TouchableOpacity>
            <View style={styles.settingsView}>
              <Text  style={styles.settingsText}>
                О нас
              </Text>
            </View>
          </View>

          <View style={{flex:1}}>
            <TouchableOpacity   onPress={() => {
              this.props.logoutUser()  // add modal window
            }} style={styles.exitView}>
              <Text style={styles.exitText}>
                Выйти
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    );
  }
}

const styles = {
  headerView: {
    width:Dimensions.get('window').width,
    height:65,
    backgroundColor:'#F65352',
    justifyContent:'center',
    alignItems:'center'
  },
  headerText: {
    fontFamily: Platform.OS ==='ios'? 'AvenirNext-DemiBold':null,
    fontSize: 25,
    color: '#fff'
  },
  background: {
    backgroundColor: "#fff",
  },
  backgroundOverlay: {
    backgroundColor: '#fff',
  },
  avatar: {
    marginBottom: 0,
    borderRadius: AVATAR_SIZE / 2
  },
  settingsText: {
    fontSize :19,
    fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null,
    color: '#686868',
  },
  settingsView: {
    borderBottomWidth:0.7,
    borderColor:'#686868',
    paddingVertical: 10,
    marginHorizontal: 10,
  },
  firstSettingsView: {
    borderTopWidth: 0.7,
    borderBottomWidth: 0.7,
    borderColor:'#686868',
    paddingVertical: 10,
    marginHorizontal: 10,
  },
  exitView: {
    borderBottomWidth:0.7,
    marginHorizontal: 10,
    paddingVertical: 10,
    borderColor:'#686868'
  },
  exitText: {
    fontSize :19,
    fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null,
    color: '#F65352',
  },
  changeProfileButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F65352'
  },
  changeProfileButtonText: {
    fontSize: 17,
    fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null,
    color: '#fff'
  },
  nameText: {
    fontSize:18,
    fontFamily: Platform.OS ==='ios'? 'AvenirNext-DemiBold':null,
    color: '#686868',
    fontWeight: 'bold',
  },
  emailText: {
    fontSize:18,
    fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null,
    color: '#686868',
    marginVertical: 3
  },
  phoneNumberText: {
    fontSize:18,
    fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null,
    color: '#686868'
  },
  infoAndChangeArea: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
    marginTop: 10,
    paddingVertical: 10
  },
  infoArea: {
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  givenBloodCountView: {
    flex: 1,
    alignItems:'center',
    justifyContent: 'center'
  },
  givenBloodCountText: {
    fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null,
    fontSize: 40,
    color: '#e5c100'
  },
  bloodTypeView: {
    alignItems:'center',
    justifyContent: 'center',
    flex: 1
  },
  bloodTypeText: {
    fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null,
    fontSize: 40,
    color: '#E39291'
  },
  avatarView: {
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
}

console.disableYellowBox = true;

const mapStateToProps = ({ main }) => {
  const { filled,role,blood,factor,loading } = main
  return {filled,role,blood,factor,loading}
}
export default connect(mapStateToProps, {
  logoutUser,userDataFetching
})(thirdMain)
