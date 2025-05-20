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
import Slider from '@react-native-community/slider';
// import {Slider} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Header from "../../../components/header";
import Colours from '../../../styles/colours.js'
import TextButton from "../../../components/textButton";

import { observer } from 'mobx-react'
import { observable, action } from 'mobx'
import UserStore from '../../../stores/SiteStore'
import CurrentSiteHeader from "../../../components/currentSiteHeader";
import { SendSMSMessageWithUpdate } from "../../../utils/SMS";
import { checkLite, checkPro } from "../../../utils/validation";
import AESText from "../../../components/aesText";
import BottomBarSpacer from "../../../components/bottomBarSpacer";
import LanguagesStore from '../../../stores/LanguageStore';
import { withTranslation } from 'react-i18next';

@observer
class IntercomVolume extends Component {

    constructor() {
        super();
    }

    @observable speakerVolume = 5;
    @observable microphoneVolume = 5;

    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
            if (checkPro()) {
                this.props.navigation.popToTop();
            } else {
                this.speakerVolume = UserStore.sites[UserStore.activeSiteID].speakerVolume,
                    this.microphoneVolume = UserStore.sites[UserStore.activeSiteID].microphoneVolume
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
                    leftButtonOnPress={() => { this.props.navigation.goBack() }}
                    leftButtonType={'Back'}
                    headerText={t('volume')}
                    style={{ backgroundColor: Colours[currentMode].primaryColour }}
                />
                <ScrollView style={{ backgroundColor: Colours.white }}>

                    <View style={styles.container}>
                        <CurrentSiteHeader />

                        <View onPress={() => this.props.navigation.navigate('IntercomSettings')} style={styles.optionContainer}>
                            <Text style={styles.optionsText}>{t('speaker_volumn')}</Text>
                            <AESText
                                color={Colours.black}
                                family={'Roboto-Regular'}
                                size={16}
                                content={t('default_5')}
                                containerStyle={{ marginTop: 10 }}
                            />
                            <View style={{ position: 'relative', marginBottom: 30 }}>
                                <Slider
                                    style={styles.slider}
                                    minimumValue={1}
                                    maximumValue={9}
                                    step={1}
                                    value={this.speakerVolume}
                                    onSlidingComplete={value => this.speakerVolume = value}
                                    minimumTrackTintColor={Colours[currentMode].primaryColour}
                                    maximumTrackTintColor={Colours.lightGray}
                                    thumbTintColor={Colours[currentMode].primaryColour}
                                />
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '95%', alignSelf: 'center' }}>
                                    <Text style={styles.volumeText}>1</Text>
                                    <Text style={styles.volumeText}>9</Text>
                                </View>
                            </View>
                            <View>
                                <TextButton
                                    buttonText={t('confirm')}
                                    outline={false}
                                    disabled={false}
                                    onPress={() => {
                                        SendSMSMessageWithUpdate(
                                            `Speaker volume set to ${this.speakerVolume}`,
                                            `${UserStore.sites[UserStore.activeSiteID].passcode}#3${this.speakerVolume}#`,
                                            UserStore.sites[UserStore.activeSiteID].telephoneNumber,
                                            'speakerVolume',
                                            this.speakerVolume
                                        )
                                    }}
                                />
                            </View>
                        </View>

                        <View onPress={() => this.props.navigation.navigate('IntercomSettings')} style={styles.optionContainer}>
                            <Text style={styles.optionsText}>{t('microphone_volume')}</Text>
                            <AESText
                                color={Colours.black}
                                family={'Roboto-Regular'}
                                size={16}
                                content={t('default_5')}
                                containerStyle={{ marginTop: 10 }}
                            />
                            <View style={{ position: 'relative', marginBottom: 30 }}>
                                <Slider
                                    style={styles.slider}
                                    minimumValue={1}
                                    maximumValue={9}
                                    step={1}
                                    value={this.microphoneVolume}
                                    onSlidingComplete={value => this.microphoneVolume = value}
                                    minimumTrackTintColor={Colours[currentMode].primaryColour}
                                    maximumTrackTintColor={Colours.lightGray}
                                    thumbTintColor={Colours[currentMode].primaryColour}
                                />
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '95%', alignSelf: 'center' }}>
                                    <Text style={styles.volumeText}>1</Text>
                                    <Text style={styles.volumeText}>9</Text>
                                </View>
                            </View>
                            <View>
                                <TextButton
                                    buttonText={t('confirm')}
                                    outline={false}
                                    disabled={false}
                                    onPress={() => {
                                        SendSMSMessageWithUpdate(
                                            `Microphone volume set to ${this.microphoneVolume}`,
                                            `${UserStore.sites[UserStore.activeSiteID].passcode}#4${this.microphoneVolume}#`,
                                            UserStore.sites[UserStore.activeSiteID].telephoneNumber,
                                            'microphoneVolume',
                                            this.microphoneVolume
                                        )
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                    <BottomBarSpacer />
                </ScrollView>
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
        borderColor: Colours.black,
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
    volumeText: {
        color: Colours.black,
        fontSize: 14,
        fontFamily: 'Roboto-Regular'
    }
}

export default withTranslation()(IntercomVolume);
