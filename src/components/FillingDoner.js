import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';
import { Dropdown } from 'react-native-material-dropdown';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'react-native-elements';

class FillingDoner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blood: '',
      positive: '',
      loading: false
    };
  }
  render() {
    let data = [
      {
        value: '1'
      },
      {
        value: '2'
      },
      {
        value: '3'
      },
      {
        value: '4'
      }
    ];
    let data1 = [
      {
        value: '1'
      },
      {
        value: '2'
      }
    ];
    return (
      <View style={styles.mainView}>
        <View
          style={{
            flexDirection: 'row',
            marginLeft: 5,
            marginRight: '90%'
          }}
        >
          <TouchableOpacity
            onPress={() => {
              firebase
                .auth()
                .signOut()
                .then(() => Actions.login());
            }}
            style={{ height: 30, width: 30 }}
          >
            <Icon name="reply" style={{ height: 100, width: 100 }} />
          </TouchableOpacity>
        </View>

        <View style={styles.imageView}>
          <Image
            source={require('../../assets/logo.png')}
            style={{
              alignSelf: 'center',
              height: '50%',
              width: '70%',
              backgroundColor: 'cyan'
            }}
            resizeMode="stretch"
          />
        </View>
        <Text
          style={{
            fontSize: 20,
            marginLeft: 80,
            color: '#BF4747',
            width: 300,
            fontWeight: 'bold'
          }}
        >
          Какой у вас тип крови?
        </Text>

        <View
          style={{
            flex: 1,
            marginLeft: '10%',
            marginRight: '10%',
            backgroundColor: 'blue'
          }}
        >
          <Dropdown
            baseColor="red"
            fontSize={25}
            label="Группа крови"
            data={data}
            onChangeText={blood => this.setState({ blood })}
            value={this.state.blood}
          />
          <Dropdown
            baseColor="red"
            fontSize={25}
            label="Резус-Фактор"
            data={data1}
            onChangeText={factor => {
              this.setState({ factor });
            }}
            value={this.state.factor}
          />
        </View>
        {this.state.loading ? (
          <Spinner size="large" />
        ) : (
          <TouchableOpacity
            onPress={() => {
              this.setState({ loading: true });
              let s = '';
              let email = firebase.auth().currentUser.email;
              for (let i = 0; i < email.length; i++) {
                if (email.charAt(i) === '@') break;
                s += email.charAt(i);
              }
              console.log('blood', this.state.blood);
              console.log('factor', this.state.factor);
              firebase
                .database()
                .ref('/users/')
                .child(s)
                .update({ blood: this.state.blood, factor: this.state.factor })
                .then(() => {
                  Actions.candidatesRec({});
                })
                .catch(() => {
                  if (this.state.blood === '' || this.state.factor === '') {
                    Actions.refresh();
                  }
                });
            }}
            style={{
              width: 150,
              borderRadius: 25,
              backgroundColor: '#BF4747',
              height: 50,
              alignItems: 'center',
              marginTop: 50
            }}
          >
            <Text style={styles.textStyle}>Отправить</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5
  },
  mainView: {
    flex: 1,
    alignContent: 'center',
    paddingTop: '10%',
    backgroundColor: 'yellow'
  },
  subView2: {
    flex: 1,
    alignItems: 'center'
  },
  flagsView: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 20
  },
  flagImage: { margin: 5, width: 50, height: 50 },
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

export default FillingDoner;
