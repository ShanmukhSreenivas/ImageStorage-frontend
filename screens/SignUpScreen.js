import React from 'react';
import { Image, StyleSheet, TextInput, Button, View, Text, SafeAreaView, TouchableOpacity } from 'react-native';


function SignUpScreen({ navigation }) {
    var email
    return (
        <SafeAreaView style={styles.window}>
            <Text style={styles.pageHeader}>Sign Up</Text>
            <Text style={styles.labels}>Name</Text>
            <TextInput style={styles.userinputs} placeholder="Name" />
            <Text style={styles.labels}>Last Name</Text>
            <TextInput style={styles.userinputs} placeholder="Email" /* onChangeText={(usernameimput) => { username = usernameimput }} */ />
            <Text style={styles.labels}>Password</Text>
            <TextInput secureTextEntry={true} style={styles.userinputs} placeholder="Password" />
            <Text style={styles.labels}>Re-Type Password</Text>
            <TextInput secureTextEntry={true} style={styles.userinputs} placeholder="Re-Password" />
            <TouchableOpacity style={styles.buttonContainer}  onPress={() => { navigation.navigate('Home'),{ email: email } }} >
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

        </SafeAreaView>
    );
}

export default SignUpScreen;

const styles = StyleSheet.create({
    window: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },
    labels: {
        paddingBottom: 3,
    },
    userinputs: {
        width: '60%',
        height: 40,
        paddingLeft: 20,
        marginBottom: 26,
        borderWidth: 1,
        borderRadius: 20,
        borderBottomWidth: 2,
        borderBottomColor: "grey",
        backgroundColor: "#fff",
    },
    buttonContainer: {
        width: "60%",
        height: 50,
        marginTop: 35,
        alignItems: "center",
        padding: 15,
        borderRadius: 25,
        backgroundColor: "#e322cc"
    },
    buttonText: {
        color: "fff",
        textTransform: "uppercase",
        fontWeight: "200",
        letterSpacing: 3,
    },
    pageHeader: {
        color: "#e322cc",
        fontSize: 23,
        paddingBottom: 40,
        textTransform: "uppercase",
    }
})