import React, {Component} from 'react';
import {
  Text,
  ListView,
  View,
  Animated,
  Image,
  Dimensions,
  FlatList,
} from 'react-native'
import {Actions} from 'react-native-router-flux'
import {logoutUser} from '../actions'
import firebase from 'firebase'
import {connect} from 'react-redux'
import {Spinner} from './common'
import {Icon, Button, ListItem, List} from 'react-native-elements'

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
      logo: null,
      user: {},
      data: [
        'Language',
        'Blacklist',
        'Privacy Policy',
        'About us',
        'Report an issue',
      ],
    }
  }

  onPressFirst() {
    Actions.replace('secondMain')
  }

  onPressThird() {
    Actions.replace('thirdMain')
  }

  componentDidMount() {
    let s = firebase.auth().currentUser.email
    s = s.replace('.', '+') // dot to +
    s = s.substr(0, s.indexOf('@')) // cut till @
    firebase.database().ref(`users/${s}`).once('value', snapshot => {
      let hui = snapshot.val()
      this.setState({user: hui})
    })
  }

  renderContent() {
    const hui = this.state.user
    if (this.state.loading || this.props.loading)
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><Spinner size='large'/></View>
      )
    return (
      <View style={styles.mainHuiView}>
        <View style={styles.flexFive}>
          <View style={styles.imageView}>
            <View style={styles.bloodseekerView}>
              <View style={styles.bloodseekerCircle}>
                <Text style={styles.darkOn}>{hui.blood}{hui.factor}</Text>
              </View>
              <Text style={[styles.subs, {color: '#F65352'}]}>Blood T</Text>
            </View>
            <View style={styles.midOne}>
              <Icon name='user' type='entypo' raised size={50}/>
            </View>
            <View style={styles.bloodseekerView}>
              <View style={styles.goldCircle}>
                <Text style={styles.darkOn}>{hui.rescue_count}</Text>
              </View>
              <Text style={[styles.subs, {color: '#ECCD6C'}]}>Helped</Text>
            </View>
          </View>
          <View style={styles.textView}>
            <Text style={styles.firstName}>{hui.firstName} {hui.lastName}</Text>
            <Text>{hui.email}</Text>
            <Text>{hui.phone}</Text>
          </View>
          <Button
            buttonStyle={styles.buttonStyle}
            rounded
            backgroundColor='#fff'
            title='Edit Profile'
            color='#000'
            onPress={() => Actions.editProfile({hui})}
          />
        </View>
        <View style={styles.flexThree}>
          <List>
            <FlatList
              data={this.state.data}
              renderItem={({item}) => (
                <ListItem
                  title={item}
                />
              )}
              keyExtractor={item => item}
            />
          </List>
        </View>
        <View style={styles.buttonView}>
          <Button
              buttonStyle={styles.buttonStyle}
              rounded
              backgroundColor='#fff'
              title='Logout'
              color='#000'
              textStyle={{color: '#F65352'}}
              onPress={() => { firebase.auth().signOut().then(
                () => {
                  // add modal window
                  Actions.replace('login')
                })
              }}
            />
        </View>
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
            <Text style={styles.settingsText}>Settings</Text>
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
  flexFive: {
    flex: 4,
  },
  flexThree:{
    flex: 3,
  },
  buttonView: {
    flex: 1,
    justifyContent: 'center',
  },
  settingsText: {
    paddingTop: 5,
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  midOne: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subs:{
    fontWeight: 'bold',
    fontSize: 14,
    color: '#000',
  },
  darkOn:{
    fontWeight: 'bold',
    fontSize: 20,
    color: '#000',
  },
  bloodseekerCircle: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: '#F65352',
    alignItems: 'center',
    justifyContent: 'center',
  },
  goldCircle: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: '#ECCD6C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bloodseekerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fixedHeight:{
    height: 120,
  },
  flexOne: {
    flex: 1,
  },
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
  },
  huiFlex1: {
    borderColor: 'black',
    backgroundColor: 'yellow',
    borderWidth: 1,
  },
  textView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  firstName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonStyle: {
    borderWidth: 0.5,
  },

}
const mapStateToProps = ({main}) => {
  const {filled, role, blood, factor, loading} = main
  return {filled, role, blood, factor, loading}
}

export default connect(mapStateToProps, {
  logoutUser
})(ThirdMain)