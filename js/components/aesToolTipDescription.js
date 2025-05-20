import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Animated, TouchableWithoutFeedback, Text, Image,TouchableOpacity } from 'react-native';
import * as Colours from "../styles/colours";
import UserStore from "../stores/SiteStore";
import TextButton from "./textButton";
import AESToast from "./aesToast";

export default class AESToolTipDescription extends React.Component {

    static show(title,description) {

        _tooltipToast.setState({
            display: true,
            title: title,
            description:description
        }, () => {

            Animated.parallel([
                Animated.timing(_tooltipToast.animateToast.opacity, {
                    toValue: 1,
                    duration: 250,
                    useNativeDriver: true
                }),
                Animated.timing(_tooltipToast.animateToast.translateY, {
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
            title: '',
            description:'',
            animateToast: 1
        }

        this.animateToast = {
            opacity: new Animated.Value(1),
            translateY: new Animated.Value(200)
        }

        _tooltipToast = this;

    }

    close() {

        Animated.parallel([
            Animated.timing(_tooltipToast.animateToast.opacity, {
                toValue: 0,
                duration: 250,
                useNativeDriver: true
            }),
            Animated.timing(_tooltipToast.animateToast.translateY, {
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

    render() {
        let { currentMode } = UserStore

        if (this.state.display) {
            return (
                <TouchableWithoutFeedback>
                    <View>

                        <View style={styles.container}>
                            <TouchableOpacity style={{height:1000}} onPress={() => this.close()}/>
                            <Animated.View
                                style={[styles.toast,{borderColor:Colours[currentMode].primaryColour}, {
                                    opacity: this.animateToast.opacity,
                                    transform: [{
                                        translateY: this.animateToast.translateY
                                    }]
                                }]}>
                                <View style={styles.toastHeader}>
                                    <Text style={styles.text}>{this.state.title}</Text>
                                    <TouchableOpacity onPress={() => this.close()}>
                                    <Image source={require('../../assets/images/header/modalClose.png')}/>
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.descriptionText}>{this.state.description}</Text>
                                <View style={{
                                    height:50,
                                }}>
                                    <TextButton
                                        buttonText={'Close'}
                                        outline={true}
                                        disabled={false}
                                        onPress={() => this.close()}
                                    />
                                </View>
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
        backgroundColor:'#00000030',
        alignSelf:'center',
    },
    toast: {
        backgroundColor: Colours.white,
        // padding: 15,
        borderRadius:20,
        paddingVertical:30,
        paddingHorizontal:25,
        height:275,
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
    descriptionText:{
        fontFamily:'Roboto-Regular',
        fontSize:14,
        marginBottom:20,
        color:Colours.black
    }
});
