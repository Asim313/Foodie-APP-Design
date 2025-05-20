import React, { Component, Fragment , useState, useEffect} from 'react';
import {
    Platform,
    Button,
    Text,
    View,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Dimensions,
    Keyboard
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colours from '../styles/colours.js'
import Initialising from '../screens/initialising.js'
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';


import SplashScreen from 'react-native-splash-screen'

//Home
import HomeLanding from "./Home/homeLanding";
import LanguageSelection from "./Home/LanguageSelection";

import SiteAdd from '../screens/Sites/siteAdd.js'
import SiteSelectDevice from "./Sites/siteSelectDevice";
import EditSite from "./Sites/editSite";

//Settings
import SettingsLanding from './Settings/settingsLanding.js'
//ELOOP
import LoopSettings from './Settings/E-Loop/LoopSettings.js';
import LoopProgramMode from './Settings/E-Loop/LoopProgramMode.js';
import BatteryNotifications from './Settings/E-Loop/BatteryNotifications.js';
import LoopSuspend from './Settings/E-Loop/LoopSuspend.js';
//Intercom
import IntercomSettings from './Settings/Intercom/intercomSettings.js'
import IntercomVolume from "./Settings/Intercom/intercomVolume.js";
import IntercomPasscodes from "./Settings/Intercom/intercomPasscodes";
import IntercomRelayTime from "./Settings/Intercom/IntercomRelay/intercomRelayTime";
import IntercomServiceCall from "./Settings/Intercom/intercomServiceCall"
import IntercomOpenMode from "./Settings/Intercom/intercomOpenMode"
//Dial Out
import DialOutSettings from './Settings/DialOut/dialOutSettings'
import DialOutAPN from "./Settings/DialOut/dialOutAPN";
import DialOutDTMFLatching from "./Settings/DialOut/dialOutDTMFLatching";
import DialOutTalkTime from "./Settings/DialOut/dialOutTalkTime";
import DialOutAbortCall from "./Settings/DialOut/dialOutAbortCall";
import DialOutCallTimes from "./Settings/DialOut/dialOutCallTimes";
import DialOutDialOutNumbers from "./Settings/DialOut/dialOutDialOutNumbers";
//Caller ID
import TwentyFourSevenCallerID from './Settings/CallerID/TwentyFourSevenCallerID'
//Code
import CodeSettings from "./Settings/Code/codeSettings";
//Status
import StatusLanding from "./Status/statusLanding";
import AESTabBar from "../components/AESTabBar";
import CustomTB from "../components/CustomTB";

import LanguagesStore from '../stores/LanguageStore.js';
import IntercomRelay from "./Settings/Intercom/IntercomRelay/IntercomRelay";
import IntercomSMSReply from "./Settings/Intercom/IntercomRelay/IntercomSMSReply";
import IntercomPersonaliseRelay from "./Settings/Intercom/IntercomRelay/IntercomPersonaliseRelay";
import IntercomNotifications from "./Settings/Intercom/IntercomNotifications";
import Intercom4GNetworkFeatures from "./Settings/Intercom/Intercom4GNetworkFeatures";
import IntercomAutoOpening from "./Settings/Intercom/IntercomAutoOpening";
import IntercomEventLog from "./Settings/Intercom/IntercomEventLog";
import IntercomTimeSynchronisation from "./Settings/Intercom/TimeSynchronisation/IntercomTimeSynchronisation";
import CallerIDLanding from "./Settings/CallerID/CallerIDLanding";
import TimeRestrictedCallerID from "./Settings/CallerID/TimeRestrictedCallerID";
import ClockSync from "./Settings/Intercom/TimeSynchronisation/ClockSync";
import DaylightSaving from "./Settings/Intercom/TimeSynchronisation/DaylightSaving";
import TimeSyncMode from "./Settings/Intercom/TimeSynchronisation/TimeSyncMode";
import IntercomCallerID from "./Settings/Intercom/IntercomCallerID/IntercomCallerID";
import KPNCallerID from "./Settings/Intercom/IntercomCallerID/KPNCallerID";
import IntercomPTE from "./Settings/Intercom/IntercomPTE"

import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import '../../i18n';





const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();



const defaultHeaderOptions = {
    headerTitleAlign: "left",
    headerStyle: {
        shadowColor: 'transparent',
        elevation: 0
    },
    cardStyle: {
        backgroundColor: 'transparent'
    },
    headerBackTitleVisible: false,

}
const SitesStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name="SiteAdd" component={SiteAdd} options={defaultHeaderOptions} />
        </Stack.Navigator>
    );
}




const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name="HomeLanding" component={HomeLanding} options={defaultHeaderOptions} />

        </Stack.Navigator>
    );
}

const SiteManagementStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name="SiteAdd" component={SiteAdd} options={defaultHeaderOptions} />
            <Stack.Screen name="SiteSelectDevice" component={SiteSelectDevice} options={defaultHeaderOptions} />
            <Stack.Screen name="EditSite" component={EditSite} options={defaultHeaderOptions} />
        </Stack.Navigator>
    );
}

const StatusStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name="StatusLanding" component={StatusLanding} options={defaultHeaderOptions} />
        </Stack.Navigator>
    );
}

const SettingsStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            headerTransparent: true,
            cardStyle: { backgroundColor: Colours.black },
            cardOverlayEnabled: true,
        }}
        >
            <Stack.Screen name="SettingsLanding" component={SettingsLanding} />

            <Stack.Screen name="IntercomSettings" component={IntercomSettings} />
            <Stack.Screen name="IntercomVolume" component={IntercomVolume} />
            <Stack.Screen name="IntercomPasscodes" component={IntercomPasscodes} />
            <Stack.Screen name="IntercomRelay" component={IntercomRelay} />
            <Stack.Screen name="IntercomRelayTime" component={IntercomRelayTime} />
            <Stack.Screen name="IntercomSMSReply" component={IntercomSMSReply} />
            <Stack.Screen name="IntercomPersonaliseRelay" component={IntercomPersonaliseRelay} />
            <Stack.Screen name="IntercomOpenMode" component={IntercomOpenMode} />
            <Stack.Screen name="IntercomServiceCall" component={IntercomServiceCall} />
            <Stack.Screen name="Intercom4GNetworkFeatures" component={Intercom4GNetworkFeatures} />
            <Stack.Screen name="IntercomAutoOpening" component={IntercomAutoOpening} />
            <Stack.Screen name="IntercomEventLog" component={IntercomEventLog} />
            <Stack.Screen name="IntercomNotifications" component={IntercomNotifications} />
            <Stack.Screen name="IntercomCallerID" component={IntercomCallerID} />
            <Stack.Screen name="IntercomPTE" component={IntercomPTE} />
            <Stack.Screen name="KPNCallerID" component={KPNCallerID} />
            <Stack.Screen name="LoopSettings" component={LoopSettings} />
            <Stack.Screen name="LoopProgramMode" component={LoopProgramMode} />
            <Stack.Screen name="BatteryNotifications" component={BatteryNotifications} />
            <Stack.Screen name="LoopSuspend" component={LoopSuspend} />

            <Stack.Screen name="DialOutSettings" component={DialOutSettings} />
            <Stack.Screen name="DialOutAPN" component={DialOutAPN} />
            <Stack.Screen name="DialOutTalkTime" component={DialOutTalkTime} />
            <Stack.Screen name="DialOutAbortCall" component={DialOutAbortCall} />
            <Stack.Screen name="DialOutDTMFLatching" component={DialOutDTMFLatching} />
            <Stack.Screen name="DialOutCallTimes" component={DialOutCallTimes} />
            <Stack.Screen name="DialOutDialOutNumbers" component={DialOutDialOutNumbers} />

            <Stack.Screen name="CallerIDSettings" component={CallerIDLanding} />
            <Stack.Screen name="247CallerID" component={TwentyFourSevenCallerID} />

            <Stack.Screen name="IntercomTimeSynchronisation" component={IntercomTimeSynchronisation} />
            <Stack.Screen name="TimeRestrictedCallerID" component={TimeRestrictedCallerID} />
            <Stack.Screen name="ClockSync" component={ClockSync} />
            <Stack.Screen name="DaylightSaving" component={DaylightSaving} />
            <Stack.Screen name="TimeSyncMode" component={TimeSyncMode} />


            <Stack.Screen name="CodeSettings" component={CodeSettings} />



        </Stack.Navigator>
    );
}

const ModalStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                headerTransparent: true,
                cardStyle: { backgroundColor: 'transparent' },
                cardOverlayEnabled: true,
            }}
            mode="modal">
        </Stack.Navigator>
    );
}




const getTabIcon = (tab) => {
    switch (tab) {
        case 'Home': return require('../../assets/images/tabs/home.png');
        case 'Accueil': return require('../../assets/images/tabs/home.png');
        case 'Zuhause': return require('../../assets/images/tabs/home.png');

        case 'Status': return require('../../assets/images/tabs/status.png');
        case 'Statut': return require('../../assets/images/tabs/status.png');

        case 'Settings': return require('../../assets/images/tabs/settings.png');
        case 'Réglages': return require('../../assets/images/tabs/settings.png');
        case 'Einstellungen': return require('../../assets/images/tabs/settings.png');
    }
}

function AESTabBarA({ state, descriptors, navigation }) {

    let visible = true;
    let keyboardEventListeners;
    if (Platform.OS === 'android') {
        keyboardEventListeners = [
            Keyboard.addListener('keyboardDidShow', visible = false),
            Keyboard.addListener('keyboardDidHide', visible = true),
        ];
    }
    return (

        <View>
            <View style={{
                flexDirection: 'row',
                borderWidth: Platform.OS === 'android' ? 1 : 0,
                borderBottomWidth: 0,
                backgroundColor: Colours.white,
                borderColor: Colours.lightGray,
                height: 70,
                borderTopEndRadius: 25,
                borderTopStartRadius: 25,
                justifyContent: 'center',
                shadowColor: Colours.lightGray,
                shadowOffset: { width: 0, height: -1 },
                shadowOpacity: 1,

            }}>
                <View style={{ width: '80%', flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, }}>
                    {state.routes.map((route, index) => {
                        const { options } = descriptors[route.key];
                        options.keyboardHidesTabBar = true;
                        const label =
                            options.tabBarLabel !== undefined
                                ? options.tabBarLabel
                                : options.title !== undefined
                                    ? options.title
                                    : route.name;

                        const isFocused = state.index === index;

                        const onPress = () => {
                            const event = navigation.emit({
                                type: 'tabPress',
                                target: route.key,
                            });

                            if (!isFocused && !event.defaultPrevented) {
                                navigation.navigate(route.name);
                            }
                        };

                        return (
                            <TouchableWithoutFeedback
                                key={`${index}${route.key}`}
                                accessibilityRole="button"
                                accessibilityStates={isFocused ? ['selected'] : []}
                                accessibilityLabel={options.tabBarAccessibilityLabel}
                                testID={options.tabBarTestID}
                                onPress={onPress}
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'flex-end',
                                }}
                            >
                                <Image source={getTabIcon(label)} style={{
                                    tintColor: isFocused ? Colours.darkGray : Colours.gray
                                }} />
                            </TouchableWithoutFeedback>
                        );
                    })}
                </View>
            </View>
        </View>
    );
}

const tabButton = (screen, isFocused, size) => {
    return (
        <View
            style={{
                height: 50,
                width: 50,
            }}
        >
            <Image source={getTabIcon(screen)} style={{
                marginVertical: 20,
                tintColor: isFocused ? Colours.darkGray : Colours.gray,
            }} />
        </View>
    );
}

const TabNavigator = (navigation, route) => {

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    return tabButton(route.name, focused, size)
                },
            })}
            tabBarOptions={{
                showLabel: true,
                keyboardHidesTabBar: true,
                style: {
                    borderTopWidth: 0,
                    borderTopEndRadius: 30,
                    borderTopStartRadius: 30,
                    shadowColor: Colours.lightGray,
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 1,
                },

                labelStyle: {
                    padding: 5,
                    color: 'transparent'
                },
            }}
            tabBar={(props) => <CustomTB {...props} />
            }>


            <Tab.Screen name="Home" options={{ tabBarLabel: "Home" }} component={HomeStack} />
            <Tab.Screen name="Status" options={{ tabBarLabel: 'Status' }} component={StatusStack} />
            <Tab.Screen name="Settings" options={{ tabBarLabel: 'Settings' }} component={SettingsStack} />
        </Tab.Navigator>

    )
}

/* Root / Combined Stack
----------------------------------------*/


const RootNavigator = (props) => {

    return (
        <Stack.Navigator
        screenOptions={{
            headerShown: false,
            headerTransparent: true,
        }}
        //     headerMode="none"
        // // mode="modal"
        >

            <Stack.Screen
                name="Initialising"
                component={Initialising} />

            <Stack.Screen
                name="Home"
                component={TabNavigator} />

            <Stack.Screen name="LanguageSelection" component={LanguageSelection} options={defaultHeaderOptions} />

            <Stack.Screen
                name="SiteManagement"
                component={SiteManagementStack} />

        </Stack.Navigator>
    )
}

export default RootNavigator;
