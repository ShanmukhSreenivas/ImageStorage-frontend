import React from 'react';
import {Image, View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import Share from 'react-native-share';

function PictureScreen({ route, navigation }) {
    const { imagename, imageurl } = route.params
    const myCustomShare = async () => {
        const shareOptions = {
            url: imageurl
        }
        try {
            const ShareResponse = await Share.open(shareOptions);
        } catch(error){
            throw new Error(error)
        }
    }
    const find_dimesions = (layout) => {
      const {x, y, width, height} = layout;
      console.warn(x);
      console.warn(y);
      console.warn(width);
      console.warn(height);
    }
    return (
      <SafeAreaView style={styles.window}>
        <TouchableOpacity disabled={true}>
        <View style={styles.container} onLayout={(event) => { find_dimesions(event.nativeEvent.layout) }}>
          <View style={styles.card}>
            <Image source={{ uri: imageurl }} style={styles.image} resizeMode='contain'/>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer}  onPress={myCustomShare} >
            <Text style={styles.buttonText}>Share</Text>
      </TouchableOpacity>
      </SafeAreaView>
    );
}

export default PictureScreen;

const styles = StyleSheet.create({

  window:{
    flex: 1,
    backgroundColor: "#fff",
  },
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
        width: "95%"
      },
      card: {
        borderRadius: 2,
        backgroundColor: "#fff",
        marginBottom: 20,
        marginLeft:40
      },
      image: {
        width:300,
        height:400,
      },
       buttonContainer: {
        position: "absolute",
        top: 450,
        left:80,
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
 
  
})