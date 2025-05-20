import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Colours from "../../../styles/colours";
import CurrentSiteHeader from "../../../components/currentSiteHeader";
import SettingsListButton from "../../../components/settingsListButton";
import BottomBarSpacer from "../../../components/bottomBarSpacer";
import UserStore from "../../../stores/SiteStore";
import LanguageStore from "../../../stores/LanguageStore";
import Header from "../../../components/header";
import { useTranslation } from 'react-i18next';




const CallerIDLanding = ({navigation}) => {
  const { currentMode } = UserStore;
  const { languages } = LanguageStore;
  const { t, i18n } = useTranslation();
  return (
      <>
        <Header
          leftButtonOnPress={()=> navigation.goBack() }
          leftButtonType={'Back'}
          headerText={t('caller_id')}
          style={{backgroundColor: Colours[currentMode].primaryColour}}
        />
        <ScrollView style={{backgroundColor:Colours.white }}>
          <View style={styles.container}>
            <CurrentSiteHeader/>

            <SettingsListButton
              onPress={() => navigation.navigate('247CallerID')}
              title={t('perm_caller_id')}
            />

            {UserStore.currentMode === 'plus' &&
              <>
              <SettingsListButton
                onPress={() => navigation.navigate('TimeRestrictedCallerID')}
                title={t('time_restricted_caller_id')}
              />
            </>
            }



          </View>

          <BottomBarSpacer/>
        </ScrollView>
      </>
  );
};

export default CallerIDLanding;

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingHorizontal:30,
  },
});
