import React, {Component} from 'react';
import ReactNative, {Image} from 'react-native';

const { View, TouchableHighlight, Text } = ReactNative;

class ListItem extends Component {

  render() {
      console.log(this.props.item)
    return (
<View style={styles.li}>
          <View style={styles.radioUserName}>
            <Text style={styles.songTitle}>{this.props.item.email}</Text>
          </View>
        </View>
    );
  }
}
var styles = {
    li: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#f11d45',
        borderRadius: 13,
        borderWidth: 1,
        paddingLeft: 7,
        paddingTop: 14,
        paddingBottom: 9,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 5,
        marginTop: 8,
        backgroundColor: '#f25170'
      },
      songTitle: {
        fontSize: 16,
        color: 'black',
      },
      radioUserName: {
        flex: 1,
        marginLeft: 16,
        marginRight: 20,
      },
    }
module.exports = ListItem;