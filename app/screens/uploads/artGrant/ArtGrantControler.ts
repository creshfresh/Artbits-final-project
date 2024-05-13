import * as DocumentPicker from "expo-document-picker";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { database } from "../../../../firebaseConfig";
export const ArtGrantControler = (startDate, endDate, participants) => {
  const [pickerPdf, setPickedPDF] = useState(false);
  const grantState = {
    name: "",
    organization: "",
    totalGranted: "",
    startDate: null,
    finishDate: null,
    minAge: "",
    maxAge: "",
    participants: "",
    specifications: "",
    terms: "",
    officalPdf: "",
  };
  const pickDocument = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({});
      console.log(result, result.assets[0].uri);
      setPickedPDF(true);
    } catch (error) {
      // alert(error);
    }
  };

  const handleChangeTex = (value, name) => {
    setState({ ...state, [name]: value });
  };
  const checkAllTextFields = () => {
    const {
      name,
      organization,
      totalGranted,
      startDate,
      finishDate,
      minAge,
      maxAge,
      participants,
      specifications,
      officalPdf,
      terms,
    } = state;
    return (
      name &&
      organization &&
      totalGranted &&
      startDate &&
      finishDate &&
      minAge &&
      maxAge &&
      participants &&
      specifications &&
      terms &&
      officalPdf
    );
  };
  const [showErrors, setShowErrors] = useState(false);

  const [state, setState] = useState(grantState);

  const saveGrant = async () => {
    if (checkAllTextFields()) {
      try {
        const data = {
          ...state,
          startDate: startDate,
          finishDate: endDate,
          participants: participants,
        };
        await addDoc(collection(database, "Art_Grants"), data);
        return true;
      } catch (error) {
        console.error("error:", error);
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
    saveGrant,
    state,
    showErrors,
    setShowErrors,
    pickerPdf,
    pickDocument,
  };
};
