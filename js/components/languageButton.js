import React, { Component, Fragment } from 'react'

import {
    StyleSheet,
    TouchableOpacity,
    Image,
    Text,
    View
} from 'react-native'

import { Colours } from '../styles'
import UserStore from "../stores/SiteStore";

export default class LanguageButton extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {

        const { buttonText, onPress, disabled, flag } = this.props


        return (
            <Fragment>
                <TouchableOpacity
                    style={styles.button}
                    onPress={onPress}>
                    <Text style={[styles.text, { color: 'black' }]}>{buttonText}</Text>
                    {flag == 'en' &&
                        <Image style={styles.image} source={require(`../../assets/images/flags/en.png`)} />
                    }
                    {flag == 'fr' &&
                        <Image style={styles.image} source={require(`../../assets/images/flags/fr.png`)} />
                    }
                    {flag == 'de' &&
                        <Image style={styles.image} source={require(`../../assets/images/flags/de.png`)} />
                    }
                </TouchableOpacity>
            </Fragment>
        )
    }
}

const styles = StyleSheet.create({
    text: {
        color: Colours.white,
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'Roboto-Bold',
        textAlign: 'left',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: 20,
        flex: 1
    },
    button: {
        flex: 1,
        flexDirection: 'row',
        padding: 15,
        width: '100%',
        alignContent: 'space-between',
        justifyContent: 'space-between',
        borderWidth: 1,
        backgroundColor: Colours.white,
        borderColor: '#7E7E7E',
        marginBottom: 15,
        borderRadius: 10,
        marginTop: 15
    },
    image: {
        alignContent: 'flex-end',
        marginRight: 20
    }
});
