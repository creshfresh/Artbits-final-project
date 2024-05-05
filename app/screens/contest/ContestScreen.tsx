import { signOut } from "firebase/auth";
import {
  View,
  Button,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { Card } from "../../components/Card";
import { ScrollView } from "react-native-gesture-handler";
import { FlashList } from "@shopify/flash-list";

const cardData = [
  {
    id: "1",
    title: "Concurso de Fotografía Visiones Urbanas",
    centre: "UNESCO Center of Extremadura",
    date: "17 ABRIL 24 ",
    estado: "abierto",
  },
  {
    id: "2",
    title: "Certamen de Poesía 'Versos del Alma'",
    centre: "Art Institute of Barcelona",
    date: "20 MAYO 24 ",
    estado: "cerrado",
  },
  {
    id: "3",
    title: "Desafío de Escultura 'Formas en Movimiento'",
    centre: "Creative Hub Madrid",
    date: "12 JUNIO 24 ",
    estado: "abierto",
  },
  {
    id: "4",
    title: "Maratón de Danza Contemporánea 'Expresión Corporal'",
    centre: "Innovation Lab Valencia",
    date: "5 JULIO 24 ",
    estado: "abierto",
  },
  {
    id: "5",
    title: "Concurso de Diseño Gráfico 'Imágenes Innovadoras'",
    centre: "Cultural Center Seville",
    date: "30 AGOSTO 24 ",
    estado: "cerrado",
  },
  {
    id: "6",
    title: "Torneo de Música Indie 'Sonidos Alternativos'",
    centre: "Arts Foundation Bilbao",
    date: "21 SEPTIEMBRE 24 ",
    estado: "abierto",
  },
  {
    id: "7",
    title: "Festival de Teatro Experimental 'Escenas Vivas'",
    centre: "Design Studio Malaga",
    date: "14 OCTUBRE 24 ",
    estado: "cerrado",
  },
  {
    id: "8",
    title: "Exhibición de Pintura Abstracta 'Colores del Cosmos'",
    centre: "Music Academy Granada",
    date: "7 NOVIEMBRE 24 ",
    estado: "abierto",
  },
  {
    id: "9",
    title: "Rally de Escritura Creativa 'Palabras en Acción'",
    centre: "Film School Zaragoza",
    date: "29 DICIEMBRE 24 ",
    estado: "cerrado",
  },
  {
    id: "10",
    title: "Competencia de Arte Digital 'Mundos Virtuales'",
    centre: "Dance Institute Valencia",
    date: "2 ENERO 25 ",
    estado: "abierto",
  },
];

export const ContestScreen = ({ navigation }) => {
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
        data={cardData}
        estimatedItemSize={200}
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
