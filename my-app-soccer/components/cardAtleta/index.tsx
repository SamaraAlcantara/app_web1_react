import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

//define dados do card atleta
type Atleta = {
  name: string;
  age: number;
  team: string;
  country: string;
  image: string;
};

export const CardAtleta = (props: Atleta) => {
  return (
    <View style={styles.containerCardAtleta}>
      <View>
        <Image
          source={{
            uri: props.image
              ? props.image
              : "https://icon-library.com/images/no-photo-available-icon/no-photo-available-icon-20.jpg",
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.dataAtleta}>
        <Text style={styles.text}>{props.name}</Text>
        <Text style={styles.text}>{props.age}</Text>
        <Text style={styles.text}>{props.team}</Text>
        <Text style={styles.text}>{props.country}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerCardAtleta: {
    width: 200,
    height: 200,
    borderWidth: 1,
    borderColor: "#007bff",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 10,
    flexDirection: "row",
    gap: 10,
    margin: 5,
    shadowColor: "#007bff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  image: {
    width: 100,
    height: "100%",
    backgroundColor: "#ccc",
  },
  dataAtleta: {
    flex: 1,
    flexDirection: "column",
    gap: 5,
  },
  text: {
    fontSize: 14,
  },
});
