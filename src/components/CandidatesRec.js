import React, { Component } from 'react'
import { Text,View } from 'react-native'
import { connect } from 'react-redux'
import {Actions} from 'react-native-router-flux'
import { emailChanged, passwordChanged, loginUser } from '../actions'
import { Card, CardSection, Input, Button, Spinner } from './common'

class CandidatesRec extends Component {
    onEmailChange(text) {
        this.props.emailChanged(text)
    }
    onPasswordChange(text) {
        this.props.passwordChanged(text)
    }
    onButtonPress() {
        const { email, password } = this.props
        this.props.loginUser({ email, password })
    }
    onButtonPressRegistration() {
        const { email, password } = this.props
        Actions.register()
    }
      onButtonPressUrgent() {
        const { email, password } = this.props
        Actions.urgentSearch()
    }
    renderButton() {
        if (this.props.loading) {
            return <Spinner size='large' />
        }
        return (
                <Button onPress={this.onButtonPress.bind(this)}>
                    Login
                </Button>
        )
    }
    render() {
        return(
          <View>
              
                    <Input
                        label='Email'
                        placeholder='Email@gmail.com'
                        onChangeText={this.onEmailChange.bind(this)}
                        value={this.props.email}
                    />
                    <Input
                        secureTextEntry
                        label='Password'
                        placeholder='password'
                        onChangeText={this.onPasswordChange.bind(this)}
                        value={this.props.password}
                    />
                <Text style={styles.errorTextStyle}>
                    {this.props.error}
                </Text>
                    {this.renderButton()}
                <Button onPress={this.onButtonPressRegistration.bind(this)}>
                    Sign Up
                </Button>
                <Button onPress={this.onButtonPressUrgent.bind(this)}>
                    Urgent Search
                </Button>
                    </View>
        )
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        color: 'red',
        alignSelf: 'center',
    }
}

const mapStateToProps = ({ auth }) => {
    const { email, password, error, loading } = auth
    return { email, password, error, loading }
}

export default connect(mapStateToProps, {
    emailChanged, passwordChanged, loginUser,
})(CandidatesRec)