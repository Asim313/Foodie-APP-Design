import React, { Fragment, Component, useContext } from 'react';

import { Text, View, TouchableOpacity, Image, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Header from "../../components/header";
import Colours from '../../styles/colours.js'
import TextButton from "../../components/textButton";

import { observer } from 'mobx-react'
import { observable, action } from 'mobx'
import UserStore from '../../stores/SiteStore'
import AESTextInput from "../../components/aesTextInput";
import { validatePasscode } from "../../utils/validation";
import { SendSMSMessage } from "../../utils/SMS";
import ConfirmationModal from "../../components/confirmationModal";

import LanguagesStore from '../../stores/LanguageStore';
import { withTranslation } from 'react-i18next';

@observer
class SiteSelectDevice extends Component {


    constructor() {
        super();
    }

    @observable selected = '';
    @observable passcode = '9999';
    @observable accessCode = '1234';
    @observable codeModalVisible = false
    @observable codeDisabled = true;

    componentDidMount() {
    }

    addSite(data) {
        UserStore.addNewSite(data).then((response) => {
            if (response === 200) {
                this.props.navigation.navigate('HomeLanding');
            }
        });
    }

    render() {
        let { currentMode } = UserStore;
        let { languages } = LanguagesStore
        const { t, i18n } = this.props;
        let { siteName, telephoneNumber } = this.props.route.params.siteData;
        return (
            <Fragment>
                <Header
                    leftButtonOnPress={() => { this.props.navigation.goBack() }}
                    leftButtonType={'Back'}
                    headerText={t('add_new_site')}
                    style={{ backgroundColor: Colours['default'].primaryColour }}
                />
                <KeyboardAwareScrollView style={{ backgroundColor: Colours.white }}>
                    <View style={styles.container}>
                        <View style={styles.optionContainer}>
                            <View style={{ marginTop: 30, flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', alignContent: 'center' }}>
                                <View style={{ width: '45%', marginVertical: 10 }}>
                                    <TouchableOpacity style={[styles.deviceContainer, { borderColor: this.selected === 'iGate 1200' ? Colours['pro'].primaryColour : Colours.gray }]}
                                        onPress={() => {
                                            this.selected = 'iGate 1200';
                                        }}>
                                        <Image style={styles.deviceImage} source={require('../../../assets/images/devices/iGate.png')} />
                                    </TouchableOpacity>
                                    <Text style={styles.deviceName}>iGate 1200</Text>
                                </View>
                                {/*<View style={{width:'10%'}}/>*/}
                                <View style={{ width: '45%', marginVertical: 10 }}>
                                    <TouchableOpacity style={[styles.deviceContainer, { borderColor: this.selected === 'Cellcom Lite' ? Colours['lite'].primaryColour : Colours.gray }]}
                                        onPress={() => {
                                            this.selected = 'Cellcom Lite';
                                        }}>
                                        <Image style={styles.deviceImage} source={require('../../../assets/images/devices/CellcomLite.png')} />
                                    </TouchableOpacity>
                                    <Text style={styles.deviceName}>Cellcom Lite</Text>
                                </View>

                                <View style={{ width: '45%', marginVertical: 10 }}>
                                    <TouchableOpacity style={[styles.deviceContainer, { borderColor: this.selected === 'iGate Plus' ? Colours['plus'].primaryColour : Colours.gray }]}
                                        onPress={() => {
                                            this.selected = 'iGate Plus';
                                        }}>
                                        <Image style={styles.deviceImage} source={require('../../../assets/images/devices/iGatePlus.png')} />
                                    </TouchableOpacity>
                                    <Text style={styles.deviceName}>iGate Plus</Text>
                                </View>
                            </View>

                            {this.codeDisabled &&
                                <View style={{ marginTop: 30 }}>
                                    <TextButton
                                        buttonText={t('advanced_settings')}
                                        outline={false}
                                        disabled={!this.codeDisabled}
                                        color={Colours['default'].primaryColour}
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
                                            placeholder={this.passcode.toString()}
                                            value={this.passcode.toString()}
                                            onChangeText={text => {
                                                this.passcode = validatePasscode(text);
                                            }}
                                            keyboardType={'number-pad'}
                                            color={Colours['default'].primaryColour}
                                        // disabled={true}
                                        />
                                    </View>
                                    <View style={{ marginTop: 30 }}>
                                        <AESTextInput
                                            title={t('access_control_passcodes')}
                                            titleTextColoured={false}
                                            placeholder={this.accessCode.toString()}
                                            value={this.accessCode.toString()}
                                            onChangeText={text => {
                                                this.accessCode = validatePasscode(text);
                                            }}
                                            keyboardType={'number-pad'}
                                            color={Colours['default'].primaryColour}
                                        />
                                    </View>
                                </View>
                            }


                            {this.codeDisabled &&
                                <View style={{ marginTop: 30 }}>
                                    <TextButton
                                        buttonText={t('finish')}
                                        outline={false}
                                        disabled={!this.selected}
                                        color={Colours['default'].primaryColour}
                                        onPress={() => {
                                            this.addSite({
                                                siteName: siteName,
                                                telephoneNumber: telephoneNumber,
                                                device: this.selected,
                                                passcode: '9999',
                                                accessCode: '1234'
                                            })
                                        }}
                                    />
                                </View>
                            }

                            {!this.codeDisabled &&
                                <View style={{ marginTop: 30 }}>
                                    <TextButton
                                        buttonText={t('finish')}
                                        outline={false}
                                        disabled={!this.selected || this.accessCode.length !== 4 || this.passcode.length !== 4}
                                        color={Colours['default'].primaryColour}
                                        onPress={() => {
                                            this.addSite({
                                                siteName: siteName,
                                                telephoneNumber: telephoneNumber,
                                                device: this.selected,
                                                passcode: this.passcode,
                                                accessCode: this.accessCode
                                            })
                                        }}
                                    />
                                </View>
                            }
                        </View>
                    </View>

                </KeyboardAwareScrollView>
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
        paddingBottom: 15,
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
        // borderBottomWidth: 1,
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
        // height:155,
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

export default withTranslation()(SiteSelectDevice);
