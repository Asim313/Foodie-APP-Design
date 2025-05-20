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

export default class SiteButton extends React.Component {

    constructor(props) {
        super(props)
    }

    hideText(text){
        return new Array(text.length + 1).join('*');
    }

    formatByType(type,text){
        switch(type){
            case 'time': return `${text} seconds`;
            default: return text;
        }
    }

    getIcon(icon){
        switch(icon){
            case 'Open': return require('../../assets/images/sites/gateOpen.png');
            case 'Öffnen': return require('../../assets/images/sites/gateOpen.png');
            case 'Ouvert': return require('../../assets/images/sites/gateOpen.png');


            
            case 'Close': return require('../../assets/images/sites/gateClose.png');
            case 'Schließen': return require('../../assets/images/sites/gateClose.png');
            case 'Fermer': return require('../../assets/images/sites/gateClose.png');

            case 'Hold Open': return require('../../assets/images/sites/gateHoldOpen.png');
            case 'Offen halten': return require('../../assets/images/sites/gateHoldOpen.png');
            case 'Maintenir ouvert': return require('../../assets/images/sites/gateHoldOpen.png');
        }
    }

    render() {
        let {buttonText, onPress, buttonSubText, messageOnPress,callOnPress } = this.props;
        let { currentMode } = UserStore;

        return (
            <TouchableOpacity onPress={onPress} style={[styles.optionContainer,{borderColor:Colours[currentMode].primaryColour}]}>
                <View style={[styles.optionElement,{width:'35%'}]}>
                    <Image source={this.getIcon(buttonText)} style={{
                        maxHeight: 60,
                        resizeMode: 'contain',
                        maxWidth: 60,
                        tintColor:Colours[currentMode].primaryColour}}/>
                </View>
                <View style={[styles.optionElement,{width:'45%'}]}>
                    <Text style={styles.textHeader}>{buttonText}</Text>
                </View>
                <View style={[styles.optionElement,{width:'20%',flexDirection: 'row',justifyContent:'space-between'}]}>
                    <View style={{alignContent:'center',justifyContent:'center'}}>
                        {callOnPress &&
                        // {callOnPress && UserStore.currentMode!=='lite' &&
                        <Image style={{alignSelf: 'center', tintColor: Colours[currentMode].primaryColour}}
                               source={require('../../assets/images/sites/gateCall.png')}/>
                        }
                    </View>
                    <View style={{alignContent: 'center', justifyContent: 'center'}}>
                        {messageOnPress &&
                        <Image style={{alignSelf: 'center', tintColor: Colours[currentMode].primaryColour}}
                               source={require('../../assets/images/sites/gateMessage.png')}/>
                        }
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    optionContainer:{
        flex: 1,
        flexDirection: 'row',
        borderWidth:1,
        padding:25,
        borderRadius:7.5,
        alignItems:'center',
        height:100,
        marginVertical:20

    },
    optionElement:{
        justifyContent:'center',
        alignContent:'center',
        // alignItems:'center'
    },
    textHeader:{
        color:Colours.black,
        fontSize:20,
        fontFamily:'Roboto-Bold',
    },
    textSubHeader:{
        color:Colours.black,
        fontSize:12,
        fontFamily:'Roboto-Regular',
        marginTop:10
    }
});
