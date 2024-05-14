import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  Pressable,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { ProjectImages } from "../../../../Constants";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { database } from "../../../../firebaseConfig";


type ProfolioCarrouselProps = {
  navigation: any;  
};

export const ProfolioCarrousel = ({ navigation }:ProfolioCarrouselProps) => {
  const [data, setData] = useState([]);



  useEffect(() => {
    const collectionRef = collection(database, "Projects");
    const q = query(collectionRef, where("user_id" ,"==" ,"3828")); // El ide 3828 es harcodeado
    const unsubscribe = onSnapshot(q, (querySnapshot) => {

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
/*Esta pantalla recibe todos los proyectos pertenecientes al usuario logueado*/
  return (
    <ScrollView  showsVerticalScrollIndicator={false}  style= {{backgroundColor:"transparent"}}>
      <FlashList
        data={data}
        numColumns={2}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        estimatedItemSize={Dimensions.get("window").width / 2 - 20}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ flex: 1, margin: 2 }}>
            <Pressable onPress={()=>navigation.navigate("PorfolioDetail",{ item:item} )}>
              <Image
                source={{ uri: item.url[0]}}
                style={{
                  width: "100%",
                  minHeight: 200,
                  borderRadius: 10,
                  borderColor: "#d35647",
                  resizeMode: "cover",
                }}
              />
            </Pressable>
          </View>
        )}
      />
    </ScrollView>
  );
};
