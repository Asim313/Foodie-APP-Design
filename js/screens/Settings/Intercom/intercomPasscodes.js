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
import AESToast from "../../../components/aesToast";
import CurrentSiteHeader from "../../../components/currentSiteHeader";
import Divider from "../../../components/divider";
import SettingsInput from "../../../components/settingsInput";
import AESTextInput from "../../../components/aesTextInput";
import { validatePasscode, validateRelayTime } from "../../../utils/validation";
import { SendSMSMessageWithUpdate } from "../../../utils/SMS";
import ConfirmationModal from "../../../components/confirmationModal";
import BottomBarSpacer from "../../../components/bottomBarSpacer";
import LanguagesStore from '../../../stores/LanguageStore';
import { withTranslation } from 'react-i18next';

@observer
class IntercomPasscodes extends Component {


    constructor() {
        super();
        this.state = {
            programmingPasscode: '9999',
            accessPasscode: '1234',
        }
    }


    @observable hiddenPasscode = true;
    @observable hiddenAccessCode = true;

    @observable programmingPasscode = '9999';
    @observable accessPasscode = '1234';
    @observable warningModalVisible = false;
    @observable programmingPasscodeModalVisible = false;
    @observable accessControlPasscodeModalVisible = false;
    @observable unlockedSettings = true;

    componentDidMount() {
        this.programmingPasscode = UserStore.sites[UserStore.activeSiteID].passcode.toString();
        this.accessPasscode = UserStore.sites[UserStore.activeSiteID].accessCode.toString();
    }


    manageState = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    render() {
        let { currentMode } = UserStore;
        let { languages } = LanguagesStore
        const { t, i18n } = this.props;

        return (
            <Fragment>
                <Header
                    leftButtonOnPress={() => { this.props.navigation.goBack() }}
                    leftButtonType={'Back'}
                    headerText={t('passcodes')}
                    style={{ backgroundColor: Colours[currentMode].primaryColour }}
                />
                <View style={{ flex: 1 }}>
                    <KeyboardAwareScrollView style={{ backgroundColor: Colours.white }}>
                        <View style={styles.container}>
                            <CurrentSiteHeader />

                            <View style={{ marginVertical: 20 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                    <Text style={[styles.textInputHeader, { color: Colours.black }]}>{t('programming_passcodes')}</Text>
                                    <TouchableOpacity
                                        style={{ marginLeft: 10 }}
                                        onPress={() => {
                                            this.programmingPasscodeModalVisible = true;
                                        }}
                                    >
                                        <Image style={{ tintColor: Colours[currentMode].primaryColour }} source={require('../../../../assets/images/icons/infoButton.png')} />
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <TextInput
                                        style={[styles.textInput, { borderColor: Colours[currentMode].primaryColour }]}
                                        underlineColorAndroid={Colours[currentMode].primaryColour}
                                        value={this.programmingPasscode}
                                        secureTextEntry={this.hiddenPasscode}
                                        onChangeText={text => {
                                            this.programmingPasscode = text;
                                        }}
                                    />
                                    <TouchableOpacity onPress={() => { this.hiddenPasscode = !this.hiddenPasscode }} style={{ position: 'absolute', right: 0, bottom: 0, top: 0 }}>
                                        <Image source={require('./../../../../assets/images/icons/showPasswordButton.png')} style={{ tintColor: this.hiddenPasscode ? Colours.gray : Colours.black }} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ marginVertical: 20 }}>
                                    <TextButton
                                        buttonText={t('save')}
                                        onPress={() => {
                                            SendSMSMessageWithUpdate(
                                                `Passcode set to ${this.programmingPasscode}`,
                                                `${UserStore.sites[UserStore.activeSiteID].passcode}#01${this.programmingPasscode}#`,
                                                UserStore.sites[UserStore.activeSiteID].telephoneNumber,
                                                'passcode',
                                                this.programmingPasscode
                                            )
                                        }}
                                        outline={false}
                                        disabled={this.programmingPasscode.length !== 4} />
                                </View>
                            </View>

                            <View style={{ marginVertical: 20 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                    <Text style={[styles.textInputHeader, { color: Colours.black }]}>{t('access_control_passcodes')}</Text>
                                    <TouchableOpacity
                                        style={{ marginLeft: 10 }}

                                        onPress={() => {
                                            this.accessControlPasscodeModalVisible = true;
                                        }}
                                    >
                                        <Image style={{ tintColor: Colours[currentMode].primaryColour }} source={require('../../../../assets/images/icons/infoButton.png')} />
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <TextInput
                                        style={[styles.textInput, { borderColor: Colours[currentMode].primaryColour }]}
                                        underlineColorAndroid={Colours[currentMode].primaryColour}
                                        value={this.accessPasscode}
                                        secureTextEntry={this.hiddenAccessCode}
                                        onChangeText={text => {
                                            this.accessPasscode = text;
                                        }}
                                    />
                                    <TouchableOpacity onPress={() => { this.hiddenAccessCode = !this.hiddenAccessCode }} style={{ position: 'absolute', right: 0, bottom: 0, top: 0 }}>
                                        <Image source={require('./../../../../assets/images/icons/showPasswordButton.png')} style={{ tintColor: this.hiddenAccessCode ? Colours.gray : Colours.black }} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ marginVertical: 20 }}>
                                    <TextButton
                                        buttonText={t('save')}
                                        onPress={() => {
                                            SendSMSMessageWithUpdate(
                                                `Access control passcode set to ${this.accessPasscode}`,
                                                `${UserStore.sites[UserStore.activeSiteID].passcode}#02${this.accessPasscode}#`,
                                                UserStore.sites[UserStore.activeSiteID].telephoneNumber,
                                                'accessCode',
                                                this.accessPasscode
                                            )
                                        }}
                                        outline={false}
                                        disabled={this.accessPasscode.length !== 4}
                                    />
                                </View>
                            </View>
                        </View>
                        <BottomBarSpacer />
                    </KeyboardAwareScrollView>
                    <ConfirmationModal
                        visible={this.programmingPasscodeModalVisible}
                        header={t('programming_passcodes')}
                        body={t('programming_passcodes_modal')}
                        onPressClose={() => this.programmingPasscodeModalVisible = false}
                        confirmButtonText={t('close')}
                        onPress={() => this.programmingPasscodeModalVisible = false}
                        warning={false}
                    />
                    <ConfirmationModal
                        visible={this.accessControlPasscodeModalVisible}
                        header={t('access_control_passcodes')}
                        body={t('access_control_passcodes_modal')}
                        onPressClose={() => this.accessControlPasscodeModalVisible = false}
                        confirmButtonText={t('close')}
                        onPress={() => this.accessControlPasscodeModalVisible = false}
                        warning={false}
                    />
                </View>
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
        fontSize: 18,
        paddingBottom: 20,
        fontFamily: 'Roboto-Medium'
    },
    textInput: {
        color: Colours.black,
        fontSize: 16,
        fontFamily: 'Roboto-Regular',
        borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
        paddingBottom: 10
    }
}

export default withTranslation()(IntercomPasscodes);
