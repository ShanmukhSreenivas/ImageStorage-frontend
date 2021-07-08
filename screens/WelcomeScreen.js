import React from 'react';
import { AppRegistry, Image, StyleSheet, TextInput, View, Text, SafeAreaView, TouchableOpacity } from 'react-native';


function WelcomeScreen({ navigation }) {
    setTimeout(() => {
        navigation.navigate('Login');
    }, 2000);

    return (
        <SafeAreaView style={styles.window}>
            <TouchableOpacity style={styles.whole} onPress={() => { navigation.navigate('Login') }}>
                <Image source={require("../assets/borrowit-logo.png")} />
            </TouchableOpacity>
        </SafeAreaView>
    );
}


export default WelcomeScreen;
const styles = StyleSheet.create({
    window: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },
    whole: {
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
    }
});