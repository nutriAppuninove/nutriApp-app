import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { useAuth } from "./context/AuthContext";
import { styles } from "./style/auth.style";

export default function Register() {
  const router = useRouter();
  const { register } = useAuth();

  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    idade: "",
  });
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);

  const handleRegister = async () => {
    setErro(null);
    setLoading(true);
    try {
      await register({
        nome: form.nome.trim(),
        email: form.email.trim(),
        senha: form.senha,
        idade: form.idade,
      });
      router.replace("/home");
    } catch (e) {
      setErro(e.message || "Erro ao criar conta");
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
            <Text style={styles.headerTitle}>Criar conta</Text>
          </View>

          <View style={styles.topSection}>
            <Text style={styles.topText}>
              Crie sua conta para salvar suas análises e acompanhar seu
              progresso.
            </Text>
          </View>

          <ScrollView
            contentContainerStyle={{ paddingBottom: 24 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={[styles.card, { marginTop: 16 }]}>
              <Text style={styles.label}>Nome</Text>
              <TextInput
                style={styles.input}
                placeholder="Seu nome"
                value={form.nome}
                onChangeText={(v) => setForm({ ...form, nome: v })}
              />

              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="seu@email.com"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={form.email}
                onChangeText={(v) => setForm({ ...form, email: v })}
              />

              <View style={styles.row}>
                <View style={styles.col}>
                  <Text style={styles.label}>Senha</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="••••••••"
                    secureTextEntry
                    value={form.senha}
                    onChangeText={(v) => setForm({ ...form, senha: v })}
                  />
                </View>
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
              </View>

              {erro && <Text style={styles.erro}>{erro}</Text>}

              <TouchableOpacity
                style={styles.button}
                onPress={handleRegister}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Criar conta</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity onPress={() => router.replace("/login")}>
                <Text style={styles.linkText}>Já tem conta? Entrar</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => router.replace("/home")}>
                <Text style={styles.linkText}>Voltar para Home</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}
