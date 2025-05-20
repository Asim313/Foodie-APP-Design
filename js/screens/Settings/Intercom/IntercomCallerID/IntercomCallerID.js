import React, { useState } from "react";
import SettingsLayout from "../../../../components/settingsLayout";
import { StyleSheet, View } from "react-native";
import UserStore from "../../../../stores/SiteStore";
import LanguagesStore from "../../../../stores/LanguageStore";
import SettingsListButton from "../../../../components/settingsListButton";
import ConfirmationModal from "../../../../components/confirmationModal";


const IntercomCallerID = ({navigation}) => {

  const { currentMode } = UserStore;
  const { languages } = LanguagesStore;
  const titleText = languages.caller_id.text;

  const [showKpnWarning, setShowKpnWarning] = useState(false);

  return (
    <SettingsLayout title={titleText} mode={currentMode}>
      <View style={styles.optionContainer}>
          <View>
            <SettingsListButton
              onPress={() => setShowKpnWarning(true)}
              title={languages.kpn_caller_id?.text ?? 'KPN Caller ID'}
            />
          </View>
      </View>

      <ConfirmationModal
        visible={showKpnWarning}
        header={languages.kpn_caller_id?.text ?? 'KPN Caller ID'}
        body={languages.kpn_caller_id_warning?.text ?? 'Changing this setting may cause some issues with the Caller ID features programmed for this intercom.' }
        onPressClose={() => setShowKpnWarning(false)}
        confirmButtonText={languages.continue?.text ?? 'Continue'}
        onPress={() => {
          setShowKpnWarning(false);
           navigation.navigate('KPNCallerID');
        }}
        warning={true}
      />
    </SettingsLayout>
  );
};

const styles = StyleSheet.create({
  optionContainer: {
    flex: 1,
    marginVertical: 20,
  },
});

export default IntercomCallerID;
