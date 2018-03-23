import React, { Component } from 'react';
import { Text,Alert,Switch,ListView,Platform,FlatList, View,Animated,Easing, Image,TouchableWithoutFeedback,TouchableHighlight,TouchableOpacity,Dimensions } from 'react-native'
import { Actions } from 'react-native-router-flux'
import {userDataFetching,userDataUpdate} from '../actions'
import firebase from 'firebase'
import {connect} from 'react-redux'
import {Spinner} from './common'
import ListItem from './ListItem'
import { List, SearchBar, Icon} from 'react-native-elements'

//header marginTop : 20
class SecondMain extends Component {
  constructor(props){
      super(props)
      
      this.props.userDataFetching()
      const dataSource = new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
        });
      this.state = {
          loading :false,
          current_step : '',
          blood : '',
          factor : '' ,
          role : '',
          dataSource: dataSource,
          opacityValue: new Animated.Value(1),
          logo : null,
          switchValue: false
          
      }
  }

 componentDidMount() {
    if(firebase.auth().currentUser){
    this.setState({loading:true})
  let s = ''
  let email1 = firebase.auth().currentUser.email
  for(let i = 0; i < email1.length; i++) {
    if (email1.charAt(i) === '@') break;
    if(email1.charAt(i)===`'`)
    s+='='
    else if(email1.charAt(i)==='.')
    s+='+'
    else
  s += email1.charAt(i)
  }
  let user ;
  var that = this
  var boolS
  firebase.database().ref(`/users/`)
  .on('value',function(snapshot){
      var appropriates = []            
      snapshot.forEach(function(childSnapshot) {
          let obj = childSnapshot.val()
          
          if(obj.email === firebase.auth().currentUser.email){
              user=obj
          }    
      })    
      if(user.role === 'donor')
      snapshot.forEach(function(childSnapshot) { // if donor
          let obj = childSnapshot.val()
         
          if(obj.role != user.role && user !== obj&&user.factor===obj.factor&&obj.visible){
            if(user.blood === 'O'){
              appropriates.push(obj)
            }
            else if(user.blood === 'A'){
                if(obj.blood==='A'||obj.blood==='AB'){
                    appropriates.push(obj)
                          
                }
            }
            else if(user.blood === 'B'){
                if(obj.blood==='AB'||obj.blood==='B'){
                    appropriates.push(obj)
                          
                }
            }
            else{
                  if(obj.blood==='AB'){
                    appropriates.push(obj)
                          
                }
            }
          }  
          
          
          
      }) 
      else {
          firebase.database().ref(`/users/${s}/submittedBlood`).on('value',function(sumbittedBlood){
              sumbittedBlood.forEach(function(item){
                  appropriates.push(item.val())
              })
          })
          firebase.database().ref(`/users/${s}`).on('value',function(snapshot){
              boolS=snapshot.val().visible
          })
          
      }
      that.setState({  
          dataSource: that.state.dataSource.cloneWithRows(appropriates),
          loading : false,
          logo :require('../../assets/logo.png'),
          switchValue : boolS
        });

    }

)
     }

}
onPressFirst(){
Actions.replace('secondMain')
}
onPressThird(){
    Actions.replace('thirdMain')
}

_handleToggleSwitch(){

    if(this.state.switchValue){
        let s = ''
        let email1 = firebase.auth().currentUser.email
        for(let i = 0; i < email1.length; i++) {
          if (email1.charAt(i) === '@') break;
          if(email1.charAt(i)===`'`)
          s+='='
          else if(email1.charAt(i)==='.')
          s+='+'
          else
        s += email1.charAt(i)
        }
        var that=this
        firebase.database().ref(`/users/${s}`).update({visible : false,requestTime : '' }).then(()=>{that.setState({switchValue:false})})
    }
    else{
        let s = ''
        let email1 = firebase.auth().currentUser.email
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
        firebase.database().ref(`/users/${s}`).update({visible : true,  requestTime : firebase.database.ServerValue.TIMESTAMP}).then(()=>{that.setState({switchValue:true})})
        
    }
}
onFinishFillingForm(){ //finishing 3 step
    const {blood,role,factor} = this.state
    this.props.userDataUpdate({blood,role,factor})        
}
  renderContent(){
    if(this.state.loading || this.props.loading)
    return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Spinner size='large' /></View>
    )
    if(this.props.filled) // if questionnaire is filled
    {
        if(this.props.role === 'donor')
        if(this.state.dataSource.getRowCount()> 0)
        return (  
        <ListView
            dataSource={this.state.dataSource}
            enableEmptySections={true}
            renderRow={this._renderItem.bind(this)}
            style={styles.listView}/>
        ) 
        else return(
            <View style={{flex : 1, alignItems: 'center'}}>
            <View style={{marginTop : Dimensions.get('window').height/3.4,alignItems: 'center'}}>
            <Icon type='ionicon' name = 'ios-sad-outline' size= {70} color = '#9C9495' />
                 <Text style={{fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null,fontSize : 16,color: '#d0d0d0'}}>Unfortunately,</Text>
             
                 <Text style={{fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null,fontSize : 16,color: '#d0d0d0'}}>we don't have anyone that you can donate yet</Text>
               </View>
                </View>
        )
        else{
            if(this.state.dataSource.getRowCount()> 0)
            return (  
                <View style={{flex : 1}}>
                <View style={{flex : 1,justifyContent:'space-between',flexDirection:'row',}}> 
                    <Text style={{fontSize : 17,color : 'gray',margin :10,marginTop : 45}}>Show me in donor's search</Text>
                    <Switch onValueChange={this._handleToggleSwitch.bind(this)} style={{margin: 10,marginTop :20}} value={this.state.switchValue} />
                </View>
                <View style={{flex : 4}}>
            <ListView
                dataSource={this.state.dataSource}
                enableEmptySections={true}
                renderRow={this._renderItem.bind(this)}
                style={styles.listView}/>
                </View>
                </View>
            ) 
            else return(
                <View style={{flex : 1}}>
                <View style={{flex : 1,justifyContent:'space-between',flexDirection:'row',}}> 
                    <Text style={{fontSize : 17,color : 'gray',margin :10,marginTop : 45}}>Show me in donor's search</Text>
                    <Switch onValueChange={this._handleToggleSwitch.bind(this)} style={{margin: 10,marginTop :45}} value={this.state.switchValue} />
                </View>
                <View style={{flex : 4}}>
                <View style={{marginTop : Dimensions.get('window').height/7,alignItems: 'center'}}>
                <Icon type='ionicon' name = 'ios-sad-outline' size= {70} color = '#9C9495' />
                     <Text style={{fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null,fontSize : 16,color: '#d0d0d0'}}>Unfortunately,</Text>
                 
                     <Text style={{fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null,fontSize : 16,color: '#d0d0d0'}}>you don't have any donated pals</Text>
                   </View>
                   </View>
                    </View>
            )
    }
}
    if(!this.state.current_step){
        return(
                <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
                <View style ={{marginBottom : 50,justifyContent:'center',alignItems:'center'}}><Icon type='ionicon' name='ios-clipboard-outline' color='#D0D0D0' size={200} />
                    <Text style={{fontSize : 32,color:'#4a4a4a',fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null}}>Welcome!</Text>
                    <Text style={{marginTop: 30,color:'#9C9495',fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null}}>You haven't filled out our questionnaire yet.</Text>
                    <TouchableOpacity
    style={{
      width: 170,
      alignSelf:'center',
      borderRadius: 15,
      borderWidth: 0.6,
      borderColor: '#F65352',
      backgroundColor: '#F65352',
      height: 40,
      marginTop: 85,
      alignItems: 'center',
      justifyContent: 'center'
    }}
    onPress = {()=>{
         Animated.timing(this.state.opacityValue, {
            toValue: 0,
            duration:1, 
            easing: Easing.bezier(1.0, 1.0, 0.2, 0),
            
        }).start(() => {
           
            this.setState({current_step:'1'}) 
            Animated.spring(this.state.opacityValue, {
                toValue: 1,
                duration:300, 
                easing: Easing.bezier(0.0, 0.0, 0.2, 1),
                
            }).start(()=>{})   
        });
     }}
  >
        <Text style={{fontSize:20,color : '#fff',fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null}}>Join Us!</Text>
  </TouchableOpacity>
                    </View>
                    </View>
        )
    }
    else if(this.state.current_step==='1')
    return(
            <View style={{flex:1}}>
            <View style={{flex:2,justifyContent:'center'}}><Text style={{paddingTop:40,alignSelf:'center',fontSize: 29,color:'#F65352',fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null}}>What's your blood type?</Text>
            </View>
            <View style={{flex : 1,marginBottom:100}}>
        <View style={{flex : 1,flexDirection:'row',justifyContent:'space-around'}}>
            <TouchableOpacity onPress={()=>{this.setState({blood:'O',current_step: '2',factor: '+'})}} style={{borderColor:'#F65352',backgroundColor: '#F65352',borderWidth:1,borderRadius:25,width:50,height:50,justifyContent:'center',alignItems:'center'}}><Text style={{color:'#fff',fontSize:18,fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null}}>O+</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>{this.setState({blood:'A',current_step: '2',factor: '+'})}} style={{borderColor:'#F65352',backgroundColor: '#F65352',borderWidth:1,borderRadius:25,width:50,height:50,justifyContent:'center',alignItems:'center'}}><Text style={{fontSize:18,color:'#fff',fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null}}>A+</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>{this.setState({blood:'B',current_step: '2',factor: '+'})}} style={{borderColor:'#F65352',backgroundColor: '#F65352',borderWidth:1,borderRadius:25,width:50,height:50,justifyContent:'center',alignItems:'center'}}><Text style={{fontSize:18,color:'#fff',fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null}}>B+</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>{this.setState({blood:'AB',current_step: '2',factor: '+'})}} style={{borderColor:'#F65352',backgroundColor: '#F65352',borderWidth:1,borderRadius:25,width:50,height:50,justifyContent:'center',alignItems:'center'}}><Text style={{fontSize:18,color:'#fff',fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null}}>AB+</Text></TouchableOpacity>
</View>
<View style={{flex : 1 , flexDirection:'row',justifyContent:'space-around'}}>
<TouchableOpacity onPress={()=>{this.setState({blood:'O',current_step: '2',factor: '-'})}} style={{borderColor:'#F65352',backgroundColor: '#F65352',borderWidth:1,borderRadius:25,width:50,height:50,justifyContent:'center',alignItems:'center'}}><Text style={{color:'#fff',fontSize:18,fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null}}>O-</Text></TouchableOpacity>
<TouchableOpacity onPress={()=>{this.setState({blood:'A',current_step: '2',factor: '-'})}} style={{borderColor:'#F65352',backgroundColor: '#F65352',borderWidth:1,borderRadius:25,width:50,height:50,justifyContent:'center',alignItems:'center'}}><Text style={{fontSize:18,color:'#fff',fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null}}>A-</Text></TouchableOpacity>
<TouchableOpacity onPress={()=>{this.setState({blood:'B',current_step: '2',factor: '-'})}} style={{borderColor:'#F65352',backgroundColor: '#F65352',borderWidth:1,borderRadius:25,width:50,height:50,justifyContent:'center',alignItems:'center'}}><Text style={{fontSize:18,color:'#fff',fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null}}>B-</Text></TouchableOpacity>
<TouchableOpacity onPress={()=>{this.setState({blood:'AB',current_step: '2',factor: '-'})}} style={{borderColor:'#F65352',backgroundColor: '#F65352',borderWidth:1,borderRadius:25,width:50,height:50,justifyContent:'center',alignItems:'center'}}><Text style={{fontSize:18,color:'#fff',fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null}}>AB-</Text></TouchableOpacity>

</View>
            </View>
            </View>
    ) 
    else return(
        <View style={{flex:1}}>
        <View style={{flex:2,justifyContent:'center'}}><Text style={{alignSelf:'center',fontSize: 25,fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null,color:'#ca1414',fontWeight:'bold'}}>Who are you gonna be?</Text>
        </View>
        <View style={{flex : 1,marginBottom:100,flexDirection:'row',justifyContent:'space-around'}}>
        <TouchableOpacity onPress={()=>{this.setState({role:'donor'}, this.onFinishFillingForm.bind(this))}} style={{borderColor:'#6b0003',borderWidth:1,borderRadius:10,width:100,height:50,justifyContent:'center',alignItems:'center'}}><Text style={{color:'#ca1414',fontSize:15,fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null}}>Donor</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>{this.setState({role:'recipient'}, this.onFinishFillingForm.bind(this) )}} style={{borderColor:'#6b0003',borderWidth:1,borderRadius:10,width:100,height:50,justifyContent:'center',alignItems:'center'}}><Text style={{fontSize:15,color:'#ca1414',fontFamily : Platform.OS ==='ios'? 'AvenirNext-DemiBold':null}}>Recipient</Text></TouchableOpacity>

        </View>
        </View>
    )

  }
  render(){  return (
    <View style={styles.container}>
    <View style={{backgroundColor: '#F65352',flexDirection: 'row',height : Dimensions.get('window').height/10.5 }}>
  <View style={{flex : 1,}} />
    
    <View style={{flex : 6,justifyContent: 'center',alignItems: 'center'}}>
    <Image source={this.state.logo} style={{marginTop: 20,width: Dimensions.get('window').width*0.3,height: Dimensions.get('window').height/25,resizeMode:'stretch'}} />
    </View>
    <View style={{flex : 1, }} />
    </View>
    {this.renderContent()}
    </View>
  );
}
_renderItem(item) {
  
                    return (
                        <ListItem item={item}  />
                      );
                    }

}



const styles = {
  container: {
    flex: 1,

    backgroundColor: '#fff',
  },

}
const mapStateToProps = ({ main }) => {
  const { filled,role,blood,factor,loading ,visible} = main
  return {filled,role,blood,factor,loading,visible}
}

export default connect(mapStateToProps, {
userDataFetching,userDataUpdate
})(SecondMain)