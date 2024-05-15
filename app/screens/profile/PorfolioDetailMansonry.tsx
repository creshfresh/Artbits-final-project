import { View, Image, StyleSheet, Dimensions, ScrollView,Text } from "react-native";
import { FlashList } from "@shopify/flash-list";
import MasonryList from 'react-native-masonry-list';

export const PorfolioDetailMansonry  = ({route}) => {
  /*Este componente renderiza solo las imágenes ptertenecientes a un id de proyecto, de un id de Usuario */
  const { item } = route.params;

  const win = Dimensions.get("window");

  return (
    
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Text>{item.title}</Text>
      <MasonryList
  style={{alignSelf: 'stretch'}}
  contentContainerStyle={{
    paddingHorizontal: 24,
    alignSelf: 'stretch',
  }}
  numColumns={2}
  data={data}
  renderItem={renderItem}
/>
    </ScrollView>
  );
};
