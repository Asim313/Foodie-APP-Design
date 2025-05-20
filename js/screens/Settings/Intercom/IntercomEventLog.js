import React, { useState } from "react";
import UserStore from "../../../stores/SiteStore";
import LanguagesStore from "../../../stores/LanguageStore";
import SettingsLayout from "../../../components/settingsLayout";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Colours from "../../../styles/colours";
import AESText from "../../../components/aesText";
import AESTextInput from "../../../components/aesTextInput";
import TextButton from "../../../components/textButton";
import ConfirmationModal from "../../../components/confirmationModal";
import { SendSMSMessage } from "../../../utils/SMS";
import { useTranslation } from 'react-i18next';


const IntercomEventLog = () => {
  const { currentMode } = UserStore;
  const { languages } = LanguagesStore;
  const { t, i18n } = useTranslation();
  const titleText = languages.event_log?.text ?? 'Event Log';

  const [logCount, setLogCount] = useState();
  const [showModal, setShowModal] = useState(false);

  const toggleModal = (show) => {
      setShowModal(show);
  };

  const handleTextChange = (value) => {
     if (!isNaN(value)) {
        setLogCount(value);
     }
  };

  const handleSave = () => {
    SendSMSMessage(
      `Event logs count has been updated`,
      `${UserStore.sites[UserStore.activeSiteID].passcode}#27${logCount}#`,
      UserStore.sites[UserStore.activeSiteID].telephoneNumber,
    );
  };

  const saveDisabled =  () => {
     const value = Number(logCount);
     return isNaN(value) ||  ( value < 5 ||  value > 50);
  };

  return (
    <SettingsLayout title={t('events_log')} mode={currentMode}>
      <View style={styles.optionContainer}>

        <View style={styles.subheadingContainer}>
          <AESText
            color={Colours.black}
            family={'Roboto-Medium'}
            size={16}
            content={t('events_log_message')}
          />
          <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={toggleModal.bind(this, true)}
          >
            <Image style={{ tintColor: Colours[currentMode].primaryColour }} source={require('../../../../assets/images/icons/infoButton.png')} />
          </TouchableOpacity>
        </View>

        <AESTextInput
          // title={`Relay 1 Name`}
          titleTextColoured={true}
          placeholder={'5 - 50'}
          enablePlaceholder={true}
          containerStyle={styles.textInputContainer}
          value={logCount}
          onChangeText={handleTextChange}
          keyboardType={'number-pad'}
        />

        <View style={{ marginTop: 20, marginBottom: 10 }}>
          <TextButton
            buttonText={t('save')}
            outline={false}
            disabled={saveDisabled()}
            onPress={handleSave}
          />
        </View>
      </View>

      <ConfirmationModal
        visible={showModal}
        header={t('events_log')}
        body={t('events_log_info')}
        onPressClose={toggleModal.bind(this, false)}
        confirmButtonText={t('close')}
        onPress={toggleModal.bind(this, false)}
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
  textInputContainer: {
    marginTop: 0,
  },
});

export default IntercomEventLog;


