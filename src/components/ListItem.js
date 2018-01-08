import React, {Component} from 'react';
import ReactNative, {Image} from 'react-native';

const { View, TouchableHighlight, Text } = ReactNative;

class ListItem extends Component {

  render() {
    return (
<View style={styles.li}>
          <View style={styles.name}>
            <Text style={styles.title}>{this.props.item.email}</Text>
          </View>
        </View>
    );
  }
}
var styles = {
    li: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent : 'center',
        borderColor: 'red',
        borderRadius: 13,
        borderWidth: 1,
        paddingLeft: 7,
        paddingTop: 14,
        paddingBottom: 9,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 5,
        marginTop: 8,
        backgroundColor: '#fff'
      },
      title: {
        fontSize: 20,
        color: 'black',
      },
      name: {
        flex: 1,
        marginBottom:10,
        marginLeft: 16,
        marginRight: 20,
      },
    }
export default ListItem