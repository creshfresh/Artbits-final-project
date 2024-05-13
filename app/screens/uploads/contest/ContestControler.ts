import * as DocumentPicker from "expo-document-picker";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { database } from "../../../../firebaseConfig";
import { Alert } from "react-native";

export const ConestControler = (minDate, endDate, participants) => {

  const grantState = {
    name: "",
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
  };
  const pickSomething = async () => {
    try {
      const docRes = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });

      console.log(docRes);
    } catch (error) {
      console.log("Error while selecting file: ", error);
    }
  };
  const [showErrors, setShowErrors] = useState(false);
  const [pickedPdf, setPickedPDF] = useState< DocumentPicker.DocumentPickerResult>();

  const [state, setState] = useState(grantState);
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
      objetive 
 
    );
  };
  const pickDocument = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({});
      if (result && result.assets) {
        handleChangeTex(result, "urlbases");
        setPickedPDF(result);
        console.log(pickedPdf);
      } else {
        console.log("No se seleccionó ningún documento.");
      }
    } catch (error) {
      console.error("Error al seleccionar el documento:", error);
    }
  };
  const saveContest = async (url: DocumentPicker.DocumentPickerResult) => {

    if (checkAllTextFields()) {
      try {
        
        const data = {
          ...state,
          startDate: minDate,
          finishDate: endDate,
          participants: participants,
          urlbases: url
        };
        console.log("data",data)
        await addDoc(collection(database, "Contest"), data);
        return true;
      } catch (error) {
        console.error("Error al guardar el concurso:", error);
        return false;
      }
    } else {
      setShowErrors(true);
      Alert.alert("Error en validaciones ")
      console.error("Error en las validaciones");
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
    pickDocument,
    pickSomething,
    
  };
};
