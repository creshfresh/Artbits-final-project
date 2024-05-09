import { View, Image, StyleSheet, Dimensions, ScrollView } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { database } from "../../../firebaseConfig";
import { useEffect, useState } from "react";

type ProyectImages = {
  id: number;
  type: string;
  url: string;
  title: string;
  description: string;
};

const data: ProyectImages[] = [
  {
    id: 1,
    type: "Traditional",
    url: "https://m.media-amazon.com/images/I/81mM+jmQu-L._AC_UF894,1000_QL80_.jpg",
    title: "Old World Charm",
    description: "A collection that celebrates traditional art forms.",
  },
  {
    id: 2,
    type: "Digital",
    url: "https://www.aspca.org/sites/default/files/catblogbanner.jpg",
    title: "Old World Charm",
    description: "A collection that celebrates traditional art forms.",
  },
  {
    id: 3,
    type: "Digital",
    url: "https://www.aspca.org/sites/default/files/catblogbanner.jpg",
    title: "Old World Charm",
    description: "A collection that celebrates traditional art forms.",
  },
  {
    id: 4,
    type: "Digital",
    url: "https://www.aspca.org/sites/default/files/catblogbanner.jpg",
    title: "Old World Charm",
    description: "A collection that celebrates traditional art forms.",
  },
  {
    id: 5,
    type: "Digital",
    url: "https://www.aspca.org/sites/default/files/catblogbanner.jpg",
    title: "Old World Charm",
    description: "A collection that celebrates traditional art forms.",
  },
  {
    id: 6,
    type: "Traditional",
    url: "https://m.media-amazon.com/images/I/81mM+jmQu-L._AC_UF894,1000_QL80_.jpg",
    title: "Old World Charm",
    description: "A collection that celebrates traditional art forms.",
  },
  {
    id: 7,
    type: "Traditional",
    url: "https://m.media-amazon.com/images/I/81mM+jmQu-L._AC_UF894,1000_QL80_.jpg",
    title: "Old World Charm",
    description: "A collection that celebrates traditional art forms.",
  },
  {
    id: 8,
    type: "Traditional",
    url: "https://m.media-amazon.com/images/I/81mM+jmQu-L._AC_UF894,1000_QL80_.jpg",
    title: "Old World Charm",
    description: "A collection that celebrates traditional art forms.",
  },
  {
    id: 9,
    type: "Traditional",
    url: "https://m.media-amazon.com/images/I/81mM+jmQu-L._AC_UF894,1000_QL80_.jpg",
    title: "Old World Charm",
    description: "A collection that celebrates traditional art forms.",
  },
  {
    id: 10,
    type: "Traditional",
    url: "https://m.media-amazon.com/images/I/81mM+jmQu-L._AC_UF894,1000_QL80_.jpg",
    title: "Old World Charm",
    description: "A collection that celebrates traditional art forms.",
  },
  {
    id: 11,
    type: "Traditional",
    url: "https://m.media-amazon.com/images/I/81mM+jmQu-L._AC_UF894,1000_QL80_.jpg",
    title: "Old World Charm",
    description: "A collection that celebrates traditional art forms.",
  },
  {
    id: 12,
    type: "Traditional",
    url: "https://m.media-amazon.com/images/I/81mM+jmQu-L._AC_UF894,1000_QL80_.jpg",
    title: "Old World Charm",
    description: "A collection that celebrates traditional art forms.",
  },
  {
    id: 13,
    type: "Traditional",
    url: "https://m.media-amazon.com/images/I/81mM+jmQu-L._AC_UF894,1000_QL80_.jpg",
    title: "Old World Charm",
    description: "A collection that celebrates traditional art forms.",
  },
  {
    id: 14,
    type: "Traditional",
    url: "https://m.media-amazon.com/images/I/81mM+jmQu-L._AC_UF894,1000_QL80_.jpg",
    title: "Old World Charm",
    description: "A collection that celebrates traditional art forms.",
  },
  {
    id: 15,
    type: "Traditional",
    url: "https://m.media-amazon.com/images/I/81mM+jmQu-L._AC_UF894,1000_QL80_.jpg",
    title: "Old World Charm",
    description: "A collection that celebrates traditional art forms.",
  },
  {
    id: 16,
    type: "Traditional",
    url: "https://m.media-amazon.com/images/I/81mM+jmQu-L._AC_UF894,1000_QL80_.jpg",
    title: "Old World Charm",
    description: "A collection that celebrates traditional art forms.",
  },
  {
    id: 17,
    type: "Digital",
    url: "https://www.aspca.org/sites/default/files/catblogbanner.jpg",
    title: "Old World Charm",
    description: "A collection that celebrates traditional art forms.",
  },
  {
    id: 18,
    type: "Digital",
    url: "https://www.aspca.org/sites/default/files/catblogbanner.jpg",
    title: "Old World Charm",
    description: "A collection that celebrates traditional art forms.",
  },
  {
    id: 19,
    type: "Digital",
    url: "https://www.aspca.org/sites/default/files/catblogbanner.jpg",
    title: "Old World Charm",
    description: "A collection that celebrates traditional art forms.",
  },
  {
    id: 20,
    type: "Digital",
    url: "https://www.aspca.org/sites/default/files/catblogbanner.jpg",
    title: "Old World Charm",
    description: "A collection that celebrates traditional art forms.",
  },
  {
    id: 21,
    type: "Digital",
    url: "https://www.aspca.org/sites/default/files/catblogbanner.jpg",
    title: "Old World Charm",
    description: "A collection that celebrates traditional art forms.",
  },
  {
    id: 22,
    type: "Digital",
    url: "https://www.aspca.org/sites/default/files/catblogbanner.jpg",
    title: "Old World Charm",
    description: "A collection that celebrates traditional art forms.",
  },
  {
    id: 23,
    type: "Digital",
    url: "https://www.aspca.org/sites/default/files/catblogbanner.jpg",
    title: "Old World Charm",
    description: "A collection that celebrates traditional art forms.",
  },
  {
    id: 24,
    type: "Digital",
    url: "https://www.aspca.org/sites/default/files/catblogbanner.jpg",
    title: "Old World Charm",
    description: "A collection that celebrates traditional art forms.",
  },
  {
    id: 25,
    type: "Digital",
    url: "https://www.aspca.org/sites/default/files/catblogbanner.jpg",
    title: "Old World Charm",
    description: "A collection that celebrates traditional art forms.",
  },
  {
    id: 26,
    type: "Digital",
    url: "https://www.aspca.org/sites/default/files/catblogbanner.jpg",
    title: "Old World Charm",
    description: "A collection that celebrates traditional art forms.",
  },
  {
    id: 27,
    type: "Digital",
    url: "https://www.aspca.org/sites/default/files/catblogbanner.jpg",
    title: "Old World Charm",
    description: "A collection that celebrates traditional art forms.",
  },
  {
    id: 28,
    type: "Digital",
    url: "https://www.aspca.org/sites/default/files/catblogbanner.jpg",
    title: "Old World Charm",
    description: "A collection that celebrates traditional art forms.",
  },
  {
    id: 29,
    type: "Digital",
    url: "https://www.aspca.org/sites/default/files/catblogbanner.jpg",
    title: "Old World Charm",
    description: "A collection that celebrates traditional art forms.",
  },
  {
    id: 30,
    type: "Digital",
    url: "https://www.aspca.org/sites/default/files/catblogbanner.jpg",
    title: "Old World Charm",
    description: "A collection that celebrates traditional art forms.",
  },
  {
    id: 31,
    type: "Digital",
    url: "https://www.aspca.org/sites/default/files/catblogbanner.jpg",
    title: "Old World Charm",
    description: "A collection that celebrates traditional art forms.",
  },

  {
    id: 32,
    type: "Digital",
    url: "https://www.aspca.org/sites/default/files/catblogbanner.jpg",
    title: "Old World Charm",
    description: "A collection that celebrates traditional art forms.",
  },
];
export const GalleryCarousel = ({ viewMode }) => {


  const [data, setData] = useState([]);


  // const filteredData = data.filter((item) => item.type === viewMode);

  useEffect(() => {
    const collectionRef = collection(database, "Projects");
    const q = query(collectionRef, orderBy("publish_date", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      // onSnapshot is a listener that listens to changes in the database in realtime
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
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
            <Image
              source={{ uri: item.url }}
              style={{
                width: "100%",
                minHeight: 200,
                borderRadius: 10,
                borderColor: "#d35647",
                resizeMode: "cover",
              }}
            />
          </View>
        )}
      />
    </ScrollView>
  );
};
