import AsyncStorage from "@react-native-async-storage/async-storage";

class Storage {
    static instance = new Storage();

    store = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value);
            return true;
        } catch (err) {
            console.log('Storage store err', err);
            return false;
        }
    };

    get = async key => {
        console.log(key);
        try {
            return await AsyncStorage.getItem(key);
        } catch (err) {
            console.log('Storage get err', err);
            throw Error(err);
        }
    };

    multiGet = async keys => {
        try {
            return await AsyncStorage.multiGet(keys);
        } catch (err) {
            console.log('Storage multiget err', err);
            throw Error(err);
        }
    };

    getAllKeys = async () => {
        try {
            return await AsyncStorage.getAllKeys();
        } catch (err) {
            console.log('Storage get all keys err', err);
            throw Error(err);
        }
    };

    remove = async key => {
        try {
            await AsyncStorage.removeItem(key);
            return true;
        } catch (err) {
            console.log('Storage delete err', err);
            throw Error(err);
        }
    };
}

export default Storage;