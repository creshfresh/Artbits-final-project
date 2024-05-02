import { View, Image } from "react-native";

export const Card = () => {
  return (
    <View
      style={{
        display: "flex",
        borderWidth: 3,
        borderRadius: 10,
        width: 338,
        backgroundColor: "#FFFF",
        borderColor: "#E3E3E3",
        height: 93,
        justifyContent: "center",
      }}
    >
      <Image
        source={{
          uri: "https://archive.org/download/no-photo-available/no-photo-available.png",
        }}
        style={{
          width: 75,
          borderColor: "#DEDEDE",
          borderWidth: 3,
          marginHorizontal: 11,
          borderRadius: 5,
          backgroundColor: "#DEDEDE",
          height: 75,
        }}
      />
    </View>
  );
};
