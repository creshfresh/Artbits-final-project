import { Pressable, View, Text } from "react-native";

export const ContestArtGrantViewForms = () => {
  return (
    <View
      style={{
        display:"flex",
        marginTop:50,
        flexDirection: "row",
        justifyContent: "center",
        paddingHorizontal: 10,
    
      }}
    >

        {/* {Falta poner el color condicional si está en beca o concurso} */}
      <Pressable
        style={{
          flex: 1,
        //   marginHorizontal: 10,
          alignItems: "center",
        //   padding: 10,
          borderWidth:2,
          borderStartStartRadius: 15,
          borderBottomStartRadius:15,
          borderColor: "#323232",
          justifyContent: "center",
          height: 40,
        }}
      >
        <Text> Contest</Text>
      </Pressable>
    
      <Pressable
        style={{
          flex: 1,
          alignItems: "center",
          borderWidth:2,
          borderTopEndRadius: 15,
          borderBottomEndRadius:15,
          borderColor: "#323232",
          justifyContent: "center",
          height: 40,
        }}
      >
        <Text>Beca</Text>
      </Pressable>
    </View>
  );
};
