import * as DocumentPicker from "expo-document-picker";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { database } from "../../../../firebaseConfig";
import { ArtGrantData } from "../../../../types";

export const ArtGrantControler = (minDate, endDate, participants) => {

  const currentDate = new Date().toISOString()
  const grantState: ArtGrantData = {
    user_id:"3232",
    name: "",
    organization: "",
    totalGranted: "",
    startDate: null,
    finishDate: null,
    minAge: "",
    maxAge: "",
    participants: "Spain",
    specifications: "",
    terms: "",
    urlbases: null,
    publishDate: currentDate,
    weburl: "",
    destinyCentre:""
  };


  const [showErrors, setShowErrors] = useState(false);
  const [pickedPdf, setPickedPDF] =
    useState<DocumentPicker.DocumentPickerResult>();

  const [state, setState] = useState(grantState);
  const handleChangeTex = (value, name) => {
    setState({ ...state, [name]: value });
  };

  const checkAllTextFields = () => {
    const {
      name,
      organization,
      totalGranted,
      destinyCentre,
      startDate,
      finishDate,
      minAge,
      maxAge,
      participants,
      specifications,
      urlbases,
      terms,
      publishDate,
      weburl
    } = state;
    return (
      name &&
      organization &&
      totalGranted &&
      destinyCentre &&
      // startDate &&
      finishDate &&
      minAge &&
      maxAge &&
      minAge < maxAge &&
      maxAge > minAge &&
      participants &&
      specifications &&
      terms &&
      urlbases&&
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
  const saveGrant = async (url: DocumentPicker.DocumentPickerResult) => {
    if (checkAllTextFields()) {
      try {
        const data = {
          ...state,
          startDate: minDate,
          finishDate: endDate,
          participants: participants,
          urlbases: url,
          publishDate: currentDate
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
    pickedPdf,
    pickDocument,
  };
};
