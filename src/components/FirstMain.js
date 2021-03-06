import React, { Component } from 'react';
import { ScrollView,Text,Alert,ListView,Platform,FlatList, View,Animated,Easing, Image,TouchableWithoutFeedback,TouchableHighlight,TouchableOpacity,Dimensions, TouchableNativeFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {} from '../actions';
import firebase from 'firebase';
import {connect} from 'react-redux';
import {Spinner} from './common';
import { List, ListItem, SearchBar, Icon} from 'react-native-elements';

//header marginTop : 20
class FirstMain extends Component {
  constructor(props){
      super(props)
      
      const dataSource = new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
        });
      this.state = {
          x: null,
          loading: false,
          data: [],
          page: 1,
          seed: 1,
          error: null,
          refreshing: false, 
          logo :require('../../assets/logo.png'),     
          role : null  
      }

  }

  componentWillMount(){
if(firebase.auth().currentUser){
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
    let role
    firebase.database().ref(`users/${d.toLowerCase()}`).once('value',snapshot =>{
      role = snapshot.val().role
    })
    let ss
    if(role === 'donor')
    ss=true
    else 
    ss=false    
    this.setState({role,x:ss})
    if(this.state.x)
    this.makeRemoteRequestDonor()
    else
    this.makeRemoteRequestRecipient()
  }
  }
  componentDidMount(){
   if(firebase.auth().currentUser){
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
    let role
    firebase.database().ref(`users/${d.toLowerCase()}`).once('value',snapshot =>{
      role = snapshot.val().role
    })
    let ss
    if(role === 'donor')
    ss=true
    else 
    ss=false    
    this.setState({role,x:ss})
    if(this.state.x)
    this.makeRemoteRequestDonor()
    else
    this.makeRemoteRequestRecipient()
  }
  }
 
  makeRemoteRequestRecipient = () =>{

let list = [], i =0
firebase.database().ref(`users`).once('value',snapshot =>{
snapshot.forEach(item => {
let v=item.val()
if(v.lastRequestTime) {
  list.push(v)
}
}
)
list.sort((s1,s2) => {
  return s1.lastRequestTime - s2.lastRequestTime
})
list.forEach(item => {
  item.i = ++i
})

if(list.length >=20){
  list = list.slice(0,20)
}
this.setState({
  data: list,
  error : null,
  loading : false,
  refreshing:false
})
}).catch(error => {
  this.setState({
    error, loading: false
  })
})

  }
  makeRemoteRequestDonor = () => {
    let a = [], i = 0
    firebase.database().ref('users').once('value', snapshot => {
      snapshot.forEach(item => {
        let v = item.val()
        if(v.role === 'donor')
          a.push(v)
        
      })
      a.sort((hui_1, hui_2) => {
        return hui_2.rescue_count - hui_1.rescue_count
      })
      a.forEach(hui =>{
        hui.i = ++i
      })
      if(a.length >= 20) {
        a = a.slice(0, 20)
      }
      this.setState({
        data: a,
        error: null,
        loading: false,
        refreshing: false,
      })
    }).catch(error => {
      this.setState({
        error, loading: false
      })
    })
  }
 
  handleRefresh = () => {
    this.setState({
      page: 1,
      refreshing: true,
      seed: this.state.seed + 1
    },
      () => {
     Actions.refresh()
      })
  }
 
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          backgroundColor: '#CED0CE',
        }}
      />)
  }
 
  renderFooter = () => {
    if (!this.state.loading) return null
    return (
      <View style={{paddingVertical: 20, borderTopWidth: 1, borderColor: '#CED0Ce'}}>
        <ActivityIndicator animating size='large'/>
      </View>
    )
  }
 
  _switch(x) {
    this.setState({loading : true})
    this.setState({x,loading : false})
  }
  renderContent(){
    let {x} = this.state    
    return (
      <View style={styles.mostView}>
        <View style={styles.header}>
          <View style={styles.secondView}>
            <TouchableNativeFeedback onPress={() => {
              this._switch(true)
              this.makeRemoteRequestDonor()
            }}>
              <View style={ x ? styles.activeTab : styles.inactiveTab }>
                <Text style={ x ? styles.active : styles.inactive }>Топ доноры</Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={() => {
              this._switch(false)
              this.makeRemoteRequestRecipient()
            }}>
              <View style={ !x ? styles.activeTab : styles.inactiveTab }>
                <Text style={ !x ? styles.active : styles.inactive }>Срочные заявки</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
        <ScrollView>
        <List
          containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}
        >
        {this.state.x ?
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem
              roundAvatar
              title={
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{fontSize: 18, color: '#464646'}}>{item.firstName} {item.lastName}</Text>
                </View>
              }
              subtitle={
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{fontSize: 13}}>количество спасений:</Text>
                  <Text style={{fontSize: 13, color: '#e5385d', fontWeight: '600'}}> {item.rescue_count}</Text>
                </View>
              }
              containerStyle={{ borderBottomWidth: 0 }}
              onPress={() => {
                const h=item
                Actions.push('profileView',{item :h})
              }}
              leftIcon={<View style={styles.leftIcon}><Text style={styles.leftIconText}>{item.i}</Text></View>}
            />
          )}
          keyExtractor={item => item.email}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
        /> : 
      
      <FlatList
      data={this.state.data}
      renderItem={({ item }) => (
        <ListItem
          roundAvatar
          title={
            <View>
              <Text style={{fontSize: 18, color: '#464646'}}>{item.firstName} {item.lastName}</Text>
            </View>}
          containerStyle={{ borderBottomWidth: 0 }}
          onPress={() => {
      const h=item
      Actions.push('profileView',{item :h})
      
          }}
          leftIcon={<View style={styles.leftIcon}><Text style={styles.leftIconText}>{item.i}</Text></View>}
          
        />
      )}
      keyExtractor={item => item.email}
      ItemSeparatorComponent={this.renderSeparator}
      ListHeaderComponent={this.renderHeader}
      ListFooterComponent={this.renderFooter}
      refreshing={this.state.refreshing}
      onRefresh={this.handleRefresh}
    /> }
      </List>
      </ScrollView>
      </View>
    )

  }
 
  render(){  return (
    <View style={styles.container}>

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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
  hui: {
    alignSelf: 'center',
    width: Dimensions.get('window').width * 0.3,
    height: Dimensions.get('window').height / 25,
    resizeMode: 'stretch',
    marginTop: 15,
  },
  midOne: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  midOneText: {
    fontSize: 18,
    color: '#fff',
  },
  header: {
    backgroundColor: '#e5385d',
    height: 50,
  },
  secondView: {
    flex: 1,
    flexDirection: 'row',
  },
  active: {
    color: '#FFF',
    fontSize: 16,
  },
  inactive: {
    color: '#5a5a5a',
    fontSize: 16,
  },
  row: {
    padding: 10,
    height: 44,
  },
  leftIcon: {
    marginRight: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftIconText:{
    fontSize: 18,
    color: '#F5A623',
  },
  rightIcon: {

    justifyContent: 'center',
    alignItems: 'center',
  },
  rightIconText: {
    fontSize: 20,
    padding: 14,
    color: '#e5385d',
  },
  mostView: {
    flex: 1,
  },
  infoViewStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  iconStyle: {
    color: '#fff',
  },
  activeTab: {
    flex: 1,
    justifyContent:'center',
    alignItems: 'center',
    borderBottomWidth: 5,
    borderColor: '#fff'
  },
  inactiveTab: {
    flex: 1,
    justifyContent:'center',
    alignItems: 'center',
    borderBottomWidth: 5,
    borderColor: '#e5385d'
  }
}
const mapStateToProps = ({ main }) => {
  const { filled,role,blood,factor,loading } = main
  return {filled,role,blood,factor,loading}
}

export default connect(mapStateToProps, {
})(FirstMain)