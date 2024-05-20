import { useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  Text,
  View,
} from "react-native";
import { usePersonStore } from "../../../store/store";
import { useTranslation } from "../../hooks/useTranslations";
import { colors } from "../../theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { SocialMediaList } from "./component/SocialMediaList";

const win = Dimensions.get("window");

export const EditProfile = ({ route, navigation }) => {
  //Recoger el usuario actualmente logueado
  const user = usePersonStore((state) => state.user);
  const { t } = useTranslation();

  const header = require("../../../assets/headerprofile.png");
  const [isEdited, setIsedited] = useState(true);

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

      <View style={[styles.card, { marginTop: 40 }]}>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            margin: 5,
            gap: 8,
            justifyContent: "flex-start",
          }}
        >
          <View style={styles.divided}>
            <Text style={styles.textTittle}>{t("name")}</Text>
            <TextInput
              style={styles.input}
              value={user.displayName}
              placeholder={t("description.placeholder")}
              keyboardType="default"
            />
          </View>
          <View style={styles.divided}>
            <Text style={styles.textTittle}>{t("city")}</Text>
            <TextInput
              style={styles.input}
              value={user.city}
              placeholder={t("description.placeholder")}
              keyboardType="default"
            />
          </View>
          <View style={styles.divided}>
            <Text style={styles.textTittle}>{t("country")}</Text>
            <TextInput
              style={styles.input}
              value={user.country}
              placeholder={t("description.placeholder")}
              keyboardType="default"
            />
          </View>
        </View>
      </View>

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
      
          <View style={styles.divided}>
            <Text style={styles.textTittle}>Summary</Text>
            <TextInput
              style={[styles.input, {minHeight:70, textAlignVertical:"top", paddingTop:5,paddingEnd:0.8}]}
              multiline={true}
              value={user.about_description}

              placeholder={t("description.placeholder")}
              keyboardType="default"
            />
          </View>
          <View style={[styles.divided, {marginTop:30}]}>
            <Text style={styles.textTittle}>Personal webpage</Text>
            <TextInput
              style={styles.input}
              value={user.web_url}

              placeholder={t("description.placeholder")}
              keyboardType="default"
            />
          </View>
        </View>
      </View>

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
          <View style={styles.divided}>
            <Text style={styles.textTittle}>Contact</Text>
            <TextInput
              style={styles.input}
              value={user.email}

              placeholder={t("description.placeholder")}
              keyboardType="default"
            />
          </View>
          <View style={styles.divided}>
            <Text style={[styles.textTittle, { paddingBottom: 10 }]}>
              Social
            </Text>
            {/* Array de cuentas de redes sociales */}
            <SocialMediaList />
          </View>
        </View>
      </View>

      <Pressable style={styles.button}>
        <Text style={styles.buttontext}>{t("save")}</Text>
      </Pressable>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  divided: {
    marginBottom: 3,
    gap: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: "300",
  },
  input: {
    height: 35,
    width: win.width * 0.88,
    paddingStart: 5,
    borderColor: colors.palette.neutral500,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor:colors.neutral05

  },

  textTittle: {
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 1.5,
    color: colors.text,
  },

  card: {
    marginTop: 20,
    paddingHorizontal: 15,
    justifyContent: "center",
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
  button: {
    marginVertical: 20,
    alignSelf: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 30,
    width: 150,
    backgroundColor: colors.main,
    borderColor: "transparent",
    height: "auto",
  },
  buttontext: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    alignContent: "center",
    textAlign: "center",
  },
  ellipsis_vertical: {
    position: "absolute",
    marginStart: win.width * 0.9,
  },
});
