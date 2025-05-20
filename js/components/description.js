import React, { Component, Fragment } from 'react'

import {
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Text,
    View
} from 'react-native'

import { Colours } from '../styles'
import UserStore from "../stores/SiteStore";

export default class Description extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {

        const { text } = this.props

        let { currentMode } = UserStore;

        return (
                <View style={{marginVertical:20}}>
                <Text styles={styles.textInstructions}>{text}</Text>
                </View>
        )
    }
}

const styles = StyleSheet.create({
    textInstructions:{
        color:Colours.black,
        fontSize:18,
        fontFamily:'Roboto-Regular'
}
});
