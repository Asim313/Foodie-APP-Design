import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import UserStore from "../../../../stores/SiteStore";
import LanguagesStore from "../../../../stores/LanguageStore";
import Header from "../../../../components/header";
import Colours from "../../../../styles/colours";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CurrentSiteHeader from "../../../../components/currentSiteHeader";
import AESText from "../../../../components/aesText";
import ToggleButton from "../../../../components/toggleButton";
import TextButton from '../../../../components/textButton';
import BottomBarSpacer from '../../../../components/bottomBarSpacer';
import { SendSMSMessageWithUpdate } from '../../../../utils/SMS';
import { useTranslation } from 'react-i18next';


const IntercomSMSReply = ({navigation}) => {

  const { currentMode } = UserStore;
  const { languages } = LanguagesStore;
  const { t, i18n } = useTranslation();

  const [enable, setEnable] = useState(UserStore.sites[UserStore.activeSiteID].smsReply ?? null);

  const updateEnabledStatus = (status) => {
     setEnable(status);
  };

  const handleSave = () => {
    const newValue = enable ? 1 : 0;
    SendSMSMessageWithUpdate(
      enable ? 'SMS reply has been enabled' : 'SMS reply has been disabled',
      `${UserStore.sites[UserStore.activeSiteID].passcode}#81${newValue}#`,
      UserStore.sites[UserStore.activeSiteID].telephoneNumber,
      'smsReply',
      newValue);
  };


  return (
    <>
      <Header
        leftButtonOnPress={()=>{navigation.goBack()}}
        leftButtonType={'Back'}
        headerText={t('sms_reply')}
        style={{backgroundColor:Colours[currentMode].primaryColour}}
      />
      <KeyboardAwareScrollView style={{backgroundColor:Colours.white }}>
        <View style={styles.container}>
          <CurrentSiteHeader/>

          <View style={styles.optionContainer}>
            <AESText
              color={Colours.black}
              family={'Roboto-Medium'}
              size={16}
              content={t('sms_reply')}
            />
            <View style={{marginBottom:30,marginTop:10}}>
              <AESText
                color={Colours.black}
                family={'Roboto-Regular'}
                size={16}
                content={t('sms_reply_message')}
              />
            </View>

            <View style={{
              flexDirection: 'row',
              alignItems: 'stretch',
              justifyContent:'space-between',
              height:50
            }}>
              <View>
                <ToggleButton
                  buttonText={(enable !== null && !enable) ? t('disabled') : t('disable')}
                  outline={true}
                  disabled={enable === null || enable}
                  onPress={updateEnabledStatus.bind(null, false)}
                />
              </View>
              <View>
                <ToggleButton
                  buttonText={(enable !== null && enable) ? t('enabled') : t('enable')}
                  outline={true}
                  disabled={enable === null || !enable}
                  onPress={updateEnabledStatus.bind(null, true)}
                />
              </View>
            </View>


            <View style={{marginTop: 20,marginBottom:10}}>

              <TextButton
                buttonText={t('save')}
                outline={false}
                disabled={enable === null}
                onPress={handleSave}
              />
            </View>
          </View>
        </View>
        <BottomBarSpacer/>
      </KeyboardAwareScrollView>
    </ >
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingHorizontal:30,
  },
  optionContainer:{
    flex: 1,
    marginVertical:20,
  },
});


export default IntercomSMSReply;
