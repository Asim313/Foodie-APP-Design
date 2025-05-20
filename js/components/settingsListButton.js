import React, { Component } from 'react'

import {
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Text,
    View, Image
} from 'react-native'

import { Colours } from '../styles'
import UserStore from "../stores/SiteStore";

export default class SettingsListButton extends React.Component {
  render() {
      let { title, onPress } = this.props;
      let{ currentMode } = UserStore;

    return (
        <TouchableOpacity onPress={onPress} style={[styles.optionContainer,{borderColor: Colours[currentMode].primaryColour}]}>
            <Text numberOfLines={1} style={styles.optionsText}>{title}</Text>
            <Image source={require('../../assets/images/header/rightArrow.png')} style={{tintColor:Colours[currentMode].primaryColour, height: 30, width: '10%'}}/>
        </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
    optionsText:{
        color:Colours.black,
        fontSize:22,
        fontFamily:'Roboto-Regular',
        width: '85%'
    },
    optionContainer:{
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth:1,
        height:50,
        marginTop:20,
        justifyContent: 'space-between'
    },
});
