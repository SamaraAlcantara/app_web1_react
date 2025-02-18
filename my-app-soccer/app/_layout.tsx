// RootLayout.tsx
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Stack } from "expo-router"; // Importando Stack diretamente de expo-router

SplashScreen.preventAutoHideAsync();
 //define tipo de dados
export type Player = {
  player_id: string;
  player_name: string;
  player_birthdate: string;
  team_name: string;
  player_country: string;
  player_image: string;
};

//definição de parâmetros
type RootStackParamList = {
  "(tabs)": undefined;
  "+not-found": undefined;
  PlayerStats: { playerData: Player };
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
