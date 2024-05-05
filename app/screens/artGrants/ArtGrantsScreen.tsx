import { signOut } from "firebase/auth";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { useEffect } from "react";
import { Card } from "../../components/Card";
import { FlashList } from "@shopify/flash-list";
import { colors } from "../../theme/colors";

const cardData = [
  {
    id: "1",
    title: "Becas de arte Fotografía Visiones Urbanas",
    centre: "UNESCO Center of Extremadura",
    date: "17 ABRIL 24 ",
    state: "abierto",
  },
  {
    id: "2",
    title: "Becas de arte Certamen de Poesía 'Versos del Alma'",
    centre: "Art Institute of Barcelona",
    date: "20 MAYO 24 ",
    state: "cerrado",
  },
  {
    id: "3",
    title: "Becas de arte Desafío de Escultura 'Formas en Movimiento'",
    centre: "Creative Hub Madrid",
    date: "12 JUNIO 24 ",
    state: "abierto",
  },
  {
    id: "4",
    title: "Becas de arte Maratón de Danza Contemporánea 'Expresión Corporal'",
    centre: "Innovation Lab Valencia",
    date: "5 JULIO 24 ",
    state: "abierto",
  },
  {
    id: "5",
    title: "Becas de arte Concurso de Diseño Gráfico 'Imágenes Innovadoras'",
    centre: "Cultural Center Seville",
    date: "30 AGOSTO 24 ",
    state: "cerrado",
  },
  {
    id: "6",
    title: "Becas de arte Torneo de Música Indie 'Sonidos Alternativos'",
    centre: "Arts Foundation Bilbao",
    date: "21 SEPTIEMBRE 24 ",
    state: "abierto",
  },
  {
    id: "7",
    title: "Becas de arte Festival de Teatro Experimental 'Escenas Vivas'",
    centre: "Design Studio Malaga",
    date: "14 OCTUBRE 24 ",
    state: "cerrado",
  },
  {
    id: "8",
    title: "Becas de arte Exhibición de Pintura Abstracta 'Colores del Cosmos'",
    centre: "Music Academy Granada",
    date: "7 NOVIEMBRE 24 ",
    state: "abierto",
  },
  {
    id: "9",
    title: "Becas de arte Rally de Escritura Creativa 'Palabras en Acción'",
    centre: "Film School Zaragoza",
    date: "29 DICIEMBRE 24 ",
    state: "cerrado",
  },
  {
    id: "10",
    title: "Becas de arte Competencia de Arte Digital 'Mundos Virtuales'",
    centre: "Dance Institute Valencia",
    date: "2 ENERO 25 ",
    state: "abierto",
  },
];

export const ArtGrantScreen = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({ tabBarVisible: false });

    return () => {
      navigation.setOptions({ tabBarVisible: true });
    };
  }, []);
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <View style={{display:"flex", justifyContent:"space-between",     flexDirection: "row",}}>

      <Text style={{ fontSize: 11,color: colors.secondary , fontWeight:'600', paddingHorizontal:5, paddingBottom:10}}>Find {cardData.length} Contests</Text>
      <Text style={{ fontSize: 11,color: colors.secondary , fontWeight:'600', paddingHorizontal:5, paddingBottom:10}}>Find {cardData.length} Contests</Text>
      </View>

      <FlashList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal={false}
        data={cardData}
        estimatedItemSize={200}
        ItemSeparatorComponent={() => <View style={{ height: 3 }} />}
        renderItem={({ item }) => <Card data={item} />}
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
