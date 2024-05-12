import { View, Text, Button } from "react-native";

export const SuccesUpload = ({navigation }) => {

  
  const handleNavigateToHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
  };

  return (
    <View
      style={{
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ textAlign: "center" }}>Proyecto subido yay</Text>
      <Button title="Volver a la home" onPress={handleNavigateToHome}></Button>
    </View>
  );
};
