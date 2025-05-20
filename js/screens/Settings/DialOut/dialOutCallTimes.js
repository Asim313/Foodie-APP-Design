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
import {
    checkPro,
    checkWithinLimits,
    cleanNumberInput,
    validatePasscode,
    validateRelayTime
} from "../../../utils/validation";
import AESToolTipDescription from "../../../components/aesToolTipDescription"
import Description from "../../../components/description";
import {SendSMSMessage, SendSMSMessageWithUpdate} from "../../../utils/SMS";
import AESText from "../../../components/aesText";
import BottomBarSpacer from "../../../components/bottomBarSpacer";
import LanguagesStore from '../../../stores/LanguageStore';
import { withTranslation } from 'react-i18next';

@observer
class DialOutCallTimes extends Component {

    constructor() {
        super();
    }

    @observable limits={min:10,max:99};
    @observable firstCallerNumberTimer='20'
    @observable secondCallerNumberTimer='20'
    @observable thirdCallerNumberTimer='20'


    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
            if(checkPro()){
                this.props.navigation.popToTop();
            }else {
                // this.setState({
                    this.firstCallerNumberTimer=UserStore.sites[UserStore.activeSiteID].callOutTimes[0]
                    this.secondCallerNumberTimer=UserStore.sites[UserStore.activeSiteID].callOutTimes[1]
                    this.thirdCallerNumberTimer=UserStore.sites[UserStore.activeSiteID].callOutTimes[2]
                // })
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
        let { languages } = LanguagesStore;
        const { t, i18n } = this.props;
        return (
            <Fragment>
                <Header
                    leftButtonOnPress={()=>{this.props.navigation.goBack()}}
                    leftButtonType={'Back'}
                    headerText={t('call_times')}
                    style={{backgroundColor:Colours[currentMode].primaryColour}}
                />
                <KeyboardAwareScrollView style={{backgroundColor:Colours.white }}>
                    <View style={styles.container}>
                        <CurrentSiteHeader/>
                        <View style={styles.optionContainer}>

                            <AESText
                                color={Colours.black}
                                family={'Roboto-Regular'}
                                size={16}
                                content={t('call_times_message')}
                                containerStyle={{marginBottom:20}}
                            />


                            <AESTextInput
                                title={t('first_caller_number')}
                                placeholder={t('talk_time')}
                                value={`${this.firstCallerNumberTimer}`}
                                onChangeText={ text => {
                                    this.firstCallerNumberTimer=cleanNumberInput(text);
                                }}
                                keyboardType={'number-pad'}
                            />

                            <View style={{marginTop: 20,marginBottom:20}}>
                                <TextButton
                                    buttonText={t('save')}
                                    outline={false}
                                    disabled={checkWithinLimits(this.firstCallerNumberTimer,this.limits.min,this.limits.max)}
                                    onPress={()=>{
                                        SendSMSMessageWithUpdate(
                                            `First caller number calling time set to ${this.firstCallerNumberTimer}`,
                                            `${UserStore.sites[UserStore.activeSiteID].passcode}#45${this.firstCallerNumberTimer}#`,
                                            UserStore.sites[UserStore.activeSiteID].telephoneNumber,
                                            'callOutTimes',
                                            this.firstCallerNumberTimer,
                                            0
                                        )
                                    }}

                                />
                            </View>
                            
                            <AESTextInput
                                title={t('second_caller_number')}
                                placeholder={t('talk_time')}
                                value={`${this.secondCallerNumberTimer}`}
                                onChangeText={ text => {
                                    this.secondCallerNumberTimer=cleanNumberInput(text);
                                }}
                                keyboardType={'number-pad'}
                            />
                            <View style={{marginTop: 20,marginBottom:20}}>
                                <TextButton
                                    buttonText={t('save')}
                                    outline={false}
                                    disabled={checkWithinLimits(this.secondCallerNumberTimer,this.limits.min,this.limits.max)}
                                    onPress={()=>{
                                        SendSMSMessageWithUpdate(
                                            `Second caller number calling time set to ${this.secondCallerNumberTimer}`,
                                            `${UserStore.sites[UserStore.activeSiteID].passcode}#46${this.secondCallerNumberTimer}#`,
                                            UserStore.sites[UserStore.activeSiteID].telephoneNumber,
                                            'callOutTimes',
                                            this.secondCallerNumberTimer,
                                            1
                                        )
                                    }}
                                    keyboardType={'number-pad'}

                                />
                            </View>
                            <AESTextInput
                                title={t('third_caller_number')}
                                placeholder={t('talk_time')}
                                value={`${this.thirdCallerNumberTimer}`}
                                onChangeText={ text => {
                                    this.thirdCallerNumberTimer=cleanNumberInput(text);
                                }}
                                keyboardType={'number-pad'}
                            />
                            <View style={{marginTop: 20,marginBottom:20}}>
                                <TextButton
                                    buttonText={t('save')}
                                    outline={false}
                                    disabled={checkWithinLimits(this.thirdCallerNumberTimer,this.limits.min,this.limits.max)}
                                    onPress={()=>{
                                        SendSMSMessageWithUpdate(
                                            `Third caller number calling time set to ${this.thirdCallerNumberTimer}`,
                                            `${UserStore.sites[UserStore.activeSiteID].passcode}#47${this.thirdCallerNumberTimer}#`,
                                            UserStore.sites[UserStore.activeSiteID].telephoneNumber,
                                            'callOutTimes',
                                            this.thirdCallerNumberTimer,
                                            2
                                        )
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
    },
    optionContainer:{
        flex: 1,
        marginVertical:20,
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
        fontFamily:'Roboto-Medium'
    },
    settingsHeader:{
        color:Colours.black,
        fontSize:16,
        fontFamily:'Roboto-Bold'
    },
    settingsText:{
        color:Colours.black,
        fontSize:14,
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

export default withTranslation()(DialOutCallTimes);
