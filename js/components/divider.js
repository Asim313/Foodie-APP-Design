import React, { Component } from 'react'

import {
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Text,
    View
} from 'react-native'

import { Colours } from '../styles'

export default class Divider extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
      let { padded } = this.props;
    return (
        <View style={padded?styles.paddedDivider:styles.divider}>
        </View>
    )
  }
}

const styles = StyleSheet.create({
    divider: {
        flex:1,
        height:1,
        borderBottomWidth:1,
        borderColor: Colours.blue,
        paddingTop:0
    },
    paddedDivider: {
        flex:1,
        height:1,
        borderBottomWidth:1,
        borderColor: Colours.blue,
        paddingTop:10
    },
});
