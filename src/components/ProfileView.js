import React, { Component } from 'react'
import { Text, View, Image,TouchableOpacity,Dimensions } from 'react-native'
import { Actions } from 'react-native-router-flux'
import {userDataFetching} from '../actions'
import firebase from 'firebase'
import {connect} from 'react-redux'
import {Spinner} from './common'
import {Ionicons} from '@expo/vector-icons'

async function fetchData(userDataFetching){
  await userDataFetching()
   
 }
class ProfileView extends Component {
  constructor(props){
    super(props)
    this.state={ 
      loading : true
    }
  
   fetchData(this.props.userDataFetching).then(()=>{this.setState({loading:false})})
  }
  renderContent(){
    if(this.state.loading || this.props.loading)
    return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Spinner size='large' /></View>
    )
    if(this.props.role === 'donor'){
      return(
      <View style={{flex:1}}>
<View style={{flex : 5}}>
<View style={{flex : 5,backgroundColor: 'red',justifyContent: 'center',alignItems:'center',}}>
      <View style={{  borderRadius : 100/2,
      width: 100,
      height: 100,
    backgroundColor: '#EDD8D8',
    alignItems : 'center',
    justifyContent : 'center',  }}>
      <Ionicons color='#E39291' style={{backgroundColor:'transparent'}} size={100} name='ios-camera-outline' /> 
      </View>
      </View>
      <View style={{flex : 2,backgroundColor:'blue'}}>
        </View>
      </View>
      <View style={{backgroundColor:'red',flex: 2}}>
      </View>
      <View style={{backgroundColor:'blue', flex: 5}}>
        </View>
        </View>
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
      <View style={{flex: 2,justifyContent: 'center',}}><TouchableOpacity onPress={()=>{Actions.pop()}} style={{width: 40,height:40,justifyContent:'center',alignItems: 'center',marginLeft : 10,marginTop: 10}}>
      <Ionicons name='ios-arrow-back' color='#fff' size={33} />
</TouchableOpacity>
</View>
<View style={{flex :18 ,justifyContent: 'center',alignItems: 'center',}}>
       <Text style={{color:'#fff', marginTop: 10,fontFamily :'AvenirNext-DemiBold' ,fontSize:25,}}>{this.props.item.firstName}</Text>
      </View>
      <View style={{flex : 2}}>
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
