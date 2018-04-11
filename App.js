import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducer from './src/reducers/index'
import firebase from 'firebase'
import Router from './src/Router'
import ReduxThunk from 'redux-thunk'


export default class App extends React.Component {
    componentWillMount(){
        let config = {
          apiKey: "AIzaSyBwoF-lXtFfYAYFYoti5cTAIxrpbT_nidg",
          authDomain: "maps-f802a.firebaseapp.com",
          databaseURL: "https://maps-f802a.firebaseio.com",
          projectId: "maps-f802a",
          storageBucket: "maps-f802a.appspot.com",
          messagingSenderId: "465718551900",
        };
        firebase.initializeApp(config)
    }
  render() {

    const store = createStore(reducer, {}, applyMiddleware(ReduxThunk))
    return (
        <Provider store={store}>
            <Router />
        </Provider>
    )
  }
}
