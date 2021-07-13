import React , {useState, useEffect} from 'react';
import AppText from '../components/AppText';
import { AsyncStorage, View, StyleSheet, Image, TouchableOpacity, SafeAreaView} from "react-native";
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import Constants from '../constants/constants'


function UploadImageScreen({ navigation }) {
  
    const [items, setItems] = useState({});

    const [userId, setUserId] = useState('');
    const getUserId = async () => {AsyncStorage.getItem('userId',(err,result) => {
        setUserId(result);
      })
    }

    const chooseFile = async () => {
      await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        includeBase64: true
      }).then(image => {
        setItems(image);
        console.log(image.data)
      });
    };
    
    const captureImage = async () => {
      await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      }).then(image => {
        setItems(image);
        console.log(image);
      });
    }

    const onSubmit = async () => {
      getUserId();      
      const base64img = "data:image/jpeg;base64," + items.data;
     await axios({
        url: Constants.GRAPHQL_API,
        method: 'post',
        data: {
         query: `
         mutation{
            uploadImage(fileurl:"${base64img}",userId:"${userId}"){
            userId
            imagename
            imageurl
            }
         }
         `
        }
       })
        .then(res => {
         console.log(JSON.stringify(res.data));
         navigation.navigate('Home')
        })
        .catch(err => {
         console.log(err.message);
        });
    }

    return (
            <SafeAreaView style={{flex: 1}}>
              <View style={styles.container}>
                <Image
                  source={{uri: items.path}}
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

