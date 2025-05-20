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

const PickerUI = ({
  style,
  label,
  modalTitle = 'Select Time',
  value,
  list,
  suffix,
  placeholder,
  onChange = () => {},
  errorMsg,
  mode = 'pro',
}) => {
  const [isOpen, setOpen] = useState(false);
  const [newValue, setNewValue] = useState(value);

  const onOKPress = () => {
    if (newValue) {
      onChange(newValue);
    } else {
      onChange(list[0]);
    }
    setOpen(false);
  };
  const onCancelPress = () => {
    setOpen(false);
  };

  let { currentMode } = UserStore;

  return (
    <View style={[styles.container, style && style]}>
      {errorMsg ? <Text style={styles.errMsg}>{errorMsg}</Text> : <></>}
      <View style={styles.labelFieldView}>
        {label ? <Text style={styles.label}>{label}</Text> : <></>}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setOpen(true)}
          style={[styles.valueView, {borderColor: Colours[currentMode].primaryColour}]}>
          <Text style={value ? styles.valueText : styles.placeholderText}>
            {value ? value : placeholder}
          </Text>
          <Text style={styles.valueText}>{suffix}</Text>
        </TouchableOpacity>
      </View>
      <BSheetUI
        title={modalTitle}
        isActive={isOpen}
        onRequestClose={() => setOpen(false)}
        content={() => (
          <View>
            <View style={styles.pickersView}>
              <Picker
                style={{ backgroundColor: '#fff', flex: 1 }}
                selectedValue={newValue}
                pickerData={list}
                onValueChange={val => setNewValue(val)}
                itemSpace={30}
              />
              {Platform.OS === 'android' && (
                <View style={styles.highlighterView} pointerEvents="none">
                  <View style={styles.highlighter} />
                </View>
              )}
            </View>
            <View style={styles.buttonsView}>
              <ButtonUI style={{ flex: 1 }} title="OK" onPress={onOKPress}  color={Colours[currentMode].primaryColour} borderColor={Colours[currentMode].primaryColour} />
              <ButtonUI
                style={{ flex: 1, marginLeft: 10 }}
                title="Cancel"
                variant="secondary"
                onPress={onCancelPress}
                color={Colours[currentMode].primaryColour}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default PickerUI;

const styles = StyleSheet.create({
  container: {},
  errMsg: {
    textAlign: 'right',
    color: Colours.warning,
    fontWeight: 'bold',
    fontSize: 12,
    paddingBottom: 5,
  },
  labelFieldView: {
    display: 'flex',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingBottom: 8,
  },
  valueView: {
    padding: 10,
    minWidth: 60,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    width: '100%',
    backgroundColor: 'grey',
    opacity: 0.1,
    borderRadius: 10,
  },
});
