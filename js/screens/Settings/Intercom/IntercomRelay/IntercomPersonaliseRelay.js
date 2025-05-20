import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Header from "../../../../components/header";
import Colours from "../../../../styles/colours";
import UserStore from "../../../../stores/SiteStore";
import LanguagesStore from "../../../../stores/LanguageStore";
import CurrentSiteHeader from "../../../../components/currentSiteHeader";
import AESText from "../../../../components/aesText";
import AESTextInput from "../../../../components/aesTextInput";
import TextButton from "../../../../components/textButton";
import { SendSMSMessageWithUpdate } from "../../../../utils/SMS";
import SettingsLayout from "../../../../components/settingsLayout";
import { useTranslation } from 'react-i18next';

const IntercomPersonaliseRelay = ({ navigation }) => {
  const { currentMode } = UserStore;
  const { languages } = LanguagesStore;
  const { t, i18n } = useTranslation();

  const [relayData, setRelayData] = useState(
    UserStore.sites[UserStore.activeSiteID].relayInfo ?? [{ relayName: '', relayStatus: '', }, { relayName: '', relayStatus: '' }]
  );


  const handleTextChange = (index, key, value) => {
    setRelayData(prev => {
      let arr = [...prev];
      arr[index][key] = value;
      return arr;
    });
  };

  // const saveDisabled = () => {
  //   for (const data of relayData) {
  //     if (data.relayName === '' || data.relayStatus === '') {
  //       return true;
  //     }
  //   }
  //   return false;
  // };

  const handleSave = () => {
    const relay1 = relayData[0];
    const relay2 = relayData[1];

    SendSMSMessageWithUpdate(
      "Relays personalised",
      `${UserStore.sites[UserStore.activeSiteID].passcode}#39#${relay1.relayName}##${relay1.relayStatus}#${relay2.relayStatus}####`,
      UserStore.sites[UserStore.activeSiteID].telephoneNumber,
      "relayInfo",
      relayData,
    );

    // SendSMSMessageWithUpdate(
    //   "Relays personalised",
    //   `${UserStore.sites[UserStore.activeSiteID].passcode}#39#${relay1.relayName}#${relay2.relayName}#${relay1.relayStatus}#${relay2.relayStatus}####`,
    //   UserStore.sites[UserStore.activeSiteID].telephoneNumber,
    //   "relayInfo",
    //   relayData,
    // );

  };

  return (
        <SettingsLayout title={t('personalise_relays')} mode={currentMode}>
          <View style={styles.optionContainer}>
            <View>
              <AESText
                color={Colours.black}
                family={"Roboto-Medium"}
                size={16}
                content={t('personalise_relay_name')}
              />
              <AESTextInput
                title={t('relay_name')}
                titleTextColoured={true}
                placeholder={"e.g. Front Gate"}
                enablePlaceholder={true}
                containerStyle={styles.textInputContainer}
                value={relayData[0].relayName}
                onChangeText={handleTextChange.bind(this, 0, "relayName")}
              />

              {/* <AESTextInput
                title={t('relay_name') + " 2"}
                titleTextColoured={true}
                placeholder={"e.g. Back Gate"}
                enablePlaceholder={true}
                containerStyle={styles.textInputContainer}
                value={relayData[1].relayName}
                onChangeText={handleTextChange.bind(this, 1, "relayName")}
              /> */}

            </View>

            <View style={{ marginTop: 20 }}>
              <AESText
                color={Colours.black}
                family={"Roboto-Medium"}
                size={16}
                content={t('personalise_relay_status')}
              />

              <AESTextInput
                title={t('relay_status') + " 1"}
                titleTextColoured={true}
                placeholder={"e.g. Open"}
                enablePlaceholder={true}
                containerStyle={styles.textInputContainer}
                value={relayData[0].relayStatus}
                onChangeText={handleTextChange.bind(this, 0, "relayStatus")}
              />

              <AESTextInput
                title={t('relay_status') + " 2"}
                titleTextColoured={true}
                placeholder={"e.g. Close"}
                enablePlaceholder={true}
                containerStyle={styles.textInputContainer}
                value={relayData[1].relayStatus}
                onChangeText={handleTextChange.bind(this, 1, "relayStatus")}
              />
            </View>

          </View>

          <View style={{ marginTop: 20, marginBottom: 10 }}>
            <TextButton
              buttonText={t('save')}
              outline={false}
              // disabled={saveDisabled()}
              onPress={handleSave}
            />
          </View>
        </SettingsLayout>
  );
};

const styles = StyleSheet.create({
  optionContainer: {
    flex: 1,
    marginVertical: 20,
  },
  textInputContainer: {
    marginVertical: 16,
  },

});

export default IntercomPersonaliseRelay;
