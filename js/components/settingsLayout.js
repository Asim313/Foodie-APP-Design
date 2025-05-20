import React from 'react';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Header from "./header";
import Colours from "../styles/colours";
import CurrentSiteHeader from "./currentSiteHeader";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";


const SettingsLayout = ({children, title, mode}) => {
  const navigation = useNavigation();
  return (
      <>
        <Header
          leftButtonOnPress={() => {
            navigation.goBack();
          }}
          leftButtonType={'Back'}
          headerText={title}
          style={{ backgroundColor: Colours[mode].primaryColour }}
        />
        <KeyboardAwareScrollView style={{ backgroundColor: Colours.white }}>
          <View style={styles.container}>
            <CurrentSiteHeader />
            {children}
          </View>
        </KeyboardAwareScrollView>
      </>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
  },
});


export  default SettingsLayout;
