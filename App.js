import React, {useState,useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import UploadImageScreen from "./screens/UploadImageScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import PictureScreen from "./screens/PictureScreen";
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createStackNavigator();

function App() {

  const [user,setUser] = useState('');

  const getUserFromStorage = async () => {AsyncStorage.getItem('token',(err,result) => {
    setUser(result);
  })
  }
  
/* const AuthNavigator = () => (
  <Stack.Navigator>
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown : false}}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown : false}}/>
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown : false}}/>
  </Stack.Navigator>
)

const AppNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="UploadImage" component={UploadImageScreen} />
        <Stack.Screen name="Picture" component={PictureScreen} initialParams={{ imagename: "sample_image", imageurl: "./assets/borrowit-logo.png" }}/>
    </Stack.Navigator>  
)
 */

  return (
/*       <NavigationContainer>
        { (user === '') ? <AuthNavigator /> : <AppNavigator />}
      </NavigationContainer>
 */   <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown : false}} />
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown : false}}/>
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown : false}}/>
        <Stack.Screen name="Home" component={HomeScreen} options={{title: 'Home',headerLeft: null}}/>
        <Stack.Screen name="UploadImage" component={UploadImageScreen} options={{title: "Upload Image",headerLeft: null}}/>
        <Stack.Screen name="Picture" component={PictureScreen} initialParams={{ imagename: "sample_image", imageurl: "./assets/borrowit-logo.png" }}/>
      </Stack.Navigator>
    </NavigationContainer> 
      );
}

export default App;


