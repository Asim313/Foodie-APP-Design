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
import Description from "../../../components/description";
import { SendSMSMessageWithUpdate } from "../../../utils/SMS";
import AESText from "../../../components/aesText";
import BottomBarSpacer from "../../../components/bottomBarSpacer";
import LanguagesStore from '../../../stores/LanguageStore';
import { withTranslation } from 'react-i18next';

@observer
class DialOutTalkTime extends Component {

    constructor() {
        super();
        this.state = {
            // talkTime:'5',
        }
    }

    @observable talkTime = '60';
    @observable limits = { min: 5, max: 9999 };


    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
            if (checkPro()) {
                this.props.navigation.popToTop();
            } else {
                this.talkTime = UserStore.sites[UserStore.activeSiteID].talkTime;
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
                    headerText={t('call_duration')}
                    style={{ backgroundColor: Colours[currentMode].primaryColour }}
                />
                <KeyboardAwareScrollView style={{ backgroundColor: Colours.white }}>
                    <View style={styles.container}>
                        <CurrentSiteHeader />
                        <View style={styles.optionContainer}>
                            <AESText
                                color={Colours.black}
                                family={'Roboto-Regular'}
                                size={16}
                                content={t('max_talk_time')}
                                containerStyle={{ marginBottom: 20 }}
                            />

                            <AESTextInput
                                title={t('call_duration')}
                                placeholder={t('call_duration')}
                                value={`${this.talkTime}`}
                                onChangeText={text => {
                                    this.talkTime = cleanNumberInput(text);
                                }}
                                keyboardType={'number-pad'}
                            />
                            <View style={{ marginTop: 20, marginBottom: 10 }}>
                                <TextButton
                                    buttonText={t('save')}
                                    outline={false}
                                    disabled={checkWithinLimits(this.talkTime, this.limits.min, this.limits.max)}
                                    onPress={() => {
                                        SendSMSMessageWithUpdate(
                                            `Talk time set to ${this.talkTime}s`,
                                            `${UserStore.sites[UserStore.activeSiteID].passcode}#53${this.talkTime}#`,
                                            UserStore.sites[UserStore.activeSiteID].telephoneNumber,
                                            'talkTime',
                                            this.talkTime
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

export default withTranslation()(DialOutTalkTime);
