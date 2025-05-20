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
import ToggleButton from "../../../components/toggleButton";

import { observer } from 'mobx-react'
import { observable, action } from 'mobx'
import UserStore from '../../../stores/SiteStore'
import CurrentSiteHeader from "../../../components/currentSiteHeader";
import Divider from "../../../components/divider";
import SettingsInput from "../../../components/settingsInput";
import AESTextInput from "../../../components/aesTextInput";
import { checkPro, validatePasscode, validateRelayTime } from "../../../utils/validation";
import AESToolTipDescription from "../../../components/aesToolTipDescription"
import AESText from "../../../components/aesText";
import { SendSMSMessageWithUpdate } from "../../../utils/SMS";
import BottomBarSpacer from "../../../components/bottomBarSpacer";
import LanguagesStore from '../../../stores/LanguageStore';
import { withTranslation } from 'react-i18next';

@observer
class DialOutDTMFLatching extends Component {

    constructor() {
        super();
        this.state = {
            dtmfLatching: 0,
        }
    }

    @observable dtmfEnabled = false;
    @observable dtmfDisabled = false;
    @observable dtmfLatching = -1;

    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
            if (checkPro()) {
                this.props.navigation.popToTop();
            } else {
                this.dtmfLatching = UserStore.sites[UserStore.activeSiteID].dtmfLatching
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
                    headerText={t('dtmf_latching')}
                    style={{ backgroundColor: Colours[currentMode].primaryColour }}
                />
                <KeyboardAwareScrollView style={{ backgroundColor: Colours.white }}>
                    <View style={styles.container}>
                        <CurrentSiteHeader />

                        <View style={styles.optionContainer}>
                            <View>
                                <AESText
                                    color={Colours.black}
                                    family={'Roboto-Medium'}
                                    size={16}
                                    content={t('dtmf_latching')}
                                />
                            </View>
                            <View style={{ marginBottom: 30, marginTop: 10 }}>
                                <AESText
                                    color={Colours.black}
                                    family={'Roboto-Regular'}
                                    size={16}
                                    content={t('dtmf_latching_message')}
                                />
                            </View>

                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'stretch',
                                justifyContent: 'space-between',
                                height: 50
                            }}>
                                <View>
                                    <ToggleButton
                                        buttonText={this.dtmfDisabled ? t('disabled') : t('disable')}
                                        outline={true}
                                        disabled={!this.dtmfDisabled}
                                        onPress={() => {
                                            this.dtmfEnabled = false;
                                            this.dtmfDisabled = true;
                                        }}
                                    />
                                </View>
                                <View>
                                    <ToggleButton
                                        buttonText={this.dtmfEnabled ? t('enabled') : t('enable')}
                                        outline={true}
                                        disabled={!this.dtmfEnabled}
                                        onPress={() => {
                                            this.dtmfEnabled = true;
                                            this.dtmfDisabled = false;
                                        }}
                                    />
                                </View>
                            </View>



                            <View style={{ marginTop: 20, marginBottom: 10 }}>

                                <TextButton
                                    buttonText={t('save')}
                                    outline={false}
                                    disabled={!this.dtmfDisabled && !this.dtmfEnabled}
                                    onPress={() => {
                                        if (this.dtmfDisabled) {
                                            SendSMSMessageWithUpdate(
                                                `DTMF latching has been disabled`,
                                                `${UserStore.sites[UserStore.activeSiteID].passcode}#950#`,
                                                UserStore.sites[UserStore.activeSiteID].telephoneNumber,
                                                'dtmfLatching',
                                                0)
                                        } else if (this.dtmfEnabled) {
                                            SendSMSMessageWithUpdate(
                                                `DTMF latching has been enabled`,
                                                `${UserStore.sites[UserStore.activeSiteID].passcode}#951#`,
                                                UserStore.sites[UserStore.activeSiteID].telephoneNumber,
                                                'dtmfLatching',
                                                1)
                                        }
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
    },
    optionContainer: {
        flex: 1,
        marginVertical: 20,
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
        fontFamily: 'Roboto-Medium'
    },
    settingsHeader: {
        color: Colours.black,
        fontSize: 16,
        fontFamily: 'Roboto-Bold'
    },
    settingsText: {
        color: Colours.black,
        fontSize: 14,
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

export default withTranslation()(DialOutDTMFLatching);
