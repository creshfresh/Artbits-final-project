import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { User, signOut } from "firebase/auth";
import { AboutScreen } from "./AboutScreen";
import { colors } from "../../theme/colors";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "../../../firebaseConfig";
import { usePersonStore } from "../../../store/store";
import { useTranslation } from "../../hooks/useTranslations";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProfolioCarrousel } from "./component/PortfolioCarrousel";
import { SavedScreen } from "./SavedScreen";
import { CombinedUser } from "../../../types";

const windowWidth = Dimensions.get("window").width;

export const EditProfile = ({ route, navigation }) => {
  //Recoger el usuario actualmente logueado
  const user = usePersonStore((state) => state.user);
  const { t} = useTranslation();


  const header = require("../../../assets/headerprofile.png");
const [isEdited, setIsedited] = useState(false)

  return (
    <ScrollView
    showsVerticalScrollIndicator={false}
    style={{ backgroundColor: "transparent" }}
  >
      <Image
        source={header}
        style={{
          height: 150,
          width: "auto",
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
      />
      <Image source={{ uri: user.avatar }} style={[styles.image]} />

      <View style={styles.card}>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            margin: 5,
            gap: 5,
            justifyContent: "flex-start",
          }}
        >
          <Text style={styles.textTittle}>name</Text>
          <Text style={styles.text}>name</Text>
          <Text style={styles.textTittle}>city</Text>
          <Text style={styles.text}>name</Text>
          <Text style={styles.textTittle}>countrye</Text>
          <Text style={styles.text}>name</Text>
        </View>
      </View>
      <View
        style={{ height: 2, backgroundColor: "#EBE9E9", marginVertical: 2 }}
      ></View>
       <View style={[styles.card, {marginTop:0}]}>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            margin: 5,
            gap: 5,
            justifyContent: "flex-start",
          }}
        >
          <Text style={styles.textTittle}>Headline - One line about you</Text>
          <Text style={styles.text}>name</Text>
          <Text style={styles.textTittle}>Summary</Text>
          <Text style={styles.text}>name</Text>
          <Text style={styles.textTittle}>Personal webpage</Text>
          <Text style={styles.text}>name</Text>
        </View>
      </View>
      <View
        style={{ height: 2, backgroundColor: "#EBE9E9", marginVertical: 2 }}
      ></View>
         <View style={[styles.card, {marginTop:0}]}>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            margin: 5,
            gap: 5,
            justifyContent: "flex-start",
          }}
        >
          <Text style={styles.textTittle}>Contact</Text>
          <Text style={styles.text}>name</Text>
          <Text style={styles.textTittle}>Social</Text>
        
        </View>
      </View>
      {isEdited ?? <Pressable
              style={{
                marginVertical: 20,
                alignSelf:"center",
                justifyContent: "center",
                paddingVertical: 10,
                paddingHorizontal: 10,
                borderRadius: 30,
                width: 150,
                backgroundColor: colors.main,
                borderColor: "transparent",
                height: "auto",
              }}
             
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  fontWeight: "600",
                  alignContent: "center",
                  textAlign: "center",
                }}
              >
                {t("save")}
              </Text>
            </Pressable>}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  switchButton: {
    flex: 1,
    marginHorizontal: 10,
    alignItems: "center",
    padding: 10,
    maxWidth: 100,
    borderRadius: 30,
    borderColor: "transparent",
    justifyContent: "center",
    height: 40,
  },
  text: {
    fontSize: 16,
    fontWeight: "300",
  },
  textLocation: {
    fontSize: 15,
    fontWeight: "300",
    textAlign: "center",
  },
  textTittle: {
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 1.5,
    color: colors.text,
  },
  textUrl: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textDim,
    textAlign: "center",
  },
  card: {
    marginTop: 20,
    justifyContent: "center",
    padding: 15,
    letterSpacing: 2,
  },
  image: {
    width: 100,
    height: 100,
    borderColor: "white",
    backgroundColor: "#DEDEDE",
    borderWidth: 3,
    borderRadius: 50,
    position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
    top: 85,
  },
  active: {
    backgroundColor: "#D9D9D9",
  },
  inactive: {
    backgroundColor: "transparent",
  },
  switchTextActive: {
    fontSize: 14,
    color: colors.text,
    fontWeight: "600",
  },
  switchTextinactive: {
    fontSize: 14,
    color: "#323232",
    fontWeight: "600",
  },
  ellipsis_vertical: {
    position: "absolute",
    marginStart: windowWidth * 0.9,
  },
});
