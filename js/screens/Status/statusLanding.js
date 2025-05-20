import React, { Fragment, Component, useContext } from 'react';

import {
    View,
    Image,
    TouchableOpacity,
    Text,
    ScrollView
} from 'react-native';
import Header from "../../components/header";
import Colours from '../../styles/colours.js'

import { observer } from 'mobx-react'
import { observable, action } from 'mobx'
import UserStore from '../../stores/SiteStore'
import CurrentSiteHeader from "../../components/currentSiteHeader";
import SettingsIconButton from "../../components/settingsIconButton";
import AESToast from "../../components/aesToast";
import { checkLite, checkNullSite, checkPro } from "../../utils/validation";
import { SendSMSMessage } from "../../utils/SMS";
import BottomBarSpacer from "../../components/bottomBarSpacer";
import LanguagesStore from '../../stores/LanguageStore';
import { withTranslation } from 'react-i18next';
@observer
class StatusLanding extends Component {
    constructor() {
        super();
    }

    render() {
        let { currentMode } = UserStore;
        let { languages, selectedLanguage } = LanguagesStore
        const { t, i18n } = this.props;

        return (
            <Fragment>
                {selectedLanguage &&
                    <>
                        <Header
                            headerText={t('status')}
                            style={{ backgroundColor: Colours[currentMode].primaryColour }}
                        />
                        <ScrollView style={{ backgroundColor: Colours.white }}>
                            <View style={styles.container}>
                                <CurrentSiteHeader />

                                {/* {checkPro() && (
                                  <>
                                      <SettingsIconButton
                                        buttonText={languages.automatic_relay_times?.text ?? 'Automatic Relay Times'}
                                        buttonSubText={languages.automatic_relay_times_message?.text ?? 'Send an SMS message to check the programmed times for the relay(s) to operate.'}
                                        onPress={() => {
                                            SendSMSMessage(
                                              `Request for event log sent`,
                                              `*24#`,
                                              UserStore.sites[UserStore.activeSiteID].telephoneNumber
                                            );
                                        }}
                                      />

                                      <SettingsIconButton
                                        buttonText={languages.event_log?.text ?? 'Event Log'}
                                        buttonSubText={languages.event_log_message?.text ?? 'Send an SMS message to retrieve a record of the last 20 events.'}
                                        onPress={() => {
                                            SendSMSMessage(
                                              `Request for event log sent`,
                                              `*23#`,
                                              UserStore.sites[UserStore.activeSiteID].telephoneNumber
                                            );
                                        }}
                                      />

                                      <SettingsIconButton
                                        buttonText={languages.notification_numbers?.text ?? 'Notification Numbers'}
                                        buttonSubText={languages.notification_numbers_message?.text ?? 'Send an SMS to allow up to four phone numbers to receive SMS alerts each time the unit is used to grant access.'}
                                        onPress={() => {
                                            SendSMSMessage(
                                              `Request for event log sent`,
                                              `*25#`,
                                              UserStore.sites[UserStore.activeSiteID].telephoneNumber
                                            );
                                        }}
                                      />
                                  </>
                                )} */}


                                <SettingsIconButton
                                    buttonText={t('relay_status')}
                                    buttonSubText={t('relay_status_message')}
                                    onPress={() => {
                                        SendSMSMessage(
                                            `Request for relay status sent`,
                                            `*22#`,
                                            UserStore.sites[UserStore.activeSiteID].telephoneNumber
                                        )
                                    }}
                                />
                                {checkLite() &&
                                    <SettingsIconButton
                                        buttonText={t('keypad_code')}
                                        buttonSubText={t('keypad_codes_message')}
                                        onPress={() => {
                                            SendSMSMessage(
                                                `Request for keypad codes sent`,
                                                `${UserStore.sites[UserStore.activeSiteID].accessCode}#25#`,
                                                UserStore.sites[UserStore.activeSiteID].telephoneNumber
                                            )
                                        }}
                                    />
                                }
                                <SettingsIconButton
                                    buttonText={t('stored_numbers')}
                                    buttonSubText={t('stored_numbers_message')}
                                    onPress={() => {
                                        SendSMSMessage(
                                            `Request for stored numbers sent`,
                                            `*21#`,
                                            UserStore.sites[UserStore.activeSiteID].telephoneNumber)
                                    }}
                                />
                                <SettingsIconButton
                                    buttonText={t('signal_level')}
                                    buttonSubText={t('signal_level_message')}
                                    onPress={() => {
                                        SendSMSMessage(
                                            `Request for signal level status sent`,
                                            `*20#`,
                                            UserStore.sites[UserStore.activeSiteID].telephoneNumber)
                                    }}
                                />

                                
                                <SettingsIconButton
                                    buttonText={languages.event_log?.text ?? 'Events Log'}
                                    buttonSubText={languages.event_log_message?.text ?? 'Send an SMS to retrieve a record of the last 20 events.'}
                                    onPress={() => {
                                        SendSMSMessage(
                                            `Request for events log sent`,
                                            `*23#`,
                                            UserStore.sites[UserStore.activeSiteID].telephoneNumber
                                        );
                                    }}
                                    />

                                {UserStore.currentMode === 'plus' &&
                                <>

                                <SettingsIconButton
                                    buttonText={t('notification_numbers')}
                                    buttonSubText={t('notification_numbers_message')}
                                    onPress={() => {
                                        SendSMSMessage(
                                            `Request for notification numbers sent`,
                                            `*25#`,
                                            UserStore.sites[UserStore.activeSiteID].telephoneNumber
                                        );
                                    }}
                                    />

                                <SettingsIconButton
                                    buttonText={languages.automatic_relay_times?.text ?? 'Automatic Relay Times'}
                                    buttonSubText={languages.automatic_relay_times_message?.text ?? 'Send an SMS to check the programmed times for the relay(s) to operate.'}
                                    onPress={() => {
                                        SendSMSMessage(
                                            `Request for auto relay times sent`,
                                            `*24#`,
                                            UserStore.sites[UserStore.activeSiteID].telephoneNumber
                                        );
                                    }}
                                    />

                                <SettingsIconButton
                                    buttonText={languages.time_restricted_caller_ids?.text ?? 'Time Restricted Caller IDs'}
                                    buttonSubText={languages.time_restricted_ids_message?.text ?? 'Send an SMS to check all Time-Restricted Caller ID numbers.' +
                                        ' Includes day and time details.'}
                                    onPress={() => {
                                        SendSMSMessage(
                                            `Request for timed caller IDs sent`,
                                            `*26#`,
                                            UserStore.sites[UserStore.activeSiteID].telephoneNumber
                                        )
                                    }}
                                    />


                                <SettingsIconButton
                                    buttonText={t('pte_limits')}
                                    buttonSubText={t('pte_limits_message')}
                                    onPress={() => {
                                        SendSMSMessage(
                                            `Request for push to exit time limits sent`,
                                            `*40#`,
                                            UserStore.sites[UserStore.activeSiteID].telephoneNumber)
                                }}
                                />

                                <SettingsIconButton
                                    buttonText={t('battery_notification')}
                                    buttonSubText={t('battery_notification_message')}
                                    onPress={() => {
                                        SendSMSMessage(
                                            `Request for notification numbers sent`,
                                            `*41#`,
                                            UserStore.sites[UserStore.activeSiteID].telephoneNumber)
                                }}
                                />

                                <SettingsIconButton
                                    buttonText={t('suspend_times')}
                                    buttonSubText={t('suspend_times_message')}
                                    onPress={() => {
                                        SendSMSMessage(
                                            `Request for suspend times sent`,
                                            `*42#`,
                                            UserStore.sites[UserStore.activeSiteID].telephoneNumber)
                                }}
                                />

                                <SettingsIconButton
                                    buttonText={languages.technical_information?.text ?? 'Technical Information'}
                                    buttonSubText={languages.event_log_message?.text ?? 'Send an SMS to check the stored technical information.'}
                                    onPress={() => {
                                        SendSMSMessage(
                                            `Request for tech info sent`,
                                            `*10#`,
                                            UserStore.sites[UserStore.activeSiteID].telephoneNumber
                                        );
                                    }}
                                    />


                                 </>   
                                    
                                     }

                            </View>
                            <BottomBarSpacer />
                        </ScrollView>
                    </>
                }
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
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: Colours.black,
        padding: 25,
        borderRadius: 7.5,
        alignItems: 'center',
        height: 100,
        marginVertical: 20

    },
    optionElement: {
        justifyContent: 'center',
        alignContent: 'center'
    },
    disabledButton: {
        marginTop: 60,
        padding: 20,
        borderRadius: 7.5,
        backgroundColor: Colours.lightGray
    },
    enabledButton: {
        marginTop: 60,
        padding: 20,
        borderRadius: 7.5,
        backgroundColor: Colours.black
    },
    buttonText: {
        color: Colours.white,
        fontSize: 14,
        textAlign: 'center',
        fontFamily: 'Roboto-Bold'
    },
    textInputHeader: {
        color: Colours.black,
        fontSize: 22,
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
    textInput: {
        color: Colours.black,
        borderBottomWidth: 1,
        borderColor: Colours.gray,
        fontSize: 14,
        paddingBottom: 10,
        fontFamily: 'Roboto-Regular'

    }
}

export default withTranslation()(StatusLanding);
