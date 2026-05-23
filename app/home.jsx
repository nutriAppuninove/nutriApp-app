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
  StyleSheet,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { styles } from "./style/home.style";
import { useAuth } from "./context/AuthContext";
import { API_URL } from "./constants/env";

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
  const [inputErros, setInputErros] = useState({});

  console.log("User data:", API_URL);

  const validarCampo = (valor, campo) => {
    if (!valor) return null;

    const normalizado = String(valor).replace(",", ".");
    const n = Number(normalizado);

    if (isNaN(n) || n <= 0) return "Valor inválido";

    if (campo === "altura" && (n < 0.5 || n > 2.5))
      return "Altura entre 0,5 e 2,5 m";
    if (campo === "peso" && (n < 10 || n > 300))
      return "Peso entre 10 e 300 kg";
    if (campo === "idade" && (n < 1 || n > 120))
      return "Idade entre 1 e 120 anos";
    if (campo === "frequencia" && (n < 1 || n > 7))
      return "Frequência entre 1 e 7 dias";

    return null;
  };

  const handleChange = (campo, valor) => {
    setForm((prev) => ({ ...prev, [campo]: valor }));
    setInputErros((prev) => ({ ...prev, [campo]: validarCampo(valor, campo) }));
  };

  const parseNum = (val) => {
    const normalizado = String(val).replace(",", ".");
    const n = Number(normalizado);
    return isNaN(n) ? null : n;
  };

  const handleAnalisar = async () => {
    setErro(null);
    setResultado(null);

    if (Object.values(inputErros).some(Boolean)) {
      setErro("Corrija os campos inválidos antes de continuar.");
      return;
    }

    const peso = parseNum(form.peso);
    const altura = parseNum(form.altura);
    const idade = parseNum(form.idade);
    const frequencia = parseNum(form.frequencia);

    if (!peso || !altura || !idade) {
      setErro("Preencha peso, altura e idade corretamente.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        peso,
        altura,
        idade,
        frequencia,
        ...(user?.id ? { userId: user.id } : {}),
      };

      const postRes = await fetch(`${API_URL}/insert/post`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!postRes.ok) {
        const err = await postRes.json().catch(() => ({}));
        throw new Error(err.message || "Falha ao enviar os dados");
      }

      // resultado vem direto do POST agora
      const data = await postRes.json();
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
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Seus dados</Text>

              <View style={styles.row}>
                <View style={styles.col}>
                  <Text style={styles.label}>Peso (kg)</Text>
                  <TextInput
                    style={[
                      styles.input,
                      inputErros.peso && localStyles.inputError,
                    ]}
                    placeholder="Ex: 75.5"
                    placeholderTextColor="#9ca3af"
                    keyboardType="numeric"
                    value={form.peso}
                    onChangeText={(v) => handleChange("peso", v)}
                  />
                  {inputErros.peso && (
                    <Text style={localStyles.erroInput}>{inputErros.peso}</Text>
                  )}
                </View>
                <View style={styles.col}>
                  <Text style={styles.label}>Altura (m)</Text>
                  <TextInput
                    style={[
                      styles.input,
                      inputErros.altura && localStyles.inputError,
                    ]}
                    placeholder="Ex: 1.75"
                    placeholderTextColor="#9ca3af"
                    keyboardType="numeric"
                    value={form.altura}
                    onChangeText={(v) => handleChange("altura", v)}
                  />
                  {inputErros.altura && (
                    <Text style={localStyles.erroInput}>
                      {inputErros.altura}
                    </Text>
                  )}
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.col}>
                  <Text style={styles.label}>Idade</Text>
                  <TextInput
                    style={[
                      styles.input,
                      inputErros.idade && localStyles.inputError,
                    ]}
                    placeholder="Ex: 25"
                    placeholderTextColor="#9ca3af"
                    keyboardType="numeric"
                    value={form.idade}
                    onChangeText={(v) => handleChange("idade", v)}
                  />
                  {inputErros.idade && (
                    <Text style={localStyles.erroInput}>
                      {inputErros.idade}
                    </Text>
                  )}
                </View>
                <View style={styles.col}>
                  <Text style={styles.label}>Frequência</Text>
                  <TextInput
                    style={[
                      styles.input,
                      inputErros.frequencia && localStyles.inputError,
                    ]}
                    placeholder="Ex: 3"
                    placeholderTextColor="#9ca3af"
                    keyboardType="numeric"
                    value={form.frequencia}
                    onChangeText={(v) => handleChange("frequencia", v)}
                  />
                  {inputErros.frequencia && (
                    <Text style={localStyles.erroInput}>
                      {inputErros.frequencia}
                    </Text>
                  )}
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
                {resultado.mensagem && (
                  <Text style={styles.resultadoLinha}>
                    💬 {resultado.mensagem}
                  </Text>
                )}
              </View>
            )}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

const localStyles = StyleSheet.create({
  inputError: {
    borderColor: "#ef4444",
    borderWidth: 1,
  },
  erroInput: {
    color: "#ef4444",
    fontSize: 11,
    marginTop: 2,
  },
});
