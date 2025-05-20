import React, { Component, Fragment } from 'react';

import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Header from "../../../components/header";
import Colours from '../../../styles/colours.js'
import TextButton from "../../../components/textButton";

import { observer } from 'mobx-react'
import { observable } from 'mobx'
import UserStore from '../../../stores/SiteStore'
import CurrentSiteHeader from "../../../components/currentSiteHeader";
import AESTextInput from "../../../components/aesTextInput";
import ConfirmationModal from "../../../components/confirmationModal";
import { checkPro, validateTelephoneNumber } from "../../../utils/validation";
import { SendSMSMessageWithUpdate } from "../../../utils/SMS";
import DeleteSingleConfirmationModal from "../../../components/DeleteSingleConfirmationModal";
import ButtonGroupButton from "../../../components/buttonGroupButton";
import BottomBarSpacer from "../../../components/bottomBarSpacer";
import LanguagesStore from '../../../stores/LanguageStore';
import { withTranslation } from 'react-i18next';

@observer
class DialOutDialOutNumbers extends Component {

    constructor() {
        super();
        this.state = {
            dialOut1: '',
            dialOut2: '',
            dialOut3: ''
        }
    }


    @observable dialOut1 = ''
    @observable dialOut2 = ''
    @observable dialOut3 = ''

    @observable dialOutPremier = ''
    @observable dialOutDeuxième = ''
    @observable dialOutTroisième = ''


    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
            if (checkPro()) {
                this.props.navigation.popToTop();
            } else {
                this.dialOut1 = UserStore.sites[UserStore.activeSiteID].dialOutNumbers[0]
                this.dialOut2 = UserStore.sites[UserStore.activeSiteID].dialOutNumbers[1]
                this.dialOut3 = UserStore.sites[UserStore.activeSiteID].dialOutNumbers[2]
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

    updateDialOuts() {
        this.dialOut1 = ''
        this.dialOut2 = ''
        this.dialOut3 = ''
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

    sendDialOutNumbers = () => {
        console.log('sendDialOutNumbers')
        let dialOutCount = ['1', '2', '3'];
        let newDialOuts = ['', '', ''];
        let numbers = [];
        let newValues = [];
        let dialOut1String = ''
        let dialOut2String = ''
        let dialOut3String = ''
        if (this.dialOut1.length) {
            dialOut1String = `111${this.dialOut1}#`
        }
        if (this.dialOut2.length) {
            dialOut2String = `112${this.dialOut2}#`
        }
        if (this.dialOut3.length) {
            dialOut3String = `113${this.dialOut3}#`
        }


        SendSMSMessageWithUpdate(
            `Dial out  ${numbers.length > 1 ? 'numbers have' : 'number has'} been set`,
            `${UserStore.sites[UserStore.activeSiteID].passcode}#${dialOut1String}${dialOut2String}${dialOut3String}`,
            UserStore.sites[UserStore.activeSiteID].telephoneNumber,
            'dialOutNumbers',
            ['', '', '']
        )
    }

    render() {
        
        let { currentMode } = UserStore;
        let { languages, getLanguage } = LanguagesStore;
        const { t, i18n } = this.props;
        let dialOutNumber = ['1', '2', '3'];

        return (
            <Fragment>
                <Header
                    leftButtonOnPress={() => { this.props.navigation.goBack() }}
                    leftButtonType={'Back'}
                    headerText={t('dial_out_numbers')}
                    style={{ backgroundColor: Colours[currentMode].primaryColour }}
                />
                <KeyboardAwareScrollView style={{ backgroundColor: Colours.white }}>
                    <View style={styles.container}>
                        <CurrentSiteHeader />

                        <View style={styles.optionContainer}>
                            <Text style={styles.textInputHeader}>{t('dial_out_numbers')}</Text>
                            {dialOutNumber.map((dialOutNumber, index) => {
                                return (
                                    <View style={{ marginBottom: 20 }} key={`dial_out_number_${index}`}>

                                        <View>
                                            <Text style={[styles.textInputHeader, { color: Colours[currentMode].primaryColour }]}>{`#${dialOutNumber} ` + t('number')}</Text>

                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <View style={{ width: '90%' }}>
                                                    <TextInput
                                                        style={[styles.dialOutNumberInput, { borderColor: Colours[currentMode].primaryColour }, { color: Colours.black }]}
                                                        underlineColorAndroid={Colours[currentMode].primaryColour}
                                                        // placeholder={'0044 1234 567890'}
                                                        value={`${this[`dialOut${dialOutNumber}`]}`}
                                                        onChangeText={text => { this[`dialOut${dialOutNumber}`] = validateTelephoneNumber(text) }}
                                                        keyboardType={'number-pad'}
                                                    />
                                                </View>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        SendSMSMessageWithUpdate(
                                                            ``,
                                                            `${UserStore.sites[UserStore.activeSiteID].passcode}#11${index + 1}*#`,
                                                            UserStore.sites[UserStore.activeSiteID].telephoneNumber,
                                                            'dialOutNumbers',
                                                            ['', '', '']
                                                        )
                                                    }
                                                    }
                                                >
                                                    <Image source={require("../../../../assets/images/sites/trash.png")} style={{ tintColor: Colours[currentMode].primaryColour }} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>

                                    </View>
                                )
                            })}
                            <View style={{ marginTop: 20, marginBottom: 10 }}>
                                <TextButton
                                    buttonText={t('save')}
                                    outline={false}
                                    disabled={this.dialOut1.length === 0 && this.dialOut2.length === 0 && this.dialOut3.length === 0}
                                    // disabled={!this.dialOutFirst.length>0||!this.dialOutSecond.length>0||!this.dialOutThird.length>0}
                                    onPress={() => {
                                        this.sendDialOutNumbers();
                                    }}
                                />
                            </View>

                            <View style={{ marginVertical: 10 }}>
                                <TextButton
                                    buttonText={t('delete_dial_out_numbers')}
                                    outline={true}
                                    disabled={false}
                                    onPress={() => {
                                        this.deleteAllModalVisible = true
                                        this.updateDialOuts();
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                    <BottomBarSpacer />
                </KeyboardAwareScrollView>

                <DeleteSingleConfirmationModal
                    visible={this.deleteKnownModalVisible}
                    header={t('delete_dial_out_number')}
                    body={t('enter_dial_out_to_delete')}
                    onPressClose={() => {
                        this.toggleModal('deleteKnownModalVisible');
                        // this.updateDialOuts();
                    }}
                    cancelButtonText={t('cancel')}
                    confirmButtonText={t('delete')}
                    smsAction={'deleteDialOut'}
                    warning={true}
                    input={'telephone'}
                />


                <ConfirmationModal
                    visible={this.deleteAllModalVisible}
                    header={t('delete_dial_out_numbers')}
                    body={t('delete_all_dial_out_numbers')}
                    onPressClose={() => {
                        // console.log('boom');
                        this.toggleModal('deleteAllModalVisible');
                        // this.updateDialOuts();
                    }}
                    cancelButtonText={t('no')}
                    confirmButtonText={t('yes')}
                    onPress={() => console.log('Delete')}
                    warning={true}
                    onPressSMSAction={'deleteAllDialOuts'}
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
        fontFamily: 'Roboto-Regular'
    },
    dialOutNumberInput: {
        color: Colours.black,
        fontSize: 16,
        fontFamily: 'Roboto-Regular',
        borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
        paddingBottom: 10
    },
}

export default withTranslation()(DialOutDialOutNumbers);
