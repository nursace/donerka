import React, { Component } from 'react'
import { Scene, Router, Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import LoginForm from './components/LoginForm'

class RouterComponent extends Component {
    render() {
        return (
            <Router sceneStyle={{paddingTop: 60}}>
                <Scene key='root'>
                        <Scene key='login' component={LoginForm} title='Please Login'/>
                   
                </Scene>
            </Router>
        )
    }
}

export default connect(null, { clearContent })(RouterComponent)
