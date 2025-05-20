import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

const CrossIcon = ({
  style,
  color = 'black',
  size = 'medium',
  onPress = () => {},
}) => {
  let height, width;
  switch (size) {
    case 'small':
      height = 28.28 / 1.5;
      width = 2.83 / 1.5;
      break;
    case 'large':
      height = 28.28 * 1.5;
      width = 2.83 * 1.5;
      break;
    default:
      height = 28.28;
      width = 2.83;
  }
  return (
    <TouchableOpacity
      style={[
        styles.container,
        style && style,
        { width: height, height: height },
      ]}
      onPress={onPress}
      activeOpacity={0.7}>
      <View
        style={[
          styles.line1,
          { height: height, width: width, backgroundColor: color },
        ]}>
        <View
          style={[
            styles.line2,
            { height: height, width: width, backgroundColor: color },
          ]}
        />
      </View>
    </TouchableOpacity>
  );
};

export default CrossIcon;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  line1: {
    transform: [{ rotateZ: '45deg' }],
    borderRadius: 10,
  },
  line2: {
    position: 'absolute',
    transform: [{ rotateZ: '-90deg' }],
    borderRadius: 10,
  },
});
