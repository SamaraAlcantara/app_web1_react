import { PropsWithChildren, useState } from "react"; // Importa tipos e hooks do React.
import { StyleSheet, TouchableOpacity } from "react-native"; // Importa componentes do React Native.

import { ThemedText } from "@/components/ThemedText"; // Importa um componente de texto temático.
import { ThemedView } from "@/components/ThemedView"; // Importa um componente de visualização temático.
import { IconSymbol } from "@/components/ui/IconSymbol"; // Importa um componente de ícone.
import { Colors } from "@/constants/Colors"; // Importa constantes de cores.
import { useColorScheme } from "@/hooks/useColorScheme"; // Hook personalizado para detectar o esquema de cores.

/**
 * Componente de colapso (Accordion) que permite ocultar/mostrar conteúdo ao clicar no cabeçalho.
 *
 * @param {PropsWithChildren & { title: string }} props - Propriedades do componente.
 * - `title`: string exibida no cabeçalho do colapso.
 * - `children`: conteúdo exibido quando o colapso está aberto.
 */
export function Collapsible({
  children,
  title,
}: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false); 
  const theme = useColorScheme() ?? "light"; 

  return (
    <ThemedView>
      {" "}
      {/* Container principal temático */}
      <TouchableOpacity
        style={styles.heading} 
        onPress={() => setIsOpen((value) => !value)} // Alterna o estado de aberto/fechado ao clicar.
        activeOpacity={0.8}
      >
        <IconSymbol
          name="chevron.right" // Ícone de seta indicando expansão/recolhimento.
          size={18} 
          weight="medium"
          color={theme === "light" ? Colors.light.icon : Colors.dark.icon}
          style={{ transform: [{ rotate: isOpen ? "90deg" : "0deg" }] }} // Rotaciona o ícone conforme o estado.
        />
        <ThemedText type="defaultSemiBold">{title}</ThemedText>{" "}
      </TouchableOpacity>
      {/* Renderiza o conteúdo do colapso apenas se estiver aberto */}
      {isOpen && <ThemedView style={styles.content}>{children}</ThemedView>}
    </ThemedView>
  );
}

// Estilos do componente
const styles = StyleSheet.create({
  heading: {
    flexDirection: "row", // Exibe os elementos em linha (horizontalmente).
    alignItems: "center", // Alinha os itens verticalmente no centro.
    gap: 6, // Espaçamento entre o ícone e o título.
  },
  content: {
    marginTop: 6,
    marginLeft: 24, 
  },
});
