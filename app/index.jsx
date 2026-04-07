import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
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
    // sua lógica aqui
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Dados Nutricionais</Text>

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

          <Text style={styles.label}>
            Frequência de Exercícios (por semana)
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 3"
            keyboardType="numeric"
            value={form.frequencia}
            onChangeText={(v) => setForm({ ...form, frequencia: v })}
          />

          <TouchableOpacity style={styles.button} onPress={handleAnalisar}>
            <Text style={styles.buttonText}>Analisar Condição Física</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "500",
    color: "#2d8a4e",
    textAlign: "center",
    marginBottom: 28,
    marginTop: 16,
  },
  label: {
    fontSize: 13,
    color: "#888",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    marginBottom: 16,
    backgroundColor: "#fafafa",
    color: "#111",
  },
  button: {
    backgroundColor: "#2d8a4e",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});
