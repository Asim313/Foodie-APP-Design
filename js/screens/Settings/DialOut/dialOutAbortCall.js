import React, { Fragment, Component, useContext } from 'react';

import {
    StyleSheet,
    ScrollView,
    View,
    FlatList,
    Image,
    TouchableOpacity,
    StatusBar,
    Linking,
    Text,
    TextInput
} from 'react-native';
// import Slider from '@react-native-community/slider';
import { Slider } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Header from "../../../components/header";
import Colours from '../../../styles/colours.js'
import TextButton from "../../../components/textButton";

import { observer } from 'mobx-react'
import { observable, action } from 'mobx'
import UserStore from '../../../stores/SiteStore'
import CurrentSiteHeader from "../../../components/currentSiteHeader";
import Divider from "../../../components/divider";
import SettingsInput from "../../../components/settingsInput";
import AESTextInput from "../../../components/aesTextInput";
import {
    checkPro,
    checkWithinLimits,
    cleanNumberInput,
    validatePasscode,
    validateRelayTime
} from "../../../utils/validation";
import AESToolTipDescription from "../../../components/aesToolTipDescription"
import AESText from "../../../components/aesText";
import { SendSMSMessage, SendSMSMessageWithUpdate } from "../../../utils/SMS";
import BottomBarSpacer from "../../../components/bottomBarSpacer";
import LanguagesStore from '../../../stores/LanguageStore';
import { withTranslation } from 'react-i18next';

@observer
class DialOutAbortCall extends Component {

    constructor() {
        super();
        this.state = {
            abortCallTime: '',
        }
    }

    @observable abortCallTime = ''
    @observable limits = { min: 1, max: 9 };

    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
            if (checkPro()) {
                this.props.navigation.popToTop();
            } else {
                this.abortCallTime = UserStore.sites[UserStore.activeSiteID].abortCallTime.toString()
            }
        });
    }

    componentWillUnmount() {
        this.props.navigation.removeListener('focus')
    }

    manageState = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    render() {
        let { currentMode } = UserStore;
        let { languages } = LanguagesStore;
        const { t, i18n } = this.props;

        return (
            <Fragment>
                <Header
                    leftButtonOnPress={() => { this.props.navigation.goBack() }}
                    leftButtonType={'Back'}
                    headerText={t('about_call')}
                    style={{ backgroundColor: Colours[currentMode].primaryColour }}
                />
                <KeyboardAwareScrollView style={{ backgroundColor: Colours.white }}>
                    <View style={styles.container}>
                        <CurrentSiteHeader />

                        <View style={styles.optionContainer}>
                            <View style={{ marginBottom: 30 }}>
                                <AESText
                                    color={Colours.black}
                                    family={'Roboto-Regular'}
                                    size={16}
                                    content={t('set_time_for_call_to_be_aborted')}
                                />
                            </View>
                            <AESTextInput
                                title={t('call_abort_time')}
                                placeholder={t('call_abort_time')}
                                value={`${this.abortCallTime}`}
                                onChangeText={text => {
                                    this.abortCallTime = cleanNumberInput(text);
                                }}
                                keyboardType={'number-pad'}
                            />
                            <View style={{ marginTop: 20, marginBottom: 10 }}>
                                <TextButton
                                    buttonText={t('save')}
                                    outline={false}
                                    disabled={checkWithinLimits(this.abortCallTime, this.limits.min, this.limits.max)}
                                    onPress={() => {
                                        SendSMSMessageWithUpdate(
                                            `Abort call has been ${this.abortCallTime === '0' ? 'disabled' : `set to ${this.abortCallTime}s`}`,
                                            `${UserStore.sites[UserStore.activeSiteID].passcode}#56${this.abortCallTime}#`,
                                            UserStore.sites[UserStore.activeSiteID].telephoneNumber,
                                            'abortCallTime',
                                            this.abortCallTime
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
    }
}

export default withTranslation()(DialOutAbortCall);
