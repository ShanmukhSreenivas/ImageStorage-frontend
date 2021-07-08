import React from 'react';
import AppButton from '../components/AppButton';

function LoginSreen({ navigation }) {

    var email = "";
    var password = "";
    
    const sleep = (milliseconds) => {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds) {
                break;
            }
        }
    }

    const loginPress = () => {
        if (email.length != 0 && password.length != 0) {
            if (email.includes(username) && password == "test123") {
                
                sleep(1000);
                //console.log("AFter");
                navigation.navigate('Home' ,{ email: email } );
            }
            else {
                Alert.alert("Invalid credentials");
            }
        }
        else {
            Alert.alert("Username or password fields empty");
        }
    }

    return (
        <SafeAreaView style={styles.window}>
        <Image source={require("../assets/borrowit-logo.png")} />
        <TextInput ref="Email" onChangeText={(email) => { email }} style={styles.userNameBar} placeholder="Username" />
        <TextInput secureTextEntry={true} ref="password" onChangeText={(password) => {  password }} style={styles.passwordBar} placeholder="Password" />
        <AppButton title="Login" color="#e322cc" onPress={loginPress} />
        <AppButton title="Sign up" color="#e322cc" onPress={() => { navigation.navigate('Signup') } } />
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    window: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },
    userNameBar: {
        width: '60%',
        //position: "absolute",
        //top: 95,
        height: 40,
        paddingLeft: 20,
        marginBottom: 30,
        //borderRadius: 20,
        //borderWidth: 1,
        borderBottomWidth: 2,
        borderBottomColor: "grey",
        //borderColor: "grey",
        backgroundColor: "#fff",
    },
    passwordBar: {
        width: '60%',
        //position: "absolute",
        //top: 95,
        marginBottom: 20,
        height: 40,
        paddingLeft: 20,
        //borderRadius: 20,
        //borderWidth: 1,
        borderBottomWidth: 2,
        borderBottomColor: "grey",
        //borderColor: "grey",
        backgroundColor: "#fff",
    },
    
})



export default LoginSreen;
