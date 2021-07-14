import React , {useState, useEffect} from 'react';
import AppText from '../components/AppText';
import { AsyncStorage, View, StyleSheet, Image, TouchableOpacity, SafeAreaView} from "react-native";
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';


function UploadImageScreen({ navigation }) {
  
    const [images, setImages] = useState({});
    const [photo, setPhoto] = useState({});
    const [userId, setUserId] = useState('');
    const getUserId = async () => {AsyncStorage.getItem('userId',(err,result) => {
        setUserId(result);
      })
    }

    const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/babbl/image/upload";

    const chooseFile = async () => {
      await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        includeBase64: true,
        compressImageQuality: 0.8
      }).then(image => {
        setImages(image);
      });
    };
    
    const captureImage = async () => {
      await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
        includeBase64: true,
        compressImageQuality: 0.8
      }).then(image => {
        setImages(image);
      });
    }

 
      const onSubmit = async () => {
      getUserId();

      let base64Img = `data:${images.mime};base64,${images.data}`;
      let data = {
        "file": base64Img,
        "upload_preset": "imagestorage",
      }
  
      await fetch(CLOUDINARY_URL, {
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST',
      }).then(async r => {
        let data = await r.json()
        setPhoto(data);
      }).catch(err => console.log(err))

        const name = `${photo.public_id}.${photo.format}`;      
        console.log(name)
        await axios({
          url: 'http://192.168.1.35:5000/graphql',
          method: 'post',
          data: {
           query: 
           `mutation{
            uploadImage(imagename:"${name}",imageurl:"${photo.url}",userId:"${userId}"){
             userId
             imageurl
             imagename
            }
           }`
          }
         })
          .then(res => {
          })
          .catch(err => {
           console.log(err.message);
          });

    }

    return (
            <SafeAreaView style={{flex: 1}}>
              <View style={styles.container}>
                <Image
                source={{uri: images.path}}
                style={styles.imageStyle}
                />
                <TouchableOpacity
                  style={[styles.buttonContainer, { backgroundColor: "#e322cc" }]}
                  onPress={captureImage}>
                  <AppText style={styles.text}>Capture Image</AppText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.buttonContainer, { backgroundColor: "#e322cc" }]}
                  onPress={chooseFile}>
                  <AppText style={styles.text}>Choose Image</AppText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.buttonContainer, { backgroundColor: "#e322cc" }]}
                  onPress={onSubmit}
                >
                  <AppText style={styles.text}>Upload</AppText>
              </TouchableOpacity>

              </View>
          </SafeAreaView>
    );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  imageStyle: {
    width: 250,
    height: 250,
    margin: 5,
    marginBottom: 40,
    marginTop:70
  },
  buttonContainer: {
    width: "60%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 25,
    marginTop: 25,
  },
  text: {
    color: "white",
    textTransform: "uppercase",
    fontWeight: "200",
    fontSize: 12,
    letterSpacing: 3,
  },
});


export default UploadImageScreen;

