import React from 'react';
import { ScrollView } from "react-native-gesture-handler";
import AppScreen from "../components/AppScreen";
import FromContainer from "../components/FormContainer";
import ImageField from "../components/ImageIField";
import * as Yup from "yup";
import AppButton from '../components/AppButton';

function UploadImageScreen({ navigation }) {
    
    const validationSchema = Yup.object().shape({
        images: Yup.array().min(1, "You must insert an image."),
      });
    const onSubmit = () => {
        alert("Image has been uploaded");
        navigation.navigate('Home')
    }
    return (
        <ScrollView
        style={{ flex: 1, backgroundColor: "#DCDCDC" }}
        showsVerticalScrollIndicator={false}
      >
        <AppScreen>
          <FromContainer
            initialValues={{
              images: [],
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <>
              <ImageField name="images" />
              <AppButton title="Upload" color="#0c7171" onPress={onSubmit} />
            </>
          </FromContainer>
        </AppScreen>
      </ScrollView>
    );
}

export default UploadImageScreen;

