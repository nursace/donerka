import React, { Component } from 'react'
import { Text,Alert,ListView, View,Animated,Easing, Image,TouchableWithoutFeedback,TouchableHighlight,TouchableOpacity,Dimensions } from 'react-native'
import { Actions } from 'react-native-router-flux'
import {Icon} from 'react-native-elements'
import {userDataFetching,userDataUpdate} from '../actions'
import firebase from 'firebase'
import {connect} from 'react-redux'
import {Spinner} from './common'
import ListItem from './ListItem'


class Ripple extends Component {
    constructor(props){
        super(props)
        const maxOpacity=0.12
        this.state = {
            maxOpacity,
            scaleValue: new Animated.Value(0.01),
            opacityValue: new Animated.Value(maxOpacity),
        }
        this.renderRippleView = this.renderRippleView.bind(this);
        this.onPressedIn = this.onPressedIn.bind(this);
        this.onPressedOut = this.onPressedOut.bind(this);
    }
    onPressedIn() {
        Animated.timing(this.state.scaleValue, {
            toValue: 1,
            duration: 50,
            easing: Easing.bezier(0.0, 0.0, 0.2, 1),
        }).start();
    }
    onPressedOut() {
        Animated.timing(this.state.opacityValue, {
            toValue: 0,
            duration:1,            
        }).start(() => {
            this.state.scaleValue.setValue(0.01);
            this.state.opacityValue.setValue(this.state.maxOpacity);
        });
    }
    renderRippleView() {
        const { scaleValue, opacityValue } = this.state;

        return (
            <Animated.View
                style={{
                    position: 'absolute',
                    top: -10,
                    left:-5,
                    width: this.props.size*2+10,
                    height: this.props.size*2+10,
                    borderRadius: this.props.size*2,
                    transform: [{ scale: scaleValue }],
                    opacity: opacityValue,
                    backgroundColor: '#F65352',
                }}
            />
        );
    }
   render(){
       const size = this.props.size
       return(
<TouchableWithoutFeedback onPress={this.props.onPressButton}  onPressIn={this.onPressedIn} onPressOut={this.onPressedOut}>
 <View style={{paddingBottom:8,justifyContent:'center',alignItems:'center',height:2*size,width:2*size}}>
 {this.renderRippleView()}
 <View >
     <Icon name={this.props.name} color={this.props.color} type='ionicon' size={size} />
     <Text style={{fontSize : 10,fontFamily : 'AvenirNext-DemiBold',backgroundColor:'transparent',color:this.props.color,alignSelf:'center'}}>{this.props.text}</Text>
     </View>
     </View>
      </TouchableWithoutFeedback>

       )
   }
}

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
            
            
        }
    }
    componentDidMount() {
        this.setState({loading:true})
      let s = ''
      let email1 = firebase.auth().currentUser.email
      for(let i = 0; i < email1.length; i++) {
        if (email1.charAt(i) === '@') break;
        s += email1.charAt(i)
      }
      let user ;
      var that = this 
      
      firebase.database().ref(`/users/`)
      .on('value',function(snapshot){
          var appropriates = []            
          snapshot.forEach(function(childSnapshot) {
              let obj = childSnapshot.val()
              
              if(obj.email === firebase.auth().currentUser.email){
                  user=obj
              }    
          })
          snapshot.forEach(function(childSnapshot) { // if donor
              let obj = childSnapshot.val()
             
              if(obj.role != user.role && user !== obj&&user.factor===obj.factor){
                if(user.blood === 'O'){
                let app = {email : obj.email ,fullname : obj.fullname, phone : obj.phone,username:obj.username,blood : obj.blood }
                  appropriates.push(app)
                }
                else if(user.blood === 'A'){
                    if(obj.blood==='A'||obj.blood==='AB'){
                        let app = {email : obj.email ,fullname : obj.fullname, phone : obj.phone,username:obj.username, blood: obj.blood }
                        appropriates.push(app)
                              
                    }
                }
                else if(user.blood === 'B'){
                    if(obj.blood==='AB'||obj.blood==='B'){
                        let app = {email : obj.email ,fullname : obj.fullname, phone : obj.phone,username:obj.username, blood: obj.blood }
                        appropriates.push(app)
                              
                    }
                }
                else{
                      if(obj.blood==='AB'){
                        let app = {email : obj.email ,fullname : obj.fullname, phone : obj.phone,username:obj.username, blood: obj.blood }
                        appropriates.push(app)
                              
                    }
                }
              }  
              
              
              
          }) 
          that.setState({  
              dataSource: that.state.dataSource.cloneWithRows(appropriates),
              loading : false
            });
      }
  )
    

    }
    onPressFirst(){
Actions.replace('firstMain')
    }
    onPressThird(){
        Actions.replace('thirdMain')
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
            return (  
            <ListView
                dataSource={this.state.dataSource}
                enableEmptySections={true}
                renderRow={this._renderItem.bind(this)}
                style={styles.listView}/>
                
            ) 
            return (null) // if recipient
        }
        if(!this.state.current_step){
            return(
                    <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
                    <View style ={{marginBottom : 50,justifyContent:'center',alignItems:'center'}}><Icon name='ios-clipboard-outline' color='#D0D0D0' type='ionicon' size={200} />
                        <Text style={{fontSize : 32,color:'#4a4a4a',fontFamily : 'AvenirNext-DemiBold'}}>Welcome!</Text>
                        <Text style={{marginTop: 30,color:'#9C9495',fontFamily : 'AvenirNext-DemiBold'}}>You haven't filled out our questionnaire yet.</Text>
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
            <Text style={{fontSize:20,color : '#fff',fontFamily : 'AvenirNext-DemiBold'}}>Join Us!</Text>
      </TouchableOpacity>
                        </View>
                        </View>
            )
        }
        else if(this.state.current_step==='1')
        return(
                <View style={{flex:1}}>
                <View style={{flex:2,justifyContent:'center'}}><Text style={{paddingTop:40,alignSelf:'center',fontSize: 29,color:'#F65352',fontFamily : 'AvenirNext-DemiBold'}}>What's your blood type?</Text>
                </View>
                <View style={{flex : 1,marginBottom:100,flexDirection:'row',justifyContent:'space-around'}}>
                <TouchableOpacity onPress={()=>{this.setState({blood:'O',current_step: '2'})}} style={{borderColor:'#F65352',backgroundColor: '#F65352',borderWidth:1,borderRadius:25,width:50,height:50,justifyContent:'center',alignItems:'center'}}><Text style={{color:'#fff',fontSize:25,fontFamily : 'AvenirNext-DemiBold'}}>O</Text></TouchableOpacity>
                <TouchableOpacity onPress={()=>{this.setState({blood:'A',current_step: '2'})}} style={{borderColor:'#F65352',backgroundColor: '#F65352',borderWidth:1,borderRadius:25,width:50,height:50,justifyContent:'center',alignItems:'center'}}><Text style={{fontSize:25,color:'#fff',fontFamily : 'AvenirNext-DemiBold'}}>A</Text></TouchableOpacity>
                <TouchableOpacity onPress={()=>{this.setState({blood:'B',current_step: '2'})}} style={{borderColor:'#F65352',backgroundColor: '#F65352',borderWidth:1,borderRadius:25,width:50,height:50,justifyContent:'center',alignItems:'center'}}><Text style={{fontSize:25,color:'#fff',fontFamily : 'AvenirNext-DemiBold'}}>B</Text></TouchableOpacity>
                <TouchableOpacity onPress={()=>{this.setState({blood:'AB',current_step: '2'})}} style={{borderColor:'#F65352',backgroundColor: '#F65352',borderWidth:1,borderRadius:25,width:50,height:50,justifyContent:'center',alignItems:'center'}}><Text style={{fontSize:25,color:'#fff',fontFamily : 'AvenirNext-DemiBold'}}>AB</Text></TouchableOpacity>

                </View>
                </View>
        )
        else if(this.state.current_step==='2')
            return(
            <View style={{flex:1}}>
            <View style={{flex:2,justifyContent:'center'}}><Text style={{alignSelf:'center',fontSize: 25,color:'#ca1414',fontFamily : 'AvenirNext-DemiBold'}}>What's your Rh factor?</Text>
            </View>
            <View style={{flex : 1,marginBottom:100,flexDirection:'row',justifyContent:'space-around'}}>
            <TouchableOpacity onPress={()=>{this.setState({factor:'positive',current_step: '3'})}} style={{borderColor:'#6b0003',borderWidth:1,borderRadius:10,width:100,height:50,justifyContent:'center',alignItems:'center'}}><Text style={{color:'#ca1414',fontSize:15}}>Positive</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>{this.setState({factor:'negative',current_step: '3'})}} style={{borderColor:'#6b0003',borderWidth:1,borderRadius:10,width:100,height:50,justifyContent:'center',alignItems:'center'}}><Text style={{fontSize:15,color:'#ca1414'}}>Negative</Text></TouchableOpacity>
  
            </View>
            </View>
            )    
        else return(
            <View style={{flex:1}}>
            <View style={{flex:2,justifyContent:'center'}}><Text style={{alignSelf:'center',fontSize: 25,color:'#ca1414',fontWeight:'bold'}}>Who are you gonna be?</Text>
            </View>
            <View style={{flex : 1,marginBottom:100,flexDirection:'row',justifyContent:'space-around'}}>
            <TouchableOpacity onPress={()=>{this.setState({role:'donor'}, this.onFinishFillingForm.bind(this))}} style={{borderColor:'#6b0003',borderWidth:1,borderRadius:10,width:100,height:50,justifyContent:'center',alignItems:'center'}}><Text style={{color:'#ca1414',fontSize:15}}>Donor</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>{this.setState({role:'recipient'}, this.onFinishFillingForm.bind(this) )}} style={{borderColor:'#6b0003',borderWidth:1,borderRadius:10,width:100,height:50,justifyContent:'center',alignItems:'center'}}><Text style={{fontSize:15,color:'#ca1414'}}>Recipient</Text></TouchableOpacity>
  
            </View>
            </View>
        )
    }
    render() {

    return (
      <View style={[styles.mainView]}>

      <View style={{flex:5,alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderBottomColor:'#F65352',flexDirection:'row',backgroundColor:'#F65352'}}>
      <Animated.View style={{opacity: this.state.opacityValue,flex:7,alignItems:'center',justifyContent:'center',marginTop:20}}>

        {(this.props.loading||this.state.loading)||this.props.filled ? this.props.role==='donor'? <Text style={{color:'#fff',fontSize:25,marginLeft: 60,alignSelf: 'center'}}>I'm Donor</Text>:null : this.state.current_step ? 
        <View style={{flexDirection:'row',flex:1,marginTop:10}}>
         <TouchableOpacity onPress={(()=>{})} style={{marginRight: Dimensions.get('window').width*0.3,height:35,width:35}}>
<Icon name='ios-arrow-back' color='#fff' type='ionicon' size={33} />
      </TouchableOpacity>   
        <Text style={{paddingRight: 120,color:'#fff',fontSize:25}}>{this.state.current_step} of 3</Text>
        </View>
        :
                <Image source={require('../../assets/logo.png')} style={{marginLeft:70,alignSelf:'center',width: Dimensions.get('window').width*0.3,height: Dimensions.get('window').height/25,resizeMode:'stretch'}}></Image>                
        }
        </Animated.View>

<View style={{flex:1,marginRight:3,marginTop:25}}>
<TouchableOpacity onPress={(()=>{console.log('INFO')})} style={{height:35,width:35,marginBottom:5}}>
<View>
{(this.props.loading||this.state.loading)||this.props.filled ? 
    this.props.role==='donor' ? this.state.dataSource ?<Icon name='ios-search-outline' color='#fff' type='ionicon' size={30} />  :null : null   :
 <Icon name='ios-information-circle-outline' color='#fff' type='ionicon' size={33} />}
      
    </View></TouchableOpacity>
    </View>
    </View>
   <Animated.View style={{flex:40,opacity: this.state.opacityValue}}>
        {this.renderContent()}
        </Animated.View>
   <View style={{flex:4,borderTopWidth:1,flexDirection : 'row',justifyContent:'space-around',marginTop:0,height:Dimensions.get('window').height*0.1-10}}>
     <Ripple text='Albums' name='md-list-box' color='#9C9495' onPressButton={this.onPressFirst} size={30}  />
          <Ripple text='Main' name='md-beaker' color='#F65352' size={30}  />
          <Ripple text='Setting' name='ios-cog' color='#9C9495' onPressButton={this.onPressThird} size={30}  />
      </View>
      </View>

    )
  }
  _renderItem(item) {
    
                      return (
                          <ListItem item={item}  />
                        );
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

    pageContainer: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        margin: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },


}
const mapStateToProps = ({ main }) => {
    const { filled,role,blood,factor,loading } = main
    return {filled,role,blood,factor,loading}
}

export default connect(mapStateToProps, {
  userDataFetching,userDataUpdate
})(SecondMain)
