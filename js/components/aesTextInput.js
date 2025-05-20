import React, { Component } from 'react'

import {
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Text,
    View, Image, TextInput, Platform,
} from "react-native";

import { Colours } from '../styles'
import UserStore from "../stores/SiteStore";

export default class AESTextInput extends React.Component {
    render() {
        let { title, placeholder, secureTextEntry, disabled, value, onChangeText, subHeader, keyboardType, titleTextColoured, warning, color, toolTip, enablePlaceholder, containerStyle } = this.props;
        let { currentMode } = UserStore;

        return (
            <View style={containerStyle}>
                {!subHeader &&
                <Text style={[styles.textInputHeader, {color:titleTextColoured ? Colours[currentMode].primaryColour : Colours.black}]}>{title}</Text>
                }
                {subHeader &&
                <Text style={{marginBottom: 20}}>
                    <Text style={[styles.textInputHeader,{color:titleTextColoured ? Colours[currentMode].primaryColour : Colours.black}]}>{title}</Text>
                    <Text style={styles.textInputSubHeader}>{title?` ${subHeader}`:subHeader}</Text>
                </Text>
                }
                <TextInput
                        // placeholderTextColor={Colours.gray}
                        secureTextEntry={secureTextEntry}
                        placeholder={`${enablePlaceholder ? placeholder : ''}`}
                        style={[styles.textInput,{borderColor:warning?Colours.warning:color?color:Colours[currentMode].primaryColour},{color:disabled?Colours.gray:Colours.black}]}
                        underlineColorAndroid={warning?Colours.warning:color?color:Colours[currentMode].primaryColour}
                        value={value}
                        onChangeText={onChangeText}
                        keyboardType={keyboardType}
                        editable={!disabled}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textInputHeader:{
        fontSize:18,
        paddingBottom: 10,
        fontFamily:'Roboto-Medium'
    },
    textInput:{
        color:Colours.black,
        fontSize:16,
        fontFamily:'Roboto-Regular',
        borderBottomWidth:Platform.OS==='ios'?1:0,
        paddingBottom:10
    },
    textInputSubHeader:{
        color:Colours.black,
        fontSize:16,
        paddingBottom: 20,
        fontFamily:'Roboto-Regular'
    },
});
