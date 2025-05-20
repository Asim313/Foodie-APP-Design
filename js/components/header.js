import React, {
  Fragment
} from 'react'

import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  StatusBar, Text,
} from 'react-native';

import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Colours } from '../styles'
import UserStore from "../stores/SiteStore";
import {observer} from "mobx-react";

export default class Header extends React.Component {

  constructor(props) {
    super(props)
    this.state = { screenWidth: 0 }
  }

  componentDidMount() {

  }

  render() {

    const {
      headerText,
      leftButtonType,
      leftButtonOnPress,
      rightButtonType,
      rightButtonOnPress,
      style
    } = this.props

    let { currentMode } = UserStore;
    // console.log(style);
    // console.log(Colours[`${currentMode}`].primaryColour);
    //
    // console.log(rightButtonType);
    // console.log(rightButtonOnPress);

    // console.log(StaticSafeAreaInsets.safeAreaInsetsTop);

    return (
      <Fragment>
        <StatusBar barStyle="light-content" backgroundColor={Colours.black} />
        {/*<SafeAreaView mode="margin" style={{ height: 1, backgroundColor: 'red' }} />*/}
        {/*<View style={[style,{height: 50}]}/>*/}
          <View style={[style,styles.defaultStyle, {paddingTop: StaticSafeAreaInsets.safeAreaInsetsTop+10}]}>
          {/*<SafeAreaView style={{ flexDirection: 'row' }}>*/}
            <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center' }}>
              <View style={styles.sideContainer}>

                {leftButtonOnPress &&
                  <TouchableOpacity onPress={leftButtonOnPress} style={{ width:30 }}>
                    {leftButtonType === 'Back' &&
                      <Image source={require("../../assets/images/header/backArrow.png")} style={{tintColor:Colours.white}}/>
                    }
                  </TouchableOpacity>
                }

              </View>

              <View style={[styles.headerContainer]}>
                <Text adjustsFontSizeToFit numberOfLines={1} allowFontScaling style={styles.headerText}>{headerText}</Text>
              </View>

              <View style={[styles.sideContainer, { alignItems: 'flex-end' }]}>
                {rightButtonOnPress &&
                <TouchableOpacity onPress={rightButtonOnPress} style={{ width:30 }}>
                  {rightButtonType === 'Trash' &&
                  <Image source={require("../../assets/images/sites/trash.png")} style={{tintColor:Colours.white}}/>
                  }
                </TouchableOpacity>
                }
              </View>
            </View>
          {/*</SafeAreaView>*/}
        </View>
      </Fragment>

    )
  }
}

const styles = StyleSheet.create({
  defaultStyle: {
    // height: 105
    // flex:1,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    overflow: 'hidden',
    // paddingBottom: 20
    // paddingTop: 60,
    // paddingTop: Platform.OS === 'ios' ? 80 : 40,
    // height: Platform.OS === 'ios' ? 80 : 0,
    paddingBottom: 15,
    // height:80
  },

  headerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center'
  },

  headerText:  {
    color: Colours.white,
    fontSize: 20,
    textAlign:'center',
    fontFamily:'Roboto-Medium'
  },

  sideContainer: {
    width: 100,
    zIndex: 9999
  },

  absoluteImg: {
    position: 'absolute',
    tintColor: 'rgba(100, 100, 100, 0.1)',
    right: 0,
    top: 0,
    zIndex: -1
  }
});
