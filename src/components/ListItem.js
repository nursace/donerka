import React, {Component} from 'react';
import ReactNative, {Image} from 'react-native';
import {Icon} from 'react-native-elements'
const { View, TouchableHighlight, Text } = ReactNative;

class ListItem extends Component {

  render() {
    return (
<View style={styles.li}>
          <View style={styles.name}>
            <Text style={styles.title}>{this.props.item.username}</Text>
          </View>
<View style={{marginLeft:210,width:30,height:30}}>
          <Icon name = 'ios-arrow-forward-outline' type='ionicon' />
      </View>
        </View>
    );
  }
}
var styles = {
    li: {
flex : 1,
      flexDirection: 'row',
    
        alignItems: 'center',
        borderColor: 'black',
        borderRadius: 13,
        borderBottomWidth: 1,
        margin : 15,
      },
      title: {
        fontSize: 20,
        color: 'black',
        marginLeft : 5
      },
      name: {
   margin : 8,
      },
    }
export default ListItem