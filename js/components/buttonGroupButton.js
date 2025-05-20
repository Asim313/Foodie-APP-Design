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

export default class ButtonGroupButton extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {

    const { buttonText, onPress, loading, disabled, outline,warning,color,onboarding,left, rounded } = this.props
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
                  style={[left?styles.defaultStyleLeft:styles.defaultStyleRight,
                      rounded?
                          left?{borderTopStartRadius:50,borderBottomStartRadius:50}:{borderTopEndRadius:50,borderBottomEndRadius:50}:
                          left?{borderTopStartRadius:5,borderBottomStartRadius:5}:{borderTopEndRadius:5,borderBottomEndRadius:5},
                      {backgroundColor: getBackgroundColour()}]}
                  onPress={onPress} disabled={disabled}>
                  {loading &&
                  <ActivityIndicator size="small" color={Colours.white}/>
                  }
                  {!loading &&
                  <Text style={styles.defaultTextStyle}>{buttonText}</Text>
                  }
              </TouchableOpacity>
            }
          {outline &&
          <TouchableOpacity
              style={[left?styles.outlineStyleLeft:styles.outlineStyleRight,
                  rounded?
                      left?{borderTopStartRadius:50,borderBottomStartRadius:50}:{borderTopEndRadius:50,borderBottomEndRadius:50}:
                      left?{borderTopStartRadius:5,borderBottomStartRadius:5}:{borderTopEndRadius:5,borderBottomEndRadius:5},
                  {borderColor: getBackgroundColour()}]}
              onPress={onPress} disabled={disabled}>
              {loading &&
              <ActivityIndicator size="small" color={getBackgroundColour()}/>
              }
              {!loading &&
              <Text style={[styles.outlineTextStyle,{color: getBackgroundColour()}]}>{buttonText}</Text>
              }
          </TouchableOpacity>
          }
        </Fragment>
    )
  }
}

const styles = StyleSheet.create({
    defaultStyleLeft: {
        flex:1,
        padding:15,
        minWidth:'50%',
        alignContent:'center',
        justifyContent: 'center',
        height:50,
    },
    defaultStyleRight: {
        flex:1,
        padding:15,
        minWidth:'50%',
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
    outlineStyleLeft: {
        flex:1,
        padding:15,
        minWidth:'50%',
        alignContent:'center',
        justifyContent: 'center',
        borderWidth:1,
        backgroundColor:Colours.white,
        height:50
        // borderColor:Colours.darkBlue,
    },
    outlineStyleRight: {
        flex:1,
        padding:15,
        minWidth:'50%',
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
