import React, { useState } from "react";
import UserStore from "../../../../stores/SiteStore";
import LanguagesStore from "../../../../stores/LanguageStore";
import SettingsLayout from "../../../../components/settingsLayout";
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import Header from "../../../../components/header";
import Colours from "../../../../styles/colours";
import CurrentSiteHeader from "../../../../components/currentSiteHeader";
import SettingsListButton from "../../../../components/settingsListButton";
import BottomBarSpacer from "../../../../components/bottomBarSpacer";
import AESText from "../../../../components/aesText";
import ConfirmationModal from "../../../../components/confirmationModal";
import { useTranslation } from 'react-i18next';

const IntercomTimeSynchronisation = ({navigation}) => {
  const { currentMode } = UserStore;
  const { languages } = LanguagesStore;
  const { t, i18n } = useTranslation();
  const titleText = languages.time_synchronisation?.text ?? 'Time Synchronisation';

  const [showToolTip, setShowToolTip] = useState(false);

    return (
      <>
        <Header
          leftButtonOnPress={()=> navigation.goBack() }
          leftButtonType={'Back'}
          headerText={t('time_synch')}
          style={{backgroundColor: Colours[currentMode].primaryColour}}
        />
        <ScrollView style={{backgroundColor:Colours.white }}>
          <View style={styles.container}>
            <CurrentSiteHeader/>

            {/*<View style={styles.subheadingContainer}>*/}
            {/*  <AESText*/}
            {/*    color={Colours.black}*/}
            {/*    family={"Roboto-Medium"}*/}
            {/*    size={16}*/}
            {/*    content={titleText}*/}
            {/*  />*/}
            {/*  <TouchableOpacity*/}
            {/*    style={{ marginLeft: 10 }}*/}
            {/*    onPress={() => setShowToolTip(true)}*/}
            {/*  >*/}
            {/*    <Image style={{ tintColor: Colours[currentMode].primaryColour }}*/}
            {/*           source={require('../../../../../assets/images/icons/infoButton.png')} />*/}
            {/*  </TouchableOpacity>*/}
            {/*</View>*/}
            <AESText
              color={Colours.black}
              family={"Roboto-Regular"}
              size={16}
              content={t('time_info')}
              containerStyle={{ marginTop: 20 }}
            />

            <AESText
              color={Colours.black}
              family={"Roboto-Regular"}
              size={16}
              content={t('power_failure_info')}
              containerStyle={{ marginTop: 10 }}
            />

            <SettingsListButton
              onPress={() => navigation.navigate('ClockSync')}
              title={t('clock_sync')}
            />

            <SettingsListButton
              onPress={() => navigation.navigate('DaylightSaving')}
              title={t('daylight_saving')}
            />

            <SettingsListButton
              onPress={() => navigation.navigate('TimeSyncMode')}
              title={t('time_sync_mode')}
            />

          </View>

          <BottomBarSpacer/>
        </ScrollView>
        <ConfirmationModal
          visible={showToolTip}
          header={titleText}
          body={'Time sync may be needed if a unit has lost power and the time has been thrown off.' }
          onPressClose={() => setShowToolTip(false)}
          confirmButtonText={t('time_sync_mode')}
          onPress={() => setShowToolTip(false)}
          warning={false}
        />
      </>
    );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingHorizontal:30,
  },
  subheadingContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 10,
  },
});

export default IntercomTimeSynchronisation;
