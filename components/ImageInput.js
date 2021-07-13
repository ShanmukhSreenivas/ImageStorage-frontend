import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import * as ImagePicker from 'react-native-image-picker'


function ImageInput({ imageUri, onChangeImage }) {

  const [didMount, setDidMount] = useState(false);


  useEffect(() => {

    setDidMount(true);
    return () => setDidMount(false);
  }, []);
  if (!didMount) {
    return null;
  }

  const handlePress = () => {
    if (!imageUri) selectImage();
    else
      Alert.alert("Delete", "Are you sure you want delete this image", [
        { text: "Yes", onPress: () => onChangeImage(null) },
        { text: "No" },
      ]);
  };

  const selectImage = async () => {
    try {
    await ImagePicker.launchImageLibraryAsync({
        mediaType: 'photo',
        quality: 0.5,
      },(response)=>{
        onChangeImage(response)
      });
    } catch (error) {
      console.log("Error reading image", error);
    }
  };


  return (
      <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        {!imageUri ? (
                <Image source={require("../assets/camera-icon.png")} style={styles.icon} />
                ) : (
          <Image source={{ uri: imageUri }} style={styles.image} />
        )}
      </View>
      </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    height: 120,
    width: 120,
    shadowColor: "#fff",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 7,
  },
  image: {
    borderRadius: 15,
    width: "100%",
    height: "100%",
  },
  icon: {
    borderRadius: 15,
    width: 20,
    height: 20,
  }
});

export default ImageInput;
