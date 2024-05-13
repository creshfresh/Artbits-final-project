import { View, Image, Text } from "react-native";
import { colors } from "../theme/colors";
import { ContestData } from "../../types";
import { useTranslation } from "../hooks/useTranslations";

//aqui recibo la data de los concursos

// Necesito: name, fecha, y centro organizatio

export const Card = (item: ContestData | any) => {
  const { t } = useTranslation();
  const finishDateFormated = new Date(item.data.finishDate.seconds * 1000);

  // Reemplazar la parte del mes en la cadena original

  const formateToDate = (date) => {
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      year: "2-digit",
    });
  };

  const formatDateTranslated = (date: Date) => {
    const dd: string = formateToDate(date);
    const [day, month, year] = dd.split(" ");
    const translatedMont = t(month).toUpperCase();
    const newDateTranslated = `${day} ${translatedMont} ${year}`;
    console.log(translatedMont);

    return newDateTranslated;
  };

  const newFinishDate = formatDateTranslated(finishDateFormated);

  console.log(item.data);

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
            fontSize: 10,
            fontWeight: "700",
            color: colors.dateText,
          }}
        >
       {newFinishDate} |  {new Date(newFinishDate) > new Date() ?  t("close") :  t("open")}
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "700",
            color: colors.main,
          }}
        >
          {item.data.name}
        </Text>
        <Text
          style={{
            paddingTop: 3,
            fontSize: 12,
            fontWeight: "200",
            color: colors.text,
          }}
        >
          {item.data.organization}
        </Text>
      </View>
    </View>
  );
};
