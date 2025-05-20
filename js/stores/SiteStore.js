// import Config from '../config'
import { action, configure, observable, toJS } from 'mobx'

configure({
    useProxies: "never"
})

import AsyncStorage from '@react-native-async-storage/async-storage'

class Site {
    @observable telephoneNumber
    @observable device
    @observable name
    @observable passcode
    @observable accessCode
    @observable speakerVolume
    @observable microphoneVolume
    @observable intercomRelayTime
    @observable apnAddress
    @observable networkMode
    @observable abortCallTime
    @observable dtmfLatching
    @observable dialOutNumbers
    @observable talkTime
    @observable keypadCodes
    @observable openMode
    @observable serviceCallType
    @observable serviceCallNumber
    @observable serviceCallSchedule
    @observable smsReply
    @observable relayInfo
    @observable notificationNumbers
    @observable notificationStatus
    @observable notificationMessage
    @observable autoClockConfig
    @observable timeSyncConfig
    @observable kpnCallerID = '1'



    constructor(value) {
        this.telephoneNumber = value.telephoneNumber
        this.device = value.device
        this.siteName = value.siteName
        this.passcode = value.passcode
        this.accessCode = value.accessCode
        this.speakerVolume = 5
        this.microphoneVolume = 5
        this.intercomRelayTime = 1
        this.apnAddress = ''
        this.networkMode = ''
        this.abortCallTime = 5
        this.dtmfLatching = 0
        this.dialOutNumbers = ['', '', '']
        this.talkTime = 60
        this.keypadCodes = [{ keypadCode: '', time: '' }, { keypadCode: '', time: '' }, { keypadCode: '', time: '' }, { keypadCode: '', time: '' }, { keypadCode: '', time: '' }]
        this.callOutTimes = [20, 20, 20]
        this.openMode = 0
        this.serviceCallType = ''
        this.serviceCallNumber = ''
        this.serviceCallSchedule = ''
        this.smsReply = 0
        this.relayInfo = [{relayName: '', relayStatus: ''}, {relayName: '', relayStatus: ''}]
        this.notificationNumbers = ['', '', '', '']
        this.notificationStatus = ''
        this.notificationMessage = ''
        this.autoClockConfig = { type: '', days: [], time: '' }
        this.timeSyncConfig = {clockSync: '', daylightSaving: '', syncMode: '', timeZone: '0', adjust: ''}
    }
}

class SiteStore {

    @observable state = ""
    @observable errors = {}
    @observable sites = []
    @observable activeSite = {}
    @observable editableSite = {}
    @observable activeSiteID = 0;
    @observable currentMode = "default"


    @action.bound
    setActiveSite = key => {
        AsyncStorage.getItem('saved_sites').then(savedSites => {
            if (savedSites) {
                savedSites = JSON.parse(savedSites)
                this.activeSite = savedSites[key];
                this.activeSiteID = key;
                this.setCurrentMode();
            }
        })
    }

    @action.bound
    setEditableSite = async key => {
        let savedSites = await AsyncStorage.getItem('saved_sites');
        if (savedSites) {
            savedSites = JSON.parse(savedSites)
            this.editableSite = savedSites[key];
            return Promise.resolve(200)
        }
    }


    @action.bound
    loadData = async () => {
        let savedSites = await AsyncStorage.getItem('saved_sites');
        if (savedSites) {
            savedSites = JSON.parse(savedSites)

            if (savedSites.length > 0) {
                if (this.sites.length === savedSites.length) {
                    return Promise.resolve(200)
                }

                if (this.activeSiteID === -1) {
                    this.sites = savedSites;
                    this.activeSite = savedSites[0];
                    this.activeSiteID = 0;
                    this.setCurrentMode();
                } else {
                    this.sites = savedSites;
                    this.activeSite = savedSites[0];
                    this.activeSiteID = 0;
                    this.setCurrentMode();
                }
                return Promise.resolve(200)
            } else {
                this.sites = null;
                this.activeSite = null;
                this.activeSiteID = -1;
                this.setCurrentMode();
                return Promise.resolve(500)
            }
        } else {
            this.sites = null;
            this.activeSite = null;
            this.activeSiteID = -1;
            this.setCurrentMode();
            return Promise.resolve(500)
        }
    }

    @action.bound
    addNewSite = async (data) => {
        let newSite = new Site(data);

        let savedSites = await AsyncStorage.getItem('saved_sites')
        if (savedSites) {
            savedSites = JSON.parse(savedSites);
        } else {
            savedSites = [];
        }
        savedSites.push(newSite);
        this.sites = savedSites;
        if (this.sites.length === 1) {
            this.activeSite = savedSites[0];
            this.activeSiteID = 0;
        } else if (this.sites.length > 1) {
            this.activeSite = savedSites[this.sites.length - 1];
            this.activeSiteID = this.sites.length - 1;
        }
        this.setCurrentMode();
        await AsyncStorage.setItem('saved_sites', JSON.stringify(savedSites));
        return Promise.resolve(200);
    }

    @action.bound
    setCurrentMode = () => {
        if (this.activeSiteID >= 0) {
            if (this.sites[this.activeSiteID]) {
                if (this.sites[this.activeSiteID].device === 'Cellcom Lite') {
                    this.currentMode = 'lite';
                } else if (this.sites[this.activeSiteID].device === 'iGate 1200') {
                    this.currentMode = 'pro';
                } else if (this.sites[this.activeSiteID].device === 'PLACEHOLDER') {
                    this.currentMode = 'PLACEHOLDER';
                } else if (this.sites[this.activeSiteID].device === 'maurice') {
                    this.currentMode = 'maurice';
                } else if (this.sites[this.activeSiteID].device === 'odhran') {
                    this.currentMode = 'odhran';
                } else if (this.sites[this.activeSiteID].device === 'iGate Plus') {
                    this.currentMode = 'plus';
                }
            }
        } else {
            this.currentMode = 'default'
        }
    }

    @action.bound
    setSiteProperty = (property, value, arrayPosition) => {
        let site = this.sites[this.activeSiteID];
        if (arrayPosition >= 0) {
            site[property][arrayPosition] = value;
        } else {
            site[property] = value;
        }

        this.sites[this.activeSiteID] = site;
        this.storeSiteChanges();
    }


    @action.bound
    updateSiteList = () => {
        this.sites[this.activeSiteID][property] = value;
        this.storeSiteChanges();
    }

    @action.bound
    storeSiteChanges = async () => {
        AsyncStorage.setItem('saved_sites', JSON.stringify(this.sites));
    }

    @action.bound
    checkActiveSite = async () => {
        return this.sites[this.activeSiteID];
    }

    @action.bound
    deleteSite = async (value) => {
        let filteredArray = this.sites.filter(function (e) { return e.telephoneNumber !== value });
        await AsyncStorage.setItem('saved_sites', JSON.stringify(filteredArray)).then(() => {
        });
        if (filteredArray.length === 0) {
            this.activeSiteID = -1;
            this.activeSite = null;
            this.sites = filteredArray;
        } else {
            this.activeSiteID = 0;
            this.activeSite = filteredArray[0];
            this.sites = [];
        }
        return Promise.resolve(200);
    }



    @action.bound
    updateSite = async (siteID, updatedSiteData) => {
        try {
            AsyncStorage.getItem('saved_sites').then(savedSites => {
                if (savedSites) {
                    savedSites = JSON.parse(savedSites);
                } else {
                    savedSites = [];
                }
                savedSites[siteID] = updatedSiteData;
                AsyncStorage.setItem('saved_sites', JSON.stringify(savedSites)).then(() => {
                    this.sites = savedSites;
                    this.setActiveSite(siteID);
                    return Promise.resolve(true);
                });
            })
        } catch (e) {
            return Promise.resolve(false);
        }
    }
}

const siteStore = new SiteStore()
export default siteStore
