import React, { Component, Fragment } from 'react';
import { StyleSheet, View, Dimensions, Animated, TouchableWithoutFeedback, Text, Image,TouchableOpacity } from 'react-native';
import * as Colours from "../styles/colours";
import UserStore from "../stores/SiteStore";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import AESTextInput from "./aesTextInput";
import TextButton from "./textButton";
import Modal from "react-native-modal";
import {observable} from "mobx";
import {validatePasscode, validateTelephoneNumber} from "../utils/validation";
import {SendSMSMessage, SendSMSMessageWithUpdate} from "../utils/SMS";
import {observer} from "mobx-react";

@observer
export default class DeleteSingleConfirmationModal extends React.Component {


    constructor(props) {
        super(props)
        this.state={
            modalInput:'',
            errorMessage:''
        }
    }

    @observable modalInput=''
    @observable errorMessage=''

    componentDidMount() {

    }

    // @observable modalInput

    manageState = (key, value) => {
        this.setState({
            [key]: value
        })
    }



    doSMSAction = (action,pressClose) => {
        switch(action){
            case 'deleteSingleCallerID':
                SendSMSMessage(
                    `Caller ID '${this.modalInput}' has been deleted.`,
                    `${UserStore.sites[UserStore.activeSiteID].passcode}#73${this.modalInput}#`,
                    UserStore.sites[UserStore.activeSiteID].telephoneNumber
                ).then(()=>{
                    pressClose();
                });break;
            // case 'deleteCode':
            //     const isSameKeypadCode = (code) => code.keypadCode === this.state.modalInput;
            //     let indexOfCode = UserStore.sites[UserStore.activeSiteID].keypadCodes.findIndex(isSameKeypadCode);
            //     if(indexOfCode!==-1) {
            //         let existingCodes = JSON.stringify(UserStore.sites[UserStore.activeSiteID].keypadCodes);
            //         existingCodes=JSON.parse(existingCodes);
            //         let newCodes = [{keypadCode:'',time:''},{keypadCode:'',time:''},{keypadCode:'',time:''},{keypadCode:'',time:''},{keypadCode:'',time:''}];
            //         let code = `#84${existingCodes[indexOfCode].keypadCode}`;
            //         existingCodes[indexOfCode]={keypadCode:'',time:''};
            //         let newValues = [];
            //         for (const code of existingCodes) {
            //             if (code.keypadCode.length > 0) {
            //                 newValues.push(code);
            //             }
            //         }
            //         newValues.forEach((code, index) => {
            //             newCodes[index] = newValues[index];
            //         })
            //         SendSMSMessageWithUpdate(
            //             `Keypad code has been removed`,
            //             `${UserStore.sites[UserStore.activeSiteID].passcode}${code}#`,
            //             UserStore.sites[UserStore.activeSiteID].telephoneNumber,
            //             'keypadCodes',
            //             newCodes
            //         ).then(()=>{
            //             this.setState({modalInput:''},()=>{pressClose();});
            //         })
            //     }else{
            //         this.setState({errorMessage:'Keypad code not recognised'});
            //     }
            //
            //
            //     // SendSMSMessage(
            //     //     `Code '${this.state.modalInput}' has been deleted.`,
            //     //     `${UserStore.sites[UserStore.activeSiteID].passcode}#84${this.state.modalInput}#`,
            //     //     UserStore.sites[UserStore.activeSiteID].telephoneNumber
            //     // );
            //     break;
            case 'deleteCode':
                    SendSMSMessage(
                        `Keypad code has been removed`,
                        `${UserStore.sites[UserStore.activeSiteID].passcode}#84${this.modalInput}#`,
                        UserStore.sites[UserStore.activeSiteID].telephoneNumber).then(()=>{
                        pressClose();
                    });break;
            case 'deleteDialOut':
                let indexOf=UserStore.sites[UserStore.activeSiteID].dialOutNumbers.indexOf(this.modalInput);
                if(indexOf!==-1) {
                    let existingDialouts = JSON.stringify(UserStore.sites[UserStore.activeSiteID].dialOutNumbers);
                    existingDialouts=JSON.parse(existingDialouts);
                    let newDialOuts = ['', '', ''];
                    existingDialouts[indexOf]='';
                    let numbers = [];
                    let newValues = [];
                    for (const number of existingDialouts) {
                        if (number.length > 0) {
                            newValues.push(number);
                        }
                    }
                    newValues.forEach((number, index) => {
                        newDialOuts[index] = newValues[index];
                        numbers.push(`#11${index + 1}${number}`);
                    })
                    SendSMSMessageWithUpdate(
                        `Dial out number has been removed`,
                        `${UserStore.sites[UserStore.activeSiteID].passcode}${numbers.join('')}#`,
                        UserStore.sites[UserStore.activeSiteID].telephoneNumber,
                        'dialOutNumbers',
                        newDialOuts
                    ).then(()=>{
                        pressClose();
                    })
                }else{
                        // this.setState({errorMessage:'Dial out number not recognised'});
                        this.errorMessage='Dial out number not recognised';
                    }



                // let indexOf=UserStore.sites[UserStore.activeSiteID].dialOutNumbers.indexOf(this.state.modalInput);
                // if(indexOf!==-1) {
                //     this.setState({errorMessage:''});
                //     console.log(indexOf);
                //     console.log(UserStore.sites[UserStore.activeSiteID].dialOutNumbers);
                //     SendSMSMessageWithUpdate(
                //         `Dial out number has been deleted`,
                //         `${UserStore.sites[UserStore.activeSiteID].passcode}#11${indexOf+1}*#`,
                //         UserStore.sites[UserStore.activeSiteID].telephoneNumber,
                //         'dialOutNumbers',
                //         "",
                //         indexOf
                //     );
                //     console.log(UserStore.sites[UserStore.activeSiteID].dialOutNumbers);
                // }else{
                //     this.setState({errorMessage:'Dial out number not recognised'});
                //     // AESToast.show('Dial out number not recognised');
                // }
                break;
            // case 'deleteDialOut':
                // SendSMSMessage(
                //     `Dial Out Number '${this.state.modalInput}' has been deleted.`,
                //     `${UserStore.sites[UserStore.activeSiteID].passcode}#811${this.state.modalInput}#`,
                //     UserStore.sites[UserStore.activeSiteID].telephoneNumber
                // );break;
        }
    }

    checkInput(type,value){
        // console.log('checkInput');
        // console.log(placeholder);
        // console.log(value);
        if(type) {
            if (type === 'passcode') {
                return value.length !== 4;
            } else {
                return value.length < 1;
            }
        }else {
            return false
        }
    }

    render() {
        let { currentMode } = UserStore
        // let { header,onPressClose,body,textInputPlaceholder,cancelButtonText,confirmButtonText,warning,onPress,visible,actionSMSCode,onChangeText,value} = this.props
        let { header,onPressClose,body,smsAction,cancelButtonText,confirmButtonText,warning,onPress,visible,input,onChangeText,value} = this.props
        // console.log(this.props);
        // console.log('init');
        // console.log(textInputPlaceholder);
        // console.log(value);
        return (
            <Fragment>


                <Modal
                    isVisible={visible}
                    avoidKeyboard={true}
                    // coverScreen={true}
                    style={styles.modalView}
                    onBackdropPress={onPressClose}
                    backdropColor={Colours.lightGray}
                >
                    <View style={styles.container}>
                        <View style={[styles.toast,{borderColor:Colours[currentMode].primaryColour}]}>
                            <View style={styles.toastHeader}>
                                <Text style={styles.text}>{header}</Text>
                                <TouchableOpacity onPress={onPressClose}>
                                    <Image source={require('../../assets/images/header/modalClose.png')}/>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.bodyText}>{body}</Text>
                            {input &&
                            <View>
                                <AESTextInput
                                    titleTextColoured={true}
                                    placeholder={input==='passcode'?'0000':'004400000000'}
                                    warning={warning}
                                    onChangeText={text=>{
                                        input==='passcode'?
                                            // this.manageState('modalInput',validatePasscode(text)):
                                            // this.manageState('modalInput',validateTelephoneNumber(text))

                                            this.modalInput = validatePasscode(text):
                                            this.modalInput=validateTelephoneNumber(text)
                                    }}
                                    // onChangeText={onChangeText}
                                    keyboardType={'number-pad'}
                                    value={this.modalInput}
                                />
                                {this.errorMessage.length>0 &&
                                <View>
                                    <Text style={styles.errorMessage}>{this.errorMessage}</Text>
                                </View>
                                }
                            </View>
                            }

                            {cancelButtonText.length > 0 &&
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'stretch',
                                justifyContent: 'space-between',
                                height: 50,
                                marginTop: 20
                            }}>
                                <View>
                                    <TextButton
                                        buttonText={cancelButtonText}
                                        outline={true}
                                        disabled={false}
                                        warning={warning}
                                        onPress={onPressClose}
                                    />
                                </View>
                                <View>
                                    <TextButton
                                        buttonText={confirmButtonText}
                                        outline={false}
                                        disabled={this.checkInput(input,this.modalInput)}
                                        warning={warning}
                                        onPress={()=>{
                                            this.doSMSAction(smsAction,onPressClose);
                                        }}
                                    />
                                </View>
                            </View>
                            }
                            {!cancelButtonText.length > 0 &&
                            <View style={{
                                flexDirection: 'row',
                                height: 50,
                                marginTop: 20,
                            }}>
                                <View style={{width:'100%'}}>
                                    <TextButton
                                        buttonText={confirmButtonText}
                                        outline={false}
                                        disabled={false}
                                        warning={warning}
                                        onPress={onPress}
                                    />
                                </View>
                            </View>
                            }
                        </View>
                    </View>
                </Modal>
            </Fragment>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        // width:'100%',
        backgroundColor:'#00000050',
        borderTopEndRadius:25,
        borderTopStartRadius:25,
        // alignSelf:'center',
        // top:550
    },
    toast: {
        backgroundColor: Colours.white,
        // padding: 15,
        // borderRadius:20,
        paddingVertical:30,
        paddingHorizontal:25,
        paddingBottom:60,
        borderTopEndRadius:25,
        borderTopStartRadius:25,
        // height:300,
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
    errorMessage: {
        color: 'red',
        fontSize: 14,
        fontFamily:'Roboto-Regular',
        marginTop:10
    },
    toastIcon:{
        alignSelf:'center'
    },
    bodyText:{
        fontFamily:'Roboto-regular',
        fontSize:14,
        color:Colours.black
    },
    modalView: {
        justifyContent: 'flex-end',
        margin: 0,
    }
});
