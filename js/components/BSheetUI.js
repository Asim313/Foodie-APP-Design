import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  withSpring,
  useAnimatedStyle,
  runOnJS,
} from 'react-native-reanimated';

import CrossIcon from '../../assets/images/icons/CrossIcon';

const BSheetUI = ({
  style,
  title,
  isActive = false,
  content = () => <View />,
  onRequestClose = () => {},
  keyboardAvoidOffset = 0,
}) => {
  const Content = content;
  const [isVisible, setVisible] = useState(isActive);
  const yCoordinate = useSharedValue(200);
  const animatedStyle = useAnimatedStyle(() => {
    return { transform: [{ translateY: yCoordinate.value }] };
  });

  useEffect(() => {
    if (isActive) {
      setVisible(true);
      yCoordinate.value = withSpring(20, { damping: 17, stiffness: 200 });
    } else {
      yCoordinate.value = withTiming(300, { duration: 200 }, () => {
        runOnJS(setVisible)(false);
      });
    }
  }, [yCoordinate, isActive, isVisible]);

  return (
    <View style={style && style}>
      <Modal
        onRequestClose={onRequestClose}
        transparent={true}
        visible={isVisible}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'position' : null}
          keyboardVerticalOffset={keyboardAvoidOffset}
          contentContainerStyle={{ flex: 1 }}
          style={{ flex: 1 }}>
          <View style={styles.layout}>
            <TouchableOpacity
              style={styles.backdrop}
              activeOpacity={1}
              onPress={onRequestClose}
            />
            <Animated.View style={[styles.box, animatedStyle]}>
              {title && <Text style={styles.title}>{title}</Text>}
              <Content />
              <CrossIcon
                style={styles.crossBtn}
                size="small"
                onPress={onRequestClose}
              />
            </Animated.View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

export default BSheetUI;

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(169,169,169,0.6)',
  },
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  box: {
    backgroundColor: 'white',
    padding: 25,
    paddingTop: 30,
    paddingBottom: 70,
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 10,
    marginRight: 20,
  },
  crossBtn: {
    position: 'absolute',
    right: 25,
    top: 30,
  },
});
