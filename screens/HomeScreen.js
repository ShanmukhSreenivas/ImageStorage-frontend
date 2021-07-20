import React ,{ useState, useEffect }from 'react';
import {Image, View, StyleSheet, FlatList,TouchableOpacity, AsyncStorage, SafeAreaView } from "react-native";
import ListItemSeparator from "../components/ItemSeparatorComponent";
import axios from 'axios';
import * as Constants from '../constants/constants'



function HomeScreen({ navigation }) {

    const [userId, setUserId] = useState('');
    const [items, setItems] = useState({items: []});
    const [loading, setLoading] = useState(true);

    const getUserId = async () => {AsyncStorage.getItem('userId',(err,result) => {
          setUserId(result);
        })
      }

    useEffect( () => {

      getUserId();
      const fetchData = () => {
         axios({
          url: Constants.GRAPHQL_API,
          method: 'post',
          data: {
          query: `
          query{
              userPictures(userId:"${userId}"){
                id
                userId
                imagename
                imageurl
            }
          }
          `
          }
        })
        .then(res => {
          const result = res.data.data;
          setItems({items: result.userPictures})
        })
        .catch(err => {
          console.log(err.message);
        });
      }
      fetchData();
    })
    
    return (
      <SafeAreaView style={styles.window}>
        <FlatList
          data={items.items}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <TouchableOpacity  onPress={() => {
              navigation.navigate("Picture" , {imagename: item.imagename,imageurl : item.imageurl});
            }} disabled= {false} >
              <View style={styles.container}>
               <View style={styles.card}>
                <Image source={{ uri: item.imageurl}} style={styles.image} resizeMode='contain'/>
                </View>
              </View>
            </TouchableOpacity>
              )}
              />
            <View style={styles.taskBar}>
                  <TouchableOpacity onPress={() => { navigation.navigate('UploadImage') }}>
                      <Image style={styles.postIcon} source={require("../assets/upload.png")} />
                  </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        shadowColor: "#fff",
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
        marginLeft:35
      },
      image: {
        width:310,
        height:400,
        borderRadius:1
      },
      detailsContainer: {
        padding: 20,
      },
      taskBar: {
        backgroundColor: "#fff",
        width: "100%",
        height: 65,
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-around",
        paddingBottom: 10
    },
    window: {
      flex: 1,
      backgroundColor: "#fff",
  }, 
})