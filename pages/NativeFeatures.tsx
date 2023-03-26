import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Button,
    Image,
    TextInput,
    Share,
    Platform,
    PermissionsAndroid
} from "react-native";

import { useState, useEffect } from "react";

import { launchImageLibrary, ImageLibraryOptions } from "react-native-image-picker";

import { PERMISSIONS, RESULTS, check, request } from "react-native-permissions";

import Geolocation from "react-native-geolocation-service";

import AsyncStorage from "@react-native-async-storage/async-storage";

const NativeFeatures = () => {

    const [path, setPath] = useState("");

    const [latitude, setLatitude] = useState(0.0);
    const [longitude, setLongitude] = useState(0.0);

    const [key, setKey] = useState('');
    const [value, setValue] = useState('');

    const [preferences, setPreferences] = useState<string[][]>([]);

    // Open the dialog to select an image from the gallery
    const selectFile = async () => {

        const options: ImageLibraryOptions = {
            mediaType: "photo"
        }

        const result = await launchImageLibrary(options);

        setPath(result.assets![0].uri!);
    }

    // Try to get the location of the device and request permission if missing
    const getLocation = async () => {
        Geolocation.getCurrentPosition(
            position => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
            },
            (error) => {
                if (error.code == 1) {
                    requestPermission();
                }
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }

    // Store a key value pair in the preferences
    const setKeyValuePair = async () => {
        await AsyncStorage.setItem(key, value);

        await getKeyValuePairs();

        setKey("");

        setValue("");
    }

    // Retrieve all key-value pairs from the preferences
    const getKeyValuePairs = async () => {
        const keys = await AsyncStorage.getAllKeys();

        const pairs: string[][] = [];

        for (let i = 0; i < keys.length; i++) {
            const value = await AsyncStorage.getItem(keys[i]);

            pairs.push([keys[i], value as string])
        }

        setPreferences(pairs);
    }

    useEffect(() => {
        getKeyValuePairs();
    }, [])

    // Request the permissions to get the location for Android and iOS
    const requestPermission = async () => {
        if (Platform.OS == "android") {
            const result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
            if (result == PermissionsAndroid.RESULTS.GRANTED) {
                getLocation();
            }
        } else if (Platform.OS = "ios") {
            const result = await Geolocation.requestAuthorization("whenInUse");
            if (result == "granted") {
                getLocation();
            }
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={{
                fontWeight: 'bold',
                fontSize: 20,
                marginTop: 16
            }}>Gallery Image Picker</Text>
            <View style={{height: 8}}/>
            <Button
                title="Gallery Image Picker"
                onPress={() => selectFile()}
            />
            <View style={{height: 8}}/>
            <View style={{
                height: 200,
                width: 200,
                backgroundColor: 'black'
            }}>
                {path && (
                    <Image
                        style={styles.image}
                        source={{
                            uri: path
                        }}
                    />
                )}
            </View>
            <View style={{height: 32}}/>
            <Text style={{
                fontWeight: 'bold',
                fontSize: 20
            }}>Geolocation</Text>
            <View style={{height: 8}}/>
            <Button
                title="Get Location"
                onPress={() => getLocation()}
            />
            <View style={{height: 8}}/>
            <Text>
                Latitude: {latitude}
            </Text>
            <Text>
                Longitude: {longitude}
            </Text>
            <View style={{ height: 32 }} />
            <Text style={{
                fontWeight: 'bold',
                fontSize: 20
            }}>Preferences</Text>
            <View style={{height: 8}}/>
            <TextInput
                placeholder="Enter a key"
                defaultValue={key}
                onChangeText={newKey => setKey(newKey)}
            />
            <View style={{ height: 8 }} />
            <TextInput
                placeholder="Enter a value"
                defaultValue={value}
                onChangeText={newValue => setValue(newValue)}
            />
            <View style={{ height: 8 }} />
            <Button title="Store" onPress={() => setKeyValuePair()} />
            <View style={{ height: 8 }} />
            {preferences.map(pref => (
                <Text>{pref[0]}: {pref[1]}</Text>
            ))}
            <View style={{ height: 32 }} />
            <Text style={{
                fontWeight: 'bold',
                fontSize: 20
            }}>Share API</Text>
            <View style={{height: 8}}/>
            <Button title="Share" onPress={async () => {
                await Share.share({
                    message: "This is the share text",
                    title: "Share API Test"
                })
            }} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'flex-start',
        margin: 16
    },
    image: {
        width: 200,
        height: 200
    }
})

export default NativeFeatures;