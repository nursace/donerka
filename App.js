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
            apiKey: "AIzaSyCOanJGChFRmdRbVgUBoFpZXBIgxwd4YA0",
            authDomain: "donerka-5dc8f.firebaseapp.com",
            databaseURL: "https://donerka-5dc8f.firebaseio.com",
            projectId: "donerka-5dc8f",
            storageBucket: "donerka-5dc8f.appspot.com",
            messagingSenderId: "1009366378628"
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
