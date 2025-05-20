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
    TextInput,
    Button
} from 'react-native';
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
import AESConfirmationToast from "../../../components/aesConfirmationToast";
import Modal from 'react-native-modal';
import ConfirmationModal from "../../../components/confirmationModal";
import { validateTelephoneNumber } from "../../../utils/validation";
import { SendSMSMessage } from "../../../utils/SMS";
import DeleteSingleConfirmationModal from "../../../components/DeleteSingleConfirmationModal";
import ButtonGroupButton from "../../../components/buttonGroupButton";
import AESText from "../../../components/aesText";
import BottomBarSpacer from "../../../components/bottomBarSpacer";
import LanguagesStore from '../../../stores/LanguageStore';
import { withTranslation } from 'react-i18next';


@observer
class TwentyFourSevenCallerID extends Component {


    constructor() {
        super();
        this.state = {
            caller1: '',
            caller2: '',
            caller3: '',
            caller4: '',
            caller5: '',
            caller6: '',
            caller7: '',
            caller8: '',
        }
    }

    manageState = (key, value) => {
        this.setState({
            [key]: value
        })
    }


    @observable caller1 = ''
    @observable caller2 = ''
    @observable caller3 = ''
    @observable caller4 = ''
    @observable caller5 = ''
    @observable caller6 = ''
    @observable caller7 = ''
    @observable caller8 = ''

    @observable callerUn = ''
    @observable callerDeux = ''
    @observable callerTrois = ''
    @observable callerQuatre = ''
    @observable callerCinq = ''
    @observable callerSixx = ''
    @observable callerSept = ''
    @observable callerHuit = ''

    @observable deleteKnownModalVisible = false;
    @observable deleteAllModalVisible = false;
    @observable modalInput = '';

    setInputText = (text) => {
        this.modalInput = text;
    }

    toggleModal = (modal) => {
        this[modal] = !this[modal];
    };


    checkEntry() {
        return (this.caller1 + this.caller2 + this.caller3 + this.caller4 + this.caller5 + this.caller6 + this.caller7 + this.caller8).length === 0;
    }

    sendCallerIDs = () => {
        let callerCount = ['1', '2', '3', '4', '5', '6', '7', '8'];
        let numbers = [];
        for (const number of callerCount) {
            // let index = callerCount.indexOf(number);
            if (this[`caller${number}`].length > 0) {
                numbers.push(`#72${this[`caller${number}`]}`);
            }
        }

        SendSMSMessage(
            `Caller ${numbers.length > 1 ? 'IDs' : 'ID'} has been set`,
            `${UserStore.sites[UserStore.activeSiteID].passcode}${numbers.join('')}#`,
            UserStore.sites[UserStore.activeSiteID].telephoneNumber,
        )

    }


    render() {
        let { currentMode } = UserStore;
        let { languages, getLanguage } = LanguagesStore
        const { t, i18n } = this.props;
        let callerCount = ['1', '2', '3', '4', '5', '6', '7', '8'];
        return (
            <Fragment>
                <Header
                    leftButtonOnPress={() => { this.props.navigation.goBack()}}
                    leftButtonType={'Back'}
                    headerText={t('perm_caller_id')}
                    style={{ backgroundColor: Colours[currentMode].primaryColour }}
                />
                <KeyboardAwareScrollView style={{ backgroundColor: Colours.white }}>
                    <View style={styles.container}>
                        <CurrentSiteHeader />

                        <View style={styles.optionContainer}>
                            {/* <Text style={styles.textInputHeader}>{languages.caller_id_numbers.text}</Text> */}

                            <AESText
                                color={Colours.black}
                                family={'Roboto-Regular'}
                                size={16}
                                content={t('add_eight_caller_id_numbers')}
                                containerStyle={{ marginBottom: 20 }}
                            />
                            {callerCount.map((callerNumber, index) => {
                                return (
                                    <View style={{ marginBottom: 20 }} key={`caller_number_${index}`}>
                                        <AESTextInput
                                            title={`${t('caller')} #${callerNumber}`}
                                            titleTextColoured={true}
                                            placeholder={'0044 1234 567890'}
                                            value={this[`caller${callerNumber}`]}
                                            onChangeText={text => {
                                                this[`caller${callerNumber}`] = text.replace(/\D/g, '')
                                            }}
                                            keyboardType={'number-pad'}
                                        />
                                    </View>
                                )
                            })}
                            <View style={{ marginTop: 20, marginBottom: 10 }}>
                                <TextButton
                                    buttonText={t('save')}
                                    outline={false}
                                    disabled={this.checkEntry()}
                                    onPress={() => {
                                        this.sendCallerIDs();
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
                    header={t('delete_carder_id_number')}
                    body={t('enter_caller_id_to_delete')}
                    onPressClose={() => this.toggleModal('deleteKnownModalVisible')}
                    cancelButtonText={t('cancel')}
                    confirmButtonText={t('delete')}
                    smsAction={'deleteSingleCallerID'}
                    warning={true}
                    input={'telephone'}
                />


                <ConfirmationModal
                    visible={this.deleteAllModalVisible}
                    header={t('delete_all_caller_id_numbers')}
                    body={t('delete_all_caller_id_numbers_confirmation')}
                    onPressClose={() => { this.deleteAllModalVisible = false; }}
                    cancelButtonText={t('no')}
                    confirmButtonText={t('yes')}
                    // onPress={()=>console.log('Delete')}
                    warning={true}
                    onPressSMSAction={'deleteAllCIDs'}
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
    modalView: {
        justifyContent: 'flex-end',
        margin: 0,
    },
}

export default withTranslation()(TwentyFourSevenCallerID);
