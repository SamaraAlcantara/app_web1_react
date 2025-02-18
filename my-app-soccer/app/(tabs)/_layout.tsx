import { Tabs } from "expo-router"; // Importa o componente de navegação por abas
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab"; // Componente personalizado para feedback
import { IconSymbol } from "@/components/ui/IconSymbol"; // Componente de ícone
import TabBarBackground from "@/components/ui/TabBarBackground"; // Fundo personalizado para a barra de abas
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      {/* Aba Home */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      {/* Aba Gráfico */}
      <Tabs.Screen
        name="explore"
        options={{
          title: "Gráfico",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
