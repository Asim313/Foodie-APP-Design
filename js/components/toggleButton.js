import React, { Component, Fragment } from 'react'

import {
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Text,
    View
} from 'react-native'

import { Colours } from '../styles'
import UserStore from "../stores/SiteStore";

export default class toggleButton extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {

    const { buttonText, onPress, loading, disabled, outline,warning,color,onboarding, buttonStyle } = this.props
      // console.log(buttonText+" "+disabled)

      let { currentMode } = UserStore;

    function getBackgroundColour(){
        if(disabled){
            return Colours.lightGray;
        }else if(warning){
            return Colours.warning;
        }else if(onboarding){
            return Colours['default'].primaryColour;
        }
        else{
            return color?color:Colours[currentMode].primaryColour;
        }
    }

    return (
        <Fragment>
            {!outline &&
              <TouchableOpacity
                  style={[styles.defaultStyle, {backgroundColor: getBackgroundColour()}, buttonStyle]}
                  onPress={onPress}>
                  <Text style={styles.defaultTextStyle}>{buttonText}</Text>
              </TouchableOpacity>
            }
          {outline &&
          <TouchableOpacity
              style={[styles.outlineStyle, {borderColor: getBackgroundColour()}, buttonStyle]}
              onPress={onPress}>
              <Text style={[styles.outlineTextStyle,{color: getBackgroundColour()}]}>{buttonText}</Text>
          </TouchableOpacity>
          }
        </Fragment>
    )
  }
}

const styles = StyleSheet.create({
        defaultStyle: {
            flex:1,
            padding:15,
            borderRadius:5,
            minWidth:'47%',
            alignContent:'center',
            justifyContent: 'center',
            height:50,
        },
        defaultTextStyle: {
            color:Colours.white,
            fontSize:14,
            textAlign: 'center',
            fontFamily:'Roboto-Bold'
        },
        outlineStyle: {
            flex:1,
            padding:15,
            borderRadius:5,
            minWidth:'47%',
            alignContent:'center',
            justifyContent: 'center',
            borderWidth:1,
            backgroundColor:Colours.white,
            height:50
            // borderColor:Colours.darkBlue,
        },
        outlineTextStyle: {
            // color:Colours.darkBlue,
            fontSize:14,
            textAlign: 'center',
            fontFamily:'Roboto-Bold'
        },
});
