import React, { Component, Fragment } from 'react';

// import Slider from '@react-native-community/slider';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Header from "../../../components/header";
import Colours from '../../../styles/colours.js'
import TextButton from "../../../components/textButton";

import { observer } from 'mobx-react'
import { observable } from 'mobx'
import UserStore from '../../../stores/SiteStore'
import CurrentSiteHeader from "../../../components/currentSiteHeader";
import { checkPro } from "../../../utils/validation";
import { SendSMSMessage, SendSMSMessageWithUpdate } from "../../../utils/SMS";
import ConfirmationModal from "../../../components/confirmationModal";
import BottomBarSpacer from "../../../components/bottomBarSpacer";
import LanguagesStore from '../../../stores/LanguageStore';
import { withTranslation } from 'react-i18next';

@observer
class DialOutAPN extends Component {

    constructor() {
        super();
        this.state = {
            apnAddress: ''
        }
    }

    @observable deleteAPNModalVisible = false;
    @observable APNToolTipModalVisible = false;
    @observable apnAddress = '';
    // componentDidMount() {
    //     this.setState({apnAddress:UserStore.sites[UserStore.activeSiteID].apnAddress})
    // }

    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
            if (checkPro()) {
                this.props.navigation.popToTop();
            } else {
                this.apnAddress = UserStore.sites[UserStore.activeSiteID].apnAddress;
                // this.setState({apnAddress:UserStore.sites[UserStore.activeSiteID].apnAddress})
            }
        });
    }

    componentWillUnmount() {
        this.props.navigation.removeListener('focus')
    }

    toggleModal = (modal) => {
        this[modal] = !this[modal];
    };

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
                    headerText={t('apn')}
                    style={{ backgroundColor: Colours[currentMode].primaryColour }}
                />
                <KeyboardAwareScrollView style={{ backgroundColor: Colours.white }}>
                    <View style={styles.container}>
                        <CurrentSiteHeader />


                        <View style={styles.optionContainer}>
                            <View>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                    <Text style={[styles.textInputHeader, { color: Colours.black }]}>{t('set_apn_volte')}</Text>
                                    <TouchableOpacity
                                        style={{ marginLeft: 10 }}
                                        onPress={() => {
                                            this.APNToolTipModalVisible = true;
                                        }}
                                    >
                                        <Image source={require('../../../../assets/images/icons/infoButton.png')} />
                                    </TouchableOpacity>
                                </View>
                                <TextInput
                                    style={[styles.textInput, { borderColor: Colours[currentMode].primaryColour }]}
                                    underlineColorAndroid={Colours[currentMode].primaryColour}
                                    value={this.apnAddress}
                                    onChangeText={text => {
                                        this.apnAddress = text;
                                    }}
                                />
                            </View>
                            <View style={{ marginTop: 20, marginBottom: 10 }}>
                                <TextButton
                                    buttonText={t('save')}
                                    outline={false}
                                    disabled={this.apnAddress.length < 1}
                                    onPress={() => {
                                        SendSMSMessageWithUpdate(
                                            `APN address set to ${this.apnAddress}. Restart your device for changes to take effect.`,
                                            `${UserStore.sites[UserStore.activeSiteID].passcode}#97${this.apnAddress}#`,
                                            UserStore.sites[UserStore.activeSiteID].telephoneNumber,
                                            'apnAddress',
                                            this.apnAddress
                                        )
                                    }}
                                />
                            </View>
                            <View style={{ marginVertical: 10 }}>
                                <TextButton
                                    buttonText={t('delete_apn')}
                                    outline={true}
                                    disabled={false}
                                    onPress={() => {
                                        this.deleteAPNModalVisible = true;
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                    <BottomBarSpacer />
                </KeyboardAwareScrollView>
                <ConfirmationModal
                    visible={this.deleteAPNModalVisible}
                    header={t('delete_apn')}
                    body={t('delete_intercom_apn')}
                    onPressClose={() => this.deleteAPNModalVisible = false}
                    cancelButtonText={t('no')}
                    confirmButtonText={t('yes')}
                    onPress={() => {
                        SendSMSMessage(
                            `The APN has been deleted from site`,
                            `${UserStore.sites[UserStore.activeSiteID].passcode}#97*#`,
                            UserStore.sites[UserStore.activeSiteID].telephoneNumber
                        ).then(res => this.deleteAPNModalVisible = false)
                    }
                    }
                    warning={true}
                />

                <ConfirmationModal
                    visible={this.APNToolTipModalVisible}
                    header={"APN"}
                    body={t('check_apn_provider')}
                    // onPressClose={()=>this.toggleModal('APNToolTip')}
                    onPressClose={() => this.APNToolTipModalVisible = false}
                    // cancelButtonText={'No'}
                    confirmButtonText={t('no')}
                    onPress={() => this.APNToolTipModalVisible = false}
                    warning={false}
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
        fontSize: 18,
        paddingBottom: 10,
        fontFamily: 'Roboto-Medium'
    },
    textInput: {
        color: Colours.black,
        fontSize: 16,
        fontFamily: 'Roboto-Regular',
        borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
        paddingBottom: 10
    },
    textInputSubHeader: {
        color: Colours.black,
        fontSize: 16,
        paddingBottom: 20,
        fontFamily: 'Roboto-Regular'
    },

}

export default withTranslation()(DialOutAPN);
