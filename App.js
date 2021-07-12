import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import UploadImageScreen from "./screens/UploadImageScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import PictureScreen from "./screens/PictureScreen";
import 'react-native-gesture-handler';


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="UploadImage" component={UploadImageScreen} />
        <Stack.Screen name="Picture" component={PictureScreen} initialParams={{ imagename: "sample_image", imageurl: "./assets/borrowit-logo.png" }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;


