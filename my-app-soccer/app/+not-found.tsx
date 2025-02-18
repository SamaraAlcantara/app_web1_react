import { Link, Stack } from "expo-router"; // Importa os componentes de navegação do expo-router.
import { StyleSheet } from "react-native"; // Importa o StyleSheet para criar estilos no React Native.

import { ThemedText } from "@/components/ThemedText"; // Importa um componente customizado de texto com tema.
import { ThemedView } from "@/components/ThemedView"; // Importa um componente customizado de visualização com tema.

export default function NotFoundScreen() {
  return (
    <>
      {/* Configura o título da tela na barra de navegação */}
      <Stack.Screen options={{ title: "Oops!" }} />

      {/* Componente customizado que aplica um estilo de tema ao layout da tela */}
      <ThemedView style={styles.container}>
        {/* Exibe o texto principal, informando que a tela não existe */}
        <ThemedText type="title">This screen doesn't exist.</ThemedText>

        {/* Link para redirecionar o usuário para a tela inicial */}
        <Link href="/" style={styles.link}>
          <ThemedText type="link">Go to home screen!</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

// Estilos definidos para os componentes desta tela
const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa toda a altura da tela
    alignItems: "center", // Centraliza o conteúdo horizontalmente
    justifyContent: "center", // Centraliza o conteúdo verticalmente
    padding: 20, // Adiciona um preenchimento de 20 unidades em torno do conteúdo
  },
  link: {
    marginTop: 15, // Adiciona um espaçamento de 15 unidades acima do link
    paddingVertical: 15, // Adiciona um preenchimento vertical de 15 unidades ao link
  },
});
