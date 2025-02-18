import React, { useState } from "react";
import { StyleSheet, View, Text, SafeAreaView, TextInput } from "react-native";
import { Button } from "@/components/button";
import axios from "axios";
import { BarChart } from "react-native-chart-kit"; //Biblioteca externa que gera gráficos indicando o n de pessoas com os nomes de jogafores por país

// interface para um jogador
interface Player {
  player_id: string;
  player_name: string;
  player_country: string;
}

export default function HomeScreen() {
  //armazenar o nome do jogador
  const [searchPlayer, setSearchPlayer] = useState("");
  //armazenar os dados dos jogadores
  const [data, setData] = useState<Player[]>([]);
  const [loading, setLoading] = useState(false);
  //armazenar os dados do gráfico
  const [chartData, setChartData] = useState<any>(null);

  //Atualiza o estado de pesquisa
  const handleSearchChange = (text: string) => {
    setSearchPlayer(text);
  };

  // Função assíncrona para buscar jogadores na API
  const fetchPlayers = async () => {
    setLoading(true); // Inicia o estado de carregamento
    try {
      const response = await axios.get(
        `https://apiv3.apifootball.com/?action=get_players&player_name=${searchPlayer}&APIkey=${"773d8e7ef432c2065d7053d4f4f50797a94c57627140a5915352ca99541fe93d"}`
      );
      setData(response.data);
      generateChartData(response.data); // Gera os dados para o gráfico
    } catch (error) {
      console.error("Erro ao buscar jogadores:", error);
    }
    setLoading(false);
  };

  const generateChartData = (players: Player[]) => {
    // Cria um objeto para contar o número de jogadores por país
    const countryCount: { [key: string]: number } = {};
    players.forEach((player) => {
      if (player.player_country) {
        countryCount[player.player_country] =
          (countryCount[player.player_country] || 0) + 1;
      }
    });

    // Ordena os países pelo maior número de jogadores
    const sortedCountries = Object.entries(countryCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    const chartData = {
      labels: sortedCountries.map((entry) => entry[0]), // Nomes dos países
      datasets: [
        {
          data: sortedCountries.map((entry) => entry[1]),
          color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
          strokeWidth: 2,
        },
      ],
    };

    setChartData(chartData); // Atualiza o estado do gráfico
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.flexDiv}>
          <TextInput
            style={styles.searchInput}
            placeholder="Digite o nome do jogador..."
            onChangeText={handleSearchChange}
          />
          <Button buttonName="Buscar jogador" onPress={fetchPlayers} />
        </View>

        {loading ? (
          <Text>Carregando...</Text>
        ) : (
          <View style={styles.chartContainer}>
            {chartData && (
              <>
                <BarChart
                  data={chartData}
                  width={400}
                  height={300}
                  chartConfig={{
                    backgroundColor: "#fff",
                    backgroundGradientFrom: "#fff",
                    backgroundGradientTo: "#fff",
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                      borderRadius: 16,
                    },
                  }}
                  fromZero={true}
                  yAxisLabel="Jogadores "
                  yAxisSuffix=""
                />
                <Text>Gráfico dos 3 países com maior número de jogadores</Text>
              </>
            )}
          </View>
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
  chartContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});
