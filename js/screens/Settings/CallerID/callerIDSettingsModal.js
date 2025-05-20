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
    TextInput, Animated, Dimensions
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Header from "../../../components/header";
import Colours from '../../../styles/colours.js'
import TextButton from "../../../components/textButton";

import { observer } from 'mobx-react'
import { observable, action } from 'mobx'
import UserStore from '../../../stores/SiteStore'
import CurrentSiteHeader from "../../../components/currentSiteHeader";
import AESToast from "../../../components/aesToast";
import Divider from "../../../components/divider";
import AESTextInput from "../../../components/aesTextInput";
import AESConfirmationToast from "../../../components/aesConfirmationToast";
import TransparentHeader from "../../../components/transparentHeader";
import { validateTelephoneNumber } from "../../../utils/validation";
import LanguagesStore from '../../../stores/LanguageStore';


@observer
class CallerIDSettings extends Component {

    constructor() {
        super();
        this.state = {
            knownNumber: ''
        }
    }

    componentDidMount() {
    }

    manageState = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    render() {
        let { currentMode } = UserStore;
        let { height, mode } = this.props.route.params;
        let { languages } = LanguagesStore

        return (
            <View>
                {mode && mode === 'all' &&
                    <Fragment>
                        <TransparentHeader
                            fillHeight={Dimensions.get('window').height - (height + 50)}
                            onPress={() => this.props.navigation.navigate('CallerIDSettings')}
                        />
                        <View style={[styles.container, { height: height }]}>
                            <View style={styles.header}>
                                <Text style={styles.text}>{languages.delete_all_caller_id_numbers.text}</Text>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('CallerIDSettings')}>
                                    <Image source={require('../../../../assets/images/header/modalClose.png')} />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.bodyText}>{languages.delete_all_caller_id_numbers_confirmation.text}</Text>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'stretch',
                                justifyContent: 'space-between',
                                height: 50,
                                marginTop: 20
                            }}>
                                <View>
                                    <TextButton
                                        buttonText={languages.no.text}
                                        outline={true}
                                        disabled={false}
                                        warning={true}
                                        onPress={() => this.props.navigation.navigate('CallerIDSettings')}
                                    />
                                </View>
                                <View>
                                    <TextButton
                                        buttonText={languages.yes.text}
                                        outline={false}
                                        disabled={false}
                                        warning={true}
                                        onPress={() => {
                                            // console.log('delete all')
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                    </Fragment>
                }
                {mode && mode !== 'all' &&
                    <KeyboardAwareScrollView>
                        <TransparentHeader
                            fillHeight={Dimensions.get('window').height - (height + 50)}
                            onPress={() => this.props.navigation.navigate('CallerIDSettings')}
                        />
                        <View style={[styles.container, { height: height }]}>
                            <View style={styles.header}>
                                <Text style={styles.text}>{languages.delete_carder_id_number.text}</Text>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('CallerIDSettings')}>
                                    <Image source={require('../../../../assets/images/header/modalClose.png')} />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.bodyText}>{languages.enter_caller_id_to_delete.text}</Text>

                            <AESTextInput
                                titleTextColoured={true}
                                placeholder={'0044 1234 567890'}
                                warning={true}
                                value={this.state.knownNumber}
                                onChangeText={text => this.manageState('knownNumber', validateTelephoneNumber(text))}
                                keyboardType={'number-pad'}
                            />
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'stretch',
                                justifyContent: 'space-between',
                                height: 50,
                                marginTop: 20
                            }}>
                                <View>
                                    <TextButton
                                        buttonText={languages.cancel.text}
                                        outline={true}
                                        disabled={false}
                                        warning={true}
                                        onPress={() => this.props.navigation.navigate('CallerIDSettings')}
                                    />
                                </View>
                                <View>
                                    <TextButton
                                        buttonText={languages.delete.text}
                                        outline={false}
                                        disabled={false}
                                        warning={true}
                                        onPress={() => {
                                            // console.log('delete known')
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                    </KeyboardAwareScrollView>
                }
            </View >
        );
    }
};

const styles = {
    container: {
        backgroundColor: Colours.white,
        // padding: 15,
        paddingTop: 20,
        // borderRadius:20,
        paddingBottom: 30,
        paddingHorizontal: 25,
        elevation: 1
        // flexDirection:'row',
        // alignContent:'center',
        // justifyContent:'center',
    },
    header: {
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
    icon: {
        alignSelf: 'center'
    },
    bodyText: {
        fontFamily: 'Roboto-regular',
        fontSize: 14,
        color: Colours.black
    }
}

export default CallerIDSettings;
