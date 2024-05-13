import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { database } from "../../../firebaseConfig";

export const ContesteViewControler = () => {
    
  const [data, setData] = useState([]);


  // Esta función recibe todos los datos de los concursos
  //TODO: implementar filtros
  useEffect(() => {

    const collectionRef = collection(database, "Contest");
    const q = query(collectionRef,orderBy("publishDate", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log("querySnapshot unsusbscribe");
      setData(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          url: doc.data().url,
          title: doc.data().title,
          description: doc.data().description,
        
        }))
      );
    });
    return unsubscribe; 

  }, []);

  return data
  
}