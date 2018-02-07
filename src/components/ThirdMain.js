import React, {Component} from 'react';
import {
  Text,
  Alert,
  ListView,
  Platform,
  View,
  Animated,
  Easing,
  Image,
  TouchableWithoutFeedback,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions
} from 'react-native'
import {Actions} from 'react-native-router-flux'
import {logoutUser} from '../actions'
import firebase from 'firebase'
import {connect} from 'react-redux'
import {Spinner} from './common'
import ListItem from './ListItem'
import {Icon, Button} from 'react-native-elements'

class ThirdMain extends Component {
  constructor(props) {
    super(props)

    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    })

    this.state = {
      loading: false,
      current_step: '',
      blood: '',
      factor: '',
      role: '',
      dataSource: dataSource,
      opacityValue: new Animated.Value(1),
      logo: null

    }
  }

  onPressFirst() {
    Actions.replace('secondMain')
  }

  onPressThird() {
    Actions.replace('thirdMain')
  }

  renderContent() {
    if (this.state.loading || this.props.loading)
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><Spinner size='large'/></View>
      )
    return (
      <View style={styles.mainHuiView}>
          <TouchableOpacity style={{backgroundColor : 'red',justifyContent:'center',alignItems : 'center'}} onPress = {()=>{this.props.logoutUser()}}>
            <Text style={{color : '#fff',fontSize : 23}}>Click here to logout</Text>
          </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{backgroundColor: '#F65352', flexDirection: 'row', height: Dimensions.get('window').height / 10.5}}>
          <View style={{flex: 1,}}/>

          <View style={{flex: 6, justifyContent: 'center', alignItems: 'center'}}>
            <Image source={this.state.logo} style={{
              marginTop: 20,
              width: Dimensions.get('window').width * 0.3,
              height: Dimensions.get('window').height / 25,
              resizeMode: 'stretch'
            }}/>
          </View>
          <View style={{flex: 1,}}/>
        </View>
        {this.renderContent()}
      </View>
    )
  }

  _renderItem(item) {
    return (
      <ListItem item={item}/>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageView: {
    flex: 1,
    flexDirection: 'row',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
  mainHuiView: {
    flex: 1,
    justifyContent : 'center',
    alignItems :'center'
  },
  huiFlex1: {
    borderColor: 'black',
    backgroundColor: 'yellow',
    borderWidth: 1,
  },
  textView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }

}
const mapStateToProps = ({main}) => {
  const {filled, role, blood, factor, loading} = main
  return {filled, role, blood, factor, loading}
}

export default connect(mapStateToProps, {
  logoutUser
})(ThirdMain)