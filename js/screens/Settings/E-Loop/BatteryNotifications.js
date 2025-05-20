import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import UserStore from "../../../stores/SiteStore";
import LanguagesStore from "../../../stores/LanguageStore";
import Colours from "../../../styles/colours";
import TextButton from "../../../components/textButton";
import ConfirmationModal from "../../../components/confirmationModal";
import { SendSMSMessageWithUpdate } from "../../../utils/SMS";
import AESText from "../../../components/aesText";
import ToggleButton from "../../../components/toggleButton";
import AESTextInput from "../../../components/aesTextInput";
import Header from "../../../components/header";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CurrentSiteHeader from "../../../components/currentSiteHeader";
import { useTranslation } from 'react-i18next';

const defaultNotificationNumbers = ["", "", "", ""];
const BatteryNotifications = ({ navigation }) => {

  const { currentMode } = UserStore;
  const { languages } = LanguagesStore;
  const { t, i18n } = useTranslation();
  const title = languages.notifications?.text ?? "Notifications";
  const deleteTitle = languages.delete_all_notification_numbers?.text ?? "Delete All Notification Numbers";

  const [notificationNumbers, setNotificationNumbers] = useState(UserStore.sites[UserStore.activeSiteID]?.notificationNumbers ?? [...defaultNotificationNumbers]);
  const [notificationMessage, setNotificationMessage] = useState(UserStore.sites[UserStore.activeSiteID]?.notificationMessage ?? "");
  const [showNotificationToolTip, setShowNotificationToolTip] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState(UserStore.sites[UserStore.activeSiteID]?.notificationStatus ?? "");


  const enableSaveNumbers = () => {
    let enabled = false;

    for (const number of notificationNumbers) {
      enabled = Boolean(number.length);
      if (enabled) {
        break;
      }
    }

    return enabled;
  };

  const onUpdateNotificationNumber = (index, text) => {
    setNotificationNumbers(prev => {
      let numbers = [...prev];
      numbers[index] = text.replace(/\D/g, "");
      return numbers;
    });
  };

  const handleSaveNotificationStatus = () => {
    SendSMSMessageWithUpdate(
      notificationStatus === "1" ? "Notification enabled" : "Notification disabled",
      `${UserStore.sites[UserStore.activeSiteID].passcode}#93${notificationStatus}#`,
      UserStore.sites[UserStore.activeSiteID].telephoneNumber,
      "notificationStatus",
      notificationStatus,
    );
  };

  const handleSaveMessage = () => {
    const content = `${UserStore.sites[UserStore.activeSiteID].passcode}#92${notificationMessage}#`;
    SendSMSMessageWithUpdate(
      'Notification message updated',
      content,
      UserStore.sites[UserStore.activeSiteID].telephoneNumber,
      'notificationMessage',
      notificationMessage,
    );
  };

  const handleSaveNotificationNumbers = () => {
    let output = notificationNumbers.map(number => {
      return number.length === 0 ? '' : `91${number}#`;
    }).join('');

    SendSMSMessageWithUpdate(
      'Notification numbers has been updated',
      `${UserStore.sites[UserStore.activeSiteID].passcode}#${output}`,
      UserStore.sites[UserStore.activeSiteID].telephoneNumber,
      'notificationNumbers',
      notificationNumbers,
    );

  };

  return (
    <>
      <Header
        leftButtonOnPress={() => {
          navigation.goBack();
        }}
        leftButtonType={"Back"}
        headerText={t('battery_noti')}
        style={{ backgroundColor: Colours[currentMode].primaryColour }}
      />

      <View style={styles.container}>
        <KeyboardAwareScrollView style={{ flex: 1, paddingHorizontal: 30 }}>
          <View style={styles.optionContainer}>
            <CurrentSiteHeader />
            <View style={styles.section}>
              <AESText
                color={Colours.black}
                family={"Roboto-Medium"}
                size={16}
                content={t('battery_noti')}
              />

              <AESText
                color={Colours.black}
                family={"Roboto-Regular"}
                size={16}
                content={t('battery_noti_message')}
                containerStyle={{ marginBottom: 20, marginTop: 10 }}
              />

              <View style={{
                flexDirection: "row",
                alignItems: "stretch",
                justifyContent: "space-between",
                height: 50,
              }}>
                <View>
                  <ToggleButton
                    buttonText={t('enable')}
                    outline={true}
                    disabled={notificationStatus !== "1"}
                    onPress={setNotificationStatus.bind(null, "1")}
                  />
                </View>
                <View>
                  <ToggleButton
                    buttonText={t('disable')}
                    outline={true}
                    disabled={notificationStatus !== "0"}
                    onPress={setNotificationStatus.bind(null, "0")}
                  />
                </View>
              </View>

              <View style={{ marginTop: 20, marginBottom: 10 }}>
                <TextButton
                  buttonText={t('save')}
                  outline={false}
                  disabled={notificationStatus === ""}
                  onPress={handleSaveNotificationStatus}
                />
              </View>
            </View>

            <View style={styles.section}>
              <AESText
                color={Colours.black}
                family={"Roboto-Regular"}
                size={16}
                content={t('store_battery_numbers')}
                containerStyle={{ marginBottom: 0, marginTop: 10 }}
              />

              {notificationNumbers.map((phoneNumber, i) => (
                <AESTextInput
                  key={`notnumber-${i}`}
                  title={null}
                  titleTextColoured={true}
                  placeholder={t('phone_number') + ' ' + (i + 1)}
                  enablePlaceholder={true}
                  value={phoneNumber}
                  onChangeText={onUpdateNotificationNumber.bind(null, i)}
                  keyboardType={'number-pad'}
                />
              ))
              }

              <View style={{ marginTop: 20, marginBottom: 10 }}>
                <TextButton
                  buttonText={t('save')}
                  outline={false}
                  disabled={!enableSaveNumbers()}
                  onPress={handleSaveNotificationNumbers}
                />
              </View>

            </View>

            <View style={styles.section}>
              <AESText
                color={Colours.black}
                family={'Roboto-Regular'}
                size={16}
                content={t('notification_sms')}
                containerStyle={{ marginBottom: -4, marginTop: 10 }}
              />

              <AESTextInput
                title={null}
                titleTextColoured={true}
                placeholder="e.g. Battery Low"
                enablePlaceholder={true}
                containerStyle={styles.textInputContainer}
                value={notificationMessage}
                onChangeText={text => setNotificationMessage(text)}
              />

              <View style={{ marginTop: 20, marginBottom: 10 }}>
                <TextButton
                  buttonText={t('save')}
                  outline={false}
                  disabled={notificationMessage === ''}
                  onPress={handleSaveMessage}
                />
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>

        <View style={styles.bottomContent}>
          <TextButton
            buttonText={t('delete_notifications')}
            outline={true}
            disabled={false}
            onPress={() => setShowDeleteModal(true)}
          />
        </View>
      </View>

      <ConfirmationModal
        visible={showDeleteModal}
        header={t('delete_notifications')}
        body={t('delete_notifications_confirm')}
        onPressClose={() => setShowDeleteModal(false)}
        cancelButtonText={t('no')}
        confirmButtonText={t('yes')}
        onPress={() => {
          SendSMSMessageWithUpdate(
            'The notification numbers have been deleted from site.',
            `${UserStore.sites[UserStore.activeSiteID].passcode}#91*#`,
            UserStore.sites[UserStore.activeSiteID].telephoneNumber,
            'notificationNumbers',
            [...defaultNotificationNumbers],
          ).then(res => {
            setNotificationNumbers([...defaultNotificationNumbers]);
            setShowDeleteModal(false);
          });
        }
        }
        warning={true}
      />

      <ConfirmationModal
        visible={showNotificationToolTip}
        header={title}
        body={languages.you_can_only_be_notified?.text ?? 'You can only be notified on devices if Relay 1 or Relay 2 is activated'}
        onPressClose={() => setShowNotificationToolTip(false)}
        confirmButtonText={t('close')}
        onPress={() => setShowNotificationToolTip(false)}
        warning={false}
      />
    </>
  );
};


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: Colours.white,
  },
  optionContainer: {
    flex: 1,
    marginBottom: 20,
  },
  section: {
    marginTop: 16,
  },
  bottomContent: {
    minHeight: '11%',
    paddingHorizontal: 30,
    paddingBottom: 25,
  },
});

export default BatteryNotifications;
