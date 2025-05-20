import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import SettingsLayout from "../../../components/settingsLayout";
import UserStore from "../../../stores/SiteStore";
import LanguagesStore from "../../../stores/LanguageStore";
import ConfirmationModal from "../../../components/confirmationModal";
import AESText from "../../../components/aesText";
import Colours from "../../../styles/colours";
import AESTextInput from "../../../components/aesTextInput";
import DayPickerUI from "../../../components/DayPickerUI";
import TimePickerUI from "../../../components/TimePickerUI";
import TextButton from "../../../components/textButton";
import { SendSMSMessage } from "../../../utils/SMS";
import { useTranslation } from 'react-i18next';


const TimeRestrictedCallerID = ({ navigation }) => {
  const { currentMode } = UserStore;
  const { languages } = LanguagesStore;
  const titleText = "Time Restricted Caller ID";
  const { t, i18n } = useTranslation();
  const [showToolTip, setShowToolTip] = useState(false);
  const [data, setData] = useState({
    callerId: "",
    days: [],
    fromTime: "",
    toTime: "",
  });

  const updateField = (key, value) => {
    setData(prevState => {
      return { ...prevState, [key]: value };
    });
  };

  const saveEnabled = () => {
    const { callerId, days, fromTime, toTime } = data;
    return callerId !== '' && days.length > 0 && fromTime !== '' && toTime !== '';
  };

  const handleSave = () => {
    const { callerId, days, fromTime, toTime } = data;
    const dayString = days.join(',');

    SendSMSMessage(
      `Time Restricted Caller ID has been set`,
      `${UserStore.sites[UserStore.activeSiteID].passcode}#72#${dayString}#${fromTime},${toTime}#${callerId}#`,
      UserStore.sites[UserStore.activeSiteID].telephoneNumber,
    );

  };

  return (
    <SettingsLayout title={t('time_restricted_caller_id')} mode={currentMode}>
      <View style={styles.optionContainer}>
        <View style={styles.subheadingContainer}>
          <AESText
            color={Colours.black}
            family={"Roboto-Medium"}
            size={16}
            content={t('time_restricted_caller_id')}
          />
          <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={() => setShowToolTip(true)}
          >
            <Image style={{ tintColor: Colours[currentMode].primaryColour }}
                   source={require("../../../../assets/images/icons/infoButton.png")} />
          </TouchableOpacity>
        </View>
        <AESText
          color={Colours.black}
          family={"Roboto-Regular"}
          size={16}
          content={t('restricted_caller_id_message')}
          containerStyle={{ marginTop: 10 }}
        />
        <AESTextInput
          title={t('caller_id')}
          titleTextColoured={true}
          placeholder={"0044 1234 567890"}
          value={data.callerId}
          onChangeText={text => {
            updateField("callerId", text.replace(/\D/g, ""));
          }}
          keyboardType={"number-pad"}
          containerStyle={{ marginTop: 10 }}
        />

        <AESText
          color={Colours.black}
          family={"Roboto-Medium"}
          size={16}
          content={t('select_days_time')}
          containerStyle={{ marginTop: 20 }}
        />

        <AESText
          color={Colours.black}
          family={"Roboto-Regular"}
          size={16}
          content={t('select_caller_id_days')}
          containerStyle={{ marginVertical: 10 }}
        />

        <DayPickerUI
          style={styles.dayPicker}
          value={data.days}
          mode={currentMode}
          errorMsg={null}
          initialValue={data.days}
          onChange={updateField.bind(null, "days")}
        />

        <TimePickerUI
          label={t('from')}
          errorMsg={null}
          value={data.fromTime}
          onChange={updateField.bind(null, "fromTime")}
        />

        <TimePickerUI
          label={t('to')}
          errorMsg={null}
          value={data.toTime}
          onChange={updateField.bind(null, "toTime")}
        />

        <View style={{ marginTop: 20, marginBottom: 10 }}>
          <TextButton
            buttonText={t('save')}
            outline={false}
            disabled={!saveEnabled()}
            onPress={handleSave}
          />
        </View>


      </View>

      <ConfirmationModal
        visible={showToolTip}
        header={titleText}
        body={"Time restricted caller id numbers are numbers that allow people to open the gate on certain days between" +
          " the defined times. Note: if the time has passed the 'From' time it will start once it hits that time the next day."}
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
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default TimeRestrictedCallerID;
