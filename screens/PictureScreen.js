import React from 'react';
import {Image, View, StyleSheet, TouchableOpacity } from "react-native";
import AppScreen from "../components/AppScreen";
import Share from 'react-native-share';

function PictureScreen({ route, navigation }) {
    const { imageurl } = route.params
    const myCustomShare = async () => {
        const shareOptions = {
            message: imageurl,
        }
        try {
            const ShareResponse = await Share.open(shareOptions);
        } catch(error){
            throw new Error(error)
        }
    }
    return (
        <AppScreen>
        <TouchableOpacity /*onPress={this.onclick} disabled={this.state.disabled}*/>
        <View style={styles.container}>
          <View style={styles.card}>
            <Image source={{ uri: imageurl }} style={styles.image} />
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer}  onPress={myCustomShare} >
            <Text style={styles.buttonText}>Share</Text>
      </TouchableOpacity>
      </AppScreen>
    );
}

export default PictureScreen;

const styles = StyleSheet.create({
      container: {
        shadowColor: "#DCDCDC",
        shadowOffset: {
          width: 3,
          height: 3,
        },
        shadowOpacity: 1,
        shadowRadius: 3,
        padding: 15,
        paddingVertical: 5,
      },
      card: {
        borderRadius: 20,
        backgroundColor: "#fff",
        marginBottom: 20,
        overflow: "hidden",
      },
      image: {
        width: "100%",
        height: 200,
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
})