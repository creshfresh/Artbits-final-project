import { FlashList } from "@shopify/flash-list";
import React, { useEffect } from "react";
import { View ,StyleSheet} from "react-native";
import { DummyData } from "../../../Constants";
import { JobCard } from "../../components/JobCard";

export const FlatlistJobs = ({ navigation }) => {
    useEffect(() => {
      navigation.setOptions({ tabBarVisible: false });
  
      return () => {
        navigation.setOptions({ tabBarVisible: true });
      };
    }, []);
    return (
      <View style={{ flex: 1, padding: 10 }}>
        <FlashList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={DummyData}
          estimatedItemSize={200}
          renderItem={({ item }) => <JobCard data={item} />}
        ></FlashList>
      </View>
    );
  };
  const styles = StyleSheet.create({
    button: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: "black",
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: "bold",
      letterSpacing: 0.25,
      color: "white",
    },
  });
  