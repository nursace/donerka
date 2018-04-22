import React, { Component } from 'react';
import { FlatList,Dimensions,Image, View, StyleSheet, Text } from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-redux';
import _ from 'lodash';
import HistoryItem from './HistoryItem';


class Ads extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    if(firebase.auth().currentUser){
    const email = firebase.auth().currentUser.email;
    let d = '';
    for(let i = 0; i < email.length; i++) {
      if (email.charAt(i) === '@') break;
      if(email.charAt(i)===`'`)
        d+='=';
      else if(email.charAt(i)==='.')
        d+='+';
      else
        d += email.charAt(i);
    }

    return firebase.database().ref(`/users/${d}`).once('value', (snapshot) => {
      let {
        confirmedApplications,
        submittedBlood,
        sentBlood
      } =  snapshot.val();
      let res = [];
      data = { confirmedApplications, submittedBlood, sentBlood };
      data = _.map(data, (val, cat) => {
        for (let key in val) {
          let obj = val[key];
          res.push({ ...obj, cat });
        }
      });

      this.setState({ history: res });
    });
  }
  }


  //получено предложено отправлено???
  render() {
    return (
      <View style={styles.container}>
              <Image source={require('../../assets/1.jpg')} style={{marginTop: 30,width: Dimensions.get('window').width*0.2,height: Dimensions.get('window').height/8,resizeMode:'stretch'}} />
              <Image source={require('../../assets/2.jpg')} style={{marginTop: 30,width: Dimensions.get('window').width*0.2,height: Dimensions.get('window').height/8,resizeMode:'stretch'}} />
              <Image source={require('../../assets/3.jpg')} style={{marginTop: 30,width: Dimensions.get('window').width*0.2,height: Dimensions.get('window').height/8,resizeMode:'stretch'}} />
              <Image source={require('../../assets/4.png')} style={{marginTop: 30,width: Dimensions.get('window').width*0.2,height: Dimensions.get('window').height/8,resizeMode:'stretch'}} />
              
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent : 'center',
    alignItems : 'center'
  }
});

const mapStateToProps = (state) => {
  const { role } = state.main;

  return { role };
};

export default connect(mapStateToProps)(Ads);
