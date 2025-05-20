import React, { Fragment, Component, useContext } from 'react';

import { Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Header from "../../../components/header";
import Colours from '../../../styles/colours.js'
import TextButton from "../../../components/textButton";

import { observer } from 'mobx-react'
import { observable, action } from 'mobx'
import UserStore from '../../../stores/SiteStore'
import CurrentSiteHeader from "../../../components/currentSiteHeader";
import AESToast from "../../../components/aesToast";
import Divider from "../../../components/divider";
import AESTextInput from "../../../components/aesTextInput";
import { checkPro, validatePasscode, validateRelayTime, validateTelephoneNumber } from "../../../utils/validation";
import ConfirmationModal from "../../../components/confirmationModal";
import DeleteSingleConfirmationModal from "../../../components/DeleteSingleConfirmationModal";
import AESText from "../../../components/aesText";
import { SendSMSMessageWithUpdate } from "../../../utils/SMS";
import ButtonGroupButton from "../../../components/buttonGroupButton";
import BottomBarSpacer from "../../../components/bottomBarSpacer";
import LanguagesStore from '../../../stores/LanguageStore';
import { withTranslation } from 'react-i18next';


@observer
class CodeSettings extends Component {


    constructor() {
        super();
    }

    @observable codeCollection = [
        { code: '', relayTime: '1' },
        { code: '', relayTime: '1' },
        { code: '', relayTime: '1' },
        { code: '', relayTime: '1' },
        { code: '', relayTime: '1' }
    ]

    @observable errorText = ''


    checkEntry() {
        return this.codeCollection[0].code.length !== 4 && this.codeCollection[1].code.length !== 4 && this.codeCollection[2].code.length !== 4 && this.codeCollection[3].code.length !== 4 && this.codeCollection[4].code.length !== 4
    }

    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
            if (checkPro()) {
                this.props.navigation.popToTop();
            } else {

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

    @observable deleteKnownModalVisible = false;
    @observable deleteAllModalVisible = false;
    @observable modalInput = '';

    setInputText = (text) => {
        this.modalInput = text;
    }

    toggleModal = (modal) => {
        this[modal] = !this[modal];
    };


    saveAllCodes() {
        let keypadCodeOutputString = '';
        this.codeCollection.forEach(entry => {
            if (entry.code.length === 4 && entry.relayTime.length > 0) {
                // keypadCodeTempArray.push({code:entry.code,relayTime:entry.relayTime});
                keypadCodeOutputString += `811${entry.code}#${entry.relayTime}#`
            }
        })
        if (keypadCodeOutputString.length > 0) {
            this.errorText = '';
            SendSMSMessageWithUpdate(
                `Keypad codes added`,
                `${UserStore.sites[UserStore.activeSiteID].passcode}#${keypadCodeOutputString}`,
                UserStore.sites[UserStore.activeSiteID].telephoneNumber,
                'keypadCodes',
                ''
            )
        } else {
            this.errorText = 'Enter at least one valid passcode and relay time.'
        }
        console.log(`${UserStore.sites[UserStore.activeSiteID].passcode}${keypadCodeOutputString}`);
    }

    render() {
        let { currentMode } = UserStore;
        let { languages, getLanguage } = LanguagesStore
        const { t, i18n } = this.props;
        let codeCount  = ['1', '2', '3', '4', '5'];
        
        
        return (
            <Fragment>
                <Header
                    leftButtonOnPress={() => { this.props.navigation.goBack() }}
                    leftButtonType={'Back'}
                    headerText={t('keypad_codes')}
                    style={{ backgroundColor: Colours[currentMode].primaryColour }}
                />
                <KeyboardAwareScrollView style={{ backgroundColor: Colours.white }}>
                    <View style={styles.container}>
                        <CurrentSiteHeader />

                        <View style={styles.optionContainer}>
                            <View style={{ marginBottom: 20 }}>
                                <AESText
                                    color={Colours.black}
                                    family={'Roboto-Regular'}
                                    size={16}
                                    content={t('keypad_code_text')+ "\n"}
                                />

                                <AESText
                                    color={Colours.black}
                                    family={'Roboto-Bold'}
                                    size={16}
                                    content={t('note')+ "\n"}
                                />

                                <AESText
                                    color={Colours.black}
                                    family={'Roboto-Regular'}
                                    size={16}
                                    content={t('latch_option_text')}
                                />

                            </View>

                            {codeCount.map((codeNumber, index) => {
                                return (
                                    <View style={{ marginBottom: 30 }} key={`code_${index}`}>
                                        <Text style={[styles.codeHeader, { color: Colours[currentMode].primaryColour }]}>{`Code #${codeNumber}`}</Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ width: '25%' }}>
                                                <AESTextInput
                                                    title={"Code"}
                                                    titleTextColoured={false}
                                                    placeholder={'0123'}
                                                    value={`${this.codeCollection[index].code}`}
                                                    onChangeText={text => {
                                                        this.codeCollection[index].code = validatePasscode(text);
                                                    }}
                                                    keyboardType={'number-pad'}
                                                />
                                            </View>
                                            <View style={{ marginLeft: '5%', width: '70%' }}>
                                                <AESTextInput
                                                    title={t('relay_activation_tme')}
                                                    titleTextColoured={false}
                                                    placeholder={'1'}
                                                    value={`${this.codeCollection[index].relayTime}`}
                                                    onChangeText={text => {
                                                        this.codeCollection[index].relayTime = validateRelayTime(0, 10, text);
                                                        // this.manageState(`code${codeNumber}RelayTime`,validateRelayTime(0,10,text))
                                                    }}
                                                    keyboardType={'number-pad'}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                )
                            })}

                            <View style={{ marginTop: 20, marginBottom: 10 }}>

                                {this.errorText.length > 0 &&
                                    <AESText
                                        color={Colours.warning}
                                        family={'Roboto-Regular'}
                                        size={16}
                                        content={this.errorText}
                                        containerStyle={{ marginVertical: 10 }}
                                    />}

                                <TextButton
                                    buttonText={t('save')}
                                    outline={false}
                                    disabled={this.checkEntry()}
                                    onPress={() => {
                                        this.saveAllCodes()
                                    }}
                                />
                            </View>

                            <View style={{ marginVertical: 10, flexDirection: 'row' }}>
                                <ButtonGroupButton
                                    left={true}
                                    buttonText={t('delete_one')}
                                    outline={true}
                                    rounded={false}
                                    disabled={false}
                                    onPress={() => { this.deleteKnownModalVisible = true }}
                                />
                                <ButtonGroupButton
                                    left={false}
                                    buttonText={t('delete_all')}
                                    outline={false}
                                    rounded={false}
                                    disabled={false}
                                    onPress={() => { this.deleteAllModalVisible = true }}
                                />
                            </View>
                        </View>
                    </View>
                    <BottomBarSpacer />
                </KeyboardAwareScrollView>

                <DeleteSingleConfirmationModal
                    visible={this.deleteKnownModalVisible}
                    header={t('delete_keypad_code')}
                    body={t('enter_keypad_code_to_delete')}
                    onPressClose={() => this.toggleModal('deleteKnownModalVisible')}
                    cancelButtonText={t('cancel')}
                    confirmButtonText={t('delete')}
                    smsAction={'deleteCode'}
                    warning={true}
                    input={'passcode'}
                />

                <ConfirmationModal
                    visible={this.deleteAllModalVisible}
                    header={t('delete_all_keypad_code')}
                    body={t('delete_all_keypad_code_question')}
                    onPressClose={() => this.toggleModal('deleteAllModalVisible')}
                    cancelButtonText={t('no')}
                    confirmButtonText={t('yes')}
                    onPress={() => { }
                    }
                    onPressSMSAction={'deleteAllKeypadCodes'}
                    warning={true}
                />
            </Fragment >
        );
    }
}

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
    textInputSubHeader: {
        color: Colours.black,
        fontSize: 16,
        paddingBottom: 20,
        fontFamily: 'Roboto-Regular'
    },
    textInput: {
        color: Colours.black,
        fontSize: 16,
        fontFamily: 'Roboto-Regular',
        borderBottomWidth: 1,
        paddingBottom: 10
    },
    codeHeader: {
        fontSize: 18,
        fontFamily: 'Roboto-Bold',
        paddingBottom: 10
    },
    description: {
        fontFamily: 'Roboto-regular',
        fontSize: 16,
        marginBottom: 20,
        color: Colours.black
    },

    buttonGroupReminder: {
        fontFamily: 'Roboto',
        fontSize: 14,
        color: '#979797',
        marginBottom: 10
    },
    summaryButtonGroupStyle: {
        height: 55,
        alignSelf: 'center',
        marginTop: 0,
        // marginBottom: 16,
        paddingLeft: 0,
        marginLeft: 0,
        marginRight: 0,
        borderWidth: 2,
        borderColor: Colours.pink,
        borderRadius: 25,
        backgroundColor: Colours.white
    },
    summaryButtonTextStyle: {
        fontSize: 24,
        color: Colours.pink,
        fontFamily: 'VersusArthritis-Display',
    },
}

export default withTranslation()(CodeSettings);
