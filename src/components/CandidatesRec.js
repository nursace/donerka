import React, { Component } from 'react'
import { Text, View, ListView, } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { emailChanged, passwordChanged, loginUser } from '../actions'
import ListItem from './ListItem'

class CandidatesRec extends Component {
  constructor() {
    super()
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: ds.cloneWithRows([
        {text:'Recipient 1', date:'22.12.2017'},
        {text: 'Recipient2', date:'28.12.2017'},
        {text: 'Recipient3', date: '29.12.2017'}]),
    }
  }
  render() {
    return(
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <ListItem text={rowData.text} date={rowData.date}/>}
        style={{marginTop: 30}}
      />
    )
  }
}

const mapStateToProps = ({ auth }) => {
    const { email, password, error, loading } = auth
    return { email, password, error, loading }
}

export default connect(mapStateToProps, {
    emailChanged, passwordChanged, loginUser,
})(CandidatesRec)