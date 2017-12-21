import React, { Component } from 'react'
import { ListView, View, Text, FlatList } from 'react-native'
import { connect } from 'react-redux'
import ListItem from './ListItem'
import firebase from 'firebase'
import { dataSourceChanged } from '../actions'
import { Spinner } from './common'

class CandidatesRec extends Component {

    constructor(props) {
        super(props)
        this.state = {
            ok: false,
            snapshot: {},
        }
    }

    componentWillMount() {
        firebase.database().ref(`/users/`)
            .once('value')
            .then(snapshot => {
                this.setState({ snapshot, ok: true })
            })
    }

    mainRender() {
        if (this.state.ok) {
            let s = ''
            let email1 = firebase.auth().currentUser.email
            for (let i = 0; i < email1.length; i++) {
                if (email1.charAt(i) === '@') break;
                s += email1.charAt(i)
            }
            let user = {}
            var appropriatives = []
            let { snapshot } = this.state
            console.log('*', this.state.snapshot)
            snapshot.forEach(childSnapshot => {
                let obj = childSnapshot.val()
                if (obj.email === firebase.auth().currentUser.email) {
                    user = obj
                }
            })
            snapshot.forEach(childSnapshot => {
                let obj = childSnapshot.val()
                if (obj.role != user.role && obj.blood === user.blood && user !== obj) {
                    let app = { email: obj.email, fullname: obj.fullname, phone: obj.phone, username: obj.username }
                    appropriatives.push(app)
                }
            })
            return (
                <FlatList
                    data={appropriatives}
                    renderItem={({ item }) => {
                        <ListItem item={item} />
                    }}
                    keyExtractor={item => item.email}
                />
            )
        }
        else {
            return <Spinner size='large' />
        }
    }

    render() {
        return this.mainRender()
    }

    _renderItem(item) {
        return (
            <ListItem item={item} />
        );
    }

}


const styles = {
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

const mapStateToProps = ({ auth }) => {
    const { dataSource } = auth
    return { dataSource }
}
export default connect(mapStateToProps, { dataSourceChanged })(CandidatesRec)
