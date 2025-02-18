import React from "react";
import { TextInput, StyleSheet } from "react-native";

type SearchProps = {
  onChange: (text: string) => void;
};

export const Search = ({ onChange }: SearchProps) => {
  return (
    <TextInput
      style={styles.searchInput}
      placeholder="Digite sua busca..."
      onChangeText={onChange}
    />
  );
};

const styles = StyleSheet.create({
  searchInput: {
    width: 300,
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginHorizontal: 10,
  },
  searchInputFocus: {
    borderColor: "#007bff",
    shadowColor: "#007bff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
});
