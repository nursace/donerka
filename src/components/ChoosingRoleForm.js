import React, { Component } from 'react'
import { Text } from 'react-native'
import { connect } from 'react-redux'
import { emailChanged, passwordChanged, registerUser } from '../actions'
import { Card, CardSection, Input, Button, Spinner } from './common'

class ChoosingRoleForm extends Component {

    render() {
        return(
            <Card>
                    <Button>
                    Донор
                </Button>
                <Button>
                    Рецепиент
                </Button>
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
})(ChoosingRoleForm)