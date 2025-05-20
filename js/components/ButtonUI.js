import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

// import aes from 'constants/colors';

import Colours from "../styles/colours";

const ButtonUI = ({
  style,
  buttonStyle,
  title,
  variant = 'primary',
  color = Colours.default.primaryColour,
  fontSize = 14,
  fontColor,
  borderColor = Colours.default.primaryColour,
  weight = 'bold',
  compact = false,
  isBusy = false,
  showTick = false,
  icon,
  onPress = () => {},
  children,
}) => {
  const Icon = icon;
  if (!fontColor && variant === 'primary') {
    fontColor = 'white';
  } else if (!fontColor && variant !== 'primary') {
    fontColor = color;
  }
  return (
    <View style={style && style}>
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: variant === 'primary' ? color : '#ffffff00',
            borderColor: borderColor,
            borderWidth: variant !== 'text' ? 1.5 : 0,
            alignSelf: compact ? 'flex-start' : 'stretch',
          },
          buttonStyle && buttonStyle,
        ]}
        onPress={isBusy ? () => {} : onPress}
        activeOpacity={0.7}>
        <View style={styles.tickView}>
          {icon && <Icon />}
          {showTick && (
            <View
              style={[
                styles.tick,
                { borderColor: variant === 'primary' ? '#ffffff' : color },
              ]}
            />
            // <Image
            //   source={require('assets/icons/tickIcon.png')}
            //   style={styles.tick2}
            //   resizeMode="contain"
            //   tintColor={color}
            // />
          )}
        </View>
        <Text
          style={[
            styles.text,
            { fontSize: fontSize, color: fontColor, fontWeight: weight },
          ]}>
          {title}
        </Text>
        <View style={styles.isBusyView}>
          {isBusy && (
            <ActivityIndicator
              style={styles.activityIndicator}
              size="small"
              color={fontColor}
            />
          )}
        </View>
        {children}
      </TouchableOpacity>
    </View>
  );
};

export default ButtonUI;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  tickView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tick: {
    height: 20,
    width: 10,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    transform: [{ rotate: '45deg' }, { translateX: -5 }],
    position: 'absolute',
    right: 10,
  },
  tick2: {
    width: 20,
    position: 'absolute',
    right: 10,
  },
  text: {
    paddingVertical: 16,
  },
  isBusyView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityIndicator: {
    left: 10,
    position: 'absolute',
  },
});
