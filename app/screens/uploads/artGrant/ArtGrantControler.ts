import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { database, storage } from "../../../../firebaseConfig";

export const ArtGrantControler = (startDate, endDate ) => {
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
      terms 
      
    );
  };
  const [showErrors, setShowErrors] = useState(false);

  const [state, setState] = useState(grantState);

  const saveGrant = async () => {
    if (checkAllTextFields()) {
      try {
        const data = { ...state, startDate: startDate, finishDate: endDate };
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
  };
};
