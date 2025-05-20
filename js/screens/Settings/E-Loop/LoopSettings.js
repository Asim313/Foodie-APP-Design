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
class LoopSettings extends Component {
    
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
                    headerText={t('e-loop')}
                    style={{backgroundColor:Colours[currentMode].primaryColour}}
                />
                <ScrollView style={{backgroundColor:Colours.white }}>
                    <View style={styles.container}>
                        <CurrentSiteHeader/>

                        {UserStore.currentMode === 'plus' &&
                          <>


                              <SettingsListButton
                                onPress={() => this.props.navigation.navigate('LoopSuspend')}
                                title={t('suspend_loop')}
                              />
    
                              <SettingsListButton
                                onPress={() => this.props.navigation.navigate('BatteryNotifications')}
                                title={t('battery_noti')}
                              />

                              <SettingsListButton
                                onPress={() => this.props.navigation.navigate('LoopProgramMode')}
                                title={t('program_mode')}
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

export default withTranslation()(LoopSettings);
