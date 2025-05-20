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
    TextInput
} from 'react-native';
// import Slider from '@react-native-community/slider';
import {Slider} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import Header from "../../../components/header";
import Colours from '../../../styles/colours.js'
import TextButton from "../../../components/textButton";

import { observer } from 'mobx-react'
import { observable, action } from 'mobx'
import UserStore from '../../../stores/SiteStore'
import CurrentSiteHeader from "../../../components/currentSiteHeader";
import Divider from "../../../components/divider";
import SettingsInput from "../../../components/settingsInput";
import AESTextInput from "../../../components/aesTextInput";
import {checkNullSite, checkLite, checkPro, validatePasscode, validateRelayTime} from "../../../utils/validation";
import AESToolTipDescription from "../../../components/aesToolTipDescription"
import AESText from "../../../components/aesText";
import {SendSMSMessageWithUpdate} from "../../../utils/SMS";
import ToggleButton from "../../../components/toggleButton";
import BottomBarSpacer from "../../../components/bottomBarSpacer";
import LanguagesStore from '../../../stores/LanguageStore';
import { withTranslation } from 'react-i18next';

@observer
class IntercomOpenMode extends Component {

    constructor() {
        super();
        this.state={
            openMode:0,
        }
    }

    @observable openMode=0;
    @observable openModeEnabled=false;
    @observable openModeDisabled=false;

    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
            if(checkLite()){
                this.props.navigation.popToTop();
            }else {
                // this.setState({openMode: UserStore.sites[UserStore.activeSiteID].openMode})
                this.openMode=UserStore.sites[UserStore.activeSiteID].openMode;
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

    render() {
        let { currentMode } = UserStore;
        let { languages } = LanguagesStore
        const { t, i18n } = this.props;

        return (
            <Fragment>
                <Header
                    leftButtonOnPress={()=>{this.props.navigation.goBack()}}
                    leftButtonType={'Back'}
                    headerText={t('open_mode')}
                    style={{backgroundColor:Colours[currentMode].primaryColour}}
                />
                <KeyboardAwareScrollView style={{backgroundColor:Colours.white }}>
                    <View style={styles.container}>
                        <CurrentSiteHeader/>

                        <View style={styles.optionContainer}>
                            <View>
                                <AESText
                                        color={Colours.black}
                                        family={'Roboto-Medium'}
                                        size={16}
                                        content={t('open_mode')}
                                    />
                            </View>
                            <View style={{marginBottom:30,marginTop:10}}>
                                <AESText
                                    color={Colours.black}
                                    family={'Roboto-Regular'}
                                    size={16}
                                    content={t('allow_unprogrammed_to_call')}
                                />
                            </View>

                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'stretch',
                                justifyContent:'space-between',
                                height:50
                            }}>
                                <View>
                                    <ToggleButton
                                        buttonText={this.openModeDisabled?t('disabled'):t('disable')}
                                        outline={true}
                                        disabled={!this.openModeDisabled}
                                        onPress={() => {
                                            this.openModeEnabled=false;
                                            this.openModeDisabled=true;
                                        }}
                                    />
                                </View>
                                <View>
                                    <ToggleButton
                                        buttonText={this.openModeEnabled?t('enabled'):t('enable')}
                                        outline={true}
                                        disabled={!this.openModeEnabled}
                                        onPress={() => {
                                            this.openModeEnabled=true;
                                            this.openModeDisabled=false;
                                        }}
                                    />
                                </View>
                            </View>

                           
                            <View style={{marginTop: 20,marginBottom:10}}>
    
                                <TextButton
                                    buttonText={t('save')}
                                    outline={false}
                                    disabled={!this.openModeDisabled&&!this.openModeEnabled}
                                    onPress={()=>{
                                        if(this.openModeDisabled) {
                                            SendSMSMessageWithUpdate(
                                                `Open mode has been disabled`,
                                                `${UserStore.sites[UserStore.activeSiteID].passcode}#750#`,
                                                UserStore.sites[UserStore.activeSiteID].telephoneNumber,
                                                'openMode',
                                                0)
                                        }else if(this.openModeEnabled){
                                            SendSMSMessageWithUpdate(
                                                `Open mode has been enabled`,
                                                `${UserStore.sites[UserStore.activeSiteID].passcode}#751#`,
                                                UserStore.sites[UserStore.activeSiteID].telephoneNumber,
                                                'openMode',
                                                1)
                                        }
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                    <BottomBarSpacer/>
                </KeyboardAwareScrollView>
            </Fragment >
        );
    }
};

const styles={
    container:{
        flex:1,
        paddingHorizontal:30,
        // paddingVertical:60
    },
    optionContainer:{
        flex: 1,
        // flexDirection: 'row',
        // borderColor: Colours.black,
        // height:50,
        marginVertical:20,
        // justifyContent: 'space-between'

    },
    slider:{
        paddingVertical:30
    },
    optionElement:{
        justifyContent:'center',
        alignContent:'center'
    },
    optionsText:{
        color:Colours.black,
        fontSize:18,
        // paddingBottom: 20,
        fontFamily:'Roboto-Medium'
    },
    settingsHeader:{
        color:Colours.black,
        fontSize:16,
        // paddingBottom: 20,
        fontFamily:'Roboto-Bold'
    },
    settingsText:{
        color:Colours.black,
        fontSize:14,
        // paddingBottom: 20,
        fontFamily:'Roboto-Regular'
    },
    textInputHeader:{
        color:Colours.black,
        fontSize:22,
        paddingBottom: 20,
        fontFamily:'Roboto-Medium'
    },
    textInput:{
        color:Colours.black,
        fontSize:16,
        fontFamily:'Roboto-Regular'
    }
}

export default withTranslation()(IntercomOpenMode);
