import React, {Component} from 'react'
import ReactNative, {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Image,
  Dimensions,
} from 'react-native'
import { List, ListItem, SearchBar, Icon} from 'react-native-elements'
import firebase from 'firebase'
 
class Top extends Component {
  constructor(props) {
    super(props)
    this.state = {
      x: true,
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
    }
  }
 
  componentDidMount(){
    this.makeRemoteRequest()
  }
 
  makeRemoteRequest = () => {
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
      console.log(a)
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
        this.makeRemoteRequest()
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
    this.setState({x})
  }
 
  render() {
    let {x} = this.state
    return (
      <View style={styles.mostView}>
        <View style={styles.header}>
          <View style={{flex: 2, flexDirection: 'row'}}>
            <View style={styles.infoViewStyle}>
              <Icon type='feather' name='info' color='#fff' />
            </View>
            <View style={styles.midOne}>
              <Image source={require('../../assets/logo.png')} style={styles.hui}/>
            </View>
            <View style={}>
            </View>
          </View>
          <View style={styles.secondView}>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Text onPress={() => {
                this._switch(true)
              }} style={
                x ? styles.active : styles.inactive
              }>TOP DONORS</Text>
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Text onPress={() => {
                this._switch(false)
              }} style={
                !x ? styles.active : styles.inactive
              }>REQUESTS</Text>
            </View>
          </View>
        </View>
        <List
          containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}
        >
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem
              roundAvatar
              title={`${item.firstName} ${item.lastName}`}
              subtitle={item.email}
              containerStyle={{ borderBottomWidth: 0 }}
              onPress={() => console.log(item.email)}
              leftIcon={<View style={styles.leftIcon}><Text style={styles.leftIconText}>{item.i}</Text></View>}
              rightIcon={<View style={styles.rightIcon}><Text style={styles.rightIconText}>{item.rescue_count}</Text></View>}
            />
          )}
          keyExtractor={item => item.email}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
        />
      </List>
      </View>
    )
  }
}
 
const styles = {
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
    backgroundColor: '#F65352',
    height: 90,
  },
  secondView: {
    flex: 1,
    flexDirection: 'row',
  },
  active: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
  },
  inactive: {
    color: '#fff',
    fontSize: 14,
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
    backgroundColor: '#F65352',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
  },
  rightIconText: {
    fontSize: 20,
    padding: 14,
    color: '#fff',
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
  }
}
 
export default Top