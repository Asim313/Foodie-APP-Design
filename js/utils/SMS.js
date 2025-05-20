import AESToast from '../components/aesToast';
import UserStore from '../stores/SiteStore';
import { Linking, Platform } from 'react-native';

async function SendSMSMessage(successMessage, content, targetTelephoneNumber) {

    content = Platform.OS === 'ios' ? content : content.replace(/#/g, '%23');//content.replaceAll('#', '%23');
    const separator = Platform.OS === 'ios' ? '&' : '?';
    const url = `sms:${targetTelephoneNumber}${separator}body=${content}`;
    await Linking.openURL(url);

    //await Linking.openURL(`sms:${targetTelephoneNumber}${Platform.OS === 'ios' ? '&' : '?'}body=${content}`);
    return Promise.resolve({status: 200});


    //
    // try {
    //     SendSMS.send(
    //         {
    //             // Message body
    //             body: content,
    //             // Recipients Number
    //             recipients: [targetTelephoneNumber],
    //             // recipients: ['00447537868453'],
    //             // recipients: [UserStore.activeSite.telephoneNumber],
    //             // An array of types
    //             // "completed" response when using android
    //             successTypes: ['sent', 'queued'],
    //             allowAndroidSendWithoutReadPermission: true
    //         },
    //         (completed, cancelled, error) => {
    //             if (completed) {
    //                 // console.log('SMS Sent Completed');
    //                 AESToast.show(successMessage);
    //                 return Promise.resolve(200);
    //             } else if (cancelled) {
    //                 AESToast.show('Process cancelled...');
    //                 return Promise.resolve(418);
    //             } else if (error) {
    //                 // AESToast.show(getSuccessfulResponseMessage(messageType));
    //                 // console.log(error);
    //                 AESToast.show('An error has occurred');
    //                 return Promise.resolve(408);
    //             }
    //         },
    //     )
    // } catch (error) {
    //     // console.log(error);
    //     return Promise.resolve(408);
    // }
}

async function SendSMSMessageWithUpdate(successMessage, content, targetTelephoneNumber, field, value, arrayPosition) {

    content = Platform.OS === 'ios' ? content : content.replace(/#/g, '%23');//content.replaceAll('#', '%23');
    const separator = Platform.OS === 'ios' ? '&' : '?';
    const url = `sms:${targetTelephoneNumber}${separator}body=${content}`;
    await Linking.openURL(url); //Linking.openURL(`sms:${targetTelephoneNumber}${Platform.OS === 'ios' ? '&' : '?'}body=${content}`);
    UserStore.setSiteProperty(field, value, arrayPosition);
    return Promise.resolve({status: 200});


    // try {
    //     SendSMS.send(
    //         {
    //             body: content,
    //             recipients: [targetTelephoneNumber],
    //             successTypes: ['sent', 'queued'],
    //             allowAndroidSendWithoutReadPermission: true
    //         },
    //         (completed, cancelled, error) => {
    //             if (completed) {
    //                 AESToast.show(successMessage);
    //                 if(!arrayPosition){
    //                     arrayPosition=-1;
    //                 }
    //                 UserStore.setSiteProperty(field,value,arrayPosition);
    //                 return Promise.resolve({status: 200});
    //             } else if (cancelled) {
    //                 AESToast.show('Process cancelled...');
    //
    //
    //                 // if(!arrayPosition){
    //                 //     arrayPosition=-1;
    //                 // }
    //                 // UserStore.setSiteProperty(field,value,arrayPosition);
    //
    //                 return Promise.resolve({status: 408});
    //             } else if (error) {
    //                 // console.log(error);
    //                 AESToast.show('An error has occurred');
    //                 return Promise.resolve({status: 408});
    //
    //                 //DEBUG ONLY
    //                 // console.log('arrayPosition');
    //                 // console.log(arrayPosition);
    //                 // if(!arrayPosition){
    //                 //     arrayPosition=-1;
    //                 // }
    //                 // console.log(arrayPosition);
    //                 // UserStore.setSiteProperty(field,value,arrayPosition);
    //                 //DEBUG ONLY
    //
    //             }
    //         },
    //     )
    // } catch (error) {
    //     // console.log(error);
    //     return Promise.resolve({status: 408});
    // }
}

module.exports = {SendSMSMessage, SendSMSMessageWithUpdate};
// module.exports = { SendTextMessage, getSMSCommand, SendSMSMessage, SendSMSMessageAsync, SendSMSMessageWithUpdate, SendSMSMessageWithUpdateAsync }
