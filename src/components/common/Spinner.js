import React, { Component } from 'react'
import { View, ActivityIndicator } from 'react-native'

class Spinner extends Component {
    render(){
        const { size } = this.props
        return(
            <View style={styles.SpinnerStyle}>
                <ActivityIndicator color='#fff' size={size || 'large'}/>
            </View>
        )
    }
}

const styles = {
    SpinnerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
}

export { Spinner }
