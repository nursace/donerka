import React, { Component } from 'react'
import { Text, View,Animated,Easing, Image,TouchableWithoutFeedback,TouchableHighlight,TouchableOpacity,Dimensions } from 'react-native'
import { Actions } from 'react-native-router-flux'
import {Icon} from 'react-native-elements'
import {logoutUser} from '../actions'
import firebase from 'firebase'
import {connect} from 'react-redux'

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

class ThirdMain extends Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }
    onPressFirst(){
Actions.replace('firstMain')
    }

    onPressSecond(){
        Actions.replace('secondMain')
            }
    render() {

    return (
      <View style={styles.mainView}>
         <View style={{flex:5}}>
      
      </View>
   
   <View style={{flex:40}}>
   <TouchableOpacity onPress={()=>this.props.logoutUser()}><Text>logout</Text></TouchableOpacity>
   </View>
   <View style={{flex:4,borderTopWidth:1,flexDirection : 'row',justifyContent:'space-around',marginTop:0,height:Dimensions.get('window').height*0.1-10}}>
          <Ripple text='Albums' name='md-list-box' color='#9C9495' onPressButton={this.onPressFirst} size={30}  />
          <Ripple text='Main' name='md-beaker' color='#9C9495' onPressButton={this.onPressSecond} size={30}  />
          <Ripple text='Setting' name='ios-cog' color='#F65352' size={30}  />
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
const mapStateToProps = ({ auth }) => {
    const { email, password, error, loading } = auth
    return {email, password, error, loading }
}

export default connect(mapStateToProps, {
logoutUser})(ThirdMain)