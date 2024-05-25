import {
    View,
    Text,
  
    ImageBackground,
    Image,
    Dimensions,
    TouchableOpacity,
  } from "react-native";

  import { useEffect } from "react";
import { useTranslation } from "../../hooks/useTranslations";
import { colors } from "../../theme/colors";
  
  export const SuccesUploadNodetail = ({ navigation,route }) => {
    useEffect(() => {
        // android does not respect gestureEnabled flag
        navigation.addListener('beforeRemove', nav => {
          // Prevent going back on swipe
          if (nav.data.action.type === 'GO_BACK' && !nav.data.action.source) {
            nav.preventDefault();
          }})
     
    }, [navigation]);
    const background = require("../../../assets/background-blur-2.png");
    const win = Dimensions.get("window");
    const welcomeLogo = require("../../../assets/logo_single.png");
    const { t } = useTranslation();
  
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
          justifyContent: "center",
        }}
      >
        <ImageBackground
          source={background}
          resizeMode="contain"
          style={{
            position: "absolute",
            top: -30,
            right: 0,
            height: win.height,
            width: win.width,
          }}
          imageStyle={{ opacity: 0.5}}
  
        />
        <View style={{marginTop:50}}>
  
        <Image
          style={{
            alignContent: "center",
            alignSelf: "center",
            justifyContent: "center",
            height: "50%",
            resizeMode: "contain",
          }}
          
          source={welcomeLogo}
          />
        <Text
          style={{
            textAlign: "center",
            fontSize: 25,
            color: colors.main,
            fontWeight: "700",
            paddingTop:20,
            letterSpacing: 1.25,
          }}
          >
          {t("succesfull.upload")}
        </Text>
        </View>
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 10,
            backgroundColor: "white",
            borderTopEndRadius: 30,
            borderTopStartRadius: 30,
            left: 0,
            right: 0,
            position: "absolute",
            bottom: 0,
            width: "100%",
            minHeight: 100,
            shadowColor: "#000000",
            elevation: 20,
          }}
        >
          <View style={{ gap: 10, paddingTop: 10 }}>
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
                {t("go.home.gallery")}
              </Text>
            </TouchableOpacity>
           
          </View>
        </View>
      </View>
    );
  };
  