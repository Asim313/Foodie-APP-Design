import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

// import aes from '../styles/colours';
import Colours from "../styles/colours";


const DayPickerUI = ({
  style,
  title,
  titleStyle,
  errorMsg,
  mode,
  onChange = () => {},
  initialValue = [],
}) => {
  const [daysList, setDaysList] = useState([
    { title: 'M', value: 'mon', selected: false },
    { title: 'T', value: 'tue', selected: false },
    { title: 'W', value: 'wed', selected: false },
    { title: 'T', value: 'thu', selected: false },
    { title: 'F', value: 'fri', selected: false },
    { title: 'S', value: 'sat', selected: false },
    { title: 'S', value: 'sun', selected: false },
  ]);

  const selectHandler = index => {
    const newList = [...daysList];
    newList[index].selected = !newList[index].selected;
    setDaysList(newList);
    const newValue = newList
      .filter(item => item.selected)
      .map(item => item.value);
    onChange(newValue);
  };

  useEffect(() => {
    const newDaysList = [...daysList];
    newDaysList.forEach((el, i) => {
      if (initialValue.includes(el.value)) {
        el.selected = true;
      }
    });
    setDaysList(newDaysList);
  }, []);

  return (
    <View style={style && style}>
      {title && (
        <Text style={[styles.title, titleStyle && titleStyle]}>{title}</Text>
      )}
      {errorMsg ? <Text style={styles.errorMsg}>{errorMsg}</Text> : <></>}
      <View style={styles.rowView}>
        {daysList.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dayView,
              {
                backgroundColor: item.selected ?  Colours[mode].primaryColour : '#fff',
              },
            ]}
            onPress={() => selectHandler(index)}>
            <Text
              style={{ fontSize: 16, color: item.selected ? '#fff' : '#000' }}>
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default DayPickerUI;

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  errorMsg: {
    textAlign: 'right',
    color: Colours.warning,
    fontWeight: 'bold',
    fontSize: 12,
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayView: {
    backgroundColor: Colours.default.primaryColour,
    height: 31,
    width: 31,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
