import React, { useContext } from "react";
import * as Yup from "yup";
import UserContext from "../../auth/context";
import { useNavigation } from "@react-navigation/native";

import AppScreen from "./AppScreen";
import FromContainer from "./FormContainer";
import FormField from "./FormField";
import PickerField from "./PickerField";
import SubmitButton from "./SubmitButton";
import ImageField from "./ImageIField";

const validationSchema = Yup.object().shape({
  images: Yup.array().min(1, "You must insert at least image."),
});


function AppListingForm({ navigation }) {


  const onSubmit = async (values, { resetForm }) => {

    await axios({
      url: Constants.GRAPHQL_API,
      method: 'post',
      data: {
       query: `
       mutation{
          uploadImage(fileurl:"${item.images[0].uri}",userId:"${userId}"){
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

    resetForm();
  };
  return (
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
          <SubmitButton title="Upload" color={"#ccc"} />
        </>
      </FromContainer>
    </AppScreen>
  );
}

export default AppListingForm;
