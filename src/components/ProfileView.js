import React, { Component } from 'react'
import { Text, Alert,View, Image,Platform,TouchableOpacity,Easing,Animated,Dimensions,Modal } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { userDataFetching,} from '../actions'
import firebase from 'firebase'
import {connect} from 'react-redux'
import {Spinner} from './common'
import {Icon} from 'react-native-elements'
import ImagePicker from 'react-native-image-crop-picker'
//DESCRIPTION'S NEEDED HERE
import RNFetchBlob from 'react-native-fetch-blob'

async function fetchData(userDataFetching){
  await userDataFetching()
   
 }
 async function openImagePickerAsync(openImagePicker){
  await openImagePicker()
   
 }
class ProfileView extends Component {
  constructor(props){
    super(props)
    this.state={
      image : null,
      loading : true,
      modalVisible:false,
      opacityValue: new Animated.Value(1),
      submitted : false,
      logo :require('../../assets/logo.png'),
      sentBlood : false,
      beenHelped: 0,
      allowed : false,
      days: null
      
    }
  
   fetchData(this.props.userDataFetching).then(()=>{
    
    let s = ''
    let email1 = this.props.item.email
    for(let i = 0; i < email1.length; i++) {
        if (email1.charAt(i) === '@') break;
        if(email1.charAt(i)===`'`)
        s+='='
        else if(email1.charAt(i)==='.')
        s+='+'
        else
      s += email1.charAt(i)
      
    }
    var that = this
    let d = ''
    let email2 = firebase.auth().currentUser.email
    for(let i = 0; i < email2.length; i++) {
      if (email2.charAt(i) === '@') break;
      if(email2.charAt(i)===`'`)
      d+='='
      else if(email2.charAt(i)==='.')
      d+='+'
      else
    d += email2.charAt(i)
    } 

  
    if(this.props.role === 'donor')
  {
    firebase.database().ref(`/users/${d}/sentBlood`).on('value',function(snapshot){
      if(snapshot.hasChild(`${s}`))
    firebase.database().ref(`/users/${d}/sentBlood/`).child(`${s}`).once('value', snapshot => {
      that.setState({image : snapshot.val().image,sentBlood : true})

    })
    })
    firebase.database().ref(`users/${d}`).once('value',snapshot =>{
      let a = new Date(snapshot.val().lastSubmitionDate)
      a=new Date().getTime() - a.getTime()
      a=a/(1000*60*60*24)
      that.setState({days :Math.floor(a)})
      if(Math.floor(a)>60){
        that.setState({allowed : true})
      }
    })
    firebase.database().ref(`/users/${s}/confirmedApplications`).once('value',snapshot =>{
      if(snapshot.hasChild(`${d}`))
      that.setState({submitted : true})
    })
  }
  else if(this.props.role === 'recipient')
   {    
    firebase.database().ref(`/users/${s}/sentBlood`).on('value',function(snapshot){
      if(snapshot.hasChild(`${d}`))
    firebase.database().ref(`/users/${s}/sentBlood/`).child(`${d}`).once('value', snapshot => {
      that.setState({image : snapshot.val().image, sentBlood : true})
    })
  })
      firebase.database().ref(`/users/${d}/confirmedApplications`).once('value',snapshot =>{
        if(snapshot.hasChild(`${s}`))
        that.setState({submitted : true})
  })


    }
    firebase.database().ref(`users/${s}/confirmedApplications`).once('value',snapshot =>{
      
      snapshot.forEach(childSnap =>{
        that.setState({beenHelped : ++that.state.beenHelped})
          })
        })
      if(this.props.role==='recipient'&&this.props.item.role ==='donor'){
      let y=s
      s=d
      d=y
    }
    

  })
    
  .then(()=>{
    this.setState({loading:false})
    
  })
  }
  //IF RECIPIENT GOT SENT BLOOD
  apply(){
    this.setState({loading : true})
    let s = ''
    let email1 = this.props.item.email
    for(let i = 0; i < email1.length; i++) {
        if (email1.charAt(i) === '@') break;
        if(email1.charAt(i)===`'`)
        s+='='
        else if(email1.charAt(i)==='.')
        s+='+'
        else
      s += email1.charAt(i)
      
    }
    var that = this
    let d = ''
    let email2 = firebase.auth().currentUser.email
    for(let i = 0; i < email2.length; i++) {
      if (email2.charAt(i) === '@') break;
      if(email2.charAt(i)===`'`)
      d+='='
      else if(email2.charAt(i)==='.')
      d+='+'
      else
    d += email2.charAt(i)
    } 
    firebase.database().ref(`users/${s}`).update({lastSubmitionDate : firebase.database.ServerValue.TIMESTAMP})
    firebase.database().ref(`users/${d}`).update({visible : false})
    firebase.database().ref(`users/${d}/submittedBlood`).child(`${s}`).update({applied : true})
    .then(()=>{
      firebase.database().ref(`users/${d}/submittedBlood`).child(`${s}`).once('value',snapshot =>{
        firebase.database().ref(`users/${d}/confirmedApplications`).child(`${s}`).update({date : firebase.database.ServerValue.TIMESTAMP,email:snapshot.val().email})
      })
    }).then(()=>{
      that.setState({submitted : true,loading : false})
    })
  }
  cancel(){
    this.setState({loading : true})
    let s = ''
    let email1 = this.props.item.email
    for(let i = 0; i < email1.length; i++) {
        if (email1.charAt(i) === '@') break;
        if(email1.charAt(i)===`'`)
        s+='='
        else if(email1.charAt(i)==='.')
        s+='+'
        else
      s += email1.charAt(i)
      
    }
    var that = this
    let d = ''
    let email2 = firebase.auth().currentUser.email
    for(let i = 0; i < email2.length; i++) {
      if (email2.charAt(i) === '@') break;
      if(email2.charAt(i)===`'`)
      d+='='
      else if(email2.charAt(i)==='.')
      d+='+'
      else
    d += email2.charAt(i)
    }

    firebase.storage().refFromURL(`gs://donerka-5dc8f.appspot.com/users/${d}/obtainedBlood/${s}`).child(`blood.jpg`).delete()
    .then(()=>{
      firebase.storage().refFromURL(`gs://donerka-5dc8f.appspot.com/users/${s}/sentBlood/${d}`).child(`blood.jpg`).delete()
  })
  .then(()=>{
    firebase.database().ref(`/users/${s}/sentBlood`).child(`${d}`).remove()
    
  })
  .then(()=>{
    firebase.database().ref(`/users/${d}/submittedBlood`).child(`${s}`).remove()})
  .then(()=>{
    firebase.database().ref(`/users/${d}/obtainedBlood`).remove()
})
  .then(()=>{
    that.setState({loading: false,image : null,sentBlood:null})
  })
  }
  openImagePicker(){
    var that = this   
    ImagePicker.openPicker({
       width: 300,
       height: 300,
       cropping: true,
       mediaType: 'photo'
     }).then(image => {
       that.setState({image})
     })
     .catch((error) => {
       console.log(error)
     })
   }
  _handlePress(){
    //IF DONOR
    this.setState({loading: true})
    var that=this  
    ImagePicker.openPicker({
       width: 300,
       height: 300,
       cropping: true,
       mediaType: 'photo'
     }).then(image => {
             let s = ''
      let email1 = this.props.item.email
      for(let i = 0; i < email1.length; i++) {
        if (email1.charAt(i) === '@') break;
        if(email1.charAt(i)===`'`)
        s+='='
        else if(email1.charAt(i)==='.')
        s+='+'
        else
      s += email1.charAt(i)
      }
  
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

        const imageRef = firebase.storage().ref(`users/${d}/sentBlood/${s}`).child("blood.jpg")

        let mime = 'image/jpg'
        fs.readFile(image.path, 'base64')
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
            firebase.database().ref(`users/${d}/sentBlood`).child(`${s}`).update({
              image : url,  
              email : s,
              date : firebase.database.ServerValue.TIMESTAMP    
          })
            let userData = {}
            //userData[dpNo] = url
            //firebase.database().ref('users').child(uid).update({ ...userData})
            
          })
        .then(()=>{
          const imageRef1 = firebase.storage().ref(`users/${s}/obtainedBlood/${d}`).child("blood.jpg")
          let mime1 = 'image/jpg'
          fs.readFile(image.path, 'base64')
  
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
                      firebase.database().ref(`users/${s}/obtainedBlood`).child(`${d}`).update({
                          image : url,
                      })
                  })
          })
          .then(()=>{

            firebase.database().ref(`/users/${d}`).once('value',function(snapshot){
              const {rescue_count,email,blood,factor,lastName,firstName,patronymic,phone} = snapshot.val()
              
              firebase.database().ref(`/users/${s}/submittedBlood/${d}`).update({email,date :firebase.database.ServerValue.TIMESTAMP,applied : false,role:'donor',blood,factor,lastName,firstName,patronymic,phone})
              .then(()=>{
              firebase.database().ref(`/users/`).child(`${s}`).once('value',snapshot=>{
                firebase.database().ref(`/users/`).child(`${s}`).update({lastRequestTime: snapshot.val().requestTime||null,requestTime : null})
                  
              })
              that.setState({modalVisible: false,loading : false})
              
              })
          })
              .catch((error) => {
                  console.log(error)
                })
        


})
        })
          .then(()=>{
          that.setState({loading : false})
        })
          

      })
      /*
  this.fetchSnap.then((f)=>{
      .then(()=>{
        firebase.database().ref(`/users/${s}/submittedBlood/${d}`).update({email,blood,factor,lastName,firstName,patronymic,phone})
        .then(()=>{

          that.setState({modalVisible: false})
          
        })
      })
    })*/
    
  }
  renderButton(){
      if(this.props.role === 'donor' && this.props.item.role==='recipient'){
      return(
      this.state.sentBlood&&this.state.submitted==true ? 
      this.state.allowed===false ?
      <View style={{flex : 1,alignItems: 'center'}}>
      {this.state.image!==null ? <Image source={{uri : this.state.image}} style={{width: Dimensions.get('window').width*0.3,height: Dimensions.get('window').height/5,resizeMode:'stretch'}} /> : null}
            <Text style={{fontSize: 17,fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null,color: '#F65352'}}>
                  Вы сдавали кровь {this.state.days} дней(ь) назад
            </Text>
      </View>     :null
      :
      this.state.sentBlood ?
      <View style={{flex : 1,alignItems:'center'}}>
{this.state.image ? <Image source={{uri : this.state.image}} style={{marginTop:20,width: Dimensions.get('window').width*0.4,height: Dimensions.get('window').height/5,resizeMode:'stretch'}} /> : null} 
     <Text style={{fontSize: 17,fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null,color: '#F65352'}}>
                  Реципиент должен подтвердить ваше изображение 
                  </Text>
       </View>
      : 
      <View style={{flex : 1,alignItems: 'center',justifyContent: 'center'}}>
        <TouchableOpacity onPress ={()=>{
          Animated.timing(this.state.opacityValue, {
            toValue: 0.5,
            duration:300, 
            easing: Easing.bezier(0.0, 0.0, 0.2, 1),
            
        }).start(() => {  
          this.setState({modalVisible: true})  
        });
          }} style={{height : 60,width: 150,borderColor:'#F65352',borderRadius: 150/2,borderWidth: 1,alignItems: 'center',justifyContent: 'center'}}>
          <Text style={{fontSize: 17,fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null,color: '#F65352'}}>
            Помочь
            </Text>
          </TouchableOpacity>
      </View>
      
 
  )
}
else if(this.props.role==='recipient'&&this.props.item.role==='donor') {
  
 /* this.state.sentBlood&&this.state.submitted==true ? 
  <View style={{flex : 1,alignItems: 'center',justifyContent: 'center'}}>
  <Text style={{fontSize: 17,fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null,color: '#F65352'}}>
Вам только что сдал кровь этот пользователь
</Text>
</View>
:*/

  return(
this.state.sentBlood ?
<View style={{flex : 1}}>

<View style={{flex : 3,justifyContent:'center',alignItems:'center'}}>
{this.state.image ? <Image source={{uri : this.state.image}} style={{marginTop:20,width: Dimensions.get('window').width*0.4,height: Dimensions.get('window').height/5,resizeMode:'stretch'}} /> : null} 
</View>
<View style={{flex : 1,flexDirection : 'row'}}>

<View style={{flex : 1,justifyContent:'center',alignItems:'center'}}>
<TouchableOpacity onPress={()=>{this.apply()}} style={{width: 40,height:40,justifyContent:'center',alignItems: 'center',marginRight : 10,marginTop: 10}}>
      <Icon type='ionicon' name='ios-checkmark-outline' color='green' size={44} />
</TouchableOpacity>
  </View>
  <View style={{flex : 1,justifyContent:'center',alignItems:'center'}}>
  <TouchableOpacity onPress={()=>{this.cancel()}}   style={{width: 40,height:40,justifyContent:'center',alignItems: 'center',marginRight : 10,marginTop: 10}}>
      <Icon type='ionicon' name='ios-close-outline' color='red' size={44} />
</TouchableOpacity>
  </View>

</View>

</View> 
: 
<View style={{flex : 1,alignItems: 'center',justifyContent: 'center'}}>
  <Text style={{fontSize: 17,fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null,color: '#F65352'}}>
  У вас еще нет заявок 
</Text>
</View>
  )
}
else {
  return(
  <View style={{flex : 1,alignItems: 'center',justifyContent: 'center'}}>
  <Text style={{fontSize: 13,fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null,color: '#F65352'}}>
  Вы смотрите аккаунт с аналогичной ролью как у вас 
</Text>
</View>
)
}                
   
    
  }

 
  renderContent(){
    if(this.state.loading || this.props.loading)
    return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Spinner size='large' /></View>
    )
  return(
      <Animated.View style={{flex:1,opacity: this.state.opacityValue}}>
       <Modal
       transparent
              visible={this.state.modalVisible}
              animationType={'slide'}
              onRequestClose={() => this.setState({modalVisible : false})}
          ><View style={{flex : 1,justifyContent: 'center',alignItems:'center',}}>
       <View style={{height : Dimensions.get('window').height,width : Dimensions.get('window').width ,position: 'absolute'}}>
         <TouchableOpacity style={{height : Dimensions.get('window').height,width : Dimensions.get('window').width}} onPress = {()=>{  Animated.timing(this.state.opacityValue, {
                toValue: 1,
                duration:100, 
                easing: Easing.bezier(0.0, 0.0, 0.2, 1),
                
            }).start(() => {
              this.setState({modalVisible: false})  
            });}}>
           </TouchableOpacity>
         </View>
            <View style={{borderWidth:1,borderColor:'#d3d3d3',height : Dimensions.get('window').height/2,width: Dimensions.get('window').width/1.5,backgroundColor:'#fff',justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null,color: '#686868'}}>Убедитесь, что вы </Text>
            <Text style={{fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null,color: '#686868'}}>на самом деле прошли через </Text>
            <Text style={{fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null,color: '#686868'}}>донорство крови</Text>
            
               <TouchableOpacity style={{marginTop:140}} onPress={()=>{  Animated.timing(this.state.opacityValue, {
                toValue: 1,
                duration:100, 
                easing: Easing.bezier(0.0, 0.0, 0.2, 1),
                
            }).start(() => {
              this.setState({modalVisible: false})
              this._handlePress()
           });}}>
            <Text style={{fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null,fontSize : 30,color: '#F65352'}}>Ok!</Text>
            
      </TouchableOpacity>
            </View>
            </View>
         </Modal>
<View style={{flex : 5,}}>
<View style={{flex : 5,marginTop: 5}}>
<View style={{flexDirection: 'row'}}>
  <View style={{flex : 5}}>
  <Text style={{fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null,marginTop : Dimensions.get('window').height/15,marginLeft: Dimensions.get('window').width/7,fontSize: 40,color: '#E39291'}}>{this.props.item.blood}{this.props.item.factor}</Text>
    </View>
    <View style={{flex: 6,
    alignItems : 'center',
    justifyContent : 'center',
  }}>
      <View style={{  
        borderRadius : 100/2,
      width: 100,
      height: 100,
      marginTop: 15,
    backgroundColor: '#EDD8D8',
    alignItems : 'center',
    justifyContent : 'center',
  }}>
  <Icon type='ionicon' color='#E39291' style={{backgroundColor:'transparent',}} size={100} name='ios-camera-outline' /> 
      </View>
</View>
  <View style={{flex : 5,}}>
    </View>
     </View>
     <View style={{flex : 2,alignItems: 'center',marginTop: 10,flexDirection:'column',justifyContent: 'space-between'}}>
      <Text style={{fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null,color: '#686868'}}>{this.props.item.firstName} {this.props.item.lastName}</Text>
     {this.props.item.role==='donor' ? <Text style={{fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null,color: '#d3d3d3',paddingBottom: 20}}>{this.props.item.description}</Text> :
     <Text style={{fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null,color: '#d3d3d3',paddingBottom: 20}}>Я нуждаюсь в вашей крови</Text>
    } 
       </View>
      </View>
      <View style={{flex :1}}>
      <View style={{flex : 1,alignItems: 'center',justifyContent: 'center',flexDirection: 'row',justifyContent: 'space-between'}}>
      <View style={{flex : 1,alignItems: 'center'}}>
      <Text style={{fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null,color: '#E39291'}}>{this.props.item.rescue_count}</Text>
       </View>
       <View style={{flex : 1,alignItems: 'center'}}>
      <Text style={{fontFamily :  Platform.OS ==='ios'? 'AvenirNext-DemiBold':null,color: '#E39291'}}>{this.state.beenHelped}</Text>
         
         </View>
        </View>
        <View style={{flex : 1,alignItems: 'center',justifyContent: 'center',flexDirection: 'row',justifyContent: 'space-between'}}>
      <View style={{flex : 1,alignItems: 'center'}}>
      <Text style={{fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null,color: '#d3d3d3'}}>Помог</Text>
       </View>
       <View style={{flex : 1,alignItems: 'center'}}>
      <Text style={{fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null,color: '#d3d3d3'}}>Помогли</Text>
         
         </View>
        </View>
        </View>
      </View>
      <View style={{marginTop : 40,flex: 1,backgroundColor:'#F65352',alignItems: 'center',justifyContent: 'center'}}>
      
      <Text style={{fontSize: 14,fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null,color: '#fff'}}>Мой номер телефона : {this.props.item.phone}</Text>
          
      </View>
      <View style={{ flex: 4}}>
       {this.renderButton()}
        </View>
        </Animated.View>
      )
    }

      

  render() {
    
    return (
      <View style={[styles.mainView]}>
      <View style={{flex:5,flexDirection: 'row',borderBottomWidth:1,borderBottomColor:'#F65352',backgroundColor:'#F65352'}}>
      <View style={{flex:2,justifyContent: 'center',}}><TouchableOpacity onPress={()=>{Actions.pop()}} style={{width: 40,height:40,justifyContent:'center',alignItems: 'center',marginLeft : 10,marginTop: 10}}>
      <Icon type='ionicon' name='ios-arrow-back' color='#fff' size={33} />
</TouchableOpacity>
</View>
<View style={{flex :18 ,justifyContent: 'center',alignItems: 'center',}}>
<Image source={this.state.logo} style={{marginTop: 20,width: Dimensions.get('window').width*0.3,height: Dimensions.get('window').height/25,resizeMode:'stretch'}} />

      </View>
      <View style={{flex : 3,justifyContent:'center'}}>
      <TouchableOpacity onPress={()=>{this._handlePress()}} style={{width: 40,height:40,justifyContent:'center',alignItems: 'center',marginRight : 10,marginTop: 10}}>
      <Icon type='ionicon' name='ios-star-outline' color='#fff' size={33} />
</TouchableOpacity>
      </View>
         </View>
         <View style={{flex :44}}>
        {this.renderContent()}
        </View>
</View>
      )
    }
  }

  const styles = {
    textStyle: {
      alignSelf: 'center',
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
      paddingTop: 10,
      paddingBottom: 10,

  },
  buttonStyle: {
    
      backgroundColor: '#fff',
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#007aff',
      marginLeft: 5,
      marginRight: 5,
  },
  mainView: {
    flex: 1,
    alignContent: 'center',
    backgroundColor:'#fff',

  },
  subView2: {
    flex: 1,
    alignItems: 'center',
  },
  flagsView: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 20,
  },
  flagImage: {margin: 5, width: 50, height: 50},
  imageView:{
    flex: 1,
  },
  textView:{
    flex: 3,
    backgroundColor: 'yellow',
  },

  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },

}
const mapStateToProps = ({ main }) => {
  const { filled,role,blood,factor,loading } = main
  return {filled,role,blood,factor,loading}
}
export default connect(mapStateToProps, {
  userDataFetching
})(ProfileView)


/*
        uploadBlob = null
 
*/