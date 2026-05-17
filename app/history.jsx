import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { useAuth } from "./context/AuthContext";

const API_URL = "http://100.68.161.45:3001/api";

const calcularIMC = (peso, altura) => {
  if (!peso || !altura) return null;
  return (peso / (altura * altura)).toFixed(1);
};

const classificarIMC = (imc) => {
  if (!imc) return null;
  const v = parseFloat(imc);
  if (v < 18.5) return "Abaixo do peso";
  if (v < 25) return "Peso adequado";
  if (v < 30) return "Sobrepeso";
  return "Obesidade";
};

export default function HistoricoScreen() {
  const router = useRouter();
  const { user } = useAuth();

  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user?.id) return;

    const carregar = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/user/history/${user.id}`);
        if (!res.ok) throw new Error("Falha ao carregar histórico");
        const data = await res.json();
        setHistorico(data);
      } catch (e) {
        console.log("Erro:", e);
      } finally {
        setLoading(false);
      }
    };

    carregar();
  }, [user]);

  if (!user) {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Histórico</Text>
          </View>
          <View style={styles.guestBox}>
            <Text style={styles.guestEmoji}>🔒</Text>
            <Text style={styles.guestTitulo}>Você não está logado</Text>
            <Text style={styles.guestTexto}>
              Faça login ou crie uma conta para ver seu histórico.
            </Text>
            <TouchableOpacity
              style={styles.guestBtnPrimary}
              onPress={() => router.push("/login")}
            >
              <Text style={styles.guestBtnPrimaryText}>Entrar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.guestBtnSecondary}
              onPress={() => router.push("/register")}
            >
              <Text style={styles.guestBtnSecondaryText}>Criar conta</Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Histórico</Text>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.title}>Registros recentes</Text>

          {loading ? (
            <ActivityIndicator
              color="#00856F"
              size="large"
              style={{ marginTop: 24 }}
            />
          ) : historico.length === 0 ? (
            <Text style={styles.emptyText}>Nenhum registro encontrado.</Text>
          ) : (
            historico.map((item, index) => {
              const imc = calcularIMC(item.peso, item.altura);
              const observacao = classificarIMC(imc);

              return (
                <View key={index} style={styles.card}>
                  <Text style={styles.date}>
                    {new Date(item.createdAt).toLocaleDateString("pt-BR")}
                  </Text>

                  <View style={styles.row}>
                    <Text style={styles.label}>Peso</Text>
                    <Text style={styles.value}>{item.peso} kg</Text>
                  </View>

                  <View style={styles.row}>
                    <Text style={styles.label}>Altura</Text>
                    <Text style={styles.value}>{item.altura} m</Text>
                  </View>

                  <View style={styles.row}>
                    <Text style={styles.label}>IMC</Text>
                    <Text style={styles.value}>
                      {imc ? `${imc} kg/m²` : "—"}
                    </Text>
                  </View>

                  {item.frequencia && (
                    <View style={styles.row}>
                      <Text style={styles.label}>Frequência</Text>
                      <Text style={styles.value}>
                        {item.frequencia}x/semana
                      </Text>
                    </View>
                  )}

                  {observacao && (
                    <View style={styles.noteBox}>
                      <Text style={styles.note}>{observacao}</Text>
                    </View>
                  )}
                </View>
              );
            })
          )}
        </ScrollView>
      </View>
    </>
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
  guestBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  guestEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  guestTitulo: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F5F3B",
    marginBottom: 8,
  },
  guestTexto: {
    fontSize: 15,
    color: "#555",
    textAlign: "center",
    marginBottom: 24,
  },
  guestBtnPrimary: {
    backgroundColor: "#00856F",
    paddingVertical: 14,
    paddingHorizontal: 48,
    borderRadius: 10,
    marginBottom: 12,
    width: "100%",
    alignItems: "center",
  },
  guestBtnPrimaryText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  guestBtnSecondary: {
    borderWidth: 1.5,
    borderColor: "#00856F",
    paddingVertical: 14,
    paddingHorizontal: 48,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  guestBtnSecondaryText: {
    color: "#00856F",
    fontWeight: "700",
    fontSize: 16,
  },
});
