import React, { Component, Fragment } from 'react';
import { ScrollView, View, Text } from 'react-native';
import Header from "../../components/header";
import Colours from '../../styles/colours.js'
import { observer } from 'mobx-react'
import UserStore from '../../stores/SiteStore'
import LanguageButton from "../../components/languageButton";
import AESToast from "../../components/aesToast";
import LanguagesStore from '../../stores/LanguageStore';
import { withTranslation } from 'react-i18next'; // Import the withTranslation HOC
import AsyncStorage from '@react-native-async-storage/async-storage';

class LanguageSelection extends Component {
  // Remove the constructor since we are not using it

  changeLanguage = (language) => {
    const { i18n } = this.props; // Access i18n from props
    i18n.changeLanguage(language);
    AsyncStorage.setItem('selectedLanguage', language);
    // this.props.navigation.goBack(); // You can use this to go back if needed

    // Add the navigation to 'HomeLanding'
    this.props.navigation.navigate('HomeLanding');
    };

  render() {
    const { t } = this.props; // Access t from props
    let { currentMode } = UserStore;

    return (
      <Fragment>
        <Header
          headerText={t('languages')}
          style={{ backgroundColor: Colours[currentMode].primaryColour }}
        />
        <ScrollView style={{ backgroundColor: Colours.white }}>
          <View style={styles.container}>
          <LanguageButton
              buttonText={'English'}
              flag={'en'}
              onPress={() => this.changeLanguage('en')}
            />

            <LanguageButton
              buttonText={'French'}
              flag={'fr'}
              onPress={() => this.changeLanguage('fr')}
            />

            <LanguageButton
              buttonText={'German'}
              flag={'de'}
              onPress={() => this.changeLanguage('de')}
            />


            {/* <LanguageButton
              flag={'en'}
              buttonText={'English'}
              onPress={() => {
                LanguagesStore.setLanguage('en').then((res) => {
                  if (res == 200) {
                    this.props.navigation.navigate('HomeLanding');
                  } else {
                    AESToast.show('Please ensure you are connected to the internet to download the language pack');
                  }
                });
              }}
            />

            <LanguageButton
              flag={'fr'}
              buttonText={'French'}
              onPress={() => {
                LanguagesStore.setLanguage('fr').then((res) => {
                  if (res == 200) {
                    this.props.navigation.navigate('HomeLanding');
                  } else {
                    AESToast.show('Please ensure you are connected to the internet to download the language pack');
                  }
                });
              }}
            />

            <LanguageButton
              flag={'de'}
              buttonText={'German'}
              onPress={() => {
                LanguagesStore.setLanguage('de').then((res) => {
                  if (res == 200) {
                    this.props.navigation.navigate('HomeLanding');
                  } else {
                    AESToast.show('Please ensure you are connected to the internet to download the language pack');
                  }
                });
              }}
            /> */}
          </View>
        </ScrollView>
      </Fragment>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  // Your other styles here
};

export default withTranslation()(LanguageSelection); // Wrap the component with withTranslation HOC
