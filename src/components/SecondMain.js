import React, { Component } from 'react'
import { Text, View,Animated,Easing, Image,TouchableWithoutFeedback,TouchableHighlight,TouchableOpacity,Dimensions } from 'react-native'
import { Actions } from 'react-native-router-flux'
import {Icon} from 'react-native-elements'
import {userDataFetching} from '../actions'
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
            duration: 100,
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
                    left:-2,
                    width: this.props.size*2+5,
                    height: this.props.size*2+5,
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
        this.state = {
            loading :false,
            current_step : '1',
            blood : '',
            factor : '' 
        }
        this.props.userDataFetching()
    }
    onPressFirst(){
Actions.replace('firstMain')
    }
    onPressThird(){
        Actions.replace('thirdMain')
    }
   
    
    renderContent(){
        if(this.state.loading || this.props.loading)
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Spinner size='large' /></View>
        )
        
        if(this.props.filled) // if questionnaire is filled
        {
            if(this.props.role === 'donor')
            return (null) // if donor
            return (null) // if recipient
        }
        if(this.state.current_step==='1')
        return(
                <View style={{flex:1}}>
                <View style={{flex:2,justifyContent:'center'}}><Text style={{alignSelf:'center',fontSize: 25,color:'#ca1414',fontWeight:'bold'}}>What's your blood type?</Text>
                </View>
                <View style={{flex : 1,marginBottom:100,flexDirection:'row',justifyContent:'space-around'}}>
                <TouchableOpacity style={{borderColor:'#6b0003',borderWidth:1,borderRadius:25,width:50,height:50,justifyContent:'center',alignItems:'center'}}><Text style={{color:'#ca1414',fontSize:25}}>O</Text></TouchableOpacity>
                <TouchableOpacity style={{borderColor:'#6b0003',borderWidth:1,borderRadius:25,width:50,height:50,justifyContent:'center',alignItems:'center'}}><Text style={{fontSize:25,color:'#ca1414'}}>A</Text></TouchableOpacity>
                <TouchableOpacity style={{borderColor:'#6b0003',borderWidth:1,borderRadius:25,width:50,height:50,justifyContent:'center',alignItems:'center'}}><Text style={{fontSize:25,color:'#ca1414'}}>B</Text></TouchableOpacity>
                <TouchableOpacity style={{borderColor:'#6b0003',borderWidth:1,borderRadius:25,width:50,height:50,justifyContent:'center',alignItems:'center'}}><Text style={{fontSize:25,color:'#ca1414'}}>AB</Text></TouchableOpacity>

                </View>
                </View>
        )        
    }
    render() {

    return (
      <View style={styles.mainView}>

      <View style={{flex:5,alignItems:'center',justifyContent:'center',borderBottomWidth:0.4,flexDirection:'row'}}>
      <View style={{flex:3,alignItems:'flex-end',marginTop:20}}>

        {this.props.filled ? null : <Text style={{fontSize:20}}>{this.state.current_step} of 3</Text>}
        </View>

<View style={{flex:2,alignItems:'flex-end',marginRight:6,marginTop:20}}>
<TouchableOpacity onPress={(()=>{console.log('INFO')})} style={{height:40,width:50}}><View>
<Icon name='ios-alert-outline' color='#ca1414' type='ionicon' size={35} />
      
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
    return {filled,role}
}

export default connect(mapStateToProps, {
  userDataFetching
})(SecondMain)
