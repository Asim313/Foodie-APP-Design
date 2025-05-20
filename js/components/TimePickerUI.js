import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Picker } from 'react-native-wheel-pick';

import Colours from "../styles/colours";
import BSheetUI from "./BSheetUI";
import ButtonUI from "./ButtonUI";
import UserStore from "../stores/SiteStore";

const hoursList = new Array(24)
  .fill(null)
  .map((_, i) => i.toString())
  .map(el => (el.length < 2 ? '0' + el : el));
const minsList = new Array(60)
  .fill(null)
  .map((_, i) => i.toString())
  .map(el => (el.length < 2 ? '0' + el : el));

const TimePickerUI = ({
  style,
  label,
  value,
  onChange = () => {},
  errorMsg,
  mode = 'pro',
}) => {
  const [isOpen, setOpen] = useState(false);
  const [hour, setHour] = useState(value ? value.slice(0, 2) : '00');
  const [min, setMin] = useState(value ? value.slice(2) : '00');

  const onOKPress = () => {
    const newValue = hour + min;
    onChange(newValue);
    setOpen(false);
  };
  const onCancelPress = () => {
    if (value) {
      setHour(value.slice(0, 2));
      setMin(value.slice(2));
    }
    setOpen(false);
  };

  let { currentMode } = UserStore;

  return (
    <View style={[styles.container, style && style]}>
      <Text style={styles.errMsg}>{errorMsg}</Text>
      <View style={styles.labelFieldView}>
        <Text style={styles.label}>{label}</Text>
        <TouchableOpacity
          onPress={() => setOpen(true)}
          style={[styles.valueView, {borderColor: Colours[currentMode].primaryColour}]}>
          <Text style={value ? styles.valueText : styles.placeholderText}>
            {value ? value : '24hr'}
          </Text>
        </TouchableOpacity>
      </View>
      <BSheetUI
        title="Select Time"
        isActive={isOpen}
        onRequestClose={() => setOpen(false)}
        content={() => (
          <View>
            <View style={styles.pickersView}>
              <Picker
                style={{ backgroundColor: '#fff', flex: 1 }}
                selectedValue={hour}
                pickerData={hoursList}
                onValueChange={newValue => setHour(newValue)}
                itemSpace={30}
              />
              <Text style={styles.text}>:</Text>
              <Picker
                style={{ backgroundColor: '#fff', flex: 1 }}
                selectedValue={min}
                pickerData={minsList}
                onValueChange={newValue => setMin(newValue)}
                itemSpace={30}
              />
              {Platform.OS === 'android' && (
                <View style={styles.highlighterView} pointerEvents="none">
                  <View style={styles.highlighter} />
                  <View style={styles.highlighter} />
                </View>
              )}
            </View>
            <View style={styles.buttonsView}>
              <ButtonUI style={{ flex: 1 }} title="OK" onPress={onOKPress} color={Colours[currentMode].primaryColour} borderColor={Colours[currentMode].primaryColour} />
              <ButtonUI
                style={{ flex: 1, marginLeft: 10 }}
                title="Cancel"
                variant="secondary"
                onPress={onCancelPress}
                color={Colours[currentMode].primaryColour} borderColor={Colours[currentMode].primaryColour}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default TimePickerUI;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
  },
  errMsg: {
    textAlign: 'right',
    color: Colours.warning,
    fontWeight: 'bold',
    fontSize: 12,
    paddingBottom: 5,
  },
  labelFieldView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontWeight: '400',
    fontSize: 16,
  },
  valueView: {
    padding: 10,
    borderRadius: 7,
    minWidth: 60,
    borderBottomWidth: 1,
  },
  valueText: {
    fontSize: 16,
    padding: 0,
    height: 20,
    color: 'black',
  },
  placeholderText: {
    fontSize: 16,
    padding: 0,
    height: 20,
    color: 'grey',
  },
  pickersView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 28,
  },
  buttonsView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  highlighterView: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  highlighter: {
    height: 40,
    width: '40%',
    backgroundColor: 'grey',
    opacity: 0.1,
    borderRadius: 10,
  },
  textInput:{
    color:Colours.black,
    fontSize:16,
    fontFamily:'Roboto-Regular',
    borderBottomWidth: 1,
    paddingBottom:10
  },
});
