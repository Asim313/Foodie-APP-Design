import React, { Component, Fragment } from 'react';

import { Image, Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Header from "../../components/header";
import Colours from '../../styles/colours.js'

import { observer } from 'mobx-react'
import { observable } from 'mobx'
import UserStore from '../../stores/SiteStore'
import CurrentSiteHeader from "../../components/currentSiteHeader";
import SiteButton from "../../components/siteButton";
import TextButton from "../../components/textButton";
import { SendSMSMessage } from "../../utils/SMS";
import SwitchSiteModal from "../../components/switchSiteModal";
import Modal from "react-native-modal";
import AsyncStorage from '@react-native-async-storage/async-storage'
import BottomBarSpacer from "../../components/bottomBarSpacer";

import LanguagesStore from '../../stores/LanguageStore';
import { withTranslation } from 'react-i18next';


@observer
class HomeLanding extends Component {


    constructor(props) {
        super(props)
        this.state = {
            sites: []
        }
    }


    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
            if (!LanguagesStore.selectedLanguage) {
                LanguagesStore.selectedLanguage = 'en'; // Default to "en" without navigating
            }
    
            UserStore.loadData().then((response) => {
                if (response === 500) {
                    this.props.navigation.navigate('SiteManagement', {
                        screen: 'SiteAdd',
                        params: {
                            routingData: {
                                onboarding: true
                            }
                        }
                    });
                } else {
                    // Handle the case where response is not 500 if needed
                }
            });
        });
    }
    

    componentWillUnmount() {
        this.props.navigation.removeListener('focus')
    }

    @observable switchSiteVisible = false;
    @observable openGateModal = false;
    @observable closeGateModal = false;
    @observable holdOpenGateModal = false;

    updateSiteList() {
        // console.log('UserStore.sites');
        // console.log(UserStore.sites);
        AsyncStorage.getItem('saved_sites').then(savedSites => {
            // console.log('updateSiteList');
            // console.log(savedSites);
            // console.log(savedSites.length);
            // console.log(UserStore.sites);
            // console.log(UserStore.sites.length);
            let noSitesRecorded = true;
            try {
                noSitesRecorded = (UserStore.sites.length === 0);
            } catch {

            }
            // console.log('noSitesRecorded');
            // console.log(noSitesRecorded);
            if ((!savedSites || savedSites.length <= 2) && noSitesRecorded) {
                //Onboarding
                this.props.navigation.navigate('SiteAdd',
                    {
                        routingData: {
                            onboarding: true
                        }
                    })
            } else {
                savedSites = JSON.parse(savedSites);
                this.setState({ sites: savedSites });
            }
        });
    }

    toggleModal = (modal) => {
        this[modal] = !this[modal];
    };

    render() {
        let { currentMode } = UserStore;
        let { languages, selectedLanguage } = LanguagesStore
        const { t, i18n } = this.props;



        return (
            <Fragment>
                {selectedLanguage &&
                    <>

                    <Header
                        headerText={t('home')}
                        style={{ backgroundColor: Colours[currentMode].primaryColour }}
                    />
            
                        <ScrollView style={{ backgroundColor: Colours.white }}>
                            <View style={styles.container}>
                                <CurrentSiteHeader />

                                <SiteButton
                                    buttonText={t('open')}
                                    onPress={() => { this.openGateModal = true; }}
                                    messageOnPress={() => { console.log('message') }}
                                    callOnPress={() => { console.log('call') }}
                                />

                                <SiteButton
                                    buttonText={t('hold_open')}
                                    onPress={() => {
                                        this.holdOpenGateModal = true;
                                    }}
                                    messageOnPress={() => { console.log('message') }}
                                />
                                <SiteButton
                                    buttonText={t('close')}
                                    onPress={() => {
                                        this.closeGateModal = true;
                                    }}
                                    messageOnPress={() => { console.log('message') }}
                                />
                                <View style={{ marginTop: 20, marginBottom: 40 }}>
                                    <TextButton
                                        buttonText={t('switch_site')}
                                        outline={false}
                                        disabled={false}
                                        onPress={() => {
                                            this.switchSiteVisible = true
                                        }}
                                    />
                                </View>
                            </View>
                            <BottomBarSpacer />
                        </ScrollView>
                        <SwitchSiteModal
                            visible={this.switchSiteVisible}
                            onPressClose={() => this.toggleModal('switchSiteVisible')}
                            navigation={this.props.navigation}
                        />

                        <Modal
                            isVisible={this.openGateModal}
                            avoidKeyboard={true}
                            style={styles.modalView}
                            onBackdropPress={() => { this.openGateModal = false; }}
                            backdropColor={Colours.lightGray}
                        >
                            <View style={styles.modalContainer}>
                                <View style={[styles.modal, { borderColor: Colours[currentMode].primaryColour }]}>
                                    <View style={styles.modalHeader}>
                                        <Text style={styles.modalText}>{t('open')}</Text>
                                        <TouchableOpacity onPress={() => { this.openGateModal = false; }}>
                                            <Image source={require('../../../assets/images/header/modalClose.png')} />
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={styles.modalBodyText}>{t('call_sms_to_open')}</Text>

                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'stretch',
                                        justifyContent: 'space-between',
                                        height: 50,
                                        marginTop: 20
                                    }}>
                                        <View>
                                            <TextButton
                                                buttonText={t('call')}
                                                outline={true}
                                                disabled={false}
                                                warning={false}
                                                onPress={() => {
                                                    Linking.openURL(`tel:${UserStore.sites[UserStore.activeSiteID].telephoneNumber}`);
                                                }}
                                            />
                                        </View>
                                        <View>
                                            <TextButton
                                                buttonText={t('SMS')}
                                                outline={true}
                                                disabled={false}
                                                warning={false}
                                                onPress={() => {
                                                    SendSMSMessage(
                                                        `Request sent to open your gates`,
                                                        `${UserStore.sites[UserStore.activeSiteID].accessCode}#1#`,
                                                        UserStore.sites[UserStore.activeSiteID].telephoneNumber
                                                    )
                                                }}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                        <Modal
                            isVisible={this.closeGateModal}
                            avoidKeyboard={true}
                            style={styles.modalView}
                            onBackdropPress={() => { this.closeGateModal = false; }}
                            backdropColor={Colours.lightGray}
                        >
                            <View style={styles.modalContainer}>
                                <View style={[styles.modal, { borderColor: Colours[currentMode].primaryColour }]}>
                                    <View style={styles.modalHeader}>
                                        <Text style={styles.modalText}>{t('close')}</Text>
                                        <TouchableOpacity onPress={() => { this.closeGateModal = false; }}>
                                            <Image source={require('../../../assets/images/header/modalClose.png')} />
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={styles.modalBodyText}>{t('close_message')}</Text>
                                    <View style={{
                                        flexDirection: 'row',
                                        height: 50,
                                        marginTop: 20,
                                    }}>
                                        <View style={{ width: '100%' }}>
                                            <TextButton
                                                buttonText={t('sms_message')}
                                                outline={true}
                                                disabled={false}
                                                warning={false}
                                                onPress={() => {
                                                    SendSMSMessage(
                                                        `Request sent to close your gates`,
                                                        `${UserStore.sites[UserStore.activeSiteID].accessCode}#3#`,
                                                        UserStore.sites[UserStore.activeSiteID].telephoneNumber
                                                    )
                                                }}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                        <Modal
                            isVisible={this.holdOpenGateModal}
                            avoidKeyboard={true}
                            style={styles.modalView}
                            onBackdropPress={() => { this.holdOpenGateModal = false; }}
                            backdropColor={Colours.lightGray}
                        >
                            <View style={styles.modalContainer}>
                                <View style={[styles.modal, { borderColor: Colours[currentMode].primaryColour }]}>
                                    <View style={styles.modalHeader}>
                                        <Text style={styles.modalText}>{t('hold_open')}</Text>
                                        <TouchableOpacity onPress={() => { this.holdOpenGateModal = false; }}>
                                            <Image source={require('../../../assets/images/header/modalClose.png')} />
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={styles.modalBodyText}>{t('hold_open_message')}</Text>
                                    <View style={{
                                        flexDirection: 'row',
                                        height: 50,
                                        marginTop: 20,
                                    }}>
                                        <View style={{ width: '100%' }}>
                                            <TextButton
                                                buttonText={t('sms_message')}
                                                outline={true}
                                                disabled={false}
                                                warning={false}
                                                onPress={() => {
                                                    SendSMSMessage(
                                                        `Request sent to keep your gates open`,
                                                        `${UserStore.sites[UserStore.activeSiteID].accessCode}#2#`,
                                                        UserStore.sites[UserStore.activeSiteID].telephoneNumber
                                                    )
                                                }}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </Modal>
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
        // paddingBottom: 20,
        fontFamily: 'Roboto-Medium'
    },
    settingsHeader: {
        color: Colours.black,
        fontSize: 16,
        // paddingBottom: 20,
        fontFamily: 'Roboto-Bold'
    },
    settingsText: {
        color: Colours.black,
        fontSize: 14,
        // paddingBottom: 20,
        fontFamily: 'Roboto-Regular'
    },
    textInput: {
        color: Colours.black,
        borderBottomWidth: 1,
        borderColor: Colours.gray,
        fontSize: 14,
        paddingBottom: 10,
        fontFamily: 'Roboto-Regular'

    },
    modalContainer: {
        // width:'100%',
        backgroundColor: '#00000050',
        borderTopEndRadius: 25,
        borderTopStartRadius: 25,
        // elevation:10
        // alignSelf:'center',
        // top:550
    },
    modal: {
        backgroundColor: Colours.white,
        // padding: 15,
        // borderRadius:20,
        borderTopEndRadius: 25,
        borderTopStartRadius: 25,
        paddingVertical: 30,
        paddingHorizontal: 25,
        paddingBottom: 60
        // height:300,
        // flexDirection:'row',
        // alignContent:'center',
        // justifyContent:'center',
    },
    modalView: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        width: '100%',
        marginBottom: 20
    },
    modalText: {
        color: Colours.black,
        fontSize: 20,
        fontFamily: 'Roboto-Bold',
    },
    modalBodyText: {
        fontFamily: 'Roboto-regular',
        fontSize: 14,
        color: Colours.black
    },
}

export default withTranslation()(HomeLanding);

