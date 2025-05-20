import React, { Fragment, Component, useContext } from 'react';

import {
    View,
    Text,
} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Header from "../../../../components/header";
import Colours from '../../../../styles/colours.js'
import TextButton from "../../../../components/textButton";

import { observer } from 'mobx-react'
import { observable, action } from 'mobx'
import UserStore from '../../../../stores/SiteStore'
import AESToast from "../../../../components/aesToast";
import CurrentSiteHeader from "../../../../components/currentSiteHeader";
import AESTextInput from "../../../../components/aesTextInput";
import { checkPro, checkWithinLimits, cleanNumberInput, validateRelayTime } from "../../../../utils/validation";
import Description from "../../../../components/description";
import { SendSMSMessageWithUpdate } from "../../../../utils/SMS";
import AESText from "../../../../components/aesText";
import BottomBarSpacer from "../../../../components/bottomBarSpacer";
import LanguagesStore from '../../../../stores/LanguageStore';
import { withTranslation } from 'react-i18next';

@observer
class IntercomRelayTime extends Component {

    @observable hiddenCodes = false;

    constructor() {
        super();
        this.state = {
            relayTriggerTime: '1'
        }
    }

    @observable relayTriggerTime = '1';
    @observable limits = { min: 1, max: 9999 };

    componentDidMount() {
        // this.setState({relayTriggerTime:UserStore.sites[UserStore.activeSiteID].intercomRelayTime.toString()})
        this.relayTriggerTime = UserStore.sites[UserStore.activeSiteID].intercomRelayTime.toString();
    }


    manageState = (key, value) => {
        this.setState({
            [key]: value
        }, () => {
            // console.log(this.state)
        })
    }

    render() {
        let { currentMode } = UserStore;
        let { languages } = LanguagesStore
        const { t, i18n } = this.props;

        // if (typeof languages.test_text !== 'undefined') {
        //     alert(languages.test_text.text);
        // } else {
        //     alert("Unsuccessful");
        // }

        // console.log("languagisios: " + JSON.stringify(languages));

        // console.log("Default_1: " + languages.default_1);

        let isPro = checkPro();
        return (
            <Fragment>
                <Header
                    leftButtonOnPress={() => { this.props.navigation.goBack() }}
                    leftButtonType={'Back'}
                    headerText={t('relay_time')}
                    style={{ backgroundColor: Colours[currentMode].primaryColour }}
                />
                <KeyboardAwareScrollView style={{ backgroundColor: Colours.white }}>
                    <View style={styles.container}>
                        <CurrentSiteHeader />
                        <Description
                            text={t('relay_trigger_label') + `\n(1 - ${isPro ? 9999 : 9999} ` + t('seconds') + ').'}
                        />
                        <AESText
                            color={Colours.black}
                            family={'Roboto-Regular'}
                            size={16}
                            content={t('default_1')}
                        />
                        <View style={styles.optionContainer}>
                            <AESTextInput
                                title={t('relay_trigger_time')}
                                placeholder={`Relay Trigger Time - (1 - ${isPro ? 9999 : 9999} seconds)`}
                                value={`${this.relayTriggerTime}`}
                                onChangeText={(text) => {
                                    // this.manageState('relayTriggerTime',validateRelayTime(1,isPro?9999:99,text));
                                    this.relayTriggerTime = cleanNumberInput(text);
                                }}
                                keyboardType={'number-pad'}
                            />
                            <View style={{ marginVertical: 20 }}>
                                <TextButton
                                    buttonText={t('save')}
                                    outline={false}
                                    disabled={checkWithinLimits(this.relayTriggerTime, this.limits.min, isPro ? 9999 : 9999)}
                                    onPress={() => {
                                        SendSMSMessageWithUpdate(
                                            `Relay trigger time set to ${this.relayTriggerTime}s`,
                                            `${UserStore.sites[UserStore.activeSiteID].passcode}#50${this.relayTriggerTime}#`,
                                            UserStore.sites[UserStore.activeSiteID].telephoneNumber,
                                            'intercomRelayTime',
                                            this.relayTriggerTime
                                        )
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                    <BottomBarSpacer />
                </KeyboardAwareScrollView>
            </Fragment >
        );
    }
};

const styles = {
    container: {
        flex: 1,
        paddingHorizontal: 30,
        // paddingVertical:60
    },
    optionContainer: {
        flex: 1,
        // flexDirection: 'row',
        // borderColor: Colours.black,
        // height:50,
        marginVertical: 20,
        // justifyContent: 'space-between'

    },
    slider: {
        paddingVertical: 30
    },
    optionElement: {
        justifyContent: 'center',
        alignContent: 'center'
    },
    optionsText: {
        color: Colours.black,
        fontSize: 18,
        // paddingBottom: 20,
        fontFamily: 'Roboto-Medium'
    },
    settingsHeader: {
        color: Colours.black,
        fontSize: 16,
        // paddingBottom: 20,
        fontFamily: 'Roboto-Bold'
    },
    settingsText: {
        color: Colours.black,
        fontSize: 14,
        // paddingBottom: 20,
        fontFamily: 'Roboto-Regular'
    },
    textInputHeader: {
        color: Colours.black,
        fontSize: 22,
        paddingBottom: 20,
        fontFamily: 'Roboto-Medium'
    },
    textInput: {
        color: Colours.black,
        fontSize: 16,
        fontFamily: 'Roboto-Regular'
    },
    textInstructions: {
        color: Colours.black,
        fontSize: 16,
        fontFamily: 'Roboto-Regular',
        marginTop: 30
    }
}

export default withTranslation()(IntercomRelayTime);
