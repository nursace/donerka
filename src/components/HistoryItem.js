import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';

class HistoryItem extends Component {
  onItemPressed(mail) {
    let d = '';
    for(let i = 0; i < mail.length; i++) {
      if (mail.charAt(i) === '@') break;
      if(mail.charAt(i)===`'`)
        d+='=';
      else if(mail.charAt(i)==='.')
        d+='+';
      else
        d += mail.charAt(i);
    }

    firebase.database().ref(`/users/${d}`).once('value', (snapshot) => {
      const {
        blood,
        factor,
        email,
        role,
        firstName,
        lastName,
        description,
        rescueCount,
      } = snapshot.val();

      const item = {
        blood,
        factor,
        email,
        role,
        firstName,
        lastName,
        description,
        rescueCount,
      };

      Actions.push('profileView', { item });
    });
  }

  getDatePublished(date) {
    let a = new Date(date);
    let mm = a.getMonth() + 1;
    let dd = a.getDate();

    return [a.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
        ].join('/');
  }

  getCategory(cat) {
    switch (cat) {
      case 'submittedBlood':
        return 'предложено';
      case 'confirmedApplications':
        return 'получено';
      default:
        return 'отправлено';
    }
  }

  render() {
    const {
      date,
      image,
      email,
      cat,
    } = this.props.item;

    return (
      <TouchableHighlight
        onPress={() => this.onItemPressed(email)}
        underlayColor='#f7f7f7'
      >
        <View style={styles.container}>
          <View style={styles.imageBlock}>
            <Image
              source={{ uri: image }}
              style={styles.image}
            />
          </View>
          <View style={styles.textBlock}>
            <Text style={styles.title}>{email}</Text>
            <View style={styles.meta}>
              <Text style={styles.category}>{this.getCategory(cat)}</Text>
              <Text
              style={styles.date}
              >
              {this.getDatePublished(date)}
              </Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  imageBlock: {
    width: 75,
    height: 75,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBlock: {
    flex: 4,
    justifyContent: 'center',
  },
  title: {
    color: '#2D2D2D',
    fontSize: 17,
    marginBottom: 2,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
  },
  meta: {
    flexDirection: 'row',
  },
  date: {
    fontSize: 14,
    color: '#999',
  },
  category: {
    fontSize: 14,
    color: '#666',
    marginRight: 3,
    fontWeight: '500'
  }
});

export default HistoryItem;
