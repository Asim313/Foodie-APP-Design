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

const ClockSync = () => {
  const { currentMode } = UserStore;
  const { languages } = LanguagesStore;
  const { t, i18n } = useTranslation();
  const titleText = 'Clock Sync';
  const [showToolTip, setShowToolTip] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [clockSync, setClockSync] = useState(UserStore.sites[UserStore.activeSiteID].timeSyncConfig?.clockSync ?? '');


  const handleSave = () => {
    process(clockSync === '1');
  };

  const handleDelete = () => {
    process(false);
    setShowDeleteModal(false);
  };

  const process = (enable) => {
    let timeSyncConfig = UserStore.sites[UserStore.activeSiteID].timeSyncConfig ?? {clockSync: '', daylightSaving: '', syncMode: '', timeZone: '', adjust: ''};
    const content = enable ? UserStore.sites[UserStore.activeSiteID].telephoneNumber : '*'
    timeSyncConfig = {...timeSyncConfig, clockSync: enable ? '1' : '0' };
    SendSMSMessageWithUpdate(
      enable ? 'Clock sync enabled' : 'Clock sync disabled',
      `${UserStore.sites[UserStore.activeSiteID].passcode}#86${content}#`,
      UserStore.sites[UserStore.activeSiteID].telephoneNumber,
      'timeSyncConfig',
      timeSyncConfig
    );
  };

  return (
    <SettingsLayout title={t('clock_sync')} mode={currentMode}>
      <View style={styles.optionContainer}>
        <View style={styles.subheadingContainer}>
          <AESText
            color={Colours.black}
            family={"Roboto-Medium"}
            size={16}
            content={t('clock_sync')}
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
              disabled={clockSync !== '1'}
              onPress={setClockSync.bind(null, '1')}
            />
          </View>
          <View>
            <ToggleButton
              buttonText={t('disable')}
              outline={true}
              disabled={clockSync !== '0'}
              onPress={setClockSync.bind(null, '0')}
            />
          </View>
        </View>


        <View style={{marginTop: 20,marginBottom:10}}>

          <TextButton
            buttonText={t('save')}
            outline={false}
            disabled={clockSync === ''}
            onPress={handleSave}
          />
        </View>

        <View style={{ marginVertical: 30 }}>
          <TextButton
            buttonText={t('delete')}
            outline={true}
            disabled={false}
            onPress={() => setShowDeleteModal(true)}
          />
        </View>

      </View>
      <ConfirmationModal
        visible={showToolTip}
        header={t('clock_sync')}
        body={'This feature will make the unit send a text message to itself when powered off to take the time so it syncs up properly.'}
        onPressClose={() => setShowToolTip(false)}
        confirmButtonText={t('close')}
        onPress={() => setShowToolTip(false)}
        warning={false}
      />

      <ConfirmationModal
        visible={showDeleteModal}
        header={t('delete')}
        body={'Are you sure you want to delete the programmed number for Clock Sync?'}
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
});

export  default ClockSync;

