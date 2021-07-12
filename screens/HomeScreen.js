import React from 'react';
import {Image, View, StyleSheet, FlatList,TouchableOpacity, AsyncStorage } from "react-native";
import AppScreen from "../components/AppScreen";
import ListItemSeparator from "../components/ItemSeparatorComponent";
import axios from 'axios';



function HomeScreen({ navigation }) {

    const [items, setItems] = useState({items: []});
    const userId = AsyncStorage.getItem('userId',(err,result) => {
      console.log(result);
    })
    useEffect( () => {
      const fetchData = async () => {
        await axios({
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
          setItems({items: result})
        })
        .catch(err => {
          console.log(err.message);
        });
      }
      fetchData();
    })
    return (
        <AppScreen>
        <FlatList
          data={items}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <TouchableOpacity  onPress={() => {
              navigation.navigate("Picture" , {imagename: item.imagename,imageurl : item.imageurl});
            }} disabled= {false} >
              <View style={styles.container}>
               <View style={styles.card}>
                <Image source={{ uri: item.imageurl}} style={styles.image} />
                </View>
              </View>
            </TouchableOpacity>
              )}
              />
            <TouchableOpacity onPress={() => { navigation.navigate('UploadImage') }}>
                <Image style={styles.postIcon} source={require("../assets/upload.png")} />
            </TouchableOpacity>
        </AppScreen>            
    );
}

export default HomeScreen;

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
      detailsContainer: {
        padding: 20,
      },
      title: {
        marginBottom: 7,
      },
      price: {
        color: "#4ecdc4",
        fontWeight: "bold",
      },
  
})