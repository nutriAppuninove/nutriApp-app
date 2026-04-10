import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Stack } from "expo-router";

export default function Home() {
  const [form, setForm] = useState({
    peso: "",
    altura: "",
    idade: "",
    frequencia: "",
  });

  const handleAnalisar = () => {
    console.log(form);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.container}>
          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>NutriApp</Text>
          </View>

          {/* BLOCO VERDE */}
          <View style={styles.topSection}>
            <Text style={styles.topText}>
              Ajudamos você a atingir seus objetivos corporais com base nos seus
              dados.
            </Text>
          </View>

          {/* CARD */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Seus dados</Text>

            <Text style={styles.label}>Peso (kg)</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 75.5"
              keyboardType="numeric"
              value={form.peso}
              onChangeText={(v) => setForm({ ...form, peso: v })}
            />

            <Text style={styles.label}>Altura (m)</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 1.75"
              keyboardType="numeric"
              value={form.altura}
              onChangeText={(v) => setForm({ ...form, altura: v })}
            />

            <Text style={styles.label}>Idade</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 25"
              keyboardType="numeric"
              value={form.idade}
              onChangeText={(v) => setForm({ ...form, idade: v })}
            />

            <Text style={styles.label}>Frequência</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 3"
              keyboardType="numeric"
              value={form.frequencia}
              onChangeText={(v) => setForm({ ...form, frequencia: v })}
            />

            <TouchableOpacity style={styles.button} onPress={handleAnalisar}>
              <Text style={styles.buttonText}>Analisar</Text>
            </TouchableOpacity>
          </View>

          {/* RESULTADO */}
          <Text style={styles.resultado}>resultado</Text>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },

  header: {
    paddingTop: 50,
    paddingBottom: 12,
    alignItems: "center",
    backgroundColor: "#fff",
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
  },

  topSection: {
    backgroundColor: "#4f6f6a",
    padding: 16,
    height: 110,
    justifyContent: "center",
  },

  topText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },

  card: {
    backgroundColor: "#6f9188",
    marginHorizontal: 16,
    borderRadius: 20,
    padding: 16,
    marginTop: -40,
  },

  cardTitle: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 12,
    textAlign: "center",
  },

  label: {
    color: "#eaeaea",
    marginBottom: 4,
    fontSize: 12,
  },

  input: {
    backgroundColor: "#ffffffcc",
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
  },

  button: {
    backgroundColor: "#2d8a4e",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 6,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "500",
  },

  resultado: {
    textAlign: "center",
    marginTop: 12,
    color: "#555",
  },
});
