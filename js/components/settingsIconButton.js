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

export default class SettingsIconButton extends React.Component {

    constructor(props) {
        super(props)
    }

    hideText(text) {
        return new Array(text.length + 1).join('*');
    }

    formatByType(type, text) {
        switch (type) {
            case 'time': return `${text} seconds`;
            default: return text;
        }
    }

    getIcon(icon) {
        switch (icon) {
            case 'Dial Out': return require('../../assets/images/icons/dialOut.png');
            case 'Composer un numéro': return require('../../assets/images/icons/dialOut.png');
            case 'Anrufen': return require('../../assets/images/icons/dialOut.png');

            case 'Caller ID': return require('../../assets/images/icons/callerID.png');
            case "Identifiant de l'appelant": return require('../../assets/images/icons/callerID.png');
            case "Anrufer-ID": return require('../../assets/images/icons/callerID.png');

            case 'Keypad Code': return require('../../assets/images/icons/keycode.png');
            case 'Code clavier': return require('../../assets/images/icons/keycode.png');
            case 'Tastaturcodes': return require('../../assets/images/icons/keycode.png');

            case 'Intercom': return require('../../assets/images/icons/intercom.png');
            case 'Interphone': return require('../../assets/images/icons/intercom.png');
            case 'Intercom': return require('../../assets/images/icons/intercom.png');

            case 'Relay Status': return require('../../assets/images/icons/relay.png');
            case 'État du relais': return require('../../assets/images/icons/relay.png');
            case 'Relé status': return require('../../assets/images/icons/relay.png');

            case 'Keypad Codes': return require('../../assets/images/icons/keypad.png');
            case 'Codes clavier': return require('../../assets/images/icons/keypad.png');
            case 'Tastaturcodes': return require('../../assets/images/icons/keypad.png');

            case 'Stored Numbers': return require('../../assets/images/icons/stored-numbers.png');
            case 'Numéros enregistrés': return require('../../assets/images/icons/stored-numbers.png');
            case 'Gespeicherte Zahlen': return require('../../assets/images/icons/stored-numbers.png');

            case 'Signal Level': return require('../../assets/images/icons/reception.png');
            case 'Niveau du signal': return require('../../assets/images/icons/reception.png');
            case 'Signalpegel': return require('../../assets/images/icons/reception.png');

            case 'Change language': return require('../../assets/images/icons/language.png');
            case 'Changer de langue': return require('../../assets/images/icons/language.png');
            case 'Sprache ändern': return require('../../assets/images/icons/language.png');

            case 'Notification Numbers': return require('../../assets/images/icons/notifications.png');
            case 'Numéros de notification': return require('../../assets/images/icons/notifications.png');
            case 'Benachrichtigungsnummern': return require('../../assets/images/icons/notifications.png');

            case "Time Restricted Caller IDs": return require('../../assets/images/icons/timedCallerID.png');

            case "Technical Information": return require('../../assets/images/icons/techInfo.png');

            case "Automatic Relay Times": return require('../../assets/images/icons/autoRelay.png');

            case "Events Log": return require('../../assets/images/icons/eventsLog.png');

            case 'PTE Time Limits': return require('../../assets/images/icons/pteTimes.png');
            case 'Limites de temps PTE': return require('../../assets/images/icons/pteTimes.png');
            case 'PTE-Zeitgrenzen': return require('../../assets/images/icons/pteTimes.png');

            case 'Low Battery Notification Numbers': return require('../../assets/images/icons/batteryNotifications.png');
            case 'Numéros de notification de batterie faible': return require('../../assets/images/icons/batteryNotifications.png');
            case 'Niedrige Batterie-Benachrichtigungsnummern': return require('../../assets/images/icons/batteryNotifications.png');

            case 'Suspension Times': return require('../../assets/images/icons/suspendTimes.png');
            case 'Durées de suspension': return require('../../assets/images/icons/suspendTimes.png');
            case 'Sperrzeiten': return require('../../assets/images/icons/suspendTimes.png');

            case 'E-Loop': return require('../../assets/images/icons/e-loop.png');
            
        
        

            



        }
    }

    render() {
        let { buttonText, onPress, buttonSubText } = this.props;
        let { currentMode } = UserStore;

        return (
            <TouchableOpacity onPress={onPress} style={[styles.optionContainer, { borderColor: Colours[currentMode].primaryColour }]}>
                <View style={[styles.optionElement, { width: '30%', }]}>
                    <Image source={this.getIcon(buttonText)} style={{
                        // flex:1,
                        // justifyContent:'flex-start',
                        maxHeight: 60,
                        height: 55,
                        resizeMode: 'contain',
                        maxWidth: 60,
                        tintColor: Colours[currentMode].primaryColour
                    }} />
                </View>
                <View style={[styles.optionElement, { width: '70%' }]}>
                    <Text style={styles.textHeader}>{buttonText}</Text>
                    {buttonSubText &&
                        <Text style={styles.textSubHeader}>{buttonSubText}</Text>
                    }
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    optionContainer: {
        flex: 1,
        flexDirection: 'row',
        borderWidth: 1,
        padding: 25,
        borderRadius: 7.5,
        alignItems: 'center',
        minHeight: 100,
        marginVertical: 20
    },
    optionElement: {
        // justifyContent:'flex-start',
        alignContent: 'flex-start',
        justifyContent: 'flex-start',
        // alignContent:'center',
        // alignItems:'center'
    },
    textHeader: {
        color: Colours.black,
        fontSize: 20,
        fontFamily: 'Roboto-Bold',
        // lineHeight:20
    },
    textSubHeader: {
        color: Colours.black,
        fontSize: 12,
        fontFamily: 'Roboto-Regular',
        marginTop: 5,
    }
});
