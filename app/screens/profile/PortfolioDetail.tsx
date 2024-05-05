import { View, Image, StyleSheet, Dimensions, ScrollView } from "react-native";
import { FlashList } from "@shopify/flash-list";


type ProyectImages = {
    id: number;
    type: string;
    url: string;
  };
const data:ProyectImages [] =   

[  {  id: 1,
    type: "Traditional",
    url: "https://cdnb.artstation.com/p/assets/images/images/012/782/743/large/bryan-lee-model2.jpg?1536508745",}

]
export const PorfolioDetail = ({}) => {

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <FlashList
        data={data}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
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
