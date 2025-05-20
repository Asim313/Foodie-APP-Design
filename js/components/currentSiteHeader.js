import React, {
    Fragment
} from 'react'

import {
    StyleSheet,
    TouchableOpacity,
    View,
    Image,
    Dimensions,
    StatusBar, Text,
} from 'react-native';


import { SafeAreaView } from 'react-native-safe-area-context';

import { Colours } from '../styles'
import UserStore from "../stores/SiteStore";
import {observer} from "mobx-react";
import {checkNullSite} from "../utils/validation";
import LanguagesStore from '../stores/LanguageStore';
import { withTranslation } from 'react-i18next';
@observer
class CurrentSiteHeader extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

    
    render() {
        let telephoneNumber = null;
        let device = null;
        const { t, i18n } = this.props;

        if(UserStore.activeSite){
            telephoneNumber=UserStore.activeSite.telephoneNumber;
            device=UserStore.activeSite.device;
        }

        let { languages } = LanguagesStore
        return (
            <Fragment>
                {telephoneNumber && device &&
                    <Fragment>
                    <Text style={{textAlign: 'center', marginTop: 10}}>
                        <Text style={styles.settingsHeader}>{t('unit_telephone_number') + ": "}</Text>
                        <Text style={styles.settingsText}>{telephoneNumber}</Text>
                    </Text>

                    <Text style={{textAlign: 'center'}}>
                        <Text style={styles.settingsHeader}>{t('device') + ": "}</Text>
                        <Text style={styles.settingsText}>{device}</Text>
                    </Text>
                    </Fragment>
                }
                {!telephoneNumber && !device &&
                <Fragment>
                    <Text style={{textAlign: 'center', marginTop: 10}}>
                        <Text style={styles.settingsHeader}>{t('no_site_selected')}</Text>
                        <Text style={styles.settingsText}>{telephoneNumber}</Text>
                    </Text>
                </Fragment>
                }
            </Fragment>

        )
    }
}

const styles = StyleSheet.create({
    settingsHeader:{
        color:Colours.black,
        fontSize:16,
        fontFamily:'Roboto-Bold'
    },
    settingsText:{
        color:Colours.black,
        fontSize:14,
        fontFamily:'Roboto-Regular'
    }
});

export default withTranslation()(CurrentSiteHeader);
