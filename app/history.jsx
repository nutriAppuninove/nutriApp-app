import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

export default function HistoricoScreen() {
  const historico = [
    {
      data: "06/05/2026",
      peso: "70.0 kg",
      IMC: "22.9kg/M²",
      observacao: "Peso adequado",
    },
    {
      data: "05/05/2026",
      peso: "76.5 kg",
      IMC: "25.0 kg/M²",
      observacao: "Peso adequado",
    },
    {
      data: "04/05/2026",
      peso: "78.7 kg",
      IMC: "25.7 kg/M²",
      observacao: "Sobrepeso leve",
    },
    {
      data: "03/05/2026",
      peso: "84.0 kg",
      IMC: "27.4 kg/M²",
      observacao: "Sobrepeso moderado",
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Histórico</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Registros recentes</Text>

        {historico.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.date}>{item.data}</Text>

            <View style={styles.row}>
              <Text style={styles.label}>Peso</Text>
              <Text style={styles.value}>{item.peso}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>IMC</Text>
              <Text style={styles.value}>{item.IMC}</Text>
            </View>

            {item.observacao && (
              <View style={styles.noteBox}>
                <Text style={styles.note}>{item.observacao}</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F4",
  },

  header: {
    backgroundColor: "#00856F",
    paddingTop: 52,
    paddingBottom: 24,
    paddingHorizontal: 22,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "700",
  },

  content: {
    padding: 20,
    paddingBottom: 32,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1F5F3B",
    marginBottom: 16,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    elevation: 2,
  },

  date: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1F7A45",
    marginBottom: 14,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 9,
  },

  label: {
    fontSize: 15,
    color: "#555555",
    fontWeight: "700",
  },

  value: {
    fontSize: 15,
    color: "#222222",
  },

  noteBox: {
    backgroundColor: "#F1F8F3",
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
  },

  note: {
    fontSize: 14,
    color: "#2F6B3F",
  },

  emptyText: {
    fontSize: 16,
    color: "#777777",
    marginTop: 20,
  },
});