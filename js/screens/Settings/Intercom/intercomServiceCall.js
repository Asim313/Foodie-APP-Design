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
} from 'react-native';
// import Slider from '@react-native-community/slider';
import { Slider } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Header from '../../../components/header';
import Colours from '../../../styles/colours.js';
import TextButton from '../../../components/textButton';

import { observer } from 'mobx-react';
import { observable, action } from 'mobx';
import UserStore from '../../../stores/SiteStore';
import CurrentSiteHeader from '../../../components/currentSiteHeader';
import Divider from '../../../components/divider';
import SettingsInput from '../../../components/settingsInput';
import AESTextInput from '../../../components/aesTextInput';
import {
    checkLite, checkNullSite,
    checkPro,
    validatePasscode,
    validateRelayTime,
    validateTelephoneNumber,
} from '../../../utils/validation';
import AESToolTipDescription from '../../../components/aesToolTipDescription';
import AESText from '../../../components/aesText';
import { SendSMSMessage, SendSMSMessageWithUpdate } from "../../../utils/SMS";
import BottomBarSpacer from '../../../components/bottomBarSpacer';
import LanguagesStore from '../../../stores/LanguageStore';
import ToggleButton from '../../../components/toggleButton';
import { withTranslation } from 'react-i18next';


@observer
class IntercomServiceCall extends Component {

    constructor() {
        super();
        this.state = {
            serviceCallType: '',
            serviceCallNumber: '',
            serviceCallSchedule: '',
        };
    }


    @observable serviceCallType = ''
    @observable serviceCallNumber = ''
    @observable serviceCallSchedule = ''

    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
            if (checkLite()) {
                this.props.navigation.popToTop();
            } else {
                // this.setState({
                this.serviceCallType = UserStore.sites[UserStore.activeSiteID].serviceCallType;
                this.serviceCallNumber = UserStore.sites[UserStore.activeSiteID].serviceCallNumber;
                this.serviceCallSchedule = UserStore.sites[UserStore.activeSiteID].serviceCallSchedule;
                // })
            }
        });
    }

    componentWillUnmount() {
        this.props.navigation.removeListener('focus');
    }

    manageState = (key, value) => {
        this.setState({
            [key]: value,
        });
    }

    saveEnabled = () => {
        const days = Number(this.serviceCallSchedule);
        const isValidDays =  this.serviceCallSchedule.length > 0 && !isNaN(days) && (days >= 0 && days < 60);
        return this.serviceCallType.length > 0 &&  this.serviceCallNumber.length > 0 &&  isValidDays;
    }

    handleSave = () => {
        SendSMSMessage(
          'Service call number has been set.',
          `${UserStore.sites[UserStore.activeSiteID].passcode}#77${this.serviceCallNumber}#57${this.serviceCallSchedule}#58${this.serviceCallType}#`,
          UserStore.sites[UserStore.activeSiteID].telephoneNumber).then(res => {
            UserStore.setSiteProperty('serviceCallNumber', this.serviceCallNumber);
            UserStore.setSiteProperty('serviceCallSchedule', this.serviceCallSchedule);
            UserStore.setSiteProperty('serviceCallType', this.serviceCallType);
        });
    }

    render() {
        let { currentMode } = UserStore;
        let { languages } = LanguagesStore;
        const { t, i18n } = this.props;

        return (
            <Fragment>
                <Header
                    leftButtonOnPress={() => { this.props.navigation.goBack(); }}
                    leftButtonType={'Back'}
                    headerText={t('service_call')}
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
                                    content={t('intercom_call_sms')}
                                />

                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'stretch',
                                    justifyContent: 'space-between',
                                    height: 50,
                                    marginTop: 20,
                                }}>
                                    <View>
                                        <ToggleButton
                                          buttonText={t('call')}
                                          outline={true}
                                          disabled={this.serviceCallType !== '1'}
                                          onPress={() => this.serviceCallType = '1'}
                                        />
                                    </View>
                                    <View>
                                        <ToggleButton
                                          buttonText={t('sms_message')}
                                          outline={true}
                                          disabled={this.serviceCallType !== '0'}
                                          onPress={() => this.serviceCallType = '0'}
                                        />
                                    </View>
                                </View>
                            </View>

                            <View style={{ marginBottom: 30 }}>
                                <AESText
                                    color={Colours.black}
                                    family={'Roboto-Regular'}
                                    size={16}
                                    content={t('enter_caller_for_scheduled_call')}
                                />
                                <AESTextInput
                                    placeholder={'Service Number'}
                                    value={this.serviceCallNumber}
                                    onChangeText={(text) => {
                                        this.serviceCallNumber = validateTelephoneNumber(text);
                                    }}
                                    keyboardType={'number-pad'}
                                />
                            </View>

                            <View style={{ marginVertical: 0 }}>
                                <AESText
                                  color={Colours.black}
                                  family={'Roboto-Regular'}
                                  size={16}
                                  content={t('service_schedule')}
                                />
                                <AESTextInput
                                  placeholder={'0-60 days'}
                                  value={this.serviceCallSchedule}
                                  enablePlaceholder={true}
                                  onChangeText={(text) => {
                                      this.serviceCallSchedule = text;
                                  }}
                                  keyboardType={'number-pad'}
                                />
                            </View>

                            <View style={{ marginBottom: 10, marginTop: 30 }}>
                                <TextButton
                                    buttonText={t('save')}
                                    outline={false}
                                    disabled={!this.saveEnabled()}
                                    onPress={this.handleSave}
                                />
                            </View>

                            <View style={{ marginTop: 20, marginBottom: 10 }}>
                                <TextButton
                                    buttonText={t('delete')}
                                    outline={true}
                                    onPress={() => {
                                        SendSMSMessageWithUpdate(
                                            'Service call number has been deleted.',
                                            `${UserStore.sites[UserStore.activeSiteID].passcode}#77*#`,
                                            UserStore.sites[UserStore.activeSiteID].telephoneNumber,
                                            'serviceCallNumber',
                                            ''
                                        );
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
        paddingVertical: 30,
    },
    optionElement: {
        justifyContent: 'center',
        alignContent: 'center',
    },
    optionsText: {
        color: Colours.black,
        fontSize: 18,
        fontFamily: 'Roboto-Medium',
    },
    settingsHeader: {
        color: Colours.black,
        fontSize: 16,
        fontFamily: 'Roboto-Bold',
    },
    settingsText: {
        color: Colours.black,
        fontSize: 14,
        fontFamily: 'Roboto-Regular',
    },
    textInputHeader: {
        color: Colours.black,
        fontSize: 22,
        paddingBottom: 20,
        fontFamily: 'Roboto-Medium',
    },
    textInput: {
        color: Colours.black,
        fontSize: 16,
        fontFamily: 'Roboto-Regular',
    },
};

export default withTranslation()(IntercomServiceCall);
