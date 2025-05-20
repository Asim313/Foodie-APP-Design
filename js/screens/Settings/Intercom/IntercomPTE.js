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

const IntercomPTE = ({navigation}) => {
  const { currentMode } = UserStore;
  const { languages } = LanguagesStore;
  const { t, i18n } = useTranslation();
  const titleText = languages.auto_Opening?.text ?? 'Push-To-Exit';
  const deleteTitle = languages.delete_automatic_relay_time?.text ?? 'Delete All Push-To-Exit times';

  const [autoOpeningConfig, setAutoOpeningConfig] = useState(UserStore.sites[UserStore.activeSiteID].autoClockConfig ?? {
    type: '',
    days: [],
    time: '',
    time2: '',
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const updateConfig = (key, value) => {
    setAutoOpeningConfig(prevState => {
      return {...prevState, [key]: value};
    });
    
  };

  const handleMode = () => {
    const {type} = autoOpeningConfig;
    SendSMSMessageWithUpdate(
      'Selected dode updated.',
      `${UserStore.sites[UserStore.activeSiteID].passcode}#94#${type}#`,
      UserStore.sites[UserStore.activeSiteID].telephoneNumber,
      'autoClockConfig',
      autoOpeningConfig
    );
  }

  const saveEnabled = () => {
    const {days, time, time2} = autoOpeningConfig;

    return days.length > 0 && time !== '' && time2 !== ''
  };

  const handleSave = () => {
    const {type, days, time, time2} = autoOpeningConfig;
    const dayString = days.join(',');

    const resetValue = {
      type: '',
      days: [],
      time: '',
    };

    SendSMSMessageWithUpdate(
      'Suspension time updated.',
      `${UserStore.sites[UserStore.activeSiteID].passcode}#22#${dayString}#${time},${time2}#`,
      UserStore.sites[UserStore.activeSiteID].telephoneNumber,
      'autoClockConfig', 
      resetValue
    ).then(() =>  {
      setAutoOpeningConfig(resetValue);
    });
  
  };

  const handleDelete = () => {
    const resetValue = {
      type: '',
      days: [],
      time: '',
    };

    SendSMSMessageWithUpdate(
      'Automatic relay config deleted.',
      `${UserStore.sites[UserStore.activeSiteID].passcode}#22#*#`,
      UserStore.sites[UserStore.activeSiteID].telephoneNumber,
      'autoClockConfig',
      resetValue
    ).then(() =>  {
      setAutoOpeningConfig(resetValue);
      setShowDeleteModal(false);
    });
  };

  return (
    <SettingsLayout title={t('push_to_exit')} mode={currentMode}>
      <View style={styles.optionContainer}>
        <AESText
          color={Colours.black}
          family={"Roboto-Medium"}
          size={16}
          content={t('push_to_exit')}
        />

        <AESText
          color={Colours.black}
          family={"Roboto-Regular"}
          size={16}
          content={t('pte_message')}
          containerStyle={{marginBottom: 20, marginTop: 10 }}
        />


        <View>
          <AESText
            color={Colours.black}
            family={"Roboto-Medium"}
            size={16}
            content={t('select_days_time')}
          />


          {/* <View style={styles.toggleContainer}>
            <View style={[styles.toggleItem, {marginRight: 10}]}>
              <ToggleButton
                buttonStyle={styles.buttonStyle}
                buttonText={languages.trigger?.text ?? 'Off'}
                outline={true}
                disabled={autoOpeningConfig.type !== '0'}
                onPress={updateConfig.bind(null, 'type', '0')}
              />
            </View>
            <View style={styles.toggleItem}>
              <ToggleButton
                buttonStyle={styles.buttonStyle}
                buttonText={languages.latch?.text ?? 'Mode 1'}
                outline={true}
                disabled={autoOpeningConfig.type !== '1'}
                onPress={updateConfig.bind(null, 'type', '1')}
              />
            </View>
            <View style={[styles.toggleItem, {marginLeft: 10}]}>
              <ToggleButton
                buttonStyle={styles.buttonStyle}
                buttonText={languages.unlatch?.text ?? 'Mode 2'}
                outline={true}
                disabled={autoOpeningConfig.type !== '2'}
                onPress={updateConfig.bind(null, 'type', '2')}
              />
            </View>
          </View> */}

          {/* <View style={{marginTop: 20,marginBottom:10}}>
    
            <TextButton
                buttonText={languages.save.text}
                outline={false}
                onPress={handleMode}
            />
        </View> */}

          <DayPickerUI
            style={styles.dayPicker}
            value={autoOpeningConfig.days}
            mode={currentMode}
            errorMsg={null}
            initialValue={autoOpeningConfig.days}
            onChange={updateConfig.bind(null, 'days')}
          />
         <TimePickerUI
            label={t('start')}
            errorMsg={null}
            value={autoOpeningConfig.time}
            onChange={updateConfig.bind(null, 'time')}
          />

          <TimePickerUI
            label={t('end')}
            errorMsg={null}
            value={autoOpeningConfig.time2}
            onChange={updateConfig.bind(null, 'time2')}
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
          buttonText={t('delete_pte')}
          outline={true}
          onPress={() => setShowDeleteModal(true)}
        />
      </View>

      <ConfirmationModal
        visible={showDeleteModal}
        header={t('delete_pte')}
        body={t('delete_pte_confirmation')}
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

export default IntercomPTE;
