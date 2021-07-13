import AppButton from '../components/AppButton';
import React , {useState ,useEffect} from 'react'
import axios from 'axios';
import { Alert , StyleSheet , Image, TextInput , AsyncStorage ,SafeAreaView, TouchableOpacity} from 'react-native'
import * as Constants from '../constants/constants' 
import AppText from '../components/AppText';

function LoginScreen({ navigation }) {


    const [ email , setEmail ] = useState('')
    const [ password , setPassword ] = useState('')
 

function onLogin () {
 
    const loguser = async () => {
        if(email === ''){
            return Alert.alert("Invalid", "Enter the correct email", [
                { text: "Go Back", onPress: () => navigation.navigate('Login') },
              ]
            )
        }
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

  function googleLogin () {
 
    const loguser = async () => {

        await axios({
            url: Constants.GRAPHQL_API,
            method: 'post',
            data: {
            query: `
            mutation{
                authGoogle(input : {
                    accessToken: "ya29.a0ARrdaM9i09ny91ISZ27LDivno3ixOH8g2lXsNqkkZxUgR6yXWe9a3cY1ZZQh5xP5bcw9OcmlzxoRAaBbXDp1wUM_FZASiSK1PxDkbMNWvjAWAt-KZD-j1UPIP_5pslGJB8m_H_HdXjKgGzjs0gWs3UtlI97Y"
                }){
                userId
                token
                }
            }
            `
            }
        })
            .then(res => {
            console.log(JSON.stringify(res.data));
            AsyncStorage.setItem('userId', res.data.data.authGoogle.userId)

            navigation.navigate('Home');

            })
            .catch(err => {
            console.log(err.message);
            });
    }
    loguser();
  }

  function facebookLogin () {
 
    const loguser = async () => {

        await axios({
            url: Constants.GRAPHQL_API,
            method: 'post',
            data: {
            query: `
            mutation{
                authFacebook(input : {
                    accessToken: "EAADukZCWniyYBACFrCzXHPfOK0ZCR5eonN55qveKMI2Y5Xhg7mzt9TjVZCn4c74CyABo5XjNb9oVTA94P12GhQV4pZBD0jW5lNNkF7bVbshaDng2wtVv4v8edjbJqQQCg4GZB5NjZA9ZCdl2qjnxLOYTJLwCqreeu8MmVI8IjWERSfFMa4NgajiHY0prPSHEPXYuUebdTVaYrrYVzSqago9"
                }){
                    userId
                    token
                }
            }
            `
            }
        })
            .then(res => {
            console.log(JSON.stringify(res.data));
            AsyncStorage.setItem('userId', res.data.data.authFacebook.userId)

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
        <TextInput onChangeText={(email) => setEmail( email ) } style={styles.userNameBar} placeholder="Username" />
        <TextInput secureTextEntry={true} onChangeText={(password) => setPassword(password)} style={styles.passwordBar} placeholder="Password" />
        <AppButton title="Login" color="#e322cc" onPress={onLogin} />
        <AppButton title="Sign up" color="#e322cc" onPress={() => { navigation.navigate('SignUp') } } />
        <TouchableOpacity
                  style={[styles.buttonContainer]}
                   onPress={googleLogin} >
                  <AppText style={styles.text}>Login With Google</AppText>
        </TouchableOpacity>
        <TouchableOpacity
                  style={[styles.buttonContainer]}
                    onPress={facebookLogin} >
                  <AppText style={styles.text}>Login With Facebook</AppText>
        </TouchableOpacity>

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
        height: 40,
        paddingLeft: 20,
        marginBottom: 30,
        borderBottomWidth: 2,
        borderBottomColor: "grey",
        backgroundColor: "#fff",
    },
    passwordBar: {
        width: '60%',
        marginBottom: 20,
        height: 40,
        paddingLeft: 20,
        borderBottomWidth: 2,
        borderBottomColor: "grey",
        backgroundColor: "#fff",
    },
    buttonContainer: {
        width: "80%",
        height:40,
        borderRadius:5,
        marginTop:35,
        justifyContent:"center",
        alignItems:'center',
        backgroundColor:"#DCDCDC"
    },
    text:{
        color: "#000000",
        fontWeight: "200",
        fontSize: 12,
        letterSpacing: 2,
    }
})



export default LoginScreen;
