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
import { checkNullSite } from "../../utils/validation";
import BottomBarSpacer from "../../components/bottomBarSpacer";
import LanguagesStore from '../../stores/LanguageStore';
import { withTranslation } from 'react-i18next';

@observer
class SettingsLanding extends Component {
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
                            headerText={t('settings')}
                            style={{ backgroundColor: Colours[currentMode].primaryColour }}
                        />
                        <ScrollView style={{ backgroundColor: Colours.white }}>
                            <View style={styles.container}>
                                <CurrentSiteHeader />
                                <SettingsIconButton
                                    buttonText={t('intercom')}
                                    onPress={() => this.props.navigation.navigate('IntercomSettings')}
                                />
                                {UserStore.currentMode === 'lite' &&
                                <>
                                    <SettingsIconButton
                                    buttonText={t('dial_out')}
                                    onPress={() => this.props.navigation.navigate('DialOutSettings')}
                                    />



                                    <SettingsIconButton
                                    buttonText={t('keypad_code')}
                                    onPress={() => this.props.navigation.navigate('CodeSettings')}
                                    />
                                </>
                                }

                                         {UserStore.currentMode === 'pro' || UserStore.currentMode === 'lite' ? (
                                      <SettingsIconButton
                                        buttonText={t('caller_id')}
                                        onPress={() => this.props.navigation.navigate('247CallerID')}
                                      />
                                ) :null}


                                {UserStore.currentMode === 'plus' &&
                                <>
                                <SettingsIconButton
                                    buttonText={t('caller_id')}
                                    onPress={() => this.props.navigation.navigate('CallerIDSettings')}
                                /> 

                                <SettingsIconButton
                                    buttonText={"E-Loop"}
                                    onPress={() => this.props.navigation.navigate('LoopSettings')}
                                /> 
                                </>
                                }

                                <SettingsIconButton
                                    buttonText={t('change_language')}
                                    onPress={() => this.props.navigation.navigate('LanguageSelection')}
                                />
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

    }
}

export default withTranslation()(SettingsLanding);
