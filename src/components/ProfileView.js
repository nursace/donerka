import React, { Component } from 'react'
import { Text, View, Image,TouchableOpacity,Easing,Animated,Dimensions,Modal } from 'react-native'
import { Actions } from 'react-native-router-flux'
import {userDataFetching} from '../actions'
import firebase from 'firebase'
import {connect} from 'react-redux'
import {Spinner} from './common'
import {Ionicons} from '@expo/vector-icons'
//DESCRIPTION'S NEEDED HERE
async function fetchData(userDataFetching){
  await userDataFetching()
   
 }
class ProfileView extends Component {
  constructor(props){
    super(props)
    this.state={ 
      loading : true,
      modalVisible:false,
      opacityValue: new Animated.Value(1),
      submitted : false
    }
  
   fetchData(this.props.userDataFetching).then(()=>{

    let s = ''
    let email1 = this.props.item.email
    for(let i = 0; i < email1.length; i++) {
      if (email1.charAt(i) === '@') break;
      s += email1.charAt(i)
    }
    var that = this
    let d = ''
    let email2 = firebase.auth().currentUser.email
    for(let i = 0; i < email2.length; i++) {
      if (email2.charAt(i) === '@') break;
      d += email2.charAt(i)
    } 
    firebase.database().ref(`/users/${s}/submittedBlood`).on('value',function(snapshot){
     
     that.setState({submitted: snapshot.hasChild(`${d}`)})
    }) 
    this.setState({loading:false})})
  }
  
  _handlePress(){
    this.setState({loading: true})
    let s = ''
    let email1 = this.props.item.email
    for(let i = 0; i < email1.length; i++) {
      if (email1.charAt(i) === '@') break;
      s += email1.charAt(i)
    }
    var that =this
   firebase.database().ref(`/users/${s}`).on('value',function(snapshot){
    fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: snapshot.val().token,
title: `You've recieved blood`,
sound : 'default',
body : 'C'
      }),
    }).then((response)=>{
      let d = ''
      let email1 = firebase.auth().currentUser.email
      for(let i = 0; i < email1.length; i++) {
        if (email1.charAt(i) === '@') break;
        d += email1.charAt(i)
      } 
      firebase.database().ref(`/users/${d}`).on('value',function(snapshot){
        const {email,blood,factor,lastName,firstName,patronymic,phone} = snapshot.val()
      firebase.database().ref(`/users/${s}/submittedBlood/${d}`).update({email,blood,factor,lastName,firstName,patronymic,phone})
      
      })
    }).then(()=>{
      that.setState({loading : false})
    });
    })
  }
  renderContent(){
    if(this.state.loading || this.props.loading)
    return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Spinner size='large' /></View>
    )
    if(this.props.role === 'donor'){
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
            <Text style={{fontFamily: 'AvenirNext-DemiBold',color: '#686868'}}>Make sure</Text>
            <Text style={{fontFamily: 'AvenirNext-DemiBold',color: '#686868'}}>you've actually been through </Text>
            <Text style={{fontFamily: 'AvenirNext-DemiBold',color: '#686868'}}>blood donation act</Text>
            
               <TouchableOpacity style={{marginTop:140}} onPress={()=>{  Animated.timing(this.state.opacityValue, {
                toValue: 1,
                duration:100, 
                easing: Easing.bezier(0.0, 0.0, 0.2, 1),
                
            }).start(() => {
              this.setState({modalVisible: false})  
              
              this._handlePress()
           });}}>
            <Text style={{fontFamily: 'AvenirNext-DemiBold',fontSize : 30,color: '#F65352'}}>Ok!</Text>
            
      </TouchableOpacity>
            </View>
            </View>
         </Modal>
<View style={{flex : 5,}}>
<View style={{flex : 5,marginTop: 5}}>
<View style={{flexDirection: 'row'}}>
  <View style={{flex : 5}}>
  <Text style={{fontFamily: 'AvenirNext-DemiBold',marginTop : Dimensions.get('window').height/15,marginLeft: Dimensions.get('window').width/7,fontSize: 40,color: '#E39291'}}>{this.props.item.blood}{this.props.item.factor}</Text>
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
  <Ionicons color='#E39291' style={{backgroundColor:'transparent',}} size={100} name='ios-camera-outline' /> 
      </View>
</View>
  <View style={{flex : 5,}}>
    </View>
     </View>
     <View style={{flex : 2,alignItems: 'center',marginTop: 10,flexDirection:'column',justifyContent: 'space-between'}}>
      <Text style={{fontFamily: 'AvenirNext-DemiBold',color: '#686868'}}>{this.props.item.firstName} {this.props.item.lastName}</Text>
     {this.props.item.role==='donor' ? <Text style={{fontFamily: 'AvenirNext-DemiBold',color: '#d3d3d3',paddingBottom: 20}}>{this.props.item.description}</Text> :
     <Text style={{fontFamily: 'AvenirNext-DemiBold',color: '#d3d3d3',paddingBottom: 20}}>I need your blood</Text>
    } 
       </View>
      </View>
      <View style={{flex :1}}>
      <View style={{flex : 1,alignItems: 'center',justifyContent: 'center',flexDirection: 'row',justifyContent: 'space-between'}}>
      <View style={{flex : 1,alignItems: 'center'}}>
      <Text style={{fontFamily: 'AvenirNext-DemiBold',color: '#E39291'}}>{this.props.item.rescue_count}</Text>
       </View>
       <View style={{flex : 1,alignItems: 'center'}}>
      <Text style={{fontFamily: 'AvenirNext-DemiBold',color: '#E39291'}}>{this.props.item.rescue_count}</Text>
         
         </View>
        </View>
        <View style={{flex : 1,alignItems: 'center',justifyContent: 'center',flexDirection: 'row',justifyContent: 'space-between'}}>
      <View style={{flex : 1,alignItems: 'center'}}>
      <Text style={{fontFamily: 'AvenirNext-DemiBold',color: '#d3d3d3'}}>Helped</Text>
       </View>
       <View style={{flex : 1,alignItems: 'center'}}>
      <Text style={{fontFamily: 'AvenirNext-DemiBold',color: '#d3d3d3'}}>Been helped</Text>
         
         </View>
        </View>
        </View>
      </View>
      <View style={{marginTop : 40,flex: 1,backgroundColor:'#F65352',alignItems: 'center',justifyContent: 'center'}}>
      
      <Text style={{fontSize: 14,fontFamily: 'AvenirNext-DemiBold',color: '#fff'}}>My phone number : {this.props.item.phone}</Text>
          
      </View>
      <View style={{flex : 1,marginTop: 20}}>
       
    </View>
      <View style={{ flex: 4,marginTop : 20}}>
       {this.props.item.role==='recipient' ?
          this.state.submitted!==true ? 
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
              <Text style={{fontSize: 17,fontFamily: 'AvenirNext-DemiBold',color: '#F65352'}}>
                Help out
                </Text>
              </TouchableOpacity>
          </View>:
                    <View style={{flex : 1,alignItems: 'center',justifyContent: 'center'}}>
                        <Text style={{fontSize: 17,fontFamily: 'AvenirNext-DemiBold',color: '#F65352'}}>
                You've already submitted your blood
                </Text>
</View>                    
          //если не submitted
        
        :null//если роль профиля донор
      } 
        </View>
        </Animated.View>
      )
    }
    else if(this.props.role === 'recipient'){

    }
    else{ //not filled questionnaire

    }
  }    

  render() {
    return (
      <View style={[styles.mainView]}>
      <View style={{flex:5,flexDirection: 'row',borderBottomWidth:1,borderBottomColor:'#F65352',backgroundColor:'#F65352'}}>
      <View style={{flex:2,justifyContent: 'center',}}><TouchableOpacity onPress={()=>{Actions.pop()}} style={{width: 40,height:40,justifyContent:'center',alignItems: 'center',marginLeft : 10,marginTop: 10}}>
      <Ionicons name='ios-arrow-back' color='#fff' size={33} />
</TouchableOpacity>
</View>
<View style={{flex :18 ,justifyContent: 'center',alignItems: 'center',}}>
      </View>
      <View style={{flex : 3,justifyContent:'center'}}>
      <TouchableOpacity onPress={()=>{this._handlePress()}} style={{width: 40,height:40,justifyContent:'center',alignItems: 'center',marginRight : 10,marginTop: 10}}>
      <Ionicons name='ios-star-outline' color='#fff' size={33} />
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
