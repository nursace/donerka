import React, { Component } from 'react'
import { Text, View, Image,Platform,TouchableOpacity,Easing,Animated,Dimensions,Modal } from 'react-native'
import { Actions } from 'react-native-router-flux'
import {userDataFetching} from '../actions'
import firebase from 'firebase'
import {connect} from 'react-redux'
import {Spinner} from './common'
import {Icon} from 'react-native-elements'
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
    if(this.props.role==='recipient'&&this.props.item ==='donor'){
      let y=s
      s=d
      d=y
    }
    console.log(this.props.item ,this.props.role)
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
      if(email1.charAt(i)===`'`)
      s+='='
      else if(email1.charAt(i)==='.')
      s+='+'
      else
    s += email1.charAt(i)
    }
    var that =this

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
      console.log('sdfef')
      let f
      firebase.database().ref(`/users/${d}`).once('value',function(snapshot){
        const {rescue_count,email,blood,factor,lastName,firstName,patronymic,phone} = snapshot.val()
    
        let f=parseInt(rescue_count)+1
       console.log(String(f))
      
       firebase.database().ref(`/users/${d}`).update({rescue_count: f}).then(()=>{
        firebase.database().ref(`/users/${s}/submittedBlood/${d}`).update({email,role:'donor',blood,factor,lastName,firstName,patronymic,phone})
        .then(()=>{

          that.setState({modalVisible: false,loading : false})
          
        })
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
      console.log('123')
      return(
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
          <Text style={{fontSize: 17,fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null,color: '#F65352'}}>
            Help out
            </Text>
          </TouchableOpacity>
      </View>:
                <View style={{flex : 1,alignItems: 'center',justifyContent: 'center'}}>
                    <Text style={{fontSize: 17,fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null,color: '#F65352'}}>
            You've already submitted your blood
            </Text>
</View> 
  )
}
else if(this.props.role==='recipient'&&this.props.item.role==='donor') {
console.log('adwdw')
  return(
    this.state.submitted ? 
    <View style={{flex : 1,alignItems: 'center',justifyContent: 'center'}}>
    <Text style={{fontSize: 17,fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null,color: '#F65352'}}>
You've been already submitted your blood
</Text>
</View>  :
  <View style={{flex : 1,alignItems: 'center',justifyContent: 'center'}}>
  <Text style={{fontSize: 17,fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null,color: '#F65352'}}>
Yoffu've been already submitted
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
            <Text style={{fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null,color: '#686868'}}>Make sure</Text>
            <Text style={{fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null,color: '#686868'}}>you've actually been through </Text>
            <Text style={{fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null,color: '#686868'}}>blood donation act</Text>
            
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
     <Text style={{fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null,color: '#d3d3d3',paddingBottom: 20}}>I need your blood</Text>
    } 
       </View>
      </View>
      <View style={{flex :1}}>
      <View style={{flex : 1,alignItems: 'center',justifyContent: 'center',flexDirection: 'row',justifyContent: 'space-between'}}>
      <View style={{flex : 1,alignItems: 'center'}}>
      <Text style={{fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null,color: '#E39291'}}>{this.props.item.rescue_count}</Text>
       </View>
       <View style={{flex : 1,alignItems: 'center'}}>
      <Text style={{fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null,color: '#E39291'}}>{this.props.item.rescue_count}</Text>
         
         </View>
        </View>
        <View style={{flex : 1,alignItems: 'center',justifyContent: 'center',flexDirection: 'row',justifyContent: 'space-between'}}>
      <View style={{flex : 1,alignItems: 'center'}}>
      <Text style={{fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null,color: '#d3d3d3'}}>Helped</Text>
       </View>
       <View style={{flex : 1,alignItems: 'center'}}>
      <Text style={{fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null,color: '#d3d3d3'}}>Been helped</Text>
         
         </View>
        </View>
        </View>
      </View>
      <View style={{marginTop : 40,flex: 1,backgroundColor:'#F65352',alignItems: 'center',justifyContent: 'center'}}>
      
      <Text style={{fontSize: 14,fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null,color: '#fff'}}>My phone number : {this.props.item.phone}</Text>
          
      </View>
      <View style={{flex : 1,marginTop: 20}}>
       
    </View>
      <View style={{ flex: 4,marginTop : 20}}>
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
