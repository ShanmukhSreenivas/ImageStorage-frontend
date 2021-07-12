import React , {useState, useEffect} from 'react';
import { ScrollView } from "react-native-gesture-handler";
import AppScreen from "../components/AppScreen";
import FromContainer from "../components/FormContainer";
import ImageField from "../components/ImageIField";
import * as Yup from "yup";
import SubmitButton from '../components/SubmitButton';

function UploadImageScreen({ navigation }) {
    
    const [ images, setImages ] = useState( { images: [] } ); 
    const userId = AsyncStorage.getItem('userId',(err,result) => {
      console.log(result);
    })
 
    const validationSchema = Yup.object().shape({
        images: Yup.array().min(1, "You must insert an image."),
      });
    const onSubmit = (values,{ resetForm }) => {
      
      axios({
        url: Constants.GRAPHQL_API,
        method: 'post',
        data: {
         query: `
         mutation{
            uploadImage(fileurl:"${values.images[0].uri}",userId:"${userId}"){
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
              <SubmitButton title="Post" color={colors.primary} />            
            </>
          </FromContainer>
        </AppScreen>
      </ScrollView>
    );
}

export default UploadImageScreen;



/* const onSubmit = async (values, { resetForm }) => {
  const { data: listing, ok: response } = await listingApi.addListing({
    ...values,
    userId: user.userId,
  });
  if (!response) return;

  const { ok } = await imageApi.PostImage(
    listing.listingId,
    values.images[0].base64
  );
  if (!ok) return console.log("error");

  navigation.navigate("Listings");

  resetForm();
}; */