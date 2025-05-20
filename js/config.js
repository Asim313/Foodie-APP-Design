import AsyncStorage from '@react-native-async-storage/async-storage';
export default {
    // url: 'https://apps.aesglobalonline.com/api',
    // api: 'https://apps.aesglobalonline.com/api',
    apiKey: 'YtR5ijfxnPLY6v+ollbkm5OU3Mthd0o2QjU/QgpKuLw=',
    get defaultHeaders() {
        return {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Xal-Api-Key": "YtR5ijfxnPLY6v+ollbkm5OU3Mthd0o2QjU/QgpKuLw="
        }
    }
}