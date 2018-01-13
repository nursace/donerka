import React, { Component } from 'react'
import { Text,Alert, View,Animated,Easing, Image,TouchableWithoutFeedback,TouchableHighlight,TouchableOpacity,Dimensions } from 'react-native'
import { Actions } from 'react-native-router-flux'
import {Icon} from 'react-native-elements'
import {userDataFetching,userDataUpdate} from '../actions'
import firebase from 'firebase'
import {connect} from 'react-redux'
import {Spinner} from './common'

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
                    top: -15,
                    left:-5,
                    width: this.props.size*2+10,
                    height: this.props.size*2+10,
                    borderRadius: this.props.size*2,
                    transform: [{ scale: scaleValue }],
                    opacity: opacityValue,
                    backgroundColor: '#6b0003',
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
     <Text style={{fontSize : 10,backgroundColor:'transparent',color:this.props.color,alignSelf:'center'}}>{this.props.text}</Text>
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
        this.state = {
            loading :false,
            current_step : '1',
            blood : '',
            factor : '' ,
            role : '',
        }
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
        console.log(this.props)
        if(this.props.filled) // if questionnaire is filled
        {
            if(this.props.role === 'donor')
            return ( // if donor
                
                <View style={{flex:1}}>
                <Text>dsd</Text>
                </View>
            ) 
            return (null) // if recipient
        }
        if(this.state.current_step==='1')
        return(
                <View style={{flex:1}}>
                <View style={{flex:2,justifyContent:'center'}}><Text style={{alignSelf:'center',fontSize: 25,color:'#ca1414',fontWeight:'bold'}}>What's your blood type?</Text>
                </View>
                <View style={{flex : 1,marginBottom:100,flexDirection:'row',justifyContent:'space-around'}}>
                <TouchableOpacity onPress={()=>{this.setState({blood:'O',current_step: '2'})}} style={{borderColor:'#6b0003',borderWidth:1,borderRadius:25,width:50,height:50,justifyContent:'center',alignItems:'center'}}><Text style={{color:'#ca1414',fontSize:25}}>O</Text></TouchableOpacity>
                <TouchableOpacity onPress={()=>{this.setState({blood:'A',current_step: '2'})}} style={{borderColor:'#6b0003',borderWidth:1,borderRadius:25,width:50,height:50,justifyContent:'center',alignItems:'center'}}><Text style={{fontSize:25,color:'#ca1414'}}>A</Text></TouchableOpacity>
                <TouchableOpacity onPress={()=>{this.setState({blood:'B',current_step: '2'})}} style={{borderColor:'#6b0003',borderWidth:1,borderRadius:25,width:50,height:50,justifyContent:'center',alignItems:'center'}}><Text style={{fontSize:25,color:'#ca1414'}}>B</Text></TouchableOpacity>
                <TouchableOpacity onPress={()=>{this.setState({blood:'AB',current_step: '2'})}} style={{borderColor:'#6b0003',borderWidth:1,borderRadius:25,width:50,height:50,justifyContent:'center',alignItems:'center'}}><Text style={{fontSize:25,color:'#ca1414'}}>AB</Text></TouchableOpacity>

                </View>
                </View>
        )
        else if(this.state.current_step==='2')
            return(
            <View style={{flex:1}}>
            <View style={{flex:2,justifyContent:'center'}}><Text style={{alignSelf:'center',fontSize: 25,color:'#ca1414',fontWeight:'bold'}}>What's your Rh factor?</Text>
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
      <View style={styles.mainView}>

      <View style={{flex:5,alignItems:'center',justifyContent:'center',borderBottomWidth:0.4,flexDirection:'row'}}>
      <View style={{flex:3,alignItems:'flex-end',marginTop:20}}>

        {(this.props.loading||this.state.loading)||this.props.filled ? null : <Text style={{color:'#ca1414',fontSize:20}}>{this.state.current_step} of 3</Text>}
        </View>

<View style={{flex:2,alignItems:'flex-end',marginRight:6,marginTop:30}}>
<TouchableOpacity onPress={(()=>{console.log('INFO')})} style={{height:40,width:50}}><View>
<Icon name='ios-alert-outline' color='#ca1414' type='ionicon' size={30} />
      
    </View></TouchableOpacity>
    </View>
    </View>
   <View style={{flex:40}}>
        {this.renderContent()}
        </View>
   <View style={{flex:4,borderTopWidth:1,flexDirection : 'row',justifyContent:'space-around',marginTop:0,height:Dimensions.get('window').height*0.1-10}}>
     <Ripple text='Albums' name='md-list-box' color='#434A54' onPressButton={this.onPressFirst} size={30}  />
          <Ripple text='Main' name='md-beaker' color='#ca1414' size={30}  />
          <Ripple text='Setting' name='ios-cog' color='#434A54' onPressButton={this.onPressThird} size={30}  />
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
    backgroundColor:'#fff'
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
