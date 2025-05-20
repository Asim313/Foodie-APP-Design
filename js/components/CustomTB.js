import React, { useEffect, useState } from 'react';
import { Platform, Keyboard, View, TouchableWithoutFeedback, Image } from 'react-native';
import { BottomTabBar } from '@react-navigation/bottom-tabs';
import Colours from "../styles/colours";
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';

const getTabIcon = (tab) => {
    switch (tab) {
        case 'Home': return require('../../assets/images/tabs/home.png'); break;
        case 'Accueil': return require('../../assets/images/tabs/home.png'); break;
        case 'Zuhause': return require('../../assets/images/tabs/home.png'); break;
        case 'Status': return require('../../assets/images/tabs/status.png'); break;
        case 'Settings': return require('../../assets/images/tabs/settings.png'); break;
    }
}

const CustomTB = props => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        let keyboardEventListeners;
        if (Platform.OS === 'android') {
            keyboardEventListeners = [
                Keyboard.addListener('keyboardDidShow', () => setVisible(false)),
                Keyboard.addListener('keyboardDidHide', () => setVisible(true)),
            ];
        }
        return () => {
            if (Platform.OS === 'android') {
                keyboardEventListeners &&
                    keyboardEventListeners.forEach(eventListener => eventListener.remove());
            }
        };
    }, []);

    const render = () => {
        const { state, descriptors, navigation } = props;
        if (Platform.OS === 'ios') {
            // return <BottomTabBar {...props} />;
            return (
                <View>
                    <View style={{
                        flexDirection: 'row',
                        borderWidth: 0,
                        backgroundColor: Colours.white,
                        borderColor: Colours.lightGray,
                        height: 60,
                        borderTopEndRadius:25,
                        borderTopStartRadius: 25,
                        justifyContent: 'center',
                        shadowColor: Colours.lightGray,
                        shadowOffset: { width: 0, height: -1 },
                        shadowOpacity: 1,
                        shadowRadius: 8,
                        elevation: 10,
                    }}>
                        <View style={{ width: '80%', flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, }}>
                            {state.routes.map((route, index) => {
                                const { options } = descriptors[route.key];
                                options.keyboardHidesTabBar = true;
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
                                            justifyContent: 'flex-end',
                                        }}
                                    >
                                        <Image source={getTabIcon(label)} style={{
                                            tintColor: isFocused ? Colours.darkGray : Colours.gray
                                        }} />
                                    </TouchableWithoutFeedback>
                                );
                            })}
                        </View>
                    </View>
                    <View style={{ height: StaticSafeAreaInsets.safeAreaInsetsBottom / 2, backgroundColor: Colours.white }} />
                </View>
            )
        }
        if (!visible) return null;
        // return <BottomTabBar {...props} />;
        return (
            <View>
                <View style={{
                    flexDirection: 'row',
                    borderWidth: 0,
                    backgroundColor: Colours.white,
                    borderColor: Colours.lightGray,
                    height: 60,
                    borderTopEndRadius: 25,
                    borderTopStartRadius: 25,
                    justifyContent: 'center',
                    elevation: 10,
                }}>
                    <View style={{ width: '80%', flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                        {state.routes.map((route, index) => {
                            const { options } = descriptors[route.key];
                            options.keyboardHidesTabBar = true;
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
                                        justifyContent: 'flex-end',
                                    }}
                                >
                                    <Image source={getTabIcon(label)} style={{
                                        tintColor: isFocused ? Colours.darkGray : Colours.gray
                                    }} />
                                </TouchableWithoutFeedback>
                            );
                        })}
                    </View>
                </View>
                {/*<View style={{height:StaticSafeAreaInsets.safeAreaInsetsBottom/2, backgroundColor:Colours.white}}/>*/}
            </View>
        )
    };

    return render();
};

export default CustomTB;
