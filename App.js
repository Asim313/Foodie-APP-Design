import React, { Component, Fragment, useState, useEffect } from 'react';

import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import {SafeAreaProvider} from "react-native-safe-area-context";

import AsyncStorage from '@react-native-async-storage/async-storage';

import RootNavigator from "./js/screens";
import { Colours } from './js/styles/index'
import AESToast from "./js/components/aesToast";
import AESConfirmationToast from "./js/components/aesConfirmationToast";
import AESToolTipDescription from "./js/components/aesToolTipDescription";
import AESSwitchSiteToast from "./js/components/aesSwitchSiteToast";

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import './i18n';



const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // background: 'transparent'
    background: Colours.white
  },
};
const navigation = React.createRef();
const App = () => {

  useEffect(() => {
    // Retrieve the saved language value from AsyncStorage
    AsyncStorage.getItem('selectedLanguage')
      .then((language) => {
        if (language) {
          // Change the language to the retrieved value
          i18n.changeLanguage(language);
        }
      })
      .catch((error) => {
        console.log('Error retrieving selected language:', error);
      });
  }, []);

  return (
      <Fragment>
      <SafeAreaProvider>
            <NavigationContainer
                ref={navigation}
                theme={Theme}>

              <RootNavigator />
            </NavigationContainer>
          <AESSwitchSiteToast/>
          <AESConfirmationToast/>
          <AESToolTipDescription/>
          <AESToast/>
      </SafeAreaProvider>
      </Fragment>
  )
}

export default App;
