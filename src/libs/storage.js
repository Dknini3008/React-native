import AsyncStorage from "@react-native-async-storage/async-storage";

class Storage {
    static instance = new Storage();

    //Here we get the store data from user
    store = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value);
            return true;
        } catch (err) {
            console.log('Storage store err', err);
            return false;
        }
    };

    //here we get the items
    get = async key => {
        console.log(key);
        try {
            return await AsyncStorage.getItem(key);
        } catch (err) {
            console.log('Storage get err', err);
            throw Error(err);
        }
    };

    //we get many keys in a function
    multiGet = async keys => {
        try {
            return await AsyncStorage.multiGet(keys);
        } catch (err) {
            console.log('Storage multiget err', err);
            throw Error(err);
        }
    };

    //here we remove many keys with the function
    multiRemove = async keys => {
        try {
            await AsyncStorage.multiRemove(keys);
            return true;
        } catch (err) {
            console.log('Multi remove err', err);
            return false;
        }
    };

    //here we call all the keys
    getAllKeys = async () => {
        try {
            return await AsyncStorage.getAllKeys();
        } catch (err) {
            console.log('Storage get all keys err', err);
            throw Error(err);
        }
    };

    //this is to remove a key
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