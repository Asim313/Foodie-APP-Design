import React, { Component } from 'react'

import { View } from 'react-native'
import StaticSafeAreaInsets from "react-native-static-safe-area-insets";

export default class BottomBarSpacer extends React.Component {
    render() {
        // console.log(StaticSafeAreaInsets.safeAreaInsetsBottom);
        return (
            <View/>
        // <View style={{height:StaticSafeAreaInsets.safeAreaInsetsBottom+80}}/>
        // <View style={{height:StaticSafeAreaInsets.safeAreaInsetsBottom+80}}/>
        )
    }
}

