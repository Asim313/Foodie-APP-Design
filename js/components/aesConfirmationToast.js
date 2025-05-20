import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Animated, TouchableWithoutFeedback, Text, Image,TouchableOpacity } from 'react-native';
import * as Colours from "../styles/colours";
import UserStore from "../stores/SiteStore";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import AESTextInput from "./aesTextInput";
import TextButton from "./textButton";

export default class AESConfirmationToast extends React.Component {

    static show(header,body,textInput,onPress,cancelButtonText,confirmButtonText,warning,onChangeText) {

        _confirmationToast.setState({
            display: true,
            header: header,
            body: body,
            textInput:textInput,
            cancelButtonText: cancelButtonText,
            confirmButtonText: confirmButtonText,
            onPress:onPress,
            warning:warning,
            onChangeText:onChangeText
        }, () => {

            Animated.parallel([
                Animated.timing(_confirmationToast.animateToast.opacity, {
                    toValue: 1,
                    duration: 250,
                    useNativeDriver: true
                }),
                Animated.timing(_confirmationToast.animateToast.translateY, {
                    toValue: 0,
                    duration: 250,
                    useNativeDriver: true
                })
            ]).start(() => {

                // Auto close after 2 seconds
                // setTimeout(() => {
                //     _toast.close();
                // }, 2000)

            });

        })

    }

    constructor(props, context) {

        super(props, context);

        this.state = {
            display: false,
            header: '',
            body: '',
            textInput: '',
            cancelButtonText: '',
            confirmButtonText: '',
            warning:false,
            onPress: null,
            animateToast: 1
        }

        this.animateToast = {
            opacity: new Animated.Value(1),
            translateY: new Animated.Value(200)
        }

        _confirmationToast = this;

    }

    close() {

        Animated.parallel([
            Animated.timing(_confirmationToast.animateToast.opacity, {
                toValue: 0,
                duration: 250,
                useNativeDriver: true
            }),
            Animated.timing(_confirmationToast.animateToast.translateY, {
                toValue: 200,
                duration: 250,
                useNativeDriver: true
            })
        ]).start(() => {

            this.setState({
                display: false
            })

        });

    }

    getIcon(){
        switch(this.state.icon){
            case 'passcode': return require('../../assets/images/notifications/passcode.png');
            default: return require('../../assets/images/notifications/passcode.png');
        }
    }

    render() {
        let { currentMode } = UserStore
        if (this.state.display) {
            return (
                <TouchableWithoutFeedback>
                    <View>

                        <View style={styles.container}>
                            <TouchableOpacity style={{height:600}} onPress={() => this.close()}/>
                            <Animated.View
                                style={[styles.toast,{borderColor:Colours[currentMode].primaryColour}, {
                                    opacity: this.animateToast.opacity,
                                    transform: [{
                                        translateY: this.animateToast.translateY
                                    }]
                                }]}>
                                <View style={styles.toastHeader}>
                                    <Text style={styles.text}>{this.state.header}</Text>
                                    <TouchableOpacity onPress={() => this.close()}>
                                    <Image source={require('../../assets/images/header/modalClose.png')}/>
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.bodyText}>{this.state.body}</Text>
                                {this.state.textInput &&
                                    <View>
                                    <AESTextInput
                                        titleTextColoured={true}
                                        placeholder={'0044 1234 567890'}
                                        warning={this.state.warning}
                                        onChangeText={()=>this.state.onChangeText}
                                        keyboardType={'number-pad'}
                                    />
                                    </View>
                                }

                                {this.state.cancelButtonText.length > 0 &&
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'stretch',
                                    justifyContent: 'space-between',
                                    height: 50,
                                    marginTop: 20
                                }}>
                                    <View>
                                        <TextButton
                                            buttonText={this.state.cancelButtonText}
                                            outline={true}
                                            disabled={false}
                                            warning={this.state.warning}
                                            onPress={() => this.close()}
                                        />
                                    </View>
                                    <View>
                                        <TextButton
                                            buttonText={this.state.confirmButtonText}
                                            outline={false}
                                            disabled={false}
                                            warning={this.state.warning}
                                            onPress={this.state.onPress}
                                        />
                                    </View>
                                </View>
                                }
                                {!this.state.cancelButtonText.length > 0 &&
                                <View style={{
                                    flexDirection: 'row',
                                    height: 50,
                                    marginTop: 20
                                }}>
                                    <View style={{width:'100%'}}>
                                        <TextButton
                                            buttonText={this.state.confirmButtonText}
                                            outline={false}
                                            disabled={false}
                                            warning={this.state.warning}
                                            onPress={this.state.onPress}
                                        />
                                    </View>
                                </View>
                                }
                            </Animated.View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            )
        }
        else {

            return (
                <View />
            )
        }

    }

}

const styles = StyleSheet.create({
    container: {

        // height: '100%',
        position: 'absolute',
        bottom: 0,
        // top:0,
        // right:0,
        // left:0,
        width:'100%',
        backgroundColor:'#00000050',
        alignSelf:'center',
    },
    toast: {
        backgroundColor: Colours.white,
        // padding: 15,
        borderRadius:20,
        paddingVertical:30,
        paddingHorizontal:25,
        height:300,
        // flexDirection:'row',
        // alignContent:'center',
        // justifyContent:'center',
    },
    toastHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent:'center',
        width:'100%',
        marginBottom:20
    },
    text: {
        color: Colours.black,
        fontSize: 20,
        fontFamily:'Roboto-Bold',
    },
    toastIcon:{
        alignSelf:'center'
    },
    bodyText:{
        fontFamily:'Roboto-regular',
        fontSize:14,
        color:Colours.black
    }
});
