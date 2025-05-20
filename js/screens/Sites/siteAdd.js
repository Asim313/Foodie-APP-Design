import React, { Fragment, Component, useContext } from 'react';

import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Header from "../../components/header";
import Colours from '../../styles/colours.js'
import TextButton from "../../components/textButton";

import { observer } from 'mobx-react'
import { observable, action } from 'mobx'
import UserStore from '../../stores/SiteStore'
import CurrentSiteHeader from "../../components/currentSiteHeader";
import AESTextInput from "../../components/aesTextInput";
import { validatePasscode, validateRelayTime, validateTelephoneNumber } from "../../utils/validation";
import AESConfirmationToast from "../../components/aesConfirmationToast";
import ConfirmationModal from "../../components/confirmationModal";
import LanguagesStore from '../../stores/LanguageStore';
import { withTranslation } from 'react-i18next';

@observer
class SiteAdd extends Component {


    constructor() {
        super();
        // this.state={
        //     siteName:'',
        //     telephoneNumber:''
        // }
    }

    @observable siteName = '';
    @observable telephoneNumber = '';
    @observable unitTelephoneNumberTooltip = false;
    @observable siteNameTooltip = false;

    componentDidMount() {
        // console.log(JSON.stringify(LanguagesStore))
    }

    render() {
        let { currentMode } = UserStore;
        let { languages } = LanguagesStore
        let { onboarding } = this.props.route.params.routingData;
        const { t, i18n } = this.props;

        return (
            <Fragment>

                <Header
                    leftButtonOnPress={() => { this.props.navigation.goBack() }}
                    leftButtonType={onboarding ? null : 'Back'}
                    headerText={t('add_new_site')}
                    style={{ backgroundColor: Colours['default'].primaryColour }}
                />
                <KeyboardAwareScrollView
                    innerRef={ref => {
                        this.scroll = ref
                    }}
                    style={{ backgroundColor: Colours.white }}>
                    <View style={styles.container}>
                        <View style={styles.optionContainer}>
                            <View style={{ marginTop: 30 }}>

                                <View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                        <Text style={[styles.textInputHeader,
                                        { paddingBottom: Platform.OS === 'ios' ? 15 : 0 },
                                        { color: Colours.black }]}>{t('site_name')}</Text>
                                        <TouchableOpacity
                                            style={{ marginLeft: 10 }}
                                            onPress={() => {
                                                this.siteNameTooltip = true;
                                            }}
                                        >
                                            <Image style={{ tintColor: Colours['default'].primaryColour }} source={require('../../../assets/images/icons/infoButton.png')} />
                                        </TouchableOpacity>
                                    </View>
                                    <TextInput
                                        style={[styles.textInput, { borderColor: Colours['default'].primaryColour }]}
                                        value={this.siteName}
                                        onChangeText={text => {
                                            this.siteName = text;
                                        }}

                                    />
                                </View>

                            </View>
                            <View style={{ marginTop: 60 }}>
                                <View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                        <Text style={[styles.textInputHeader,
                                        { paddingBottom: Platform.OS === 'ios' ? 15 : 0 },
                                        { color: Colours.black }]}>{t('unit_telephone_number')}</Text>
                                        <TouchableOpacity
                                            // style={{flexDirection:'row',justifyContent:'flex-end'}}
                                            style={{ marginLeft: 10 }}
                                            onPress={() => {
                                                // AESToolTipDescription.show('APN','Check the APN of your provider and enter it below, save and reboot the Intercom to register the APN with the network.');
                                                this.unitTelephoneNumberTooltip = true;
                                            }}
                                        >
                                            <Image style={{ tintColor: Colours['default'].primaryColour }} source={require('../../../assets/images/icons/infoButton.png')} />
                                        </TouchableOpacity>
                                    </View>
                                    <TextInput
                                        // placeholderTextColor={Colours.gray}
                                        // placeholder={'APN Address'}
                                        style={[styles.textInput, { borderColor: Colours['default'].primaryColour }]}
                                        // underlineColorAndroid={Colours[currentMode].primaryColour}
                                        value={this.telephoneNumber}
                                        onChangeText={text => {
                                            this.telephoneNumber = validateTelephoneNumber(text);
                                        }}
                                        keyboardType={'number-pad'}
                                    />
                                </View>

                            </View>
                            <View style={{ marginTop: 30 }}>
                                <TextButton
                                    buttonText={t('save')}
                                    outline={false}
                                    disabled={this.telephoneNumber.length === 0 || this.siteName.length === 0}
                                    color={Colours['default'].primaryColour}
                                    onPress={() => {
                                        this.props.navigation.navigate(
                                            'SiteSelectDevice',
                                            {
                                                siteData: {
                                                    siteName: this.siteName,
                                                    telephoneNumber: this.telephoneNumber
                                                }
                                            })
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
                <ConfirmationModal
                    visible={this.siteNameTooltip}
                    header={t('add_new_site')}
                    body={t('site_name_modal')}
                    onPressClose={() => this.siteNameTooltip = false}
                    confirmButtonText={t('close')}
                    onPress={() => this.siteNameTooltip = false}
                    warning={false}
                    onboarding={true}
                />
                <ConfirmationModal
                    visible={this.unitTelephoneNumberTooltip}
                    header={t('unit_telephone_number')}
                    body={t('unit_telephone_number_modal')}
                    // onPressClose={()=>this.toggleModal('APNToolTip')}
                    onPressClose={() => this.unitTelephoneNumberTooltip = false}
                    // cancelButtonText={'No'}
                    confirmButtonText={t('close')}
                    onPress={() => this.unitTelephoneNumberTooltip = false}
                    warning={false}
                    onboarding={true}
                />
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
        // paddingBottom: 10,
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
    }
}

export default withTranslation()(SiteAdd);
