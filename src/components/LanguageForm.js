import React, { Component } from 'react';
import { Text, View, Image, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection, Input, Button, Spinner } from './common';
import firebase from 'firebase'
class LanguageForm extends Component {
  getNextScreen() {
    Actions.login();
  }
  render() {
        return (  
      <View style={styles.mainView}>
        <View style={styles.subView1}>
          <View style={styles.imageView}>
            <Image
              source={require('../../assets/logo.png')}
              style={{ alignSelf: 'center', height: 110, width: 285 }}
              resizeMode="stretch"
            />
          </View>
        </View>
        <View style={styles.subView2}>
          <Text style={{ fontSize: 20, color: '#BF4747', fontWeight: 'bold' }}>
            ВЫБЕРИТЕ ВАШ ЯЗЫК
          </Text>
          <Text style={{ fontSize: 20, color: '#BF4747', fontWeight: 'bold' }}>
            ТИЛ ТАНДАГЫЛА
          </Text>
          <View style={styles.flagsView}>
            <Image
              source={require('../../assets/kyrg_flag.png')}
              style={styles.flagImage}
            />
            <Image
              source={require('../../assets/eng_flag.png')}
              style={styles.flagImage}
            />
            <TouchableHighlight onPress={() => this.getNextScreen()}>
              <Image
                source={require('../../assets/russ_flag.png')}
                style={styles.flagImage}
              />
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  mainView: {
    flex: 1,
    alignContent: 'center',
    backgroundColor: '#fff'
  },
  subView1: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  subView2: {
    flex: 1,
    alignItems: 'center'
  },
  flagsView: {
    flexDirection: 'row',
    paddingTop: 20
  },
  flagImage: {
    margin: 5,
    width: 50,
    height: 50
  },
  imageView: {
    flex: 1
  },
  textView: {
    flex: 3,
    backgroundColor: 'yellow'
  },

  text: {
    fontSize: 20,
    fontWeight: 'bold'
  }
};

export default LanguageForm;
