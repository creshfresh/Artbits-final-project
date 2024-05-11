import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { database, storage } from "../../../../firebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { ToastAndroid } from "react-native";


export const ArtGrantControler = () => {

    const grantState = {
        title:"",
        name:"",
        organization:"",
        totalGranted:"",
        startDate:"",
        finishDate:"",
        minAge:"",
        maxAge:"",
        participants:"",
        specifications:"",
        bases:"",
        image:"",
        officalBases:"",
    }

const handleChangeTex = (value, name) => {
    setState({...state, [name]:value})
}

  const [state, setState] = useState(grantState);

    const saveGrant = async () => {
        try {
            await addDoc(collection(database, 'Art_Grants'), { ...state });
            return true; 
        } catch (error) {
            console.error("error:", error);
            return false; 
        }
    };

  
 
  return{
    handleChangeTex,
    saveGrant,
    state

}
};


