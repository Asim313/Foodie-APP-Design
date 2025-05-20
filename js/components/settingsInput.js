import React, { Component } from 'react'

import {
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Text,
    View
} from 'react-native'

import { Colours } from '../styles'

export default class SettingsInput extends React.Component {

  constructor(props) {
    super(props)
  }

  hideText(text){
      return new Array(text.length + 1).join('*');
  }

  formatByType(type,text){
      switch(type){
          case 'time': return `${text} seconds`;
          default: return text;
      }
  }

  render() {
      let {value, type, onPress, visible } = this.props;

    return (
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <View>
                <Text style={styles.textInput}>{visible? value:this.hideText(value)}</Text>
            </View>
            <TouchableOpacity onPress={onPress}>
                <Text style={styles.textInput}>Edit</Text>
            </TouchableOpacity>
        </View>
    )
  }
}

const styles = StyleSheet.create({
});
