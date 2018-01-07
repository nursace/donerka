import React, { Component } from 'react'
import { ListView, View, Text } from 'react-native'
import { connect } from 'react-redux'
import ListItem from './ListItem'
import firebase from 'firebase'
class CandidatesRec extends Component {

    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state = {
          dataSource: dataSource
        };
      }
      componentDidMount() {
        let s = ''
        let email1 = firebase.auth().currentUser.email
        for(let i = 0; i < email1.length; i++) {
          if (email1.charAt(i) === '@') break;
          s += email1.charAt(i)
        }
        let user ;
        firebase.database().ref(`/users/`)
        .on('value',function(snapshot){
            var appropriates = []            
            snapshot.forEach(function(childSnapshot) {
                let obj = childSnapshot.val()
                
                if(obj.email === firebase.auth().currentUser.email){
                    user=obj
                }    
            })
            snapshot.forEach(function(childSnapshot) {
                let obj = childSnapshot.val()
                
                if(obj.role != user.role && obj.blood === user.blood && user !== obj){
                    let app = {email : obj.email ,fullname : obj.fullname, phone : obj.phone,username:obj.username }
                    appropriates.push(app)
                }    
                
            }) 
            console.log(appropriates)
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(appropriates)
              });   
        }
    )
      

      }

    render() {
        return (<View style = {styles.container}>
                   <ListView
                   dataSource={this.state.dataSource}
                   renderRow={this._renderItem.bind(this)}
                   enableEmptySections={true}
                   style={styles.songList} />
            </View>
        )

    }

    _renderItem(item) {
        
                          return (
                              <ListItem item={item}  />
                            );
                          }
                          
}

    
    const styles= {
        container: {
            flex: 1,
            backgroundColor: '#000',
          },
        songList: {
            flex: 1,
            marginRight: 10,
            marginLeft: 10,
          },
    }

const mapStateToProps = state => {
    
    return {  }
}

export default connect(mapStateToProps, {  })(CandidatesRec)
