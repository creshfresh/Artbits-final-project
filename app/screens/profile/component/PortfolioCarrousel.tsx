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


type ProfolioCarrouselProps = {
  navigation: any;  
  data: ProjectImages[];
};

export const ProfolioCarrousel = ({ navigation, data }:ProfolioCarrouselProps) => {
  
/*Esta pantalla recibe todos los proyectos pertenecientes*/
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
            <Pressable onPress={()=>navigation.navigate("PorfolioDetail",{ id:item.id} )}>
              <Image
                source={{ uri: item.url[0] }}
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
