import AppButton from '../components/AppButton';
import React , {useState ,useEffect} from 'react'
import axios from 'axios';
import { Alert , StyleSheet , Image, TextInput , AsyncStorage ,SafeAreaView} from 'react-native'
import * as Constants from '../constants/constants' 


function LoginScreen({ navigation }) {


    const [ email , setEmail ] = useState('')
    const [ password , setPassword ] = useState('')
 

function onLogin () {
 
    const loguser = async () => {
        await axios({
            url: Constants.GRAPHQL_API,
            method: 'post',
            data: {
            query: `
            query{
                login(email:"${email}",password:"${password}"){
                userId
                token
                }
            }
            `
            }
        })
            .then(res => {
            console.log(JSON.stringify(res.data));
            AsyncStorage.setItem('userId', res.data.data.login.userId)

            navigation.navigate('Home');

            })
            .catch(err => {
            console.log(err.message);
            });
    }
    loguser();
  }


    
    return (
        <SafeAreaView style={styles.window}>
        <Image source={require("../assets/image-storage-logo.png")} />
        <TextInput /* ref="Email" */ onChangeText={(email) => setEmail( email ) } style={styles.userNameBar} placeholder="Username" />
        <TextInput secureTextEntry={true} /* ref="password" */ onChangeText={(password) => setPassword(password)} style={styles.passwordBar} placeholder="Password" />
        <AppButton title="Login" color="#e322cc" onPress={onLogin} />
        <AppButton title="Sign up" color="#e322cc" onPress={() => { navigation.navigate('SignUp') } } />
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



export default LoginScreen;
