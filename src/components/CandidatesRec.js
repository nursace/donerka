import React, { Component } from 'react'
import { ListView, View, Text } from 'react-native'
import { connect } from 'react-redux'
import ListItem from './ListItem'
import _ from 'lodash'
import firebase from 'firebase'
class CandidatesRec extends Component {
    componentWillMount() {

        this.createDataSource(this.props)
    }

    componentWillReceiveProps(nextProps) {
        // nextProps are the next set of props that this component
        // will render with
        // this.props is still the old set of props
        this.createDataSource(nextProps)
    }

    createDataSource({ employees }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        })

        this.dataSource = ds.cloneWithRows(employees)

    }

    renderRow(employee) {
        return <ListItem employee={employee} />
    }

    render() {
        return (<View style = {{}}>
            <ListView
                enableEmptySections
                dataSource={this.dataSource}
               renderRow={this.renderRow}>
s
            </ListView>
            </View>
        )
    }
}

const mapStateToProps = state => {
    let s = ''
    let email1 = firebase.auth().currentUser.email
    for(let i = 0; i < email1.length; i++) {
      if (email1.charAt(i) === '@') break;
      s += email1.charAt(i)
    }
    let user ;
    let appropriatives = []
    firebase.database().ref(`/users/`)
    .on('value',function(snapshot){
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
                appropriatives.push(app)
            }    
            
        }) 
    }
)
    const employees = _.map(appropriatives, (val, uid) => {
        return { ...val, uid }
    })
    return { employees }
}

export default connect(mapStateToProps, {  })(CandidatesRec)
