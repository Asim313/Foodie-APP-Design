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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Header from "../../../components/header";
import Colours from '../../../styles/colours.js'
import TextButton from "../../../components/textButton";

import { observer } from 'mobx-react'
import { observable, action } from 'mobx'
import UserStore from '../../../stores/SiteStore'
import CurrentSiteHeader from "../../../components/currentSiteHeader";
import Divider from "../../../components/divider";
import SettingsListButton from "../../../components/settingsListButton";
import { checkPro } from "../../../utils/validation";
import BottomBarSpacer from "../../../components/bottomBarSpacer";
import LanguagesStore from '../../../stores/LanguageStore';
import { withTranslation } from 'react-i18next';

@observer
class DialOutSettings extends Component {

    constructor() {
        super();
    }

    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
            if (checkPro()) {
                this.props.navigation.popToTop();
            }
        });
    }

    componentWillUnmount() {
        this.props.navigation.removeListener('focus')
    }

    render() {
        let { currentMode } = UserStore;
        let { languages } = LanguagesStore;
        const { t, i18n } = this.props;

        return (
            <Fragment>
                <Header
                    leftButtonOnPress={() => { this.props.navigation.goBack() }}
                    leftButtonType={'Back'}
                    headerText={t('dial_out')}
                    style={{ backgroundColor: Colours[currentMode].primaryColour }}
                />
                <KeyboardAwareScrollView style={{ backgroundColor: Colours.white }}>
                    <View style={styles.container}>
                        <CurrentSiteHeader />
                        <SettingsListButton
                            onPress={() => this.props.navigation.navigate('DialOutAPN')}
                            title={t('apn')}
                        />
                        <SettingsListButton
                            onPress={() => this.props.navigation.navigate('DialOutAbortCall')}
                            title={t('about_call')}
                        />
                        <SettingsListButton
                            onPress={() => this.props.navigation.navigate('DialOutDTMFLatching')}
                            title={t('dtmf_latching')}
                        />
                        <SettingsListButton
                            onPress={() => this.props.navigation.navigate('DialOutDialOutNumbers')}
                            title={t('dial_out_numbers')}
                        />
                        <SettingsListButton
                            onPress={() => this.props.navigation.navigate('DialOutCallTimes')}
                            title={t('call_times')}
                        />
                        <SettingsListButton
                            onPress={() => this.props.navigation.navigate('DialOutTalkTime')}
                            title={t('call_duration')}
                        />
                    </View>
                    <BottomBarSpacer />
                </KeyboardAwareScrollView>
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
        borderColor: Colours.black,
        height: 50,
        marginTop: 20,
        justifyContent: 'space-between'

    },
    optionElement: {
        justifyContent: 'center',
        alignContent: 'center'
    },
    optionsText: {
        color: Colours.black,
        fontSize: 18,
        fontFamily: 'Roboto-Regular'
    },
    settingsHeader: {
        color: Colours.black,
        fontSize: 16,
        fontFamily: 'Roboto-Bold'
    },
    settingsText: {
        color: Colours.black,
        fontSize: 14,
        // paddingBottom: 20,
        fontFamily: 'Roboto-Regular'
    },
    rightArrow: {
        tintColor: Colours.blue,
        // height:13,
        // aspectRatio:1
    }
}

export default withTranslation()(DialOutSettings);
