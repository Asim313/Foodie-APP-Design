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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import Header from "../../../components/header";
import Colours from '../../../styles/colours.js'
import TextButton from "../../../components/textButton";

import { observer } from 'mobx-react'
import { observable, action } from 'mobx'
import UserStore from '../../../stores/SiteStore'
import CurrentSiteHeader from "../../../components/currentSiteHeader";
import Divider from "../../../components/divider";
import SettingsLanding from "../settingsLanding";
import SettingsListButton from "../../../components/settingsListButton";
import BottomBarSpacer from "../../../components/bottomBarSpacer";
import LanguagesStore from '../../../stores/LanguageStore';
import { withTranslation } from 'react-i18next';

@observer
class IntercomSettings extends Component {

    constructor() {
        super();
    }

    componentDidMount() {
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
                    headerText={t('intercom')}
                    style={{backgroundColor:Colours[currentMode].primaryColour}}
                />
                <ScrollView style={{backgroundColor:Colours.white }}>
                    <View style={styles.container}>
                        <CurrentSiteHeader/>

                        {UserStore.currentMode === 'lite' &&
                        <SettingsListButton
                            onPress={() => this.props.navigation.navigate('IntercomVolume')}
                            title={t('volume')}
                        />
                        }

                        <SettingsListButton
                            onPress={()=>this.props.navigation.navigate('IntercomPasscodes')}
                            title={t('passcodes')}
                        />

                        <SettingsListButton
                                onPress={() => this.props.navigation.navigate('Intercom4GNetworkFeatures')}
                                title={t('4g_network_features')}
                        />


                      <SettingsListButton
                                onPress={() => this.props.navigation.navigate('KPNCallerID')}
                                title={"KPN "+t('caller_id')}
                        />

                        <SettingsListButton
                            onPress={()=>this.props.navigation.navigate('IntercomRelay')}
                            title={t('relay')}
                        />                        


                      {UserStore.currentMode === 'pro' || UserStore.currentMode === 'plus' ? (
                         <>

                             <SettingsListButton
                               onPress={() => this.props.navigation.navigate('IntercomServiceCall')}
                               title={t('service_call')}
                             />

                              <SettingsListButton
                                onPress={() => this.props.navigation.navigate('IntercomOpenMode')}
                                title={t('open_mode')}
                              />
                         </>
                        ) :null}

                        {UserStore.currentMode === 'plus' &&
                        <>
                        <SettingsListButton
                            onPress={() => this.props.navigation.navigate('IntercomPTE')}
                            title={t('push_to_exit')}
                        />

                        <SettingsListButton
                            onPress={() => this.props.navigation.navigate('IntercomNotifications')}
                            title={t('notifications')}
                        />

                        <SettingsListButton
                            onPress={() => this.props.navigation.navigate('IntercomEventLog')}
                            title={t('events_log')}
                        />

                        <SettingsListButton
                            onPress={() => this.props.navigation.navigate('IntercomAutoOpening')}
                            title={t('auto_opening')}
                        />

                        <SettingsListButton
                            onPress={() => this.props.navigation.navigate('IntercomTimeSynchronisation')}
                            title={t('time_synch')}
                        />
                        </>
                        }
                    </View>

                    <BottomBarSpacer/>
                </ScrollView>
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
        flexDirection: 'row',
        borderColor: Colours.black,
        height:50,
        marginTop:20,
        justifyContent: 'space-between'
    },
    optionElement:{
        justifyContent:'center',
        alignContent:'center'
    },
    optionsText:{
        color:Colours.black,
        fontSize:22,
        fontFamily:'Roboto-Regular'
    },
    settingsHeader:{
        color:Colours.black,
        fontSize:16,
        fontFamily:'Roboto-Bold'
    },
    settingsText:{
        color:Colours.black,
        fontSize:14,
        // paddingBottom: 20,
        fontFamily:'Roboto-Regular'
    }
}

export default withTranslation()(IntercomSettings);
