import React, { useState } from "react";
import SettingsLayout from "../../../../components/settingsLayout";
import UserStore from "../../../../stores/SiteStore";
import LanguagesStore from "../../../../stores/LanguageStore";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import AESText from "../../../../components/aesText";
import Colours from "../../../../styles/colours";
import ConfirmationModal from "../../../../components/confirmationModal";
import ToggleButton from "../../../../components/toggleButton";
import TextButton from "../../../../components/textButton";
import { SendSMSMessageWithUpdate } from "../../../../utils/SMS";
import { useTranslation } from 'react-i18next';

const KPNCallerID = () => {
  const { currentMode } = UserStore;
  const { languages } = LanguagesStore;
  const { t, i18n } = useTranslation();
  const titleText = languages.kpn_caller_id?.text ?? 'KPN Caller ID';

  const [showToolTip, setShowToolTip] = useState(false);
  const [enable, setEnable] = useState(UserStore.sites[UserStore.activeSiteID]?.kpnCallerID ?? '1');

  const handleSave = () => {
    SendSMSMessageWithUpdate(
      enable ? 'KPN caller ID enabled' : 'KPN caller ID disabled',
      `${UserStore.sites[UserStore.activeSiteID].passcode}#88${enable}#`,
      UserStore.sites[UserStore.activeSiteID].telephoneNumber,
      'kpnCallerID',
      enable
    );
  };


  return (
    <SettingsLayout title={"KPN "+t('caller_id')} mode={currentMode}>
      <View style={styles.optionContainer}>
        <View style={styles.subheadingContainer}>
          <AESText
            color={Colours.black}
            family={"Roboto-Medium"}
            size={16}
            content={"KPN "+t('caller_id')} 
          />
          <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={() => setShowToolTip(true)}
          >
            <Image style={{ tintColor: Colours[currentMode].primaryColour }}
                   source={require("../../../../../assets/images/icons/infoButton.png")} />
          </TouchableOpacity>
        </View>

        <View style={{
          flexDirection: 'row',
          alignItems: 'stretch',
          justifyContent:'space-between',
          height:50,
          marginTop: 20,
        }}>
          <View>
            <ToggleButton
              buttonText={t('enable')}
              outline={true}
              disabled={enable !== '1'}
              onPress={setEnable.bind(null, '1')}
            />
          </View>
          <View>
            <ToggleButton
              buttonText={t('disable')}
              outline={true}
              disabled={enable !== '0'}
              onPress={setEnable.bind(null, '0')}
            />
          </View>
        </View>


        <View style={{marginTop: 20,marginBottom:10}}>
          <TextButton
            buttonText={t('save')}
            outline={false}
            disabled={enable === ''}
            onPress={handleSave}
          />
        </View>

      </View>
      <ConfirmationModal
        visible={showToolTip}
        header={"KPN "+t('caller_id')} 
        body={'This feature is used to stop potential multi triggering and comes ENABLED as default.'}
        onPressClose={() => setShowToolTip(false)}
        confirmButtonText={t('close')}
        onPress={() => setShowToolTip(false)}
        warning={false}
      />

    </SettingsLayout>
  );
};

const styles = StyleSheet.create({
  optionContainer: {
    flex: 1,
    marginVertical: 20,
  },
  subheadingContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export  default KPNCallerID;

