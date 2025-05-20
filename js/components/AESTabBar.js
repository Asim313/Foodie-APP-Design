import React, { Fragment,Component } from 'react'

import {Image, Keyboard, Platform, TouchableWithoutFeedback, View} from 'react-native'
import StaticSafeAreaInsets from "react-native-static-safe-area-insets";
import Colours from "../styles/colours";
import {observer} from "mobx-react";
import {observable} from "mobx";

@observer
export default class AESTabBar extends React.Component {
    @observable keyboardVisible=false;

    componentWillMount () {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    _keyboardDidShow(){
        this.keyboardVisible=true;
    }

    _keyboardDidHide(){
        this.keyboardVisible=false;
    }

    componentWillUnmount () {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    getTabIcon(tab){
        switch(tab){
            case 'Home'    :        return require('../../assets/images/tabs/home.png');break;
            case 'Accueil'    :     return require('../../assets/images/tabs/home.png');break;
            // case 'Zuhause':         return require('../../assets/images/tabs/home.png');break;

            case 'Status'   :       return require('../../assets/images/tabs/status.png');break;
            case 'Settings' :       return require('../../assets/images/tabs/settings.png');break;
        }
    }

    DynamicTabBar({ state, descriptors, navigation }) {
        // DynamicTabBar({ state, descriptors, navigation }) {
        //
        // const { state, descriptors, navigation } = this.props
        // let visible=true;
        // console.log(Dimensions.get('window').height)
        // console.log(state.routes[0].key)
        // state.routes.forEach(keyRoute=>{
        //         descriptors[keyRoute.key].options.keyboardHidesTabBar=true;
        // })
        // console.log(state.routes)
        // let firstKey=state.routes;
        // let keyList=Object.keys(state.routes);
        // console.log(keyList);
        // keyList.forEach(keyRoute=>{
        //     // descriptors
        //     descriptors[keyRoute.key].options.keyboardHidesTabBar=true;
        // })
        // descriptors[firstKey].options.keyboardHidesTabBar=true;
        // let tabBarHeight=0;

        let keyboardEventListeners;
        if (Platform.OS === 'android') {
            keyboardEventListeners = [
                Keyboard.addListener('keyboardDidShow', () => {
                    visible = false
                }),
                Keyboard.addListener('keyboardDidHide', () => {
                    visible = true
                }),
            ];
        }
        return (

            // <View onLayout={(event) => {
            //         let {x, y, width, height} = event.nativeEvent.layout;
            //         tabBarHeight=height;
            //         console.log({tabBarHeight});
            //     }}
            //       style={{position: 'absolute',bottom:0,width:'100%',elevation:100}}>
            <View
                // onLayout={(event) => {
                //     let {x, y, width, height} = event.nativeEvent.layout;
                //     tabBarHeight=height;
                //     console.log({tabBarHeight});
                // }}
                // style={{position: 'absolute',top:Dimensions.get('window').height-(60+(StaticSafeAreaInsets.safeAreaInsetsBottom)),width:'100%',elevation:100}}
            >



                <View style={{
                    flexDirection: 'row',
                    borderWidth:Platform.OS==='android'?1:0,
                    borderBottomWidth:0,
                    backgroundColor: Colours.white,
                    borderColor:Colours.lightGray,
                    height:70,
                    // borderTopWidth:2,
                    borderTopEndRadius:25,
                    borderTopStartRadius:25,
                    // height: StaticSafeAreaInsets.safeAreaInsetsBottom+30,
                    // width:Dimensions.get('window').width+4,
                    justifyContent: 'center',
                    // marginBottom:StaticSafeAreaInsets.safeAreaInsetsBottom,
                    // paddingBottom:StaticSafeAreaInsets.safeAreaInsetsBottom,

                    shadowColor: Colours.lightGray,
                    shadowOffset: { width: 0, height: -1 },
                    shadowOpacity: 1,
                    // shadowRadius: 5,
                    // elevation: 10,
                }}>
                    <View style={{width:'80%',flexDirection: 'row',justifyContent:'space-between',marginTop: 10,}}>
                        {state.routes.map((route, index) => {
                            const {options} = descriptors[route.key];
                            options.keyboardHidesTabBar=true;
                            const label =
                                options.tabBarLabel !== undefined
                                    ? options.tabBarLabel
                                    : options.title !== undefined
                                    ? options.title
                                    : route.name;

                            const isFocused = state.index === index;

                            const onPress = () => {
                                const event = navigation.emit({
                                    type: 'tabPress',
                                    target: route.key,
                                });

                                if (!isFocused && !event.defaultPrevented) {
                                    navigation.navigate(route.name);
                                }
                            };

                            return (
                                <TouchableWithoutFeedback
                                    key={`${index}${route.key}`}
                                    accessibilityRole="button"
                                    accessibilityStates={isFocused ? ['selected'] : []}
                                    accessibilityLabel={options.tabBarAccessibilityLabel}
                                    testID={options.tabBarTestID}
                                    onPress={onPress}
                                    style={{
                                        // flex: 1,
                                        // marginTop: 10,
                                        // paddingTop: 10,
                                        alignItems: 'center',
                                        justifyContent:'flex-end',
                                    }}
                                >
                                    <Image source={this.getTabIcon(label)} style={{
                                        tintColor:isFocused? Colours.darkGray: Colours.gray
                                    }}/>
                                </TouchableWithoutFeedback>
                            );
                        })}
                    </View>
                </View>
                {/*<View style={{height:StaticSafeAreaInsets.safeAreaInsetsBottom/2, backgroundColor:Colours.white}}/>*/}
            </View>
        );
    }

    render() {
        // console.log(StaticSafeAreaInsets.safeAreaInsetsBottom);
        // console.log(this.props);
        return (
            <Fragment>
            {this.DynamicTabBar(this.props.data)}
            </Fragment>
        )
    }
}

