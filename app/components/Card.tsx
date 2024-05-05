import { View, Image, Text } from "react-native";
import { colors } from "../theme/colors";

export const Card = ({ data }) => {
  return (

      <View
        style={{
          display: "flex",
          borderWidth: 3,
          borderRadius: 10,
          minWidth: 338,
          flexDirection: "row",
          backgroundColor: "#FFFF",
          borderColor: "#E3E3E3",
          padding: 12,
          minHeight: 93,
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <Image
          source={{
            uri: "https://archive.org/download/no-photo-available/no-photo-available.png",
          }}
          style={{
            minWidth: 75,
            borderColor: "#DEDEDE",
            borderWidth: 3,
            borderRadius: 5,
            backgroundColor: "#DEDEDE",
            minHeight: 75,
          }}
        />
        <View style={{ width: "70%" }}>
          <Text
            style={{
              paddingTop: 3,
              fontSize: 8,
              fontWeight: "700",
              color: colors.dateText,
            }}
          >
            {data.date}
          </Text>
          <Text
            style={{
              fontSize: 17.33,
              fontWeight: "700",
              color: colors.main,
            }}
          >
            {data.title}
          </Text>
          <Text
            style={{
              paddingTop: 3,
              fontSize: 10,
              fontWeight: "100",
              color: colors.text,
            }}
          >
            {data.centre}
          </Text>
        </View>
      </View>

  );
};
