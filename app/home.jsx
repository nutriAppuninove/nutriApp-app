import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { styles } from "./style/home.style";
import { useAuth } from "./context/AuthContext";

const API_URL = "http://100.68.161.45:3001/api";

export default function Home() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const [form, setForm] = useState({
    peso: "",
    altura: "",
    idade: "",
    frequencia: "",
  });
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);

  const parseNum = (val) => {
    const normalizado = String(val).replace(",", ".");
    const n = Number(normalizado);
    return isNaN(n) ? null : n;
  };

  const handleAnalisar = async () => {
    setLoading(true);
    setErro(null);
    setResultado(null);

    try {
      const peso = parseNum(form.peso);
      const altura = parseNum(form.altura);
      const idade = parseNum(form.idade);
      const frequencia = parseNum(form.frequencia);

      if (!peso || !altura || !idade) {
        setErro("Preencha peso, altura e idade corretamente.");
        return;
      }

      console.log("[home] user ao analisar:", user);

      const payload = {
        peso,
        altura,
        idade,
        frequencia,
        ...(user?.id ? { userId: user.id } : {}),
      };

      console.log("[home] payload enviado:", payload);

      const postRes = await fetch(`${API_URL}/insert/post`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!postRes.ok) {
        const err = await postRes.json().catch(() => ({}));
        throw new Error(err.message || "Falha ao enviar os dados");
      }

      const getRes = await fetch(`${API_URL}/result/get`);
      if (!getRes.ok) {
        const err = await getRes.json().catch(() => ({}));
        throw new Error(err.message || "Falha ao obter o resultado");
      }

      const data = await getRes.json();
      setResultado(data);
    } catch (e) {
      setErro(e.message || "Erro inesperado");
    } finally {
      setLoading(false);
    }
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

            <View style={styles.headerActions}>
              {user ? (
                <>
                  <Text style={styles.headerUser} numberOfLines={1}>
                    Olá, {user.nome}
                  </Text>
                  <TouchableOpacity onPress={logout} style={styles.headerLink}>
                    <Text style={styles.headerLinkText}>Sair</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <TouchableOpacity
                    onPress={() => router.push("/login")}
                    style={styles.headerLink}
                  >
                    <Text style={styles.headerLinkText}>Entrar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => router.push("/register")}
                    style={[styles.headerLink, styles.headerLinkPrimary]}
                  >
                    <Text
                      style={[
                        styles.headerLinkText,
                        styles.headerLinkTextPrimary,
                      ]}
                    >
                      Criar conta
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>

          {/* BLOCO VERDE */}
          <View style={styles.topSection}>
            <Text style={styles.topText}>
              Ajudamos você a atingir seus objetivos corporais com base nos seus
              dados.
            </Text>
          </View>

          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* CARD */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Seus dados</Text>

              <View style={styles.row}>
                <View style={styles.col}>
                  <Text style={styles.label}>Peso (kg)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Ex: 75.5"
                    keyboardType="numeric"
                    value={form.peso}
                    onChangeText={(v) => setForm({ ...form, peso: v })}
                  />
                </View>
                <View style={styles.col}>
                  <Text style={styles.label}>Altura (m)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Ex: 1.75"
                    keyboardType="numeric"
                    value={form.altura}
                    onChangeText={(v) => setForm({ ...form, altura: v })}
                  />
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.col}>
                  <Text style={styles.label}>Idade</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Ex: 25"
                    keyboardType="numeric"
                    value={form.idade}
                    onChangeText={(v) => setForm({ ...form, idade: v })}
                  />
                </View>
                <View style={styles.col}>
                  <Text style={styles.label}>Frequência</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Ex: 3"
                    keyboardType="numeric"
                    value={form.frequencia}
                    onChangeText={(v) => setForm({ ...form, frequencia: v })}
                  />
                </View>
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={handleAnalisar}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Analisar</Text>
                )}
              </TouchableOpacity>
            </View>

            {/* RESULTADO */}
            {erro && (
              <Text style={[styles.resultado, { color: "#c0392b" }]}>
                {erro}
              </Text>
            )}

            {resultado && (
              <View style={styles.resultadoBox}>
                <Text style={styles.resultadoTitulo}>Resultado</Text>
                <Text style={styles.resultadoLinha}>
                  IMC:{" "}
                  <Text style={styles.resultadoValor}>
                    {resultado.imc.valor}
                  </Text>
                </Text>
                <Text style={styles.resultadoLinha}>
                  Classificação:{" "}
                  <Text style={styles.resultadoValor}>
                    {resultado.imc.classificacao}
                  </Text>
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}
