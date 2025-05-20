import React from "react";
import { StyleSheet } from "react-native";
import UserStore from "../../../../stores/SiteStore";
import LanguagesStore from "../../../../stores/LanguageStore";
import Header from "../../../../components/header";
import Colours from "../../../../styles/colours";
import { ScrollView, View } from "react-native";
import CurrentSiteHeader from "../../../../components/currentSiteHeader";
import SettingsListButton from "../../../../components/settingsListButton";
import BottomBarSpacer from "../../../../components/bottomBarSpacer";
import { useTranslation } from 'react-i18next';


const IntercomRelay = ({navigation}) => {
  const { currentMode } = UserStore;
  const { languages } = LanguagesStore;
  const { t, i18n } = useTranslation();

  return (
      <>
        <Header
          leftButtonOnPress={()=>{navigation.goBack()}}
          leftButtonType={'Back'}
          headerText={t('relay')}
          style={{backgroundColor:Colours[currentMode].primaryColour}}
        />
        <ScrollView style={{backgroundColor:Colours.white }}>
          <View style={styles.container}>
            <CurrentSiteHeader/>

            <SettingsListButton
              onPress={() => navigation.navigate('IntercomRelayTime')}
              title={t('relay_time')}
            />

            {UserStore.currentMode === 'pro' || UserStore.currentMode === 'plus' ? (
            <SettingsListButton
              onPress={() => navigation.navigate('IntercomSMSReply')}
              title={t('sms_reply')}
            />
            ) :null}

            {UserStore.currentMode === 'plus' &&
              <>
              <SettingsListButton
              onPress={() => navigation.navigate('IntercomPersonaliseRelay')}
              title={t('personalise_relays')}
            />
            </>
            }
          </View>

          <BottomBarSpacer/>
        </ScrollView>
      </>
  );
};

export default IntercomRelay;

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingHorizontal:30,
  },
})
