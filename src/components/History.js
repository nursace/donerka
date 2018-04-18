import React, { Component } from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-redux';
import _ from 'lodash';
import HistoryItem from './HistoryItem';

class History extends Component {
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
        <FlatList
          data={this.state.history}
          renderItem={({ item }) => (
            <HistoryItem item={item} />
          )}
          keyExtractor={(item) => item.date * Math.random()}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  }
});

const mapStateToProps = (state) => {
  const { role } = state.main;

  return { role };
};

export default connect(mapStateToProps)(History);
