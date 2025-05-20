import React, { Component, Fragment } from 'react';
import { StatusBar, StyleSheet, View, ScrollView, Linking, Text, Image, TouchableOpacity, SafeAreaView, TextInput, ActivityIndicator } from 'react-native';
import { CommonActions } from '@react-navigation/native';

import SplashScreen from 'react-native-splash-screen'
import * as Colours from "../styles/colours";

class Initialising extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    SplashScreen.hide();
    setTimeout(() => {

      this.props.navigation.reset({
        index: 0,
        routes: [
          {
            name: 'Home',
          }
        ],
      });
    }, 100);
  }


  render() {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colours.white }}>
        <ActivityIndicator size="large" color={Colours.black} />
      </SafeAreaView>
    );
  }
}

export default Initialising;
