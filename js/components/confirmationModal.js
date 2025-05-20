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
import {
    SendSMSMessage,
    SendSMSMessageWithUpdate,
} from "../utils/SMS";
export default class ConfirmationModal extends React.Component {


    constructor(props) {
        super(props)
        this.state={
            modalInput:'',
            errorMessage:'',
            // dropdownIndex:1
        }
    }

    componentDidMount() {

    }

    // @observable modalInput

    manageState = (key, value) => {
        this.setState({
            [key]: value
        })
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

    // checkInput(placeholder,value){
    //     // console.log('checkInput');
    //     // console.log(placeholder);
    //     // console.log(value);
    //     if(placeholder && value) {
    //         if (placeholder === '0000') {
    //             return value.length !== 4;
    //         } else {
    //             return value.length < 1;
    //         }
    //     }else {
    //         return false
    //     }
    // }

    doSMSAction(action,closeModal){
        // if(action==='deleteCID') {
        //     SendSMSMessage(
        //         `Caller ID has been deleted`,
        //         `${UserStore.sites[UserStore.activeSiteID].passcode}#73*${this.state.knownCallerID}#`,
        //         UserStore.sites[UserStore.activeSiteID].telephoneNumber
        //     )
        // }
        switch(action){
            // case 'deleteCID': SendSMSMessage(
            //     `Caller ID has been deleted`,
            //     `${UserStore.sites[UserStore.activeSiteID].passcode}#73${this.state.modalInput}#`,
            //     UserStore.sites[UserStore.activeSiteID].telephoneNumber
            // );break;
            case 'deleteAllCIDs': SendSMSMessage(
                `All caller IDs have been deleted`,
                `${UserStore.sites[UserStore.activeSiteID].passcode}#73*#`,
                UserStore.sites[UserStore.activeSiteID].telephoneNumber
            // );closeModal();break;
            ).then(()=>{closeModal();});break;
            // case 'deleteKeypadCode': SendSMSMessage(
            //     `Keypad code has been deleted`,
            //     `${UserStore.sites[UserStore.activeSiteID].passcode}#84${this.state.modalInput}#`,
            //     UserStore.sites[UserStore.activeSiteID].telephoneNumber
            // );break;
            case 'deleteAllKeypadCodes':
                SendSMSMessageWithUpdate(
                `All keypad codes have been deleted`,
                `${UserStore.sites[UserStore.activeSiteID].passcode}#84*#`,
                UserStore.sites[UserStore.activeSiteID].telephoneNumber,
                    'keypadCodes',
                    [{keypadCode:'',time:''},{keypadCode:'',time:''},{keypadCode:'',time:''},{keypadCode:'',time:''},{keypadCode:'',time:''}]
            // ).then((res)=>{ console.log(res)});break;
            ).then(()=>{closeModal();});break;

            // case 'deleteDialOut':
            //     console.log('test');
            //     console.log(UserStore.sites[UserStore.activeSiteID].dialOutNumbers.indexOf(this.state.modalInput));
            //     let indexOf=UserStore.sites[UserStore.activeSiteID].dialOutNumbers.indexOf(this.state.modalInput);
            //     if(indexOf!==-1) {
            //         this.setState({errorMessage:''});
            //         SendSMSMessageWithUpdate(
            //             `Dial out number has been deleted`,
            //             `${UserStore.sites[UserStore.activeSiteID].passcode}#11${indexOf+1}*#`,
            //             UserStore.sites[UserStore.activeSiteID].telephoneNumber,
            //             'dialOutNumbers',
            //             "",
            //             indexOf
            //         );
            //     }else{
            //         this.setState({errorMessage:'Dial out number not recognised'});
            //         // AESToast.show('Dial out number not recognised');
            //     }
            //     break;
            // case 'deleteAllDialOuts': SendSMSMessageAsync(
            //     `Dial out number has been deleted`,
            //     `${UserStore.sites[UserStore.activeSiteID].passcode}#111*#112*#113*#`,
            //     UserStore.sites[UserStore.activeSiteID].telephoneNumber
            // ).then(res => UserStore.setSiteProperty('dialOutNumbers',["","",""]));break;

            case 'deleteAllDialOuts': SendSMSMessageWithUpdate(
                `Dial out numbers have been deleted`,
                `${UserStore.sites[UserStore.activeSiteID].passcode}#111*#112*#113*#`,
                UserStore.sites[UserStore.activeSiteID].telephoneNumber,
                'dialOutNumbers',
                ["","",""]
            // );closeModal();break;
            ).then(()=>{closeModal();});break;
        }
    }

    render() {
        let { currentMode } = UserStore
        // let { header,onPressClose,body,textInputPlaceholder,cancelButtonText,confirmButtonText,warning,onPress,visible,actionSMSCode,onChangeText,value} = this.props
        let { header,onPressClose,body,cancelButtonText,confirmButtonText,warning,onPress,visible,input,type,onPressSMSAction,onboarding} = this.props
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
                        <View style={[styles.toast,{borderColor:onboarding?Colours['default'].primaryColour:Colours[currentMode].primaryColour}]}>
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
                                    placeholder={type==='telephoneNumber'?'0044 1324 567890':'0000'}
                                    warning={warning}
                                    onChangeText={text=>{this.manageState('modalInput',type==='telephoneNumber'?validateTelephoneNumber(text):validatePasscode(text))}}
                                    keyboardType={'number-pad'}
                                    value={this.state.modalInput}
                                />
                                {this.state.errorMessage.length>0 &&
                                <View>
                                    <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
                                </View>
                                }
                            </View>
                            }

                            {cancelButtonText &&
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
                                        onboarding={onboarding}
                                    />
                                </View>
                                <View>
                                    <TextButton
                                        buttonText={confirmButtonText}
                                        outline={false}
                                        disabled={this.checkInput(input,this.state.modalInput)}
                                        warning={warning}
                                        onboarding={onboarding}
                                        onPress={()=>{
                                            if(onPressSMSAction){
                                                this.doSMSAction(onPressSMSAction,onPressClose);
                                            }else{
                                                onPress();
                                            }
                                            // let smsCommand=getSMSCommand(actionSMSCode);
                                            // if(smsCommand.includes("SRC")){
                                            //     smsCommand=smsCommand.replace("SRC",this.state.modalInput);
                                            // }
                                            // console.log(actionSMSCode);
                                            // SendTextMessage(actionSMSCode);
                                        }}
                                    />
                                </View>
                            </View>
                            }
                            {!cancelButtonText &&
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
                                        onboarding={onboarding}
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
        color: Colours.warning,
        fontSize: 14,
        paddingTop:5,
        fontFamily:'Roboto-regular',
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
