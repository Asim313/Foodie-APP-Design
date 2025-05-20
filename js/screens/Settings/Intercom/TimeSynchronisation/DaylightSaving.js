import React, { useState } from "react";
import SettingsLayout from "../../../../components/settingsLayout";
import UserStore from "../../../../stores/SiteStore";
import LanguagesStore from "../../../../stores/LanguageStore";
import { StyleSheet, View } from "react-native";
import AESText from "../../../../components/aesText";
import Colours from "../../../../styles/colours";
import PickerUI from "../../../../components/PickerUI";
import TextButton from "../../../../components/textButton";
import { SendSMSMessageWithUpdate } from "../../../../utils/SMS";
import { useTranslation } from 'react-i18next';


const daysList = new Array(100).fill(null).map((_, i) => (i).toString());

const DaylightSaving = () => {
  const { currentMode } = UserStore;
  const { languages } = LanguagesStore;
  const { t, i18n } = useTranslation();
  const titleText = 'Daylight Saving';
  const [numOfDays, setNumOfDays] = useState(UserStore.sites[UserStore.activeSiteID].timeSyncConfig?.daylightSaving ?? null);

  const handleSave = () => {
    let timeSyncConfig = UserStore.sites[UserStore.activeSiteID].timeSyncConfig ?? {clockSync: '', daylightSaving: '', syncMode: '', timeZone: '', adjust: ''};
    timeSyncConfig = {...timeSyncConfig, daylightSaving: numOfDays };
    SendSMSMessageWithUpdate(
      'Daylight saving updated',
      `${UserStore.sites[UserStore.activeSiteID].passcode}#87${numOfDays}#`,
      UserStore.sites[UserStore.activeSiteID].telephoneNumber,
      'timeSyncConfig',
      timeSyncConfig
    );
  };

  return (
    <SettingsLayout title={t('daylight_saving')} mode={currentMode}>
      <View style={styles.optionContainer}>
        <AESText
          color={Colours.black}
          family={"Roboto-Regular"}
          size={16}
          content={'For regions where there is a 1 hour time shift for daylight saving, it can be useful to have the intercom ' +
            'send itself a SMS every set number of days to re-synchronise the internal clock. The intercom will do this anyway each time an SMS is received.'}
          containerStyle={{ marginTop: 20 }}
        />
        <PickerUI
          style={styles.textInput}
          label="Number of Days"
          modalTitle="Select Number of Days"
          list={daysList}
          value={numOfDays}
          onChange={text => setNumOfDays(text)}
        />

        <View style={{marginTop: 20,marginBottom:10}}>

          <TextButton
            buttonText={t('save')}
            outline={false}
            disabled={numOfDays === ''}
            onPress={handleSave}
          />
        </View>
      </View>
    </SettingsLayout>
  );
};

const styles = StyleSheet.create({
  textInput: {
    marginTop: 20,
  }
});

export  default DaylightSaving;

