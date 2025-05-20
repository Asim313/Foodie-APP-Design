// import React, { Component } from 'react';
// import { BottomTabBar } from 'react-navigation-tabs';
//
// // create a component
// class CustomTabBar extends Component {
//     render() {
//         return (
//             <BottomTabBar
//                 {...this.props}
//                 style={{ backgroundColor: 'green' }} // Replace with theme color. You should use observing variable from MobX or Redux.
//             />
//         );
//     }
// }
//
// //make this component available to the app
// export default CustomTabBar;


import React from 'react';
import {View,Text,Image,Platform,TouchableOpacity,StyleSheet} from 'react-native';
import UserStore from "../stores/SiteStore";
import {Colours} from "../styles";

function getImage(name){
    switch(name){
        case 'Home': return require('../../assets/images/tabs/home.png');
        case 'Accueil': return require('../../assets/images/tabs/home.png');
        // case 'Zuhause': return require('../../assets/images/tabs/home.png');
        case 'Status': return require('../../assets/images/tabs/status.png');
        case 'Settings': return require('../../assets/images/tabs/settings.png');
    }

}

const CustomTabBar = ({state, navigation, ...props}) => {
    const {routes = [], index: activeIndex} = state;
    let { currentMode } = UserStore;
    return (
        <View style={styles.container}>
            <View style={styles.tabContainer}>
                {routes.map((it, index) => {
                    return (
                        <View key={`settings_contaienr_${index}`}>
                            <TouchableOpacity
                                key={`settings_button_${index}`}
                                onPress={() => {
                                    navigation.jumpTo(it.name);
                                }}
                                style={[
                                    styles.tabButton
                                ]}>
                                <Image
                                    key={`settings_icon_${index}`}
                                    source={getImage(it.name)}
                                    style={[styles.imageIcon,{tintColor:Colours[currentMode].primaryColour}]}
                                />
                                <Text key={`settings_text_${index}`} >{it.name}</Text>
                            </TouchableOpacity>
                        </View>
                    );
                })}
            </View>
        </View>
    );
};
export default CustomTabBar;
const styles = StyleSheet.create({
    tabButton: {
        flex: 1,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'blue',
        // borderBottomColor: 'red',
    },
    tabContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    imageIcon: {
        width: 50,
        height: 50,
        resizeMode: 'contain'
    },
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        height: 64,
        paddingHorizontal: 16,
        backgroundColor: 'white',
        paddingBottom: Platform.OS === 'ios' ? 15 : 0,
    },
});
