import { StyleSheet } from "react-native";
import { Button } from "@/components/button";
import { CardAtleta } from "@/components/cardAtleta";
import { TextInput, FlatList, View, Text, SafeAreaView } from "react-native";
import { useState } from "react";
import { calcAge } from "@/utils/caclAge";
import axios from "axios";
import { useNavigation, useRouter } from "expo-router";

interface Player {
  player_id: string;
  player_name: string;
  player_birthdate: string;
  team_name: string;
  player_country: string;
  player_image: string;
  favorite?: boolean;
  player_goals?: string;
  player_yellow_cards?: string;
  player_red_cards?: string;
  player_minutes?: string;
}

export default function HomeScreen() {
  const [searchPlayer, setSearchPlayer] = useState("");
  const [favorite, setFavorite] = useState<Player[]>(() => {
    const savedFavorites = sessionStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const [data, setData] = useState<Player[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearchChange = (text: string) => {
    setSearchPlayer(text);
  };

  const fetchPlayers = async (type: string) => {
    setLoading(true);
    if (type === "data") {
      //função requisita api
      const response = await axios.get(
        `https://apiv3.apifootball.com/?action=get_players&player_name=${searchPlayer}&APIkey=${"773d8e7ef432c2065d7053d4f4f50797a94c57627140a5915352ca99541fe93d"}`
      );
      setData(response.data);
    } else {
      setData(favorite);
    }
    setLoading(false);
  };

  //favoritar jogador
  const addFavorite = (player: Player) => {
    if (favorite.find((fav) => fav.player_id === player.player_id)) {
      return;
    } else {
      const newFavorite = [...favorite, player];
      setFavorite(newFavorite);
      sessionStorage.setItem("favorites", JSON.stringify(newFavorite));
    }
  };

  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.flexDiv}>
          <Button
            buttonName="Ver meus Favoritos"
            onPress={() => fetchPlayers("favorite")}
            color="#ffbf00"
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Digite sua busca..."
            onChangeText={handleSearchChange}
          />
          <Button
            buttonName="Buscar jogador"
            onPress={() => fetchPlayers("data")}
          />
        </View>

        {!loading ? (
          <FlatList
            data={data}
            keyExtractor={(item) => item.player_id}
            renderItem={({ item }) => (
              <View style={styles.playerArea}>
                <CardAtleta
                  age={calcAge(item.player_birthdate)}
                  country={item.player_country}
                  image={item.player_image}
                  name={item.player_name}
                  team={item.team_name}
                />

                {favorite.find((fav) => fav.player_id === item.player_id) ? (
                  <Text style={styles.favTitle}>Favorito!</Text>
                ) : (
                  <Button
                    buttonName="Adicionar aos Favoritos"
                    onPress={() =>
                      addFavorite({
                        player_id: item.player_id,
                        player_name: item.player_name,
                        player_birthdate: item.player_birthdate,
                        team_name: item.team_name,
                        player_country: item.player_country,
                        player_image: item.player_image,
                      })
                    }
                  />
                )}
              </View>
            )}
          />
        ) : (
          <Text>Carregando...</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: "center",
  },
  //estilização flex div
  flexDiv: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 10,
  },
  searchInput: {
    width: 250,
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginHorizontal: 10,
  },
  playerArea: {
    backgroundColor: "#007bff",
    padding: 10,
    margin: 10,
    borderRadius: 5,
    alignItems: "center",
    width: 200,
  },
  favTitle: {
    padding: 10,
    fontSize: 16,
    color: "#ffbf00",
  },
  playerImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
});
