import React, {Component} from 'react'
import {View, Text, Dimensions, TouchableOpacity} from 'react-native'
import {Actions} from 'react-native-router-flux'
import {Icon, Button, ListItem} from 'react-native-elements'
import firebase from 'firebase'

export default class EditProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      role : null,
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber : ''
    }
  }

  componentWillMount(){
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
    var that = this
    let role
    firebase.database().ref(`users/${d.toLowerCase()}`).once('value',snapshot =>{
      role = snapshot.val().role
      that.setState({role,firstName: snapshot.val().firstName,lastName:snapshot.val().lastName,email : snapshot.val().email,phoneNumber:snapshot.val().phone})
      
    })
  }
  renderContent() {
    return (
      <View style={styles.afterHeader}>
        <View style={[styles.flexTwo, {justifyContent: 'center', alignItems: 'center'}]}>
          <Icon name='user' type='entypo' raised size={50}/>
        </View>
        <View style={styles.flexTwo}>
          <Text style={styles.almostRedText}>Вы можете поменять вашу роль</Text>
          <Button
            title={this.state.role==='recipient' ?  'Изменить на донора' : 'Изменить на реципиента'}
            rounded
            backgroundColor='#4A90E2'
            onPress={() => {
              let {hui} = this.props
              let s = ''
              email1 = firebase.auth().currentUser.email
              for(let i = 0; i < email1.length; i++) {
                if (email1.charAt(i) === '@') break;
                if(email1.charAt(i)===`'`)
                s+='='
                else if(email1.charAt(i)==='.')
                s+='+'
                else
              s += email1.charAt(i)
              } 
              let role = hui.role === 'donor' ? 'recipient' : 'donor'
              hui.role = role
              var that = this
              firebase.database().ref(`users/${s}`).update(hui)
              .then(()=>{
                that.setState({role})
              })
              .then(()=>{
                if(that.state.role==='donor'){
                  firebase.database().ref(`users/${s}/`).update({visible : false,requestTime : null})
                }
              })
            }}
          />
        </View>
        <View style={styles.flexThree}>
          <View style={styles.itemSection}>
            <View style={styles.flexOne}>
              <Text style={styles.leftTitle}>Имя: </Text>
            </View>
            <View style={styles.flexOne}>
              <Text>{this.state.firstName}</Text>
            </View>
          </View>
          <View style={styles.itemSection}>
            <View style={styles.flexOne}>
              <Text style={styles.leftTitle}>Фамилия: </Text>
            </View>
            <View style={styles.flexOne}>
              <Text>{this.state.lastName}</Text>
            </View>
          </View>
          <View style={styles.itemSection}>
            <View style={styles.flexOne}>
              <Text style={styles.leftTitle}>Номер телефона:</Text>
            </View>
            <View style={styles.flexOne}>
              <Text>{this.state.phoneNumber}</Text>
            </View>
          </View>
        </View>
        <View style={{flex: 1, marginBottom: 10}}>
          <TouchableOpacity style={styles.itemSection}>
            <View style={styles.flexOne}>
              <Text style={styles.leftTitle}>Изменить мой пароль</Text>
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
            <Icon onPress={() => Actions.thirdMain()} color='#fff' name='chevron-left' type='entypo' size={40}/>
          </View>
          <View style={{flex: 6, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={styles.title}>Редактировать профиль</Text>
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