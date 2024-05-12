import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { database, storage } from "../../../../firebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { ToastAndroid } from "react-native";


export const JobControler = () => {

    const grantState = {
        title:"",
        name:"",
        organization:"",
        totalCash:0,
        startDate:"",
        finishDate:"",
        minAge:"",
        maxAge:"",
        participants:"",
        specifications:"",
        bases:"",
        officalBases:"",
    }

const handleChangeTex = (value, name) => {
    setState({...state, [name]:value})
}

  const [state, setState] = useState(grantState);

    const saveJob = async () => {
        try {
            await addDoc(collection(database, 'Jobs'), { ...state });
            return true; 
        } catch (error) {
            console.error("error:", error);
            return false; 
        }
    };

  
 
  return{
    handleChangeTex,
    saveJob,
    state

}
};

