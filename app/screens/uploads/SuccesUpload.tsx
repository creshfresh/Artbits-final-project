import { View, Text, Button, Image, Dimensions, TouchableOpacity } from "react-native";
import { colors } from "../../theme/colors";
import { useTranslation } from "../../hooks/useTranslations";

export const SuccesUpload = ({ navigation }) => {
  const background = require("../../../assets/background-blur-2.png");
  const win = Dimensions.get("window");
  const welcomeLogo = require("../../../assets/logo_single.png");

  const handleNavigateToHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
  };
  const { t } = useTranslation();

  return (
    <View
      style={{
        flex: 1,
     
      }}
    >
      <Image
        source={background}
        resizeMode="contain"
        style={{
          position: "absolute",
          top: -30,
          right: 0,
          height: win.height,
          width: win.width,
        }}
      ></Image>
      <Image
        style={{
          alignContent: "center",
          height: "40%",
          width: 500,
          marginTop: 30,
          resizeMode: "contain",
        }}
        source={welcomeLogo}
      />
          <Text style={{ textAlign: "center" }}>Uploaded files!</Text>
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          backgroundColor: "white",
          borderTopEndRadius: 30,
          borderTopStartRadius: 30,
          left: 0,
          right: 0,
          position:"absolute",
          bottom:0,
          width: "100%",
          minHeight: 150,
          shadowColor: "#000000",
          elevation: 20,
        }}
      >
        <View style={{gap:10, paddingTop:10}}> 

        <TouchableOpacity
              style={{
          
                justifyContent: "center",
                paddingVertical: 10,
                paddingHorizontal: 10,
                borderRadius: 30,
                width: win.width * 0.9,
                backgroundColor: colors.main,
                borderColor: "transparent",
                height: "auto",
              }}
              onPress={handleNavigateToHome}

            >
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  fontWeight: "600",
                  alignContent: "center",
                  textAlign: "center",
                }}
              >
                {t("Go to home gallery")}
              </Text>
            </TouchableOpacity>
        <TouchableOpacity
              style={{
          
                justifyContent: "center",
                paddingVertical: 10,
                paddingHorizontal: 10,
                borderRadius: 30,
                borderWidth:2,
                width: win.width * 0.9,
                backgroundColor:  "transparent",
                borderColor: colors.main,
                height: "auto",
              }}
            >
              <Text
                style={{
                  color: colors.main,
                  fontSize: 18,
                  fontWeight: "600",
                  alignContent: "center",
                  textAlign: "center",
                }}
              >
                {t("Go to home gallery")}
              </Text>
            </TouchableOpacity>
      
          </View>
      </View>
    </View>
  );
};
