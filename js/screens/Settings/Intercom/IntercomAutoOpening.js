import React, { useState } from "react";
import UserStore from "../../../stores/SiteStore";
import LanguagesStore from "../../../stores/LanguageStore";
import SettingsLayout from "../../../components/settingsLayout";
import { StyleSheet, View } from "react-native";
import AESText from "../../../components/aesText";
import Colours from "../../../styles/colours";
import ToggleButton from "../../../components/toggleButton";
import DayPickerUI from "../../../components/DayPickerUI";
import TimePickerUI from "../../../components/TimePickerUI";
import TextButton from "../../../components/textButton";
import { SendSMSMessageWithUpdate } from "../../../utils/SMS";
import ConfirmationModal from "../../../components/confirmationModal";
import { useTranslation } from 'react-i18next';

const IntercomAutoOpening = ({navigation}) => {
  const { currentMode } = UserStore;
  const { languages } = LanguagesStore;
  const { t, i18n } = useTranslation();
  const titleText = languages.auto_Opening?.text ?? 'Auto Opening';
  const deleteTitle = languages.delete_automatic_relay_time?.text ?? 'Delete All Automatic Relay Times';

  const [autoOpeningConfig, setAutoOpeningConfig] = useState(UserStore.sites[UserStore.activeSiteID].autoClockConfig ?? {
    type: '',
    days: [],
    time: '',
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const updateConfig = (key, value) => {
    setAutoOpeningConfig(prevState => {
      return {...prevState, [key]: value};
    });
  };

  const saveEnabled = () => {
    const {type, days, time} = autoOpeningConfig;

    return type !== '' && days.length > 0 && time !== ''
  };

  const handleSave = () => {
    const {type, days, time} = autoOpeningConfig;
    const dayString = days.join(',');

    SendSMSMessageWithUpdate(
      'Automatic relay config updated.',
      `${UserStore.sites[UserStore.activeSiteID].accessCode}#${type}#${dayString}#${time}#`,
      UserStore.sites[UserStore.activeSiteID].telephoneNumber,
      'autoClockConfig',
      autoOpeningConfig
    );
  };

  const handleDelete = () => {
    const resetValue = {
      type: '',
      days: [],
      time: '',
    };

    SendSMSMessageWithUpdate(
      'Automatic relay config deleted.',
      `${UserStore.sites[UserStore.activeSiteID].accessCode}*#`,
      UserStore.sites[UserStore.activeSiteID].telephoneNumber,
      'autoClockConfig',
      resetValue
    ).then(() =>  {
      setAutoOpeningConfig(resetValue);
      setShowDeleteModal(false);
    });
  };

  return (
    <SettingsLayout title={t('auto_opening')} mode={currentMode}>
      <View style={styles.optionContainer}>
        <AESText
          color={Colours.black}
          family={"Roboto-Medium"}
          size={16}
          content={t('auto_relay_times_message')}
        />

        <AESText
          color={Colours.black}
          family={"Roboto-Regular"}
          size={16}
          content={t('relay_internal_clock')}
          containerStyle={{ marginBottom: 20, marginTop: 10 }}
        />

        <View>
          <AESText
            color={Colours.black}
            family={"Roboto-Medium"}
            size={16}
            content={t('relay_function')}
          />


          <View style={styles.toggleContainer}>
            <View style={[styles.toggleItem, {marginRight: 10}]}>
              <ToggleButton
                buttonStyle={styles.buttonStyle}
                buttonText={t('trigger')}
                outline={true}
                disabled={autoOpeningConfig.type !== '1'}
                onPress={updateConfig.bind(null, 'type', '1')}
              />
            </View>
            <View style={styles.toggleItem}>
              <ToggleButton
                buttonStyle={styles.buttonStyle}
                buttonText={t('latch')}
                outline={true}
                disabled={autoOpeningConfig.type !== '2'}
                onPress={updateConfig.bind(null, 'type', '2')}
              />
            </View>
            <View style={[styles.toggleItem, {marginLeft: 10}]}>
              <ToggleButton
                buttonStyle={styles.buttonStyle}
                buttonText={t('unlatch')}
                outline={true}
                disabled={autoOpeningConfig.type !== '3'}
                onPress={updateConfig.bind(null, 'type', '3')}
              />
            </View>
          </View>

          <DayPickerUI
            style={styles.dayPicker}
            value={autoOpeningConfig.days}
            mode={currentMode}
            errorMsg={null}
            initialValue={autoOpeningConfig.days}
            onChange={updateConfig.bind(null, 'days')}
          />
         <TimePickerUI
            label={t('time')}
            errorMsg={null}
            value={autoOpeningConfig.time}
            onChange={updateConfig.bind(null, 'time')}
          />
        </View>
      </View>

      <View style={{ marginTop: 20, marginBottom: 10 }}>
        <TextButton
          buttonText={t('save')}
          outline={false}
          disabled={!saveEnabled()}
          onPress={handleSave}
        />
      </View>

      <View style={{ marginTop: 20, marginBottom: 10 }}>
        <TextButton
          buttonText={t('delete_auto_relay')}
          outline={true}
          onPress={() => setShowDeleteModal(true)}
        />
      </View>

      <ConfirmationModal
        visible={showDeleteModal}
        header={t('delete_auto_relay')}
        body={t('delete_auto_relay_confirm')}
        onPressClose={() => setShowDeleteModal(false)}
        cancelButtonText={t('no')}
        confirmButtonText={t('yes')}
        onPress={handleDelete}
        warning={true}
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
  toggleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    marginTop: 20,
  },
  toggleItem: {
    flex: 1,
  },
  dayPicker: {
    paddingTop: 20,
  },
});

export default IntercomAutoOpening;
