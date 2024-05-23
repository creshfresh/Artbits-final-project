import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { database, storage } from "../../../../firebaseConfig";
import { ContestData } from "../../../../types";

export const ConestControler = (minDate, endDate, participants) => {
  const [image, setImage] = useState("");

  const currentDate = new Date().toISOString()
  const contestData: ContestData = {
    user_id:"3232",
    name: "",
    image: "",
    organization: "",
    totalCash: "",
    startDate: null,
    finishDate: null,
    minAge: "",
    maxAge: "",
    participants: "Spain",
    specifications: "",
    terms: "",
    objetive: "",
    urlbases: null,
    publishDate: currentDate,
    weburl: "",
  };

  const pickImage = async () => {
    setImage('');
  
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false, 
      quality: 0.2,
      aspect: [3, 4],
    });
  
    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const [showErrors, setShowErrors] = useState(false);
  const [pickedPdf, setPickedPDF] =
    useState<DocumentPicker.DocumentPickerResult>();

  const [state, setState] = useState(contestData);
  const handleChangeTex = (value, name) => {
    setState({ ...state, [name]: value });
  };

  const checkAllTextFields = () => {
    const {
      name,
      organization,
      finishDate,
      minAge,
      maxAge,
      participants,
      specifications,
      terms,
      objetive,
      weburl
    } = state;
    return (
      name &&
      organization &&
      finishDate &&
      minAge &&
      maxAge &&
      minAge < maxAge &&
      maxAge > minAge &&
      participants &&
      specifications &&
      terms &&
      objetive &&
      weburl
    );
  };
  const pickDocument = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({});
      if (result && result.assets) {
        handleChangeTex(result, "urlbases");
        setPickedPDF(result);
      } else {
        console.log("No se seleccionó ningún documento.");
      }
    } catch (error) {
      console.error("Error al seleccionar el documento:", error);
    }
  };
  // const saveContest = async (url: DocumentPicker.DocumentPickerResult) => {
  //   if (checkAllTextFields()) {
  //     try {
  //       const data = {
  //         ...state,
  //         startDate: minDate,
  //         finishDate: endDate,
  //         participants: participants,
  //         urlbases: url,
  //         publishDate: currentDate
  //       };
  //       console.log("data", data);
  //       await addDoc(collection(database, "Contest"), data);
  //       return true;
  //     } catch (error) {
  //       console.error("Error al guardar el concurso:", error);
  //       return false;
  //     }
  //   } else {
  //     setShowErrors(true);
  //     Alert.alert("Error en validaciones ");
  //     console.error("Error en las validaciones");
  //     return false;
  //   }
  // };
  const saveContest = async (url: DocumentPicker.DocumentPickerResult) => {
    if (checkAllTextFields()) {
      try {
        if (image) {
          const response = await fetch(image);
          const blob = await response.blob();
          const storageRef = ref(storage, "Images/" + new Date().getTime());
          await uploadBytesResumable(storageRef, blob);
          const downloadURL = await getDownloadURL(storageRef);
  
    
        const data = {
          ...state,
          startDate: minDate,
          finishDate: endDate,
          participants: participants,
          urlbases: url,
          publishDate: currentDate,
          image: downloadURL,
        };
  
        await addDoc(collection(database, "Contest"), data);
        return true;
      } else {
        setShowErrors(true);
        return false;
      }
    } catch (error) {
      console.error("Error saving Contest:", error);
      return false;
    }
  } else {
    setShowErrors(true);
    return false;
  }
};

  return {
    handleChangeTex,
    saveContest,
    state,
    showErrors,
    setShowErrors,
    pickedPdf,
    image,
    pickDocument,
    pickImage
  };
};
