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


import { SafeAreaView } from 'react-native-safe-area-context';
import { Colours } from '../styles'

export default class TransparentHeader extends React.Component {

    constructor(props) {
        super(props)
        this.state = { screenWidth: 0 }
    }

    componentDidMount() {

    }

    render() {
        let { height, width } = Dimensions.get('window');
        let { fillHeight,onPress } = this.props;
        return (
            <TouchableOpacity style={{position:'relative'}}
                onPress={onPress}
            >
                {/*<StatusBar barStyle="light-content" backgroundColor={Colours.black} />*/}
                {/*<StatusBar barStyle="light-content" backgroundColor={Colours.black} />*/}
                <View style={[styles.defaultStyle,{minHeight: fillHeight-50,backgroundColor:`${Colours.gray}50`}]}>
                </View>
                {/*<View style={{position:'absolute',right:0,left:0,bottom:0,height: 30,backgroundColor:Colours.white,borderTopEndRadius:15,borderTopStartRadius:15}}/>*/}
            </TouchableOpacity>

        )
    }
}

const styles = StyleSheet.create({
    defaultStyle: {
        // backgroundColor:'transparent',
        // maxHeight: 1000,
        // flex:1,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        overflow: 'hidden',
        paddingBottom: 20
    },

    titleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleText:  {
        color: Colours.white,
        fontSize: 18,
        fontFamily: 'gameofthrones',
        textAlign:'center' },
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
