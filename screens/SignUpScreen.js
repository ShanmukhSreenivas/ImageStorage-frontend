import { Image, StyleSheet, TextInput, Button,  AsyncStorage, View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import React , {useState ,useEffect} from 'react'
import axios from 'axios';
import * as Constants from '../constants/constants' 


function SignUpScreen({ navigation }) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
  
    function onSignUp() {
 
        axios({
            url: Constants.GRAPHQL_API,
            method: 'post',
            data: {
             query: `mutation{
              createUser(name: "${username}",email: "${email}",  password : "${password}"){
               name
               id
               email
              }
             }`
            }
           })
            .then(res => {
             console.log(res.data);
             AsyncStorage.setItem('userId', res.data.data.createUser.id )
            })
            .catch(err => {
             console.log(err.message);
            });
    
            navigation.navigate('Home');
      }
    

    return (
        <SafeAreaView style={styles.window}>
            <Text style={styles.pageHeader}>Sign Up</Text>
            <Text style={styles.labels}>User Name</Text>
            <TextInput style={styles.userinputs} placeholder="Name" onChangeText={(username) => setUsername(username)}/>
            <Text style={styles.labels}>Email</Text>
            <TextInput style={styles.userinputs} placeholder="Email"  onChangeText={(email) => setEmail(email)} />
            <Text style={styles.labels}>Password</Text>
            <TextInput secureTextEntry={true} style={styles.userinputs} placeholder="Password" />
            <Text style={styles.labels}>Re-Type Password</Text>
            <TextInput secureTextEntry={true} style={styles.userinputs} placeholder="Re-Password" onChangeText={(password) => setPassword(password)}/>
            <TouchableOpacity style={styles.buttonContainer}  onPress={onSignUp} >
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
        color: "#fff",
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