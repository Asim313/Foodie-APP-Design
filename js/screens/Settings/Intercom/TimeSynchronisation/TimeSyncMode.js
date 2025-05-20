import React, { useState } from "react";
import SettingsLayout from "../../../../components/settingsLayout";
import UserStore from "../../../../stores/SiteStore";
import LanguagesStore from "../../../../stores/LanguageStore";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import AESText from "../../../../components/aesText";
import Colours from "../../../../styles/colours";
import ToggleButton from "../../../../components/toggleButton";
import TextButton from "../../../../components/textButton";
import AESTextInput from "../../../../components/aesTextInput";
import ConfirmationModal from "../../../../components/confirmationModal";
import { SendSMSMessageWithUpdate } from "../../../../utils/SMS";
import { useTranslation } from 'react-i18next';

const TimeSyncMode = () => {
  const { currentMode } = UserStore;
  const { languages } = LanguagesStore;
  const { t, i18n } = useTranslation();
  const titleText = "Time Synchronisation Mode";

  const [syncMode, setSyncMode] = useState(UserStore.sites[UserStore.activeSiteID].timeSyncConfig?.syncMode ?? "");
  const [timeZone, setTimeZone] = useState(UserStore.sites[UserStore.activeSiteID].timeSyncConfig?.timeZone ?? "0");
  const [adjust, setAdjust] = useState(UserStore.sites[UserStore.activeSiteID].timeSyncConfig?.adjust ?? "");
  const [showSyncToolTip, setShowSyncToolTip] = useState(false);
  const [showTimezoneToolTip, setShowTimezoneToolTip] = useState(false);
  const [showAdjustToolTip, setShowAdjustToolTip] = useState(false);

  const enableTimezoneSave = () => {
    const value = Number(timeZone);
    return timeZone !== '' && !isNaN(value) && (value >= -12 && value <= 12);
  };

  const enableAdjustSave = () => {
    const value = Number(adjust);
    return adjust !== '' && !isNaN(value) && (value >= -24 && value <= 24);
  };

  const handleSaveSyncMode = () => {
      processSave('syncMode', syncMode, '67');
  };

  const handleSaveTimezone = () => {
    processSave('timeZone', timeZone, '66');
  };

  const handleSaveAdjust = () => {
    processSave('adjust', adjust, '96');
  };

  const processSave = (key, value, commandCode) => {
    let config = UserStore.sites[UserStore.activeSiteID].timeSyncConfig ?? {
      clockSync: '',
      daylightSaving: '',
      syncMode: '',
      timeZone: '0',
      adjust: '',
    };
    config = { ...config, [key]: value };


    SendSMSMessageWithUpdate(
      'Time sync mode updated',
      `${UserStore.sites[UserStore.activeSiteID].passcode}#${commandCode}${value}#`,
      UserStore.sites[UserStore.activeSiteID].telephoneNumber,
      'timeSyncConfig',
      config
    );
  };

  return (
    <SettingsLayout title={t('time_sync_mode')} mode={currentMode}>
      <View style={styles.optionContainer}>

        <View style={styles.subheadingContainer}>
          <AESText
            color={Colours.black}
            family={"Roboto-Medium"}
            size={16}
            content={t('time_sync_mode')}
          />
          <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={() => setShowSyncToolTip(true)}
          >
            <Image style={{ tintColor: Colours[currentMode].primaryColour }}
                   source={require("../../../../../assets/images/icons/infoButton.png")} />
          </TouchableOpacity>
        </View>

        <AESText
          color={Colours.black}
          family={"Roboto-Regular"}
          size={16}
          content={languages.time_sync_mode_description?.text ?? "Select to change the time sync mode from SMS to NTP Server."}
          containerStyle={{ marginTop: 10 }}
        />

        <View style={{
          flexDirection: "row",
          alignItems: "stretch",
          justifyContent: "space-between",
          height: 50,
          marginTop: 20,
        }}>
          <View>
            <ToggleButton
              buttonText="SMS"
              outline={true}
              disabled={syncMode !== "0"}
              onPress={setSyncMode.bind(null, "0")}
            />
          </View>
          <View>
            <ToggleButton
              buttonText="NTP"
              outline={true}
              disabled={syncMode !== "1"}
              onPress={setSyncMode.bind(null, "1")}
            />
          </View>
        </View>

        <View style={{ marginTop: 20, marginBottom: 10 }}>

          <TextButton
            buttonText={t('save')}
            outline={false}
            disabled={syncMode === ''}
            onPress={handleSaveSyncMode}
          />
        </View>
        {syncMode === "1" && (
          <>
            <View>
              <View style={[styles.subheadingContainer, { marginTop: 24 }]}>
                <AESText
                  color={Colours.black}
                  family={"Roboto-Medium"}
                  size={16}
                  content={languages.time_zone_universal?.text ?? "Universal Time Clock (UTC)"}
                />
                <TouchableOpacity
                  style={{ marginLeft: 10 }}
                  onPress={() => setShowTimezoneToolTip(true)}
                >
                  <Image style={{ tintColor: Colours[currentMode].primaryColour }}
                         source={require("../../../../../assets/images/icons/infoButton.png")} />
                </TouchableOpacity>
              </View>
              <AESTextInput
                titleTextColoured={true}
                placeholder={"-12 to 12"}
                enablePlaceholder={true}
                containerStyle={styles.textInputContainer}
                value={timeZone}
                onChangeText={setTimeZone.bind(null)}
                keyboardType={"number-pad"}
              />

              <View style={{ marginTop: 20, marginBottom: 10 }}>
                <TextButton
                  buttonText={t('save')}
                  outline={false}
                  disabled={!enableTimezoneSave()}
                  onPress={handleSaveTimezone}
                />
              </View>
            </View>
            <View>
              <View style={[styles.subheadingContainer, { marginTop: 24 }]}>
                <AESText
                  color={Colours.black}
                  family={"Roboto-Medium"}
                  size={16}
                  content={languages.adjust_timestamp?.text ?? "Adjust Timestamp"}
                />
                <TouchableOpacity
                  style={{ marginLeft: 10 }}
                  onPress={() => setShowAdjustToolTip(true)}
                >
                  <Image style={{ tintColor: Colours[currentMode].primaryColour }}
                         source={require("../../../../../assets/images/icons/infoButton.png")} />
                </TouchableOpacity>
              </View>
              <AESTextInput
                titleTextColoured={true}
                placeholder={"-24 to 24"}
                enablePlaceholder={true}
                containerStyle={styles.textInputContainer}
                value={adjust}
                onChangeText={setAdjust.bind(null)}
                keyboardType={"number-pad"}
              />

              <View style={{ marginTop: 20, marginBottom: 10 }}>
                <TextButton
                  buttonText={t('save')}
                  outline={false}
                  disabled={!enableAdjustSave()}
                  onPress={handleSaveAdjust}
                />
              </View>
            </View>
          </>
        )}
      </View>
      <ConfirmationModal
        visible={showSyncToolTip}
        header={titleText}
        body={languages.time_sync_mode_description?.text ?? 'This mode is used to decide if the time sync mode will work ' +
          'through a server or a message. Also decide when this happens per day.' }
        onPressClose={() => setShowSyncToolTip(false)}
        confirmButtonText={t('close')}
        onPress={() => setShowSyncToolTip(false)}
        warning={false}
      />
      <ConfirmationModal
        visible={showTimezoneToolTip}
        header={ languages.time_zone?.text ?? 'Universal Time Clock'}
        body={languages.time_zone_description?.text ?? 'Plus or Minus the number depending on your time zone. E.g. UK = UTC+1.' }
        onPressClose={() => setShowTimezoneToolTip(false)}
        confirmButtonText={t('close')}
        onPress={() => setShowTimezoneToolTip(false)}
        warning={false}
      />
      <ConfirmationModal
        visible={showAdjustToolTip}
        header={languages.timestamp?.text ?? 'Timestamp'}
        body={languages.timestamp_description?.text ?? 'Adjust Timestamp tip: adjust the time stamp plus or minus the number of hours you want to adjust.' }
        onPressClose={() => setShowAdjustToolTip(false)}
        confirmButtonText={t('close')}
        onPress={() => setShowAdjustToolTip(false)}
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
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textInputContainer: {
    marginTop: -10,
  },
});

export default TimeSyncMode;

