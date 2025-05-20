import React, { useState } from "react";
import SettingsLayout from "../../../components/settingsLayout";
import UserStore from "../../../stores/SiteStore";
import LanguagesStore from "../../../stores/LanguageStore";
import { Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import TextButton from "../../../components/textButton";
import Colours from "../../../styles/colours";
import BottomBarSpacer from "../../../components/bottomBarSpacer";
import { SendSMSMessage, SendSMSMessageWithUpdate } from "../../../utils/SMS";
import ConfirmationModal from "../../../components/confirmationModal";
import AESText from "../../../components/aesText";
import ToggleButton from "../../../components/toggleButton";
import { useTranslation } from 'react-i18next';

const Intercom4GNetworkFeatures = () => {
  const { currentMode } = UserStore;
  const { languages } = LanguagesStore;

  const [apnAddress, setApnAddress] = useState(UserStore.sites[UserStore.activeSiteID].apnAddress);
  const [showApnToolTip, setShowApnToolTip] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [networkMode, setNetworkMode] = useState(UserStore.sites[UserStore.activeSiteID].networkMode ?? '1');
  const { t, i18n } = useTranslation();

  return (
    <>
      <SettingsLayout title={t('4g_network_features')} mode={currentMode}>
        <View style={styles.optionContainer}>
          <View>
            <View style={styles.subheadingContainer}>
              {/*<Text style={[styles.textInputHeader, { color: Colours.black }]}>{languages.set_apn_volte.text}</Text>*/}
              <AESText
                color={Colours.black}
                family={'Roboto-Medium'}
                size={16}
                content={t('apn')}
                containerStyle={{marginBottom:8}}
              />
              <TouchableOpacity
                onPress={() => setShowApnToolTip(true)}
              >
                <Image style={{ tintColor: Colours[currentMode].primaryColour }} source={require('../../../../assets/images/icons/infoButton.png')} />
              </TouchableOpacity>
            </View>
            <TextInput
              style={[styles.textInput, { borderColor: Colours[currentMode].primaryColour }]}
              underlineColorAndroid={Colours[currentMode].primaryColour}
              value={apnAddress}
              onChangeText={text => setApnAddress(text)}
              autoCompleteType="off"
              autoCorrect={false}
              autoCapitalize="none"
            />

            <View style={{ marginTop: 20, marginBottom: 10 }}>
              <TextButton
                buttonText={t('save')}
                outline={false}
                disabled={apnAddress.length < 1}
                onPress={() => {
                  SendSMSMessageWithUpdate(
                    `APN address set to ${apnAddress}. Restart your device for changes to take effect.`,
                    `${UserStore.sites[UserStore.activeSiteID].passcode}#97${apnAddress}#`,
                    UserStore.sites[UserStore.activeSiteID].telephoneNumber,
                    'apnAddress',
                    apnAddress
                  );
                }}
              />
            </View>
          </View>

          <View style={{marginTop:20}}>
            <AESText
              color={Colours.black}
              family={'Roboto-Medium'}
              size={16}
              content={"4G Mode"}
            />

            <AESText
              color={Colours.black}
              family={'Roboto-Regular'}
              size={16}
              content={'Change Network Mode (Turn off 4G mode to not allow data usage) \n \nDefault = '+t('enable')}
              containerStyle={{marginBottom:20,marginTop:10}}
            />

            <View style={{
              flexDirection: 'row',
              alignItems: 'stretch',
              justifyContent:'space-between',
              height:50
            }}>
              <View>
                <ToggleButton
                  buttonText={t('enable')}
                  outline={true}
                  disabled={networkMode !== '1'}
                  onPress={setNetworkMode.bind(null, '1')}
                />
              </View>
              <View>
                <ToggleButton
                  buttonText={t('disable')}
                  outline={true}
                  disabled={networkMode !== '0'}
                  onPress={setNetworkMode.bind(null, '0')}
                />
              </View>
            </View>

            <View style={{ marginTop: 20, marginBottom: 10 }}>
              <TextButton
                buttonText={t('save')}
                outline={false}
                disabled={networkMode === ''}
                onPress={() => {
                  SendSMSMessageWithUpdate(
                    networkMode === '1' ? '4G mode enabled' : '4G mode disabled',
                    `${UserStore.sites[UserStore.activeSiteID].passcode}#98${networkMode}#`,
                    UserStore.sites[UserStore.activeSiteID].telephoneNumber,
                    'networkMode',
                    networkMode
                  );
                }}
              />
            </View>
          </View>

          <View style={{ marginVertical: 30 }}>
            <TextButton
              buttonText={t('delete_apn')}
              outline={true}
              disabled={false}
              onPress={() => setShowDeleteModal(true)}
            />
          </View>
        </View>
        <BottomBarSpacer />
      </SettingsLayout>
      <ConfirmationModal
        visible={showDeleteModal}
        header={t('delete_apn')}
        body={t('delete_intercom_apn')}
        onPressClose={() => setShowDeleteModal(false)}
        cancelButtonText={t('no')}
        confirmButtonText={t('yes')}
        onPress={() => {
          SendSMSMessageWithUpdate(
            `The APN has been deleted from site`,
            `${UserStore.sites[UserStore.activeSiteID].passcode}#97*#`,
            UserStore.sites[UserStore.activeSiteID].telephoneNumber,
            'apnAddress',
            ''
          ).then(res => {
              setApnAddress('');
              setShowDeleteModal(false);
          });
        }
        }
        warning={true}
      />

      <ConfirmationModal
        visible={showApnToolTip}
        header={"APN"}
        body={t('check_apn_provider')}
        onPressClose={() => setShowApnToolTip(false)}
        confirmButtonText={t('close')}
        onPress={() => setShowApnToolTip(false)}
        warning={false}
      />
    </>
  );
};

const styles = StyleSheet.create({
  optionContainer: {
    flex: 1,
    marginVertical: 20,
  },
  subheadingContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInputContainer: {
    marginTop: 0,
  },
  textInputHeader: {
    fontSize: 18,
    paddingBottom: 10,
    fontFamily: 'Roboto-Medium'
  },
  textInput: {
    color: Colours.black,
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
    paddingBottom: 10
  },
  textInputSubHeader: {
    color: Colours.black,
    fontSize: 16,
    paddingBottom: 20,
    fontFamily: 'Roboto-Regular'
  },
});

export default Intercom4GNetworkFeatures;
