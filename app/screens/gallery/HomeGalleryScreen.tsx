import { useState } from "react";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";

export const HomeGalleryScreen = () => {
  type ViewMode = "Traditional" | "Digital";
  const [viewMode, setViewMode] = useState<ViewMode>("Traditional");
  return (
    <View style={styles.container}>
      <View style={styles.switchContainer}>
        <TouchableOpacity
          style={[
            styles.switchButton,
            viewMode === "Traditional" ? styles.active : {},
          ]}
          onPress={() => setViewMode("Traditional")}
        >
          <Text style={styles.switchText}>Tradicional</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.switchButton,
            viewMode === "Digital" ? styles.active : {},
          ]}
          onPress={() => setViewMode("Digital")}
        >
          <Text style={styles.switchText}>Digital</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        <Text>{viewMode} Content</Text>
      </View>
      <View style={styles.bottomNavigation}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
  },
  switchButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 3,
    borderBottomColor: "transparent",
  },
  active: {
    borderBottomColor: "orange",
  },
  switchText: {
    fontSize: 18,
    fontWeight: "600",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomNavigation: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "grey",
  },
});
