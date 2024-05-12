import { useState } from "react";
import { database, storage } from "../../../../firebaseConfig";
import * as DocumentPicker from 'expo-document-picker';
import { addDoc, collection } from "firebase/firestore";
export const ConestControler = (startDate, endDate) => {
  const grantState = {
    name: "",
    organization: "",
    totalCash: "",
    startDate: null,
    finishDate: null,
    minAge: "",
    maxAge: "",
    participants: "",
    specifications: "",
    terms: "",
    objetive:"",
    urlbases:"",
  };
  const pickSomething = async () => {
    try {
      const docRes = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
    });
      
      console.log(docRes);
    } catch (error) {
      console.log("Error while selecting file: ", error);
    }
  };  
  const [showErrors, setShowErrors] = useState(false);

  const [state, setState] = useState(grantState);
  const handleChangeTex = (value, name) => {
    setState({ ...state, [name]: value });
  };

  const checkAllTextFields = () => {
    const {
      name,
      organization,
      startDate,
      finishDate,
      minAge,
      maxAge,
      participants,
      specifications,
      terms,
      objetive,
      urlbases
    } = state;
    return (
      name &&
      organization &&
      startDate &&
      finishDate &&
      minAge &&
      maxAge &&
      participants &&
      specifications &&
      terms&&
      objetive &&
      urlbases
    );
  };

  const saveContest = async () => {
    if (checkAllTextFields()) {
      try {
        const data = { ...state, startDate: startDate, finishDate: endDate };
        await addDoc(collection(database, "Contest"), data);
        return true;
      } catch (error) {
        console.error("Error al guardar el concurso:", error);
        return false;
      }
    } else {
      setShowErrors(true);
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
pickSomething  };
};
