import { useState } from "react";
import { database } from "../../../../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { Alert } from "react-native";
import { CourseData } from "../../../../types";

export const CourseControler = () => {
  const CourseState: CourseData = {
    user_id: "",
    courseName: "",
    city: "",
    instructorName:"",
    country: "",
    startDate: "",
    finishDate: "",
    spots: "",
    schedule: "",
    price: "",
    weburl: "",
  };

  const [showErrors, setShowErrors] = useState(false);
  const [state, setState] = useState(CourseState);

  const checkAllTextFields = () => {
    const {
    instructorName,
      city,
      country,
      courseName,
      startDate,
      finishDate,
      spots,
      schedule,
      price,
      weburl,
    } = state;
    return (
      courseName &&
      city &&
      country &&
      startDate &&
      finishDate &&
      spots &&
      schedule &&
      instructorName &&
      weburl &&
      price
    );
  };

  const handleChangeTex = (value, name) => {
    setState({ ...state, [name]: value });
  };

  const saveCourse = async () => {
      try {
        await addDoc(collection(database, "Courses"), { ...state });
        return true;
      } catch (error) {
        console.error("Error saving Course: ", error);
        Alert.alert("Error", "Error saving Course.");
        return false;
      }
    
  };

  return {
    handleChangeTex,
    saveCourse,
    state,
    setShowErrors,
    showErrors,
    checkAllTextFields
  };
};
