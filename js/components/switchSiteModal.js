import React, { Component, Fragment } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    Animated,
    TouchableWithoutFeedback,
    Text,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import * as Colours from "../styles/colours";
import UserStore from "../stores/SiteStore";
import TextButton from "./textButton";
import Modal from "react-native-modal";
import { observable } from "mobx";
import LanguagesStore from '../stores/LanguageStore';
import AESToast from "../components/aesToast";
import { withTranslation } from 'react-i18next';
class SwitchSiteModal extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            selected: '',
            sites: []
        }
    }

    componentDidMount() {
        // console.log('sites')
        // console.log(UserStore.sites)
        // this.props.navigation.addListener('focus', () =>{
        //     // console.log('AM BACK');
        //     this.updateSiteList();
        // })
        // this.updateSiteList()
        // AsyncStorage.getItem('saved_sites').then(savedSites=>{
        //     console.log('saved sites switch')
        //     console.log(savedSites)
        //     if(savedSites){
        //         savedSites=JSON.parse(savedSites);
        //         this.setState({sites:savedSites},()=>{console.log(this.state.sites)});
        //     }
        // })
    }

    // updateSiteList(){
    //     // console.log('UPDATED SITE LIST')
    //     AsyncStorage.getItem('saved_sites').then(savedSites=>{
    //             // console.log('saved sites switch')
    //             // console.log(savedSites)
    //             if(savedSites){
    //                 savedSites=JSON.parse(savedSites);
    //                 // this.setState({sites:savedSites},()=>{console.log(this.state.sites)});
    //                 this.setState({sites:savedSites});
    //             }
    //         })
    // }

    componentWillUnmount() {
        this.props.navigation.removeListener('focus');
    }



    render() {
        let { currentMode } = UserStore
        let { onPressClose, visible, navigation, sites } = this.props
        let { languages } = LanguagesStore
        const { t, i18n } = this.props;
        return (
            <Fragment>


                <Modal
                    isVisible={visible}
                    avoidKeyboard={true}
                    style={styles.modalView}
                    onBackdropPress={onPressClose}
                    backdropColor={Colours.lightGray}
                >
                    <View style={styles.container}>
                        <View style={[styles.toast, { borderColor: Colours[currentMode].primaryColour }]}>
                            <View style={styles.toastHeader}>
                                <Text style={styles.text}>{t('switch_site')}</Text>
                                <TouchableOpacity onPress={onPressClose}>
                                    <Image source={require('../../assets/images/header/modalClose.png')} />
                                </TouchableOpacity>
                            </View>
                            <ScrollView style={styles.siteView}>
                                {UserStore.sites &&
                                    <View>
                                        {UserStore.sites.map((site, index) => {
                                            return (
                                                <Fragment key={`site_${index}`}>
                                                    <TouchableOpacity
                                                        style={{
                                                            // flex: 1,
                                                            borderWidth: 1,
                                                            paddingHorizontal: 15,
                                                            paddingVertical: 10,
                                                            borderRadius: 7.5,
                                                            alignItems: 'flex-start',
                                                            // height: 100,
                                                            marginVertical: 10,
                                                            width: '100%',
                                                            borderColor: this.state.selected === index ? Colours[currentMode].primaryColour : Colours.black
                                                        }}
                                                        onPress={() => { this.setState({ selected: index }) }}
                                                    >
                                                        <TouchableOpacity style={{ position: 'absolute', top: 10, right: 10 }} onPress={() => {
                                                            // navigation.navigate('EditSite',{site:index});onPressClose();
                                                            UserStore.setEditableSite(index).then((response) => {
                                                                console.log('response');
                                                                console.log(response);
                                                                if (response === 200) {
                                                                    // navigation.navigate('EditSite', {site: index})
                                                                    this.props.navigation.navigate('SiteManagement',
                                                                        {
                                                                            screen: 'EditSite',
                                                                            params: {
                                                                                site: index
                                                                            }
                                                                        });
                                                                    onPressClose();
                                                                }
                                                            });

                                                        }}>
                                                            <Image source={require('../../assets/images/sites/EditSite.png')} />
                                                        </TouchableOpacity>
                                                        <Text style={styles.siteInfo}>
                                                            <Text style={styles.siteField}>{t('site_name')}: </Text>
                                                            <Text style={styles.siteValue}>{`${site.siteName}`}</Text>
                                                        </Text>
                                                        <Text style={styles.siteInfo}>
                                                            <Text style={styles.siteField}>{t('device')}: </Text>
                                                            <Text style={styles.siteValue}>{`${site.device}`}</Text>
                                                        </Text>
                                                        <Text style={styles.siteInfo}>
                                                            <Text style={styles.siteField}>{t('unit_telephone_number')}: </Text>
                                                            <Text style={styles.siteValue}>{`${site.telephoneNumber}`}</Text>
                                                        </Text>
                                                        <Text style={styles.siteInfo}>
                                                            <Text style={styles.siteField}>{t('programming_passcodes')}: </Text>
                                                            <Text style={styles.siteValue}>{`${site.passcode}`}</Text>
                                                        </Text>
                                                        <Text style={styles.siteInfo}>
                                                            <Text style={styles.siteField}>{t('access_control_passcodes')}: </Text>
                                                            <Text style={styles.siteValue}>{`${site.accessCode}`}</Text>
                                                        </Text>

                                                    </TouchableOpacity>
                                                </Fragment>
                                            )
                                        })
                                        }
                                    </View>
                                }
                            </ScrollView>


                            <View style={{
                                flexDirection: 'row',
                                // justifyContent: 'center',
                                alignItems: 'stretch',
                                justifyContent: 'space-between',
                                height: 50,
                                marginTop: 20
                            }}>
                                <View>
                                    <TextButton
                                        buttonText={t('Add New Site')}
                                        outline={true}
                                        disabled={false}
                                        onPress={() => {
                                            this.props.navigation.navigate('SiteManagement',
                                                {
                                                    screen: 'SiteAdd',
                                                    params: {
                                                        routingData: {
                                                            onboarding: false
                                                        }
                                                    }
                                                });
                                            onPressClose();
                                        }
                                        }
                                    />
                                </View>
                                <View>
                                    <TextButton
                                        buttonText={t('Go To Site')}
                                        outline={false}
                                        disabled={this.state.selected === null}
                                        onPress={() => {
                                            if (this.state.selected !== '') {
                                                UserStore.setActiveSite(this.state.selected);
                                                onPressClose();
                                            }
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            </Fragment>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        // width:'100%',
        backgroundColor: '#00000050',
        borderTopEndRadius: 25,
        borderTopStartRadius: 25,
        // alignSelf:'center',
        // top:550
    },
    toast: {
        backgroundColor: Colours.white,
        // padding: 15,
        // borderRadius:20,
        paddingVertical: 30,
        paddingHorizontal: 25,
        paddingBottom: 60,
        borderTopEndRadius: 25,
        borderTopStartRadius: 25,
        // height:300,
        // flexDirection:'row',
        // alignContent:'center',
        // justifyContent:'center',
    },
    toastHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        width: '100%',
        marginBottom: 20
    },
    text: {
        color: Colours.black,
        fontSize: 20,
        fontFamily: 'Roboto-Bold',
    },
    toastIcon: {
        alignSelf: 'center'
    },
    bodyText: {
        fontFamily: 'Roboto-regular',
        fontSize: 14,
        color: Colours.black
    },
    modalView: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    siteView: {
        maxHeight: 400
    },
    siteField: {
        fontFamily: 'Roboto-Medium',
        fontSize: 13,
        color: Colours.black
    },
    siteValue: {
        fontFamily: 'Roboto-Regular',
        fontSize: 13,
        color: Colours.black
    },
    siteInfo: {
        marginVertical: 5
    }
});

export default withTranslation()(SwitchSiteModal);
