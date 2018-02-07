import React, {Component} from 'react'
import {View, Text, Dimensions, TouchableOpacity} from 'react-native'
import {Actions} from 'react-native-router-flux'
import {Icon, Button, ListItem} from 'react-native-elements'
import firebase from 'firebase'

export default class EditProfile extends Component {
  constructor(props) {
    super(props)
  }

  renderContent() {
    return (
      <View style={styles.afterHeader}>
        <View style={[styles.flexTwo, {justifyContent: 'center', alignItems: 'center'}]}>
          <Icon name='user' type='entypo' raised size={50}/>
        </View>
        <View style={styles.flexTwo}>
          <Text style={styles.almostRedText}>You can change your role</Text>
          <Button
            title='Change to RECIPIENT (xor me)'
            rounded
            backgroundColor='#4A90E2'
            onPress={() => {
              let {hui} = this.props
              let s = hui.email
              s = s.replace('.','+')
              s = s.substr(0, s.indexOf('@'))
              let role = hui.role === 'donor' ? 'recipient' : 'donor'
              hui.role = role
              firebase.database().ref(`users/${s}`).set(hui)
            }}
          />
        </View>
        <View style={styles.flexThree}>
          <View style={styles.itemSection}>
            <View style={styles.flexOne}>
              <Text style={styles.leftTitle}>First name: </Text>
            </View>
            <View style={styles.flexOne}>
              <Text>{this.props.hui.firstName}</Text>
            </View>
          </View>
          <View style={styles.itemSection}>
            <View style={styles.flexOne}>
              <Text style={styles.leftTitle}>Last name: </Text>
            </View>
            <View style={styles.flexOne}>
              <Text>{this.props.hui.lastName}</Text>
            </View>
          </View>
          <View style={styles.itemSection}>
            <View style={styles.flexOne}>
              <Text style={styles.leftTitle}>Email:</Text>
            </View>
            <View style={styles.flexOne}>
              <Text>{this.props.hui.email}</Text>
            </View>
          </View>
          <View style={styles.itemSection}>
            <View style={styles.flexOne}>
              <Text style={styles.leftTitle}>Phone Number:</Text>
            </View>
            <View style={styles.flexOne}>
              <Text>{this.props.hui.phone}</Text>
            </View>
          </View>
        </View>
        <View style={{flex: 1, marginBottom: 10}}>
          <TouchableOpacity style={styles.itemSection}>
            <View style={styles.flexOne}>
              <Text style={styles.leftTitle}>Change my password</Text>
            </View>
            <View style={[styles.flexOne, {alignItems: 'flex-end'}]}>
              <Icon name='chevron-small-right' type='entypo' />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.mostView}>
        <View style={styles.headerView}>
          <View style={styles.arrowView}>
            <Icon onPress={() => Actions.pop()} color='#fff' name='chevron-left' type='entypo' size={40}/>
          </View>
          <View style={{flex: 6, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={styles.title}>Edit Profile</Text>
          </View>
          <View style={{flex: 1,}}/>
        </View>
        {this.renderContent()}
      </View>
    )
  }
}

const styles = {
  leftTitle: {
    paddingLeft: 8,
    fontSize: 16,
    fontStyle: 'italic',
  },
  itemSection: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderWidth: 0.2,
  },
  arrowView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  almostRedText: {
    paddingBottom: 15,
    color: '#F65353',
    fontSize: 16,
    alignSelf: 'center',
  },
  flexOne: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  flexTwo: {
    justifyContent: 'center',
    marginBottom: 10,
    backgroundColor: '#fff',
    flex: 2,
  },
  flexThree: {
    flex: 3,
    marginBottom: 10,
  },
  afterHeader: {
    flex: 1,
  },
  headerView: {
    backgroundColor: '#F65352',
    flexDirection: 'row',
    height: Dimensions.get('window').height / 10.5
  },
  title: {
    paddingTop: 5,
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  mostView: {
    flex: 1,
    backgroundColor: 'grey',
  }
}