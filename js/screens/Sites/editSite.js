import React, { Fragment, Component, useContext } from 'react';

import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
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
        this.state = {
            // id:'',
            // siteName:'',
            // telephoneNumber:'',
            // device:'',
            // passcode:'',
            // accessCode:''
        }
    }

    @observable codeDisabled = true;
    @observable codeModalVisible = false;
    @observable id = ''
    @observable siteName = ''
    @observable telephoneNumber = ''
    @observable device = ''
    @observable passcode = ''
    @observable accessCode = ''
    @observable deleteSiteModal = false;

    componentDidMount() {
    }

    getThemeColour(device) {
        if (device === 'iGate 1200') {
            return 'pro';
        } else if (device === 'Cellcom Lite') {
            return 'lite';
        } else if (device === 'iGate Plus') {
            return 'plus';
        } else if (device === 'maurice') {
            return 'maurice';
        } else if (device === 'jason') {
            return 'jason';
        }else if (device === 'PLACEHOLDER') {
            return 'PLACEHOLDER';
        }
    }

    manageState = (key, value) => {
        this.setState({
            [key]: value
        })
    }


    toggleModal = (modal) => {
        this[modal] = !this[modal];
    };

    render() {
        let { currentMode } = UserStore;
        let { site } = this.props.route.params;
        let targetSite = null;

        let { languages } = LanguagesStore
        const { t, i18n } = this.props;

        try {
            targetSite = UserStore.editableSite
        } catch (e) {
            console.log(e);
        }

        return (
            <Fragment>
                <Header
                    leftButtonOnPress={() => {
                        this.props.navigation.goBack()
                    }}
                    leftButtonType={'Back'}
                    headerText={'Edit Site'}
                    rightButtonType={'Trash'}
                    rightButtonOnPress={() => {
                        this.deleteSiteModal = true;
                    }}
                    style={{ backgroundColor: Colours[this.getThemeColour(UserStore.editableSite.device)].primaryColour }}
                />
                {targetSite &&
                    <KeyboardAwareScrollView
                        innerRef={ref => {
                            this.scroll = ref
                        }}
                        style={{ backgroundColor: Colours.white }}>
                        <View style={styles.container}>
                            <View style={styles.optionContainer}>
                                <View style={{ marginTop: 30 }}>
                                    <AESTextInput
                                        title={t('site_name')}
                                        titleTextColoured={false}
                                        placeholder={t('site_name')}
                                        value={targetSite.siteName}
                                        onChangeText={text => {
                                            targetSite.siteName = text;
                                            // this.manageState(`siteName`, text)
                                        }}
                                        color={Colours[this.getThemeColour(UserStore.editableSite.device)].primaryColour}
                                    />
                                </View>
                                <View style={{ marginTop: 30 }}>
                                    <AESTextInput
                                        title={t('unit_telephone_number')}
                                        titleTextColoured={false}
                                        placeholder={t('unit_telephone_number')}
                                        value={targetSite.telephoneNumber.toString()}
                                        onChangeText={text => {
                                            // this.manageState(`telephoneNumber`, validateTelephoneNumber(text))
                                            targetSite.telephoneNumber = validateTelephoneNumber(text);
                                        }}
                                        keyboardType={'number-pad'}
                                        color={Colours[this.getThemeColour(UserStore.editableSite.device)].primaryColour}
                                    />
                                </View>
                                <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 18, color: Colours.black, marginTop: 30 }}>{'Select Device'}</Text>
                                <View style={{ width: '90%', alignSelf: 'center' }}>
                                    {/*<View style={{marginTop:20, flexDirection:'row',justifyContent: 'space-between'}}>*/}
                                    <View style={{ marginTop: 30, flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', alignContent: 'center' }}>
                                        <View style={{ width: '45%', marginVertical: 10 }}>
                                            <TouchableOpacity style={[styles.deviceContainer, { borderColor: this.selected === 'iGate 1200' ? Colours['pro'].primaryColour : Colours.gray }]} onPress={() => {
                                                // this.manageState('selected','iGate 1200');
                                                this.selected = 'iGate 1200';
                                                targetSite.device = 'iGate 1200';
                                            }}>
                                                <Image style={styles.deviceImage} source={require('../../../assets/images/devices/iGate.png')} />
                                            </TouchableOpacity>
                                            <Text style={styles.deviceName}>iGate 1200</Text>
                                        </View>
                                        <View style={{ width: '45%', marginVertical: 10 }}>
                                            <TouchableOpacity style={[styles.deviceContainer, { borderColor: this.selected === 'Cellcom Lite' ? Colours['lite'].primaryColour : Colours.gray }]} onPress={() => {
                                                // this.manageState('selected','Cellcom Lite');
                                                this.selected = 'Cellcom Lite';
                                                targetSite.device = 'Cellcom Lite';
                                            }}>
                                                <Image style={styles.deviceImage} source={require('../../../assets/images/devices/CellcomLite.png')} />
                                            </TouchableOpacity>
                                            <Text style={styles.deviceName}>Cellcom Lite</Text>
                                        </View>

                                        <View style={{ width: '45%', marginVertical: 10 }}>
                                            <TouchableOpacity style={[styles.deviceContainer, { borderColor: this.selected === 'iGate Plus' ? Colours['plus'].primaryColour : Colours.gray }]} onPress={() => {
                                                // this.manageState('selected','iGate 1200');
                                                this.selected = 'iGate Plus';
                                                targetSite.device = 'iGate Plus';
                                            }}>
                                                <Image style={styles.deviceImage} source={require('../../../assets/images/devices/iGatePlus.png')} />
                                            </TouchableOpacity>
                                            <Text style={styles.deviceName}>iGate Plus</Text>
                                        </View>
                                    </View>
                                </View>

                                {this.codeDisabled &&
                                    <View style={{ marginTop: 30 }}>
                                        <TextButton
                                            buttonText={t('advanced_settings')}
                                            outline={false}
                                            disabled={!this.codeDisabled}
                                            color={Colours[this.getThemeColour(UserStore.editableSite.device)].primaryColour}
                                            onPress={() => {
                                                this.codeModalVisible = true
                                            }}
                                        />
                                    </View>
                                }

                                {!this.codeDisabled &&
                                    <View>
                                        <View style={{ marginTop: 30 }}>
                                            <AESTextInput
                                                title={t('programming_passcodes')}
                                                titleTextColoured={false}
                                                placeholder={targetSite.passcode.toString()}
                                                value={targetSite.passcode.toString()}
                                                onChangeText={text => {
                                                    targetSite.passcode = validatePasscode(text);
                                                }}
                                                keyboardType={'number-pad'}
                                                color={Colours[this.getThemeColour(UserStore.editableSite.device)].primaryColour}
                                            />
                                        </View>
                                        <View style={{ marginTop: 30 }}>
                                            <AESTextInput
                                                title={t('access_control_passcodes')}
                                                titleTextColoured={false}
                                                placeholder={targetSite.accessCode.toString()}
                                                value={targetSite.accessCode.toString()}
                                                onChangeText={text => {
                                                    targetSite.accessCode = validatePasscode(text);
                                                }}
                                                keyboardType={'number-pad'}
                                                color={Colours[this.getThemeColour(UserStore.editableSite.device)].primaryColour}
                                            />
                                        </View>
                                    </View>
                                }
                                <View style={{ marginTop: 30 }}>
                                    <TextButton
                                        buttonText={t('save')}
                                        outline={false}
                                        color={Colours[this.getThemeColour(UserStore.editableSite.device)].primaryColour}
                                        onPress={() => {
                                            UserStore.updateSite(site, targetSite).then(() => {
                                                this.props.navigation.navigate('HomeLanding');
                                            });
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                    </KeyboardAwareScrollView>
                }
                {!targetSite &&
                    <KeyboardAwareScrollView
                        style={{ backgroundColor: Colours.white }}>
                        <View style={styles.container}>
                        </View>
                    </KeyboardAwareScrollView>
                }
                <ConfirmationModal
                    visible={this.deleteSiteModal}
                    header={t('delete_site')}
                    body={t('delete_site_confirmation')}
                    onPressClose={() => this.toggleModal('deleteSiteModal')}
                    cancelButtonText={t('no')}
                    confirmButtonText={t('yes')}
                    onPress={() => {
                        if (targetSite) {
                            this.deleteSiteModal = false;
                            UserStore.deleteSite(targetSite.telephoneNumber).then(response => {
                                console.log('response ' + response)
                                if (response === 200) {
                                    this.props.navigation.navigate('HomeLanding');
                                }
                            });
                        }
                    }}
                    warning={true}
                />
                <ConfirmationModal
                    visible={this.codeModalVisible}
                    header={t('code_control')}
                    body={t('code_control_modal')}
                    onPressClose={() => this.codeModalVisible = false}
                    cancelButtonText={t('cancel')}
                    confirmButtonText={t('unlock')}
                    onPress={() => {
                        this.codeModalVisible = false;
                        this.codeDisabled = false;
                    }
                    }
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
    deviceContainer: {
        borderWidth: 1,
        // borderColor:Colours.gray,
        // height:140,
        aspectRatio: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'row'
    },
    deviceImage: {
        alignSelf: 'center'
    },
    deviceName: {
        textAlign: 'center',
        fontSize: 16,
        color: Colours.black,
        fontFamily: 'Roboto-Medium',
        marginTop: 15
    }
}

export default withTranslation()(SiteAdd);
