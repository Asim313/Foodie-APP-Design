import { observable, action } from 'mobx'
import { createContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from '../config'
import { create, persist } from 'mobx-persist'
import FallBack from '../../js/utils/languages_fallback.json'

const hydrate = create({
    storage: AsyncStorage,
    jsonify: true
})


class Languages {
    @observable languages

    constructor(value) {
        this.languages = value.languages
    }
}

class LanguagesStore {

    @persist('object') @observable languages = {}
    @persist('object') @observable selectedLanguage = false
    @persist('object') @observable lang = ''
    @persist('object') @observable dialOutNumber = ''
    @persist('object') @observable callerCount = ''

    setLanguage = async (lang) => {
        this.lang = lang
        this.globals = []
        this.languages = {}
        this.selectedLanguage = false

        return fetch(Config.api + '/snippets?language=' + lang, {
            method: 'GET',
            headers: Config.defaultHeaders,
        })
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson) {
                    this.languages = responseJson
                    this.selectedLanguage = true
                    return Promise.resolve(200)
                }
                else {
                    this.errors = responseJson.errors
                    return Promise.resolve(500)
                }
            }).catch(function () {
                return Promise.resolve(500)
            })
    }

    getLanguage = () => {
        return this.lang;
    }
}

const languagesStore = new LanguagesStore()
export default languagesStore

hydrate('LanguagesStore', languagesStore).then(res => {
    // console.log(res)
})
