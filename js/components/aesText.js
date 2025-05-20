import React, { Component } from 'react'

import {
    Text,
    View
} from 'react-native'

import { Colours } from '../styles'

export default class AESText extends React.Component {
    render() {
        let { content, size, family, color,containerStyle } = this.props;

        return (
            <View style={containerStyle}>
                <Text style={{
                    color:color,
                    fontSize:size,
                    fontFamily:family
                }}>
                    {content}
                </Text>
            </View>
        )
    }
}
