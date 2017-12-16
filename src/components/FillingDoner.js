import React, { Component } from 'react'
import { Text, View, Image,TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { emailChanged, passwordChanged, loginUser } from '../actions'
import { Card, CardSection, Input, Button, Spinner } from './common'
import { Dropdown } from 'react-native-material-dropdown';
class FillingDoner extends Component {
    render() {
        let data = [{
          value: '1',
        }, {
          value: '2',
        }, {
          value: '3',
        },
    {
        value: '4'
    }
    ];
    return (
      <View style={styles.mainView}>
    
          <View style={styles.imageView}>
            <Image source={require('../../assets/logo.png')}
                   style={{alignSelf: 'center',  height: 110, width: 285}}
                   resizeMode='stretch'
              />
          </View>
          <View style = {{flex:1}}>
          <Dropdown
        label='Группа крови'
        data={data}
      />
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
    paddingTop: 70,
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

}

export default FillingDoner
