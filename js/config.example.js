import AsyncStorage from '@react-native-async-storage/async-storage';

export default {
    url: 'http://127.0.0.1:8000/api',
    api: 'http://127.0.0.1:8000/api',
    apiKey: '',
    get defaultHeaders() {
        return {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Xal-Api-Key": "",
        }
    }
}