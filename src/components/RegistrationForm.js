import React, { Component } from 'react'
import { Text } from 'react-native'
import { connect } from 'react-redux'
import { emailChanged, passwordChanged, registerUser } from '../actions'
import { Card, CardSection, Input, Button, Spinner } from './common'

class RegistrationForm extends Component {
    onEmailChange(text) {
        this.props.emailChanged(text)
    }
    onPasswordChange(text) {
        this.props.passwordChanged(text)
    }
    onButtonPress() {
        const { email, password } = this.props
        this.props.registerUser({ email, password })
    }
    renderButton() {
        if (this.props.loading) {
            return <Spinner size='large' />
        }
        return (
                <Button onPress={this.onButtonPress.bind(this)}>
                    Sign Up
                </Button>
        )
    }
    render() {
        return(
            <Card>
                <CardSection>
                    <Input
                        label='Email'
                        placeholder='Email'
                        onChangeText={this.onEmailChange.bind(this)}
                        value={this.props.email}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        secureTextEntry
                        label='Password'
                        placeholder='password'
                        onChangeText={this.onPasswordChange.bind(this)}
                        value={this.props.password}
                    />
                </CardSection>
                <Text style={styles.errorTextStyle}>
                    {this.props.error}
                </Text>
                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
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
    emailChanged, passwordChanged, registerUser,
})(RegistrationForm)