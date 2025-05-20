import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Animated, TouchableWithoutFeedback, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import * as Colours from "../styles/colours";
import UserStore from "../stores/SiteStore";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AESTextInput from "./aesTextInput";
import TextButton from "./textButton";
import LanguagesStore from '../stores/LanguageStore';

export default class AESSwitchSiteToast extends React.Component {

    static show(navigateOnPress) {

        _switchSiteToast.setState({
            display: true,
            navigateOnPress: navigateOnPress,
        }, () => {

            Animated.parallel([
                Animated.timing(_switchSiteToast.animateToast.opacity, {
                    toValue: 1,
                    duration: 250,
                    useNativeDriver: true
                }),
                Animated.timing(_switchSiteToast.animateToast.translateY, {
                    toValue: 0,
                    duration: 250,
                    useNativeDriver: true
                })
            ]).start(() => {

                // Auto close after 2 seconds
                // setTimeout(() => {
                //     _toast.close();
                // }, 2000)

            });

        })

    }

    constructor(props, context) {

        super(props, context);
        // console.log(props);

        this.state = {
            display: false,
            animateToast: 1
        }

        this.animateToast = {
            opacity: new Animated.Value(1),
            translateY: new Animated.Value(200)
        }

        _switchSiteToast = this;

    }

    close() {

        Animated.parallel([
            Animated.timing(_switchSiteToast.animateToast.opacity, {
                toValue: 0,
                duration: 250,
                useNativeDriver: true
            }),
            Animated.timing(_switchSiteToast.animateToast.translateY, {
                toValue: 200,
                duration: 250,
                useNativeDriver: true
            })
        ]).start(() => {
            this.setState({
                display: false
            })
        });

    }

    getIcon() {
        switch (this.state.icon) {
            case 'passcode': return require('../../assets/images/notifications/passcode.png');
            default: return require('../../assets/images/notifications/passcode.png');
        }
    }

    render() {
        let { currentMode } = UserStore
        let { languages } = LanguagesStore

        if (this.state.display) {
            return (
                <TouchableWithoutFeedback>
                    <View>

                        <View style={styles.container}>
                            <TouchableOpacity style={{ height: 600 }} onPress={() => this.close()} />
                            <Animated.View
                                style={[styles.toast, { borderColor: Colours[currentMode].primaryColour }, {
                                    opacity: this.animateToast.opacity,
                                    transform: [{
                                        translateY: this.animateToast.translateY
                                    }]
                                }]}>
                                <View style={styles.toastHeader}>
                                    <Text style={styles.text}>{languages.switch_site.text}</Text>
                                    <TouchableOpacity onPress={() => this.close()}>
                                        <Image source={require('../../assets/images/header/modalClose.png')} />
                                    </TouchableOpacity>
                                </View>
                                <ScrollView>
                                    {UserStore.sites.map((site, index) => {
                                        return (
                                            <TouchableOpacity
                                                key={`site_${index}`}
                                                style={{
                                                    // flex: 1,
                                                    borderWidth: 1,
                                                    paddingHorizontal: 15,
                                                    paddingVertical: 10,
                                                    borderRadius: 7.5,
                                                    alignItems: 'flex-start',
                                                    // height: 100,
                                                    marginVertical: 10,
                                                    width: '100%',
                                                    borderColor: this.state.selected === index ? Colours[currentMode].primaryColour : Colours.black
                                                }}
                                                onPress={() => { this.setState({ selected: index }) }}
                                            >
                                                <Text style={styles.siteInfo}>
                                                    <Text style={styles.siteField}>{languages.site_name.text}: </Text>
                                                    <Text style={styles.siteValue}>{`${site.name}`}</Text>
                                                </Text>
                                                <Text style={styles.siteInfo}>
                                                    <Text style={styles.siteField}>{languages.device.text}: </Text>
                                                    <Text style={styles.siteValue}>{`${site.device}`}</Text>
                                                </Text>
                                                <Text style={styles.siteInfo}>
                                                    <Text style={styles.siteField}>{languages.unit_telephone_number.text}: </Text>
                                                    <Text style={styles.siteValue}>{`${site.telephoneNumber}`}</Text>
                                                </Text>
                                                <Text style={styles.siteInfo}>
                                                    <Text style={styles.siteField}>{languages.programming_passcodes.text}: </Text>
                                                    <Text style={styles.siteValue}>{`${site.passcode}`}</Text>
                                                </Text>
                                                <Text style={styles.siteInfo}>
                                                    <Text style={styles.siteField}>{languages.access_control_passcodes.text}: </Text>
                                                    <Text style={styles.siteValue}>{`${site.accessCode}`}</Text>
                                                </Text>

                                            </TouchableOpacity>
                                        )
                                    })}

                                    <View style={{
                                        flexDirection: 'row',
                                        // justifyContent: 'center',
                                        alignItems: 'stretch',
                                        justifyContent: 'space-between',
                                        height: 50,
                                        marginTop: 20
                                    }}>
                                        <View>
                                            <TextButton
                                                buttonText={languages.add_new_site.text}
                                                outline={true}
                                                disabled={false}
                                                // onPress={ this.state.goToAddSite}
                                                onPress={() => {
                                                    this.state.navigateOnPress
                                                }}
                                            />
                                        </View>
                                        <View>
                                            <TextButton
                                                buttonText={languages.switch_site.text}
                                                outline={false}
                                                disabled={this.state.selected === null}
                                                onPress={() => { UserStore.setActiveSite(this.state.selected); this.close() }}
                                            />
                                        </View>
                                    </View>
                                </ScrollView>
                            </Animated.View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            )
        }
        else {

            return (
                <View />
            )
        }

    }

}

const styles = StyleSheet.create({
    container: {

        // height: '100%',
        position: 'absolute',
        bottom: 0,
        // top:0,
        // right:0,
        // left:0,
        width: '100%',
        backgroundColor: '#00000050',
        alignSelf: 'center',
    },
    toast: {
        backgroundColor: Colours.white,
        // padding: 15,
        borderRadius: 20,
        paddingVertical: 30,
        paddingHorizontal: 25,
        height: 600,
        // flexDirection:'row',
        // alignContent:'center',
        // justifyContent:'center',
    },
    toastHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        width: '100%',
        marginBottom: 20
    },
    text: {
        color: Colours.black,
        fontSize: 20,
        fontFamily: 'Roboto-Bold',
    },
    toastIcon: {
        alignSelf: 'center'
    },
    siteField: {
        fontFamily: 'Roboto-Medium',
        fontSize: 13,
        color: Colours.black
    },
    siteValue: {
        fontFamily: 'Roboto-Regular',
        fontSize: 13,
        color: Colours.black
    },
    siteInfo: {
        marginVertical: 5
    }
});
