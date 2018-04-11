
import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Platform,
  Text,
  View,
  ListView
} from 'react-native';
import firebase from 'firebase'
import { userDataFetching,} from '../actions'
import {connect} from 'react-redux'
import {logoutUser} from '../actions'
import {Actions} from 'react-native-router-flux';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import RNFetchBlob from 'react-native-fetch-blob'
import ImagePicker from 'react-native-image-crop-picker'
async function fetchData(userDataFetching){
  await userDataFetching()
   
 }
const window = Dimensions.get('window');
const PARALLAX_HEADER_HEIGHT = 380;
const STICKY_HEADER_HEIGHT = Dimensions.get('window').height/10.4;
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
user : {}
}
}
componentDidMount(){

if(firebase.auth().currentUser){
  
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
      that.setState({user})
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
        } 
        const Blob = RNFetchBlob.polyfill.Blob
        const fs = RNFetchBlob.fs
        window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
        window.Blob = Blob
        let uploadBlob = null
        const imageRef = firebase.storage().ref(`users/${d}/avatar/`).child("avatar.jpg")
        
        let mime = 'image/jpg'
        fs.readFile(image.path, 'base64')
        .then((data) => {
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
            firebase.database().ref(`users/`).child(`${d}`).update({
              avatarUrl : url,  
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
  renderForeground() {

    return(
      <View key="parallax-header" style={ {flex:1} }>
      <View style={{width:Dimensions.get('window').width,height:65,backgroundColor:'#F65352',justifyContent:'center',alignItems:'center'}}>
      <Text style={{fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null,fontSize: 25,color: '#fff'}}>Settings</Text>

        </View>

      <View style={{width:Dimensions.get('window').width,height:20,backgroundColor:'#fff'}}>

        </View>
      <View style={{flex : 2,flexDirection:'row',}}>
        
        <View style={{flex : 1,alignItems:'center'}}>
        <Text style={{marginTop:Dimensions.get('window').height/14,fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null,marginLeft: Dimensions.get('window').width/15,fontSize: 40,color: '#E39291'}}>{this.props.blood}{this.props.factor}</Text>

        </View>
        <TouchableOpacity onPress={()=>{
                        this._changeAvatar()
                        
        }} style={{flex : 1,alignItems:'center',justifyContent:'center'}}>
        <Image style={ styles.avatar } source={{
          uri:  'https://i.ytimg.com/vi/P-NZei5ANaQ/maxresdefault.jpg',
          width: AVATAR_SIZE,
          height: AVATAR_SIZE
        }}/>
        </TouchableOpacity>
          <View style={{flex : 1,flexDirection:'row'}}>
         
          <View style={{flex : 1}}>
          </View>
          <View style={{flex : 1,backgroundColor:'#F65352'}}>
          
          
          </View>
          <View style={{flex : 1}}>
          </View>
          <View style={{flex : 1,backgroundColor:'#F65352'}}>
          
          
          </View>
          
          
          <View style={{flex : 1}}>
          </View>
          </View>
          
          </View>


 
        <View style={{flex : 2,alignItems:'center',justifyContent:'center'}}>
        <View style={{flex:1,marginBottom:30,alignItems:'center',justifyContent:'center'}}>
       
        <Text style={{fontSize :16,fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null,   color: '#686868',
    fontWeight: 'bold',}}>
        {this.state.firstName} {this.state.lastName}
        </Text>
        <Text style={{marginTop:5,fontSize :14,fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null,color: '#686868'}}>
        {this.state.email}
        </Text>

        <Text style={{marginTop:5,fontSize :15,fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null,color: '#686868'}}>
        {this.state.phoneNumber}
        </Text>
        </View>
        <View style={{flex : 1}}>
        <TouchableOpacity onPress={()=>{
          Actions.editProfile({hui:this.state.user})
        }}
         style={{height : 40,width: 150,borderColor:'#686868',borderRadius: 150/2,borderWidth: 1,alignItems: 'center',justifyContent: 'center'}}>
          <Text style={{fontSize: 17,fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null,color: '#686868',}}>
Изменить Профиль
 </Text>
          </TouchableOpacity>
        </View>

        </View>

        </View>
    );
  }

  renderBackground() {
    return(
      <View key="background" style={ styles.background }>

        <View style={ styles.backgroundOverlay }/>
      </View>
    );
  }

  renderSongsList() {
       return(
null
    );
  }

  render() {
    const { onScroll = () => {} } = this.props;
    return (
      <View style={{flex : 1}}>
        <ParallaxScrollView
          style={ { flex: 1,backgroundColor:'blue' } }
          parallaxHeaderHeight={ PARALLAX_HEADER_HEIGHT }
          stickyHeaderHeight={ STICKY_HEADER_HEIGHT }
          onScroll={onScroll}
          renderForeground={ this.renderForeground.bind(this) }
          renderBackground={ this.renderBackground.bind(this) }>
          <View style={{flex : 1}}>
<View style={{backgroundColor:'#EAEAEA',height:30,width:Dimensions.get('window').width}}>
</View>
<View style={{flex:1}}>
<View style={{borderBottomWidth:1,borderColor:'#686868'}}>
         <Text style={{margin:10,marginLeft:18,fontSize :19,fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null,color: '#686868'}}>
           Язык
           </Text>
</View>
<View style={{borderBottomWidth:1,borderColor:'#686868'}}>
         <Text style={{margin:10,marginLeft:18,fontSize :19,fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null,color: '#686868'}}>
           Черный список
           </Text>
</View>
<View style={{borderBottomWidth:1,borderColor:'#686868'}}>
         <Text style={{margin:10,marginLeft:18,fontSize :19,fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null,color: '#686868'}}>
           Политика конфиденциальности
           </Text>
</View>
<View style={{borderBottomWidth:1,borderColor:'#686868'}}>
         <Text style={{margin:10,marginLeft:18,fontSize :19,fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null,color: '#686868'}}>
           О нас
           </Text>
</View>

</View>
<View style={{backgroundColor:'#EAEAEA',height:30,width:Dimensions.get('window').width}}>
</View>
<View style={{flex:1}}>
<TouchableOpacity   onPress={() => { 
                this.props.logoutUser()  // add modal window
                
              }} style={{borderBottomWidth:1,borderColor:'#686868'}}>
         <Text style={{margin:10,marginLeft:18,fontSize :19,fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null,color: 'red'}}>
Выйти           </Text>
</TouchableOpacity>

</View>

<View style={{backgroundColor:'#EAEAEA',height:Dimensions.get('window').height,width:Dimensions.get('window').width}}>
</View>
          </View>
        </ParallaxScrollView>
        
      </View>
    );
  }
}

const styles = {
  background: {
    backgroundColor: "#fff",
  },
  backgroundOverlay: {
    top: 0,
    width: window.width,
    backgroundColor: '#fff',
    height: PARALLAX_HEADER_HEIGHT
  },
  headerClose: {
    top: 5,
    left: 0,
    paddingTop: 15,
    paddingBottom: 5,
    paddingLeft: 20,
    paddingRight: 20,
  },
  stickySection: {
    height: STICKY_HEADER_HEIGHT,
    backgroundColor: '#000',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stickySectionTitle: {
    color: "#FFF",
  },
  parallaxHeader: {
flex : 1,
  },

  avatar: {
    marginBottom: 12,
    borderRadius: AVATAR_SIZE / 2
  },
  playButton: {
    marginTop: 15,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 70,
    paddingRight: 70,
    backgroundColor: "#f62976",
    borderRadius: 200,
  },
  playButtonText: {
    color: "#FFF",
    fontFamily: "Helvetica Neue",
    fontSize: 13,
  },
  songsList: {
    flex: 1,
    backgroundColor: "red",
  },
  song: {
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#111",

  },
  songTitle: {
    color: "#000",
    fontFamily: "Helvetica Neue",
    marginBottom: 5,
  },
  albumTitle: {
    color: "#000",
    fontFamily: "Helvetica Neue",
    fontSize: 12
  },

}
const mapStateToProps = ({ main }) => {
  const { filled,role,blood,factor,loading } = main
  return {filled,role,blood,factor,loading}
}
export default connect(mapStateToProps, {
  logoutUser,userDataFetching
})(thirdMain)